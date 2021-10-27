const { getMaxReviewId, getReviewById, saveReviewToDb } = require('../services/review')
const { getPodcastById } = require('../services/podcast')

const addNewReview = async (req, res, next) => {
  try {
    const podcastId = req.body.podcastId
    if (getPodcastById(podcastId)) {
      const newestReview = await getMaxReviewId()
      const id = newestReview.id + 1
      const newReview = { ...req.body, ...{ id } }
      await saveReviewToDb(newReview)
      return res.status(200).send('Review has been successfully added')
    } else {
      return res.status(404).send('Podcast not found!')
    }
  } catch
  (err) {
    return next(err)
  }
}

const getReview = async (req, res, next) => {
  const id = parseInt(req.params.id)
  try {
    const reviewInfo = await getReviewById(id)
    if (!reviewInfo) return res.status(404).send('No review found!')
    return res.status(200).send(reviewInfo)
  } catch
  (err) {
    return next(err)
  }
}

module.exports = { getReview, addNewReview }