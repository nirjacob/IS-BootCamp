const { mockPodcast } = require('./mockPodcast.js')
const mockFileModel = {
  getItem: (id) => id === 1132 ? mockPodcast : null,
  deleteItem: (id) => Promise.resolve(),
  updateItem: (id, updatedPodcast) => Promise.resolve(),
  saveItem: (podcast) => Promise.resolve(),
  getMaxItem: () => Promise.resolve()
}
module.exports = mockFileModel
