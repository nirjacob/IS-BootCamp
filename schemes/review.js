const joi = require('joi')
const reviewSchema = joi.object(
  {
    rating: joi.number().required(),
    text: joi.string().required(),
    podcastId: joi.number().integer().required()
  })

module.exports = { reviewSchema }
