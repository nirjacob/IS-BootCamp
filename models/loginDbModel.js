const mysql = require('../utils/mysql')

const authenticateLogin = async (username, password) => {
  const authResults = await mysql.runQuery('SELECT * FROM `podcasts`.`users` WHERE username=? AND password=?', [username, password])
  return authResults.length > 0
}
module.exports = { authenticateLogin }
