const joi = require('joi')

const podcastBestSchema = joi.object(
  {
    number: joi.number().integer().required()
  })
const podcastSearchSchema = joi.object(
  {
    query: joi.string().required()
  })

const podcastSchema = joi.object().keys(
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

const podcastUpdateSchema = joi.object().keys(
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

const idSchema = joi.object(
  {
    id: joi.number().integer()
  })

module.exports = {
  podcastSearchSchema, podcastUpdateSchema, idSchema, podcastSchema, podcastBestSchema
}
