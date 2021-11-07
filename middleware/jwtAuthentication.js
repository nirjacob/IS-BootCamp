const config = require('config')
const { verifyJwt } = require('../services/authentication')

const authenticateJwt = async (req, res, next) => {
  const reqPath = req.path.toString()
  if (reqPath !== config.loginRoute && config.isAuthEnabled) {
    try {
      await verifyJwt(req.headers.authorization, config.auth.secret)
    } catch (error) {
      return res.status(400).send('Failed to authenticate token')
    }
  }
  return next()
}

module.exports = { authenticateJwt }
