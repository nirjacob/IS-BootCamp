const jwt = require('jsonwebtoken')
const config = require('config')

const createNewJwt = (username) => {
  return jwt.sign({ username: username }, config.auth.secret, {
    expiresIn: config.auth.expireIn
  })
}

const verifyJwt = (authorization, secret) => {
  return Promise.resolve((reject, resolve) => {
    jwt.verify(authorization, secret, (err, decoded) => {
      if (err) return reject(err)
      return resolve()
    })
  })
}
module.exports = { createNewJwt, verifyJwt }
