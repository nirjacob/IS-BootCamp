const {
  updatePodcastDetails,
  getPodcastById,
  savePodcastToDb,
  deletePodcastFromDb,
  getPodcastSearchResults,
  getBestPodcasts,
  savePodcastsToS3
} = require('../services/podcast')

const saveTopTenPodcasts = async (req, res, next) => {
  try {
    await savePodcastsToS3()
    return res.status(200).send()
  } catch (err) {
    return next(err)
  }
}
const getBestPodcast = async (req, res, next) => {
  try {
    const podcastsInfo = await getBestPodcasts()
    if (!podcastsInfo) return res.status(404).send('No podcasts to present')
    return res.status(200).send(podcastsInfo)
  } catch (err) {
    return next(err)
  }

}
const searchPodcast = async (req, res, next) => {
  const queryParams = req.params.query
  try {
    const podcastsInfo = await getPodcastSearchResults(queryParams)
    if (!podcastsInfo) return res.status(404).send('Podcasts not found')
    return res.status(200).send(podcastsInfo)
  } catch (err) {
    return next(err)
  }
}
const getPodcast = async (req, res, next) => {
  const id = parseInt(req.params.id)
  try {
    const podcastInfo = await getPodcastById(id)
    if (!podcastInfo) return res.status(404).send('Podcasts not found')
    return res.status(200).send(podcastInfo)
  } catch (err) {
    return next(err)
  }
}

const addNewPodcast = async (req, res, next) => {
  try {
    const newPodcast = req.body
    await savePodcastToDb(newPodcast)
    return res.status(200).send('Podcasts has been successfully added')
  } catch (err) {
    return next(err)
  }
}

const deletePodcast = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const podcastInfo = await getPodcastById(id)
    if (podcastInfo) {
      await deletePodcastFromDb(id)
      return res.status(200).send('Podcasts has been successfully removed')
    } else {
      return res.status(404).send('Podcasts not found')
    }
  } catch (err) {
    return next(err)
  }
}
const updatePodcast = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const updateResponse = await updatePodcastDetails(req.body, id)
    if (!updateResponse.affectedRows) return res.status(404).send('Podcasts not found!')
    return res.status(200).send('Podcasts has been successfully updated!')
  } catch (err) {
    return res.status(400).send(`Unable to update, ${err.message}`)
  }
}

module.exports = {
  searchPodcast,
  updatePodcast,
  addNewPodcast,
  deletePodcast,
  getPodcast,
  saveTopTenPodcasts,
  bestPodcast: getBestPodcast
}
