const express = require('express')
const router = express.Router()

const { podcastUpdateSchema, idSchema, podcastSchema } = require('../schemes/podcast')
// const { validatePodcastID, validatePodcastUpdate, validatePodcast } = require('../middleware/schemaRequests')
const { urlParamsSchemeValidator, requestSchemeValidator } = require('../middleware/schemaRequests')
const { updatePodcast, addNewPodcast, deletePodcast, getPodcast } = require('../controllers/podcast')
router.get('/podcast/:id', [urlParamsSchemeValidator(idSchema)], getPodcast)
router.delete('/podcast/:id', [urlParamsSchemeValidator(idSchema)], deletePodcast)
router.put('/podcast/:id', [requestSchemeValidator(podcastUpdateSchema)], updatePodcast)
router.post('/podcast/new', [requestSchemeValidator(podcastSchema)], addNewPodcast)
module.exports = router