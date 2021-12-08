const {
  searchItem,
  getItem,
  deleteItem,
  saveItem,
  updateItem,
  getPodcastsItems
} = require('../models/podcastDbModel')
const { getReviewsItems } = require('../models/reviewDbModel')

const getBestRatedList = async (numberOfItems) => {
  const podcastReviewsData = await getReviewsItems()
  const podcastData = await getPodcastsItems()
  const ratedPodcasts = []
  for (const podcast of podcastData) {
    const reviews = podcastReviewsData.filter(review => review.podcastId === podcast.id)
    const avgScore = reviews.reduce((sum, review) => {
      return sum + parseFloat(review.rating)
    }, 0) / reviews.length
    const podcastReviews = { review: reviews, rating: avgScore, podcastInfo: podcast }
    ratedPodcasts.push(podcastReviews)
  }
  const filteredPodcasts = ratedPodcasts.filter((pod) => pod.rating)
  const sortedRatedPodcasts = filteredPodcasts.sort((curr, prev) => prev.rating - curr.rating)
  const numberOfBestPodcasts = Math.min(numberOfItems, podcastData.length)
  return sortedRatedPodcasts.map((podcast) => podcast.podcastInfo).slice(0, numberOfBestPodcasts)
}
const getBestPodcasts = async (numberOfItems) => {
  return await getBestRatedList(numberOfItems)
}
const getPodcastSearchResults = async (queryParams) => {
  return await searchItem(queryParams)
}
const getPodcastById = async (id) => {
  return await getItem(id)
}

const savePodcastToDb = async (podcast) => {
  return await saveItem(podcast)
}
const deletePodcastFromDb = async (id) => {
  return await deleteItem(id)
}

const updatePodcastDetails = async (updateDetails, id) => {
  return await updateItem(id, updateDetails)
}

module.exports = {
  getPodcastSearchResults,
  updatePodcastDetails,
  getPodcastById,
  savePodcastToDb,
  deletePodcastFromDb,
  getBestPodcasts,
  getBestRatedList
}
