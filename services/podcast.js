const {
  searchItem,
  getItem,
  deleteItem,
  saveItem,
  updateItem,
  saveItemToS3,
  getPodcastsItems
} = require('../models/podcastDbModel')
const { getReviewsItems } = require('../models/reviewDbModel')

const getBestRatedList = async () => {
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
  return sortedRatedPodcasts.map((podcast) => podcast.podcastInfo)
}

const savePodcastsToS3 = async () => {
  const bestPodcasts = await getBestRatedList()
  const topTenPodcasts = bestPodcasts.slice(0, 10)
  await saveItemToS3(topTenPodcasts)
}
const getBestPodcasts = async () => {
  return await getBestRatedList()
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
  savePodcastsToS3,
  getBestRatedList
}
