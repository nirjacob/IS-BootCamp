const mysql = require('../utils/mysql')

const getPodcastsItems = async () => {
  return await mysql.runQuery('SELECT * FROM `podcasts`.`podcasts`;')
}

const searchItem = async (queryParams) => {
  const query = `%${queryParams}%`
  const searchResult = await mysql.runQuery('SELECT * FROM `podcasts`.`podcasts` WHERE title OR author LIKE ?;', query)
  if (!searchResult.length) {
    return null
  } else {
    return searchResult
  }
}

const getItem = async (id) => {
  return await JSON.parse(JSON.stringify(await mysql.runQuery('SELECT * FROM `podcasts`.`podcasts` WHERE id=?;', [id])))[0]
}

const updateItem = async (id, podcast) => {
  return await mysql.runQuery('UPDATE `podcasts`.`podcasts` SET title=?,author=?,description=?,htmlDescription=?,webUrl=?,imageUrl=?,language=?,numberOfEpisodes=?,avgEpisodeLength=?,category=? WHERE id=?;',
    [podcast.title, podcast.author, podcast.description, podcast.htmlDescription, podcast.webUrl, podcast.imageUrl, podcast.language, podcast.numberOfEpisodes, podcast.avgEpisodeLength, podcast.category, id])
}

const deleteItem = async (id) => {
  await mysql.runQuery('DELETE FROM `podcasts`.`reviews` WHERE podcastId=?', id)
  return await mysql.runQuery('DELETE FROM `podcasts`.`podcasts` WHERE id=?', id)
}

const saveItem = async (podcast) => {
  return await mysql.runQuery('INSERT INTO `podcasts`.`podcasts` (title,author,description,htmlDescription,webUrl,imageUrl,language,numberOfEpisodes,avgEpisodeLength,category) VALUES(?,?,?,?,?,?,?,?,?,?)', [podcast.title, podcast.author, podcast.description, podcast.htmlDescription, podcast.webUrl, podcast.imageUrl, podcast.language, podcast.numberOfEpisodes, podcast.avgEpisodeLength, podcast.category])
}

module.exports = {
  getItem,
  deleteItem,
  saveItem,
  updateItem,
  searchItem,
  getPodcastsItems

}
