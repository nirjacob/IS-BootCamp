const config = require('config')
const { verifyJwt, isProtectedPath } = require('../services/authentication')

const authenticateJwt = async (req, res, next) => {
  const reqPath = req.path.toString()
  const reqMethod = req.method.toString()

  if (isProtectedPath(reqMethod, reqPath) && config.auth.isAuthEnabled) {
    try {
      await verifyJwt(req.headers.authorization, config.auth.secret)
    } catch (error) {
      return res.status(401).send('Failed to authenticate token')
    }
  }
  return next()
}

module.exports = { authenticateJwt }
