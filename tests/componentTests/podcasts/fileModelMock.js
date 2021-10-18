const mockPodcast = require('./mockPodcast')

const fileModelMock = {
  getItem: (id) => mockPodcast,
  deleteItem: (id) => Promise.resolve(),
  updateItem: (id, updatedPodcast) => Promise.resolve(),
  saveItem: (podcast) => Promise.resolve(),
  getMaxItem: () => Promise.resolve()
}

module.exports = {
  fileModelMock
}
