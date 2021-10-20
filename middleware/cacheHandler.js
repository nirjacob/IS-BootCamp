const config = require('config')

const formatCacheData = (requestUrl, timeStamp, data) => {
  return JSON.stringify({ url: requestUrl, timeStamp: timeStamp, data: data })
}
const isExpired = (timeStamp) => {
  return timeStamp + cacheMillisecondsToLive < Date.now()
}

const cacheDataMap = new Map()
const cacheMinutesToLive = 10
const cacheMillisecondsToLive = cacheMinutesToLive * 60 * 1000

const saveToCache = (url, data) => {
  cacheDataMap.set(url, formatCacheData(url, Date.now(), data))
}

const isInCache = (requestedUrl) => {
  if (requestedUrl) {
    return !isExpired(requestedUrl.timeStamp)
  }
  return null
}

const handleCachedData = (req, res, next) => {
  if (req.method === 'GET' && config.isCacheEnabled) {
    const url = req.url
    const requestedUrl = cacheDataMap.get(url)
    if (isInCache(requestedUrl)) {
      return res.status(200).send(JSON.parse(requestedUrl).data)
    } else {
      const returnedResponse = res.send
      res.send = (body) => {
        saveToCache(url, body)
        res.send = returnedResponse
        res.send(body)
      }
    }
  }
  next()
}

module.exports = { handleCachedData }
