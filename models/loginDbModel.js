const mysql = require('../utils/mysql')

const getLogin = async (username, password) => {
  return await mysql.runQuery('SELECT * FROM `podcasts`.`users` WHERE username=? AND password=?', [username, password])
}
module.exports = { getLogin }
