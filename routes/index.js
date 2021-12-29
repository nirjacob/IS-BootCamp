const express = require('express')
const router = express.Router()
const podcasts = require('./podcast')
const review = require('./review')
const login = require('./login')

router.use('/api/login', login)
router.use('/api/podcast', podcasts)
router.use('/api/review', review)

module.exports = router
