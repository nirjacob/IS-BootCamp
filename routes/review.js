const express = require('express')
const router = express.Router()

const { urlParamsSchemeValidator, requestSchemeValidator } = require('../middleware/scemaValidator')
const { idSchema } = require('../schemes/podcast')
const { reviewSchema } = require('../schemes/review')
const { addNewReview, getReview } = require('../controllers/review')

router.get('/get-by-podcast/:id', urlParamsSchemeValidator(idSchema), getReview)
router.post('', requestSchemeValidator(reviewSchema), addNewReview)

module.exports = router
