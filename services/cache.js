const config = require('config')
const redis = require('redis')
const { pathToRegexp } = require('path-to-regexp')

const cacheMinutesToLive = 10
const cacheMillisecondsToLive = cacheMinutesToLive * 60 * 1000

const cacheDataClient = redis.createClient(config.redis)
cacheDataClient.connect()

const saveToCache = async (url, data) => {
  await cacheDataClient.set(url, formatCacheData(url, Date.now(), data))
  await cacheDataClient.expire(url, config.redis.cacheDuration)
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
  config.cache.map((cachedReq) => {
    if (pathToRegexp(cachedReq.requestUrl).exec(url) && cachedReq.method === method) {
      cachedReq.cacheToClear.map((cachedUrl) => cacheDataClient.del(cachedUrl))
      if (cacheDataClient.get(url)) cacheDataClient.del(url)
    }
  })
}
module.exports = { isInCache, saveToCache, clearOutdatedCache, getCacheData }
