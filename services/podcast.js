const { getItem, deleteItem, saveItem, getMaxItem } = require('../models/fileModel')

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
  await deleteItem(id)
  return await saveItem(updatedPodcast)
}

module.exports = {
  updatePodcastDetails,
  getPodcastById,
  getMaxPodcastId,
  savePodcastToDb,
  deletePodcastFromDb
}
