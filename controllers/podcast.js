const {
  updatePodcastDetails,
  getPodcastById,
  savePodcastToDb,
  deletePodcastFromDb,
  getPodcastSearchResults,
  getBestPodcasts
} = require('../services/podcast')

const getBestPodcast = async (req, res, next) => {
  const numberOfPodcasts = parseInt(req.params.number)
  try {
    const podcastsInfo = await getBestPodcasts(numberOfPodcasts)
    if (!podcastsInfo) return res.status(404).send('No podcasts to present')
    return res.status(200).send(podcastsInfo)
  } catch
  (err) {
    return next(err)
  }
}
const searchPodcast = async (req, res, next) => {
  const queryParams = req.params.query
  try {
    const podcastsInfo = await getPodcastSearchResults(queryParams)
    if (!podcastsInfo) return res.status(404).send('Podcast not found')
    return res.status(200).send(podcastsInfo)
  } catch
  (err) {
    return next(err)
  }
}
const getPodcast = async (req, res, next) => {
  const id = parseInt(req.params.id)
  try {
    const podcastInfo = await getPodcastById(id)
    if (!podcastInfo) return res.status(404).send('Podcast not found')
    return res.status(200).send(podcastInfo)
  } catch (err) {
    return next(err)
  }
}

const addNewPodcast = async (req, res, next) => {
  try {
    const newPodcast = req.body
    await savePodcastToDb(newPodcast)
    return res.status(200).send('Podcast has been successfully added')
  } catch
  (err) {
    return next(err)
  }
}

const deletePodcast = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const podcastInfo = await getPodcastById(id)
    if (podcastInfo) {
      await deletePodcastFromDb(id)
      return res.status(200).send('Podcast has been successfully removed')
    } else {
      return res.status(404).send('Podcast not found')
    }
  } catch (err) {
    return next(err)
  }
}
const updatePodcast = async (req, res) => {
  const id = parseInt(req.params.id)
  if (await getPodcastById(id)) {
    try {
      const id = parseInt(req.params.id)
      await updatePodcastDetails(req.body, id)
      return res.status(200).send('Podcast has been successfully updated!')
    } catch (err) {
      return res.status(400).send(`Unable to update, podcast contain illegal field: ${err.message}`)
    }
  } else {
    return res.status(404).send('Unable to update, podcast does not exists!')
  }
}

module.exports = {
  searchPodcast,
  updatePodcast,
  addNewPodcast,
  deletePodcast,
  getPodcast,
  bestPodcast: getBestPodcast
}
