const config = require('config')
const { isInCache, saveToCache, getCacheData, clearOutdatedCache } = require('../services/cache')

const handleRequestsData = async (req, res, next) => {
  const { path, method } = req
  if (config.cache.isCacheEnabled) {
    clearOutdatedCache(path, method)
    if (req.method === 'GET') {
      const requestedUrl = await getCacheData(path)
      if (isInCache(requestedUrl)) {
        return res.status(200).send(JSON.parse(requestedUrl).data)
      } else {
        const returnedResponse = res.send
        res.send = (body) => {
          if (res.statusCode === 200) {
            saveToCache(path, body)
          }
          res.send = returnedResponse
          res.send(body)
        }
      }
    }
  }
  return next()
}

module.exports = { handleRequestsData }
