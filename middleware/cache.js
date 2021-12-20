const config = require('config')
const redis = require('redis')
const { isInCache, formatCacheData, clearOutdatedCache } = require('../services/cache')

const cacheDataClient = redis.createClient(config.redis)
cacheDataClient.connect()

const saveToCache = async (url, data) => {
  await cacheDataClient.set(url, formatCacheData(url, Date.now(), data))
  await cacheDataClient.expire(url, config.redis.cacheDuration)
}

const handleRequestsData = async (req, res, next) => {
  const { url, method } = req
  if (config.isCacheEnabled) {
    clearOutdatedCache(url, method, cacheDataClient)
    if (req.method === 'GET') {
      const requestedUrl = await cacheDataClient.get(url)
      if (isInCache(requestedUrl)) {
        return res.status(200).send(JSON.parse(requestedUrl).data)
      } else {
        const returnedResponse = res.send
        res.send = (body) => {
          if (res.statusCode === 200) {
            saveToCache(url, body)
          }
          res.send = returnedResponse
          res.send(body)
        }
      }
    }
  }
  return next()
}

module.exports = { handleCachedData: handleRequestsData }
