const fs = require('fs')
const config = require('config')
const path = require('path')
const filePath = path.resolve(__dirname, '../', config.filePath)

const getItemByTitleOrAuthor = async (queryParams) => {
  const podcastData = require(filePath)
  const podcastsByTitle = podcastData.filter(getPodcast => getPodcast.title.toLowerCase().includes(queryParams))
  const podcastsByAuthor = podcastData.filter(getPodcast => getPodcast.author.toLowerCase().includes(queryParams))
  if (!podcastsByAuthor.length && !podcastsByTitle.length) {
    return null
  } else {
    return { ...podcastsByAuthor, ...podcastsByTitle }
  }
}

const getItem = (id) => {
  const podcastData = require(filePath)
  id = parseInt(id)
  return podcastData.find(getPodcast => getPodcast.id === id)
}
const updateItem = async (id, updatedPodcast) => {
  let podcastData = require(filePath)
  podcastData = podcastData.filter(getPodcast => getPodcast.id !== id)
  podcastData.push(updatedPodcast)
  return await fs.promises.writeFile(filePath, JSON.stringify(podcastData))
}
const deleteItem = async (id) => {
  let podcastData = require(filePath)
  podcastData = podcastData.filter(getPodcast => getPodcast.id !== id)
  return await fs.promises.writeFile(filePath, JSON.stringify(podcastData))
}

const saveItem = async (podcast) => {
  const podcastData = require(filePath)
  podcastData.push(podcast)
  return await fs.promises.writeFile(filePath, JSON.stringify(podcastData))
}

const getMaxItem = () => {
  const podcastData = require(filePath)
  return podcastData.reduce((prev, current) => (prev.id > current.id) ? prev : current)
}

module.exports = {
  getItem, deleteItem, saveItem, getMaxItem, updateItem, getItemByTitleOrAuthor
}
