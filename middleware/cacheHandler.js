const config = require('config')
const redis = require('redis')

const cacheDataClient = redis.createClient(config.redis)
cacheDataClient.connect()

const cacheMinutesToLive = 10
const cacheMillisecondsToLive = cacheMinutesToLive * 60 * 1000

const formatCacheData = (requestUrl, timeStamp, data) => {
  return JSON.stringify({ url: requestUrl, timeStamp: timeStamp, data: data })
}

const isExpired = (timeStamp) => {
  return timeStamp + cacheMillisecondsToLive < Date.now()
}

const saveToCache = async (url, data) => {
  try {
    await cacheDataClient.set(url, formatCacheData(url, Date.now(), data), 'EX', config.redis.cacheDuration)
    return true
  } catch {
    return null
  }
}

const isInCache = (requestedUrl) => {
  if (requestedUrl) {
    return !isExpired(requestedUrl.timeStamp)
  }
  return null
}

const handleCachedData = async (req, res, next) => {
  if (req.method === 'GET' && config.isCacheEnabled) {
    const url = req.url
    const requestedUrl = await cacheDataClient.get(url)

    if (isInCache(requestedUrl)) {
      return res.status(200).send(JSON.parse(requestedUrl).data)
    } else {
      const returnedResponse = res.send
      res.send = (body) => {
        const savedSuccessfully = saveToCache(url, body)
        if (!savedSuccessfully) {
          return res.status(404).send('Error saving to cache')
        }
        res.send = returnedResponse
        res.send(body)
      }
    }
  }
  return next()
}

module.exports = { handleCachedData }
