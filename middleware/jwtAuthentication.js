const config = require('config')
const { verifyJwt } = require('../services/authentication')

const authenticateJwt = async (req, res, next) => {
  const reqPath = req.path.toString()
  if (reqPath !== config.auth.loginRoute && config.auth.isAuthEnabled) {
    try {
      await verifyJwt(req.headers.authorization, config.auth.secret)
    } catch (error) {
      return res.status(401).send('Failed to authenticate token')
    }
  }
  return next()
}

module.exports = { authenticateJwt }
