const { mockPodcast, mockBestPodcastsReviews, mockBestPodcastData } = require('./mockPodcast.js')
const mockDbModel = {
  getItem: (id) => id === 1132 ? mockPodcast : null,
  deleteItem: (id) => Promise.resolve(),
  updateItem: (id, updatedPodcast) => id !== 0 ? { affectedRows: 1 } : null,
  saveItem: (podcast) => Promise.resolve(),
  searchItem: (query) => query === 'ben' ? mockPodcast : null,
  getReviewsItems: () => mockBestPodcastsReviews,
  getPodcastsItems: () => mockBestPodcastData
}
module.exports = mockDbModel
