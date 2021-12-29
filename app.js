const express = require('express')
const app = express()
const router = require('./routes/index')
const bodyParser = require('body-parser')
const { handleRequestsData } = require('./middleware/cache')
const path = require('path')
const config = require('config')
const { authenticateJwt } = require('./middleware/jwtAuthentication')

app.use(express.static(path.join(__dirname, config.static)))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(authenticateJwt)
app.use(handleRequestsData)

app.use(router)

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, config.static, 'index.html'))
})

module.exports = app
