const { getItem, getReviewsItems } = require('../models/reviewFileModel')
const { saveItem } = require('../models/reviewFileModel')

const getReviewById = async (id) => {
  return await getItem(id)
}
const getMaxReviewId = async () => {
  const podcastReviewsData = await getReviewsItems()
  return podcastReviewsData.reduce((prev, current) => (prev.id > current.id) ? prev : current)
}
const saveReviewToDb = async (review) => {
  const newestReview = await getMaxReviewId()
  const id = newestReview.id + 1
  const newReview = { ...review, ...{ id } }
  return saveItem(newReview)
}

module.exports = { getReviewById, getMaxReviewId, saveReviewToDb }
