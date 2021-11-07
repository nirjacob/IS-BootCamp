const express = require('express')
const router = express.Router()
const { requestSchemeValidator } = require('../middleware/scemaValidator')
const { login } = require('../controllers/login')
const { loginSchema } = require('../schemes/login')

router.post('', requestSchemeValidator(loginSchema), login)

module.exports = router
