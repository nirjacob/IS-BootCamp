const express = require('express')
const router = express.Router()

const {
  podcastUpdateSchema,
  idSchema,
  podcastSchema,
  podcastSearchSchema,
  podcastBestSchema
} = require('../schemes/podcast')
const { urlParamsSchemeValidator, requestSchemeValidator } = require('../middleware/scemaValidator')
const {
  updatePodcast,
  addNewPodcast,
  deletePodcast,
  getPodcast,
  searchPodcast,
  bestPodcast
} = require('../controllers/podcast')

router.get('/best/:number', urlParamsSchemeValidator(podcastBestSchema), bestPodcast)
router.get('/search/item/:query', urlParamsSchemeValidator(podcastSearchSchema), searchPodcast)
router.get('/:id', urlParamsSchemeValidator(idSchema), getPodcast)
router.delete('/:id', urlParamsSchemeValidator(idSchema), deletePodcast)
router.put('/:id', requestSchemeValidator(podcastUpdateSchema), updatePodcast)
router.post('/new', requestSchemeValidator(podcastSchema), addNewPodcast)

module.exports = router
