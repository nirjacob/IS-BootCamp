const config = require('config')

const cacheMinutesToLive = 10
const cacheMillisecondsToLive = cacheMinutesToLive * 60 * 1000

const formatCacheData = (requestUrl, timeStamp, data) => {
  return JSON.stringify({ url: requestUrl, timeStamp: timeStamp, data: data })
}

const isExpired = (timeStamp) => {
  return timeStamp + cacheMillisecondsToLive < Date.now()
}

const isInCache = (requestedUrl) => {
  if (requestedUrl) {
    return !isExpired(requestedUrl.timeStamp)
  }
  return null
}
const clearOutdatedCache = (url, method, cacheDataClient) => {
  config.cache.map((req) => {
    if (req.method === method && isInCache(url)) {
      cacheDataClient.del(url)
    }
  })
}
module.exports = { isInCache, formatCacheData, clearOutdatedCache }
