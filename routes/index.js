const express = require('express')
const router = express.Router()
const podcasts = require('./podcast')
const review = require('./review')

router.use('/podcast', podcasts)
router.use('/review', review)

module.exports = router
