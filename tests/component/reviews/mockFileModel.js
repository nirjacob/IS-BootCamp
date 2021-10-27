const { mockReviews } = require('./mockPodcast.js')
const mockFileModel = {
  saveItem: (review) => Promise.resolve(),
  getItem: (id) => id === 1132 ? mockReviews : null,
  getMaxReviewId: () => 4,
  getReviewsItems: () => mockReviews
}
module.exports = mockFileModel
