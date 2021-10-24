const fs = require('fs')
const config = require('config')
const path = require('path')
const fileDBPath = path.resolve(__dirname, '../', config.filePath)
const fileReviewsPath = path.resolve(__dirname, '../', config.reviewsPath)

const getBestRatedItems = async (numberOfItems) => {
  const podcastReviewsData = require(fileReviewsPath)
  const podcastData = require(fileDBPath)

  const podcastsRatings = podcastReviewsData.reduce((podcast, { podcastId, rating }) => {
    return podcast.set(podcastId, (podcast.get(podcastId) || 0) + rating)
  }, new Map())
  const podcastsRatingSorted = new Map([...podcastsRatings.entries()].sort((curr, prev) => prev[1] - curr[1]))
  const sortedListIter = podcastsRatingSorted.entries()
  const bestPodcasts = []
  for (let i = 0; i < Math.min(numberOfItems, podcastsRatingSorted.size); i++) {
    const podcastId = sortedListIter.next().value[0]
    bestPodcasts.push(podcastData.find((podcast) => podcast.id === podcastId))
  }
  return bestPodcasts
}
const getItemByTitleOrAuthor = async (queryParams) => {
  const podcastData = require(fileDBPath)
  const podcastsByTitle = podcastData.filter(getPodcast => getPodcast.title.toLowerCase().includes(queryParams))
  const podcastsByAuthor = podcastData.filter(getPodcast => getPodcast.author.toLowerCase().includes(queryParams))
  if (!podcastsByAuthor.length && !podcastsByTitle.length) {
    return null
  } else {
    return { ...podcastsByAuthor, ...podcastsByTitle }
  }
}

const getItem = (id) => {
  const podcastData = require(fileDBPath)
  id = parseInt(id)
  return podcastData.find(getPodcast => getPodcast.id === id)
}
const updateItem = async (id, updatedPodcast) => {
  let podcastData = require(fileDBPath)
  podcastData = podcastData.filter(getPodcast => getPodcast.id !== id)
  podcastData.push(updatedPodcast)
  return await fs.promises.writeFile(fileDBPath, JSON.stringify(podcastData))
}
const deleteItem = async (id) => {
  let podcastData = require(fileDBPath)
  podcastData = podcastData.filter(getPodcast => getPodcast.id !== id)
  return await fs.promises.writeFile(fileDBPath, JSON.stringify(podcastData))
}

const saveItem = async (podcast) => {
  const podcastData = require(fileDBPath)
  podcastData.push(podcast)
  return await fs.promises.writeFile(fileDBPath, JSON.stringify(podcastData))
}

const getMaxItem = () => {
  const podcastData = require(fileDBPath)
  return podcastData.reduce((prev, current) => (prev.id > current.id) ? prev : current)
}

module.exports = {
  getItem, deleteItem, saveItem, getMaxItem, updateItem, getItemByTitleOrAuthor, getBestRatedItems
}
