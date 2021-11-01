const { getItem } = require('../models/reviewFileModel')
const { saveItem } = require('../models/reviewFileModel')

const getReviewById = async (id) => {
  return await getItem(id)
}

const saveReviewToDb = async (review) => {
  return saveItem(review)
}

module.exports = { getReviewById, saveReviewToDb }
