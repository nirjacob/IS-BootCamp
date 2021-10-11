const express = require('express')
const app = express()
const port = process.env.port || 3000
const router = require('./routes/podcast')
// Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)

app.listen(port)
