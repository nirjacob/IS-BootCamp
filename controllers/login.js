const { getLogin } = require('../models/loginDbModel')
const { createNewJwt } = require('../services/authentication')

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const authResults = await getLogin(username, password)
    if (authResults.length) {
      const newToken = createNewJwt(username)
      return res.status(200).send('Login successfully')
    } else {
      return res.status(400).send('Login failed, username or password incorrect')
    }
  } catch (err) {
    return res.status(400).send(`Login failed, ${err.message}`)
  }
}
