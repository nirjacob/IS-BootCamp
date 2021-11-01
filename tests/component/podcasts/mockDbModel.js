const { mockPodcast, mockBestPodcastsReviews, mockBestPodcastData } = require('./mockPodcast.js')
const mockDbModel = {
  getItem: (id) => id === 1132 ? mockPodcast : null,
  deleteItem: (id) => Promise.resolve(),
  updateItem: (id, updatedPodcast) => Promise.resolve(),
  saveItem: (podcast) => Promise.resolve(),
  searchItem: (query) => query === 'ben' ? mockPodcast : null,
  getReviewsItems: () => mockBestPodcastsReviews,
  getPodcastsItems: () => mockBestPodcastData
}
module.exports = mockDbModel
