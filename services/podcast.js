const {
  getItemByTitleOrAuthor,
  getItem,
  deleteItem,
  saveItem,
  getMaxItem,
  updateItem,
  getBestRatedItems
} = require('../models/fileModel')

const getBestPodcasts = async (numberOfItems) => {
  return await getBestRatedItems(numberOfItems)
}
const getPodcastByTitleOrAuthor = async (queryParams) => {
  return await getItemByTitleOrAuthor(queryParams)
}
const getPodcastById = (id) => {
  return getItem(id)
}

const getMaxPodcastId = () => {
  return getMaxItem()
}

const savePodcastToDb = async (podcast) => {
  return await saveItem(podcast)
}
const deletePodcastFromDb = async (id) => {
  return await deleteItem(id)
}

const updatePodcastDetails = async (updateDetails, id) => {
  const podcastToUpdate = getPodcastById(id)
  const updatedPodcast = { ...podcastToUpdate, ...updateDetails }
  return await updateItem(podcastToUpdate.id, updatedPodcast)
}

module.exports = {
  getPodcastByTitleOrAuthor,
  updatePodcastDetails,
  getPodcastById,
  getMaxPodcastId,
  savePodcastToDb,
  deletePodcastFromDb,
  getBestPodcasts
}
