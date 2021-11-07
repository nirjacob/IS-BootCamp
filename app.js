const express = require('express')
const app = express()
const router = require('./routes/index')
const bodyParser = require('body-parser')
const { handleCachedData } = require('./middleware/cacheHandler')
const { authenticateJwt } = require('./middleware/jwtAuthentication')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(authenticateJwt)
app.use(handleCachedData)
app.use(router)

module.exports = app
