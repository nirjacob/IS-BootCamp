const config = require('config')
const urlGetter = require('url')

const getUrl = (req) => {
  return urlGetter.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  })
}

class CachedData {
  constructor (requestUrl, timeStamp, data) {
    this.url = requestUrl
    this.timeStamp = timeStamp
    this.data = data
  }

  getData () {
    return this.data
  }

  isExpired () {
    return this.timeStamp + cacheMillisecondsToLive < Date.now()
  }
}

const cacheDataMap = new Map()
const cacheMinutesToLive = 10
const cacheMillisecondsToLive = cacheMinutesToLive * 60 * 1000

const saveToCache = (url, data) => {
  cacheDataMap.set(url, new CachedData(url, Date.now(), data))
}

const isInCache = (requestedUrl) => {
  if (requestedUrl) {
    return !requestedUrl.isExpired()
  }
  return null
}
const handleCachedData = (req, res, next) => {
  if (config.isCacheEnabled) {
    const requestedUrl = cacheDataMap.get(getUrl(req))
    if (isInCache(requestedUrl)) {
      return res.status(200).send(requestedUrl.getData())
    } else {
      if (req.method === 'GET') {
        const returnedResponse = res.send
        res.send = (body) => {
          saveToCache(getUrl(req), body)
          res.send = returnedResponse
          res.send(body)
        }
      }
    }
  }
  next()
}

module.exports = { handleCachedData }
