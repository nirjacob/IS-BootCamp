const jwt = require('jsonwebtoken')
const config = require('config')

const authenticateJwt = (req, res, next) => {
  const reqPath = req.path.toString()
  if (reqPath !== '/login' && config.isAuthEnabled) {
    jwt.verify(req.headers.authorization, config.auth.secret, (err, decoded) => {
      if (err) return res.status(400).send('Failed to authenticate token')
    })
  }
  return next()
}

const createNewJwt = (username) => {
  return jwt.sign({ username: username }, config.auth.secret, {
    expiresIn: config.auth.expireIn
  })
}

module.exports = { authenticateJwt, createNewJwt }
