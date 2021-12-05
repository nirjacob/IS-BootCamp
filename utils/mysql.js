const mysql = require('mysql')
const config = require('config')

const connection = mysql.createConnection({
    host: config.Db.host,
    user: config.Db.user,
    password: config.Db.pass,
    database: config.Db.name,
    port: config.Db.port
})

function runQuery(query, parameters = []) {
    return new Promise((resolve, reject) => {
        connection.query(query, parameters, (error, results) => {
            if (error) reject(error)
            resolve(results)
        })
    })
}

module.exports = {runQuery}
