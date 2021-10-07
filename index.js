const express = require('express')
const app = express()
const port = process.env.port || 3000

// File System
const fs = require('fs')

// Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Data layer
const FILE_PATH = './DataLayer/podcasts.json'

// Validator
const joi = require('joi')

app.get('/podcast/:id', (req, res) => {
  const queryParams = req.params
  const { error } = ValidateInput(queryParams)
  if (error) return res.status(400).send(error.details[0].message)
  try {
    const podcastInfo = getPodcastById(queryParams.id)
    if (podcastInfo === undefined) return res.status(404).send('Podcast not found')
    return res.status(200).send(podcastInfo)
  } catch (err) {
    console.error(`Error from getting podcast: ${err.stack}`)
    return res.status(500).send(`Server Error: ${err.message}`)
  }
})

app.post('/podcast/new', async (req, res) => {
  const podcastData = require(FILE_PATH)
  try {
    const { error } = validPodcastFormat(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const newestPodcast = podcastData.reduce(function (prev, current) {
      return (prev.id > current.id) ? prev : current
    })
    const maxId = newestPodcast.id
    const newPodcast = { ...req.body, ...{ id: (maxId + 1) } }
    await savePodcast(newPodcast)
    return res.status(200).send('Podcast has been successfully added')
  } catch
  (err) {
    console.error(`Error from posting podcast: ${err.stack}`)
    return res.status(500).send(`Adding podcast error: ${err.message}`)
  }
}
)

app.delete('/podcast/:id', async (req, res) => {
  const queryParams = req.params
  const { error } = ValidateInput(queryParams)
  if (error) return res.status(400).send(error.details[0].message)
  try {
    const podcastInfo = getPodcastById(queryParams.id)
    if (podcastInfo !== undefined) {
      await deletePodcast(queryParams.id)
      return res.status(200).send('Podcast has been successfully removed')
    } else {
      return res.status(404).send('Podcast not found')
    }
  } catch (err) {
    console.error(`Error from deleting podcast: ${err.stack}`)
    return res.status(500).send(`Server Error: ${err.message}`)
  }
})

app.put('/podcast/:id', async (req, res) => {
  if (getPodcastById(req.params.id) !== undefined) {
    try {
      await updatePodcasts(req.body, req.params.id)
      return res.status(200).send('Podcast has been successfully updated!')
    } catch (err) {
      return res.status(400).send(`Unable to update, podcast contain illegal field: ${err.message}`)
    }
  } else {
    return res.status(409).send('Unable to update, podcast does not exists!')
  }
})

app.listen(port)

function validPodcastFormat (queryParams) {
  const schema = joi.object().keys(
    {
      id: joi.number().integer(),
      title: joi.string().required(),
      description: joi.string().required(),
      htmlDescription: joi.string().required(),
      webUrl: joi.string().required(),
      imageUrl: joi.string().required(),
      language: joi.string().required(),
      numberOfEpisodes: joi.number().integer().required(),
      avgEpisodeLength: joi.number().integer().required(),
      author: joi.string().required(),
      category: joi.string().required()
    })
  return schema.validate(queryParams)
}

function validPodcastUpdateFormat (queryParams) {
  const schema = joi.object().keys(
    {
      id: joi.number().integer(),
      title: joi.string(),
      description: joi.string(),
      htmlDescription: joi.string(),
      webUrl: joi.string(),
      imageUrl: joi.string(),
      language: joi.string(),
      numberOfEpisodes: joi.number().integer(),
      avgEpisodeLength: joi.number().integer(),
      author: joi.string(),
      category: joi.string()
    })
  return schema.validate(queryParams)
}

function ValidateInput (queryParams) {
  const schema = joi.object(
    {
      id: joi.number().integer()
    })
  return schema.validate(queryParams)
}

function getPodcastById (id) {
  const podcastData = require(FILE_PATH)
  id = parseInt(id)
  return podcastData.find(getPodcast => getPodcast.id === id)
}

async function deletePodcast (id) {
  let podcastData = require(FILE_PATH)
  id = parseInt(id)
  podcastData = podcastData.filter(getPodcast => getPodcast.id !== id)
  return await fs.promises.writeFile(FILE_PATH, JSON.stringify(podcastData))
}

async function savePodcast (podcast) {
  const podcastData = require(FILE_PATH)
  const { error } = validPodcastFormat(podcast)
  if (error) throw error
  podcastData.push(podcast)
  return await fs.promises.writeFile(FILE_PATH, JSON.stringify(podcastData))
}

async function updatePodcasts (updateDetails, id) {
  let podcastData = require(FILE_PATH)
  const { error } = validPodcastUpdateFormat(updateDetails)
  if (error) throw error
  id = parseInt(id)
  let podcastToUpdate = podcastData.find(getPodcast => getPodcast.id === id)
  podcastToUpdate = { ...podcastToUpdate, ...updateDetails } // assign's new properties and updates existing one's
  podcastData = podcastData.filter(getPodcast => getPodcast.id !== id)
  podcastData.push(podcastToUpdate)

  return await fs.promises.writeFile(FILE_PATH, JSON.stringify(podcastData))
}
