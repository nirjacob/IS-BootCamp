const fs = require('fs')
const config = require('config')
const path = require('path')
const dbFilePath = path.resolve(__dirname, '../', config.filePath)

const getPodcastsItems = async () => {
  const podcastData = require(dbFilePath)
  return await podcastData
}

const searchItem = async (queryParams) => {
  const podcastData = require(dbFilePath)
  const searchResult = podcastData.filter(podcast => podcast.title.toLowerCase().includes(queryParams) || podcast.author.toLowerCase().includes(queryParams))

  if (!searchResult.length) {
    return null
  } else {
    return searchResult
  }
}

const getItem = (id) => {
  const podcastData = require(dbFilePath)
  id = parseInt(id)
  return podcastData.find(getPodcast => getPodcast.id === id)
}
const updateItem = async (id, updatedPodcast) => {
  let podcastData = require(dbFilePath)
  podcastData = podcastData.filter(getPodcast => getPodcast.id !== id)
  podcastData.push(updatedPodcast)
  return await fs.promises.writeFile(dbFilePath, JSON.stringify(podcastData))
}
const deleteItem = async (id) => {
  let podcastData = require(dbFilePath)
  podcastData = podcastData.filter(getPodcast => getPodcast.id !== id)
  return await fs.promises.writeFile(dbFilePath, JSON.stringify(podcastData))
}

const saveItem = async (podcast) => {
  const podcastData = require(dbFilePath)
  podcastData.push(podcast)
  return await fs.promises.writeFile(dbFilePath, JSON.stringify(podcastData))
}

module.exports = {
  getItem,
  deleteItem,
  saveItem,
  updateItem,
  searchItem,
  getPodcastsItems

}
