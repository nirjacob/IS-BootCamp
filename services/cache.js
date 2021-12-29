const config = require('config')
const redis = require('redis')
const { pathToRegexp } = require('path-to-regexp')

const cacheMinutesToLive = 10
const cacheMillisecondsToLive = cacheMinutesToLive * 60 * 1000
const url = `redis://${config.redis.host}:${config.redis.port}`
const cacheDataClient = redis.createClient({ url })
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

const clearOutdatedCache = async (url, method) => {
  config.cache.cacheClearMap.find((element) => {
    const regexp = pathToRegexp(element.requestUrl).exec(url)
    if (regexp && method === element.method) {
      element.cacheToClear.forEach(async (outdatedCache) => {
        const keys = await cacheDataClient.keys('*')

        keys.forEach((key) => {
          const regexp = pathToRegexp(outdatedCache).exec(key)
          if (regexp) {
            cacheDataClient.del(key)
          }
        })
      })
    }
  })
}


module.exports = { isInCache, saveToCache, clearOutdatedCache, getCacheData }
