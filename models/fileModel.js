const fs = require('fs')
const FILE_PATH = 'podcasts.json'
const SAVE_PATH = 'podcasts.json'

const getItem = (id) => {
  const podcastData = require(FILE_PATH)
  id = parseInt(id)
  return podcastData.find(getPodcast => getPodcast.id === id)
}

const deleteItem = async (id) => {
  const podcastData = require(FILE_PATH)
  const filteredPodcastData = podcastData.filter(getPodcast => getPodcast.id !== id)
  return await fs.promises.writeFile(SAVE_PATH, JSON.stringify(filteredPodcastData))
}

const saveItem = async (podcast) => {
  const podcastData = require(FILE_PATH)
  console.log('1: ', podcast)
  podcastData.push(podcast)
  return await fs.promises.writeFile(SAVE_PATH, JSON.stringify(podcastData))
}

const getMaxItem = () => {
  const podcastData = require(FILE_PATH)
  return podcastData.reduce((prev, current) => (prev.id > current.id) ? prev : current)
}

module.exports = {
  getItem, deleteItem, saveItem, getMaxItem
}
