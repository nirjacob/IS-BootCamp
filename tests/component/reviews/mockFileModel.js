const { mockReviews, mockReview } = require('./mockPodcast.js')
const mockFileModel = {
  saveItem: (review) => Promise.resolve(),
  getItem: (id) => id === 1132 ? mockReviews : null,
  getMaxReviewId: () => mockReview,
  getReviewsItems: () => mockReviews
}
module.exports = mockFileModel
