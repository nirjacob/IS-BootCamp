const mysql = require('../utils/mysql')

const saveItem = async (review) => {
  return await mysql.runQuery('INSERT INTO `podcasts`.`reviews` (rating,text,podcastId) VALUES(?,?,?)',
    [review.rating, review.text, review.podcastId])
}

const getItem = async (id) => {
  return await mysql.runQuery('SELECT * FROM `podcasts`.`reviews` WHERE podcastId=?;', [id])
}

const getReviewsItems = async () => {
  return await mysql.runQuery('SELECT * FROM `podcasts`.`reviews`;')
}

module.exports = { saveItem, getItem, getReviewsItems }
