const jwt = require('jsonwebtoken')
const config = require('config')

const createNewJwt = (username) => {
    return jwt.sign({username: username}, config.auth.secret, {
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
module.exports = {createNewJwt, verifyJwt}
