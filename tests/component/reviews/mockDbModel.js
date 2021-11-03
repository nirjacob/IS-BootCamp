const { mockReviews } = require('./mockPodcast.js')
const mockDbModel = {
  saveItem: (review) => Promise.resolve(),
  getItem: (id) => id === 1132 ? mockReviews : null,
  getReviewsItems: () => mockReviews
}
module.exports = mockDbModel
