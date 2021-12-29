const jwt = require('jsonwebtoken')
const config = require('config')
const { pathToRegexp } = require('path-to-regexp')

const isProtectedPath = (reqMethod, reqPath) => {
  return config.auth.protectedUrls.find((protectedUrl) => {
    const regExpression = pathToRegexp(protectedUrl.path)
    const isProtectedUrl = regExpression.exec(reqPath)
    return isProtectedUrl && (reqMethod === protectedUrl.method)
  })
}

const createNewJwt = (username) => {
  return jwt.sign({ username: username }, config.auth.secret, {
    expiresIn: config.auth.expireIn
  })
}

const verifyJwt = (authorization, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(authorization, secret, (err) => {
      if (err) return reject(err)
      return resolve()
    })
  })
}
module.exports = { createNewJwt, verifyJwt, isProtectedPath }
