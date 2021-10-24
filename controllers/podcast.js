const {
  updatePodcastDetails,
  getPodcastById,
  getMaxPodcastId,
  savePodcastToDb,
  deletePodcastFromDb,
  getPodcastByTitleOrAuthor
} = require('../services/podcast')

const searchPodcast = async (req, res, next) => {
  const queryParams = req.params.query
  try {
    const podcastInfo = await getPodcastByTitleOrAuthor(queryParams)
    if (!podcastInfo) return res.status(404).send('Podcast not found')
    return res.status(200).send(podcastInfo)
  } catch
  (err) {
    next(err)
  }
}
const getPodcast = async (req, res, next) => {
  const id = parseInt(req.params.id)
  try {
    const podcastInfo = getPodcastById(id)
    if (!podcastInfo) return res.status(404).send('Podcast not found')
    return res.status(200).send(podcastInfo)
  } catch (err) {
    next(err)
  }
}

const addNewPodcast = async (req, res, next) => {
  try {
    const newestPodcast = getMaxPodcastId()
    const id = newestPodcast.id + 1
    const newPodcast = { ...req.body, ...{ id } }
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
    const podcastInfo = getPodcastById(id)
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
  if (getPodcastById(id)) {
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
  getPodcast
}
