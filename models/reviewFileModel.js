const fs = require('fs')
const config = require('config')
const path = require('path')
const reviewsFilePath = path.resolve(__dirname, '../', config.reviewsPath)

const saveItem = async (review) => {
  const reviewsData = require(reviewsFilePath)
  reviewsData.push(review)
  return await fs.promises.writeFile(reviewsFilePath, JSON.stringify(reviewsData))
}
const getItem = async (id) => {
  const podcastReviewsData = require(reviewsFilePath)
  return podcastReviewsData.filter(podcast => podcast.podcastId === id)
}
const getReviewsItems = async () => {
  const podcastReviewsData = require(reviewsFilePath)
  return podcastReviewsData
}
module.exports = { saveItem, getItem, getReviewsItems }
