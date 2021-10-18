const express = require('express')
const app = express()
const config = require('config')
const port = process.env.port || config.port
const router = require('./routes/index')
const bodyParser = require('body-parser')
const { handleCachedData } = require('./middleware/cacheHandler')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(handleCachedData)
app.use(router)

app.listen(port)
