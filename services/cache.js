const config = require('config')
const redis = require('redis')
const { pathToRegexp } = require('path-to-regexp')

const cacheMinutesToLive = 10
const cacheMillisecondsToLive = cacheMinutesToLive * 60 * 1000

const cacheDataClient = redis.createClient(config.redis)
cacheDataClient.connect()

const saveToCache = async (url, data) => {
  await cacheDataClient.set(url, formatCacheData(url, Date.now(), data))
  await cacheDataClient.expire(url, config.cache.cacheExpiration)
}

const formatCacheData = (requestUrl, timeStamp, data) => {
  return JSON.stringify({ url: requestUrl, timeStamp: timeStamp, data: data })
}

const isExpired = (timeStamp) => {
  return timeStamp + cacheMillisecondsToLive < Date.now()
}

const getCacheData = async (url) => {
  return await cacheDataClient.get(url)
}

const isInCache = (requestedUrl) => {
  if (requestedUrl) {
    return !isExpired(requestedUrl.timeStamp)
  }
  return null
}


const clearOutdatedCache = (url, method) => {
  config.cache.cacheClearMap.map((cachedReq) => {
      const keys = []
      const urlRegExp = pathToRegexp(cachedReq.requestUrl, keys).exec(url)
      if (urlRegExp && cachedReq.method === method) {
        cachedReq.cacheToClear.map((cachedUrl) => {
          const keys = []
          pathToRegexp(cachedUrl, keys)
          let urlToDelete = cachedUrl
          keys.map((key, index) => {
            urlToDelete = urlToDelete.replace(`:${key.name}`, urlRegExp[index + 1])
          })
          cacheDataClient.del(urlToDelete)
        })
      }
    }
  )
}

module.exports = { isInCache, saveToCache, clearOutdatedCache, getCacheData }
