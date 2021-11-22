const express = require('express')
const app = express()
const router = require('./routes/index')
const bodyParser = require('body-parser')
const { handleCachedData } = require('./middleware/cacheHandler')
const path = require('path')
const config = require('config')

app.use(express.static(path.join(__dirname, 'client', `${config.static}`)))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(handleCachedData)
app.use(router)

module.exports = app
