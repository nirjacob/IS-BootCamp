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
let podcastData = require(FILE_PATH)

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
  try {
    const { error } = validPodcastFormat(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const newestPodcast = podcastData.reduce(function (prev, current) {
      return (prev.id > current.id) ? prev : current
    })
    const maxId = newestPodcast.id
    req.body = { ...req.body, ...{ id: (maxId + 1) } }
    await savePodcast(req.body)
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
    if (podcastInfo !== undefined) { // none empty array
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
      numberOfEpisodes: joi.number().required(),
      avgEpisodeLength: joi.number().required(),
      author: joi.string().required(),
      category: joi.string().required()
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
  const podcastDataPreUpdate = podcastData
  try { // added a try-catch block to each override of data, that restores the data to previous state in case of crash.
    return podcastData.find(getPodcast => getPodcast.id == id)
  } catch (err) {
    podcastData = podcastDataPreUpdate
    console.error(`Server Error: ${err.message}`)
  }
}

async function deletePodcast (id) {
  const podcastDataPreUpdate = podcastData
  try { // added a try-catch block to each override of data, that restores the data to previous state in case of crash.
    podcastData = podcastData.filter(getPodcast => getPodcast.id != id)
  } catch (err) {
    podcastData = podcastDataPreUpdate
    console.error(`Server Error: ${err.message}`)
  }
  await fs.writeFile(FILE_PATH, JSON.stringify(podcastData), function (err) {
    if (err) return console.error(err)
  })
}

async function savePodcast (podcast) {
  const { error } = validPodcastFormat(podcast)
  if (error) throw error
  podcastData.push(podcast)
  await fs.writeFile(FILE_PATH, JSON.stringify(podcastData), function (err) {
    if (err) return console.error(err)
  })
}

async function updatePodcasts (updateDetails, id) {
  let podcastToUpdate = podcastData.find(getPodcast => getPodcast.id == id)
  podcastToUpdate = { ...podcastToUpdate, ...updateDetails } // assign's new properties and updates existing one's
  const podcastDataPreUpdate = podcastData
  podcastData = podcastData.filter(getPodcast => getPodcast.id != id)
  try {
    await savePodcast(podcastToUpdate)
  } catch (err) { // if the update include illegal fields, restore previous podcast list.
    podcastData = podcastDataPreUpdate
    console.error(err.message)
    throw err
  }
}
