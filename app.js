const express = require('express')
const app = express()
const config = require('config')
const port = process.env.port || config.port
const router = require('./routes/podcast')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)

app.listen(port)
