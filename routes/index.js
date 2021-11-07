const express = require('express')
const router = express.Router()
const podcasts = require('./podcast')
const review = require('./review')
const login = require('./login')
const { authenticateJwt } = require('../middleware/jwtAuthentication')

router.use(authenticateJwt)
router.use('/login', login)
router.use('/podcast', podcasts)
router.use('/review', review)

module.exports = router
