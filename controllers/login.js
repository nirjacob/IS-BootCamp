const { authenticateLogin } = require('../models/loginDbModel')
const { createNewJwt } = require('../services/authentication')

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (await authenticateLogin(username, password)) {
      const newToken = createNewJwt(username)
      return res.status(200).send(newToken)
    } else {
      return next(new Error('Login failed, username or password incorrect'))
    }
  } catch (err) {
    return next(err)
  }
}
