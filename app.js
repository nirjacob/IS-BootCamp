const express = require('express')
const app = express()
const router = require('./routes/index')
const bodyParser = require('body-parser')
const { handleCachedData } = require('./middleware/cache')
const path = require('path')
const config = require('config')
const { authenticateJwt } = require('./middleware/jwtAuthentication')

app.use(express.static(path.join(__dirname, 'client', `${config.static}`)))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(authenticateJwt)
app.use(handleCachedData)
app.use(router)

module.exports = app
