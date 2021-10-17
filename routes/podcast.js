const express = require('express')
const router = express.Router()

const { podcastUpdateSchema, idSchema, podcastSchema } = require('../schemes/podcast')
const { urlParamsSchemeValidator, requestSchemeValidator } = require('../middleware/scemaValidator')
const { updatePodcast, addNewPodcast, deletePodcast, getPodcast } = require('../controllers/podcast')

router.get('/:id', urlParamsSchemeValidator(idSchema), getPodcast)
router.delete('/:id', urlParamsSchemeValidator(idSchema), deletePodcast)
router.put('/:id', requestSchemeValidator(podcastUpdateSchema), updatePodcast)
router.post('/new', requestSchemeValidator(podcastSchema), addNewPodcast)

module.exports = router
