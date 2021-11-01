const { getItem } = require('../models/reviewDbModel')
const { saveItem } = require('../models/reviewDbModel')

const getReviewById = async (id) => {
  return await getItem(id)
}

const saveReviewToDb = async (review) => {
  return saveItem(review)
}

module.exports = { getReviewById, saveReviewToDb }
