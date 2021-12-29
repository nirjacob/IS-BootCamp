const mysql = require('../utils/mysql')
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3')

const config = require('config')

const saveItemToS3 = async (item) => {
  const s3Client = new S3Client({})
  const params = {
    ACL: 'public-read',
    Bucket: config.s3.bucket,
    Key: config.s3.bucketPath,
    Body: JSON.stringify(item)
  }
  return await s3Client.send(new PutObjectCommand(params))
}

const getPodcastsItems = async () => {
  return await mysql.runQuery('SELECT * FROM `podcasts`.`podcasts`;')
}

const searchItem = async (queryParams) => {
  const query = `%${queryParams}%`
  const searchResult = await mysql.runQuery('SELECT * FROM `podcasts`.`podcasts` p WHERE p.title LIKE ? OR p.author LIKE ?;', [query, query])
  if (!searchResult.length) {
    return null
  } else {
    return searchResult
  }
}

const getItem = async (id) => {
  return (await mysql.runQuery('SELECT * FROM `podcasts`.`podcasts` WHERE id=?;', [id]))[0]
}

const updateItem = async (id, podcast) => {
  return await mysql.runQuery('UPDATE `podcasts`.`podcasts` SET title=COALESCE(?,title),author=COALESCE(?,author),description=COALESCE(?,description),htmlDescription=COALESCE(?,htmlDescription),webUrl=COALESCE(?,webUrl),imageUrl=COALESCE(?,imageUrl),language=COALESCE(?,language),numberOfEpisodes=COALESCE(?,numberOfEpisodes),avgEpisodeLength=COALESCE(?,avgEpisodeLength),category=COALESCE(?,category) WHERE id=?;',
    [podcast.title, podcast.author, podcast.description, podcast.htmlDescription, podcast.webUrl, podcast.imageUrl, podcast.language, podcast.numberOfEpisodes, podcast.avgEpisodeLength, podcast.category, id])
}

const deleteItem = async (id) => {
  return await mysql.runQuery('DELETE FROM `podcasts`.`podcasts` WHERE id=?', id)
}

const saveItem = async (podcast) => {
  return await mysql.runQuery('INSERT INTO `podcasts`.`podcasts` (title,author,description,htmlDescription,webUrl,imageUrl,language,numberOfEpisodes,avgEpisodeLength,category) VALUES(?,?,?,?,?,?,?,?,?,?)', [podcast.title, podcast.author, podcast.description, podcast.htmlDescription, podcast.webUrl, podcast.imageUrl, podcast.language, podcast.numberOfEpisodes, podcast.avgEpisodeLength, podcast.category])
}

module.exports = {
  getItem,
  saveItemToS3,
  deleteItem,
  saveItem,
  updateItem,
  searchItem,
  getPodcastsItems

}
