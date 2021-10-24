const {
  getItemByTitleOrAuthor,
  getItem,
  deleteItem,
  saveItem,
  getMaxItem,
  updateItem, getPodcastsItems, getReviewsItems
} = require('../models/fileModel')

const getBestRatedList = async (numberOfItems) => {
  const podcastReviewsData = await getReviewsItems()
  const podcastData = await getPodcastsItems()
  const ratedPodcasts = []
  for (const podcast of podcastData) {
    const reviews = podcastReviewsData.filter(review => review.podcastId === podcast.id)
    let sum = 0
    let counter = 0
    reviews.forEach(review => {
      sum += review.rating
      counter++
    })
    const podcastReview = { reviews, rating: sum / counter }
    ratedPodcasts.push(podcastReview)
  }
  const sortedRatedPodcasts = ratedPodcasts.sort((curr, prev) => prev.rating - curr.rating)
  const bestRatedPodcasts = []
  const podcastsLength = podcastData.length
  for (let i = 0; i < Math.min(numberOfItems, podcastsLength); i++) {
    bestRatedPodcasts.push(podcastData.find(podcast => podcast.id === sortedRatedPodcasts[i].reviews[0].podcastId))
  }
  return bestRatedPodcasts
}
const getBestPodcasts = async (numberOfItems) => {
  return await getBestRatedList(numberOfItems)
}
const getPodcastSearchResults = async (queryParams) => {
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
  getPodcastSearchResults,
  updatePodcastDetails,
  getPodcastById,
  getMaxPodcastId,
  savePodcastToDb,
  deletePodcastFromDb,
  getBestPodcasts,
  getBestRatedList
}
