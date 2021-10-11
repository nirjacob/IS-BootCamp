const fs = require('fs')
const FILE_PATH = 'podcasts.json'

const getItem = (id) => {
  const podcastData = require(FILE_PATH)
  id = parseInt(id)
  return podcastData.find(getPodcast => getPodcast.id === id)
}

const deleteItem = async (id) => {
  let podcastData = require(FILE_PATH)
  podcastData = podcastData.filter(getPodcast => getPodcast.id !== id)
  return await fs.promises.writeFile(FILE_PATH, JSON.stringify(podcastData))
}

const saveItem = async (podcast) => {
  const podcastData = require(FILE_PATH)
  podcastData.push(podcast)
  return await fs.promises.writeFile(FILE_PATH, JSON.stringify(podcastData))
}

const getMaxItem = async (id) => {
  const podcastData = require(FILE_PATH)
  return podcastData.reduce((prev, current) => (prev.id > current.id) ? prev : current)
}

module.exports = {
  getItem, deleteItem, saveItem, getMaxItem
}
