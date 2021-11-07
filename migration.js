const mysql = require('./utils/mysql')
const reviewData = require('./data/reviews.json')

async function createTables () {
  try {
    await mysql.runQuery(`CREATE TABLE \`podcasts\`.\`users\` (
                          \`id\` INT(10) NOT NULL AUTO_INCREMENT,
                          \`username\` VARCHAR(255) NOT NULL,
                          \`password\` VARCHAR(8) NOT NULL,
                           PRIMARY KEY (\`id\`));`)

    await mysql.runQuery(`CREATE TABLE \`podcasts\`.\`podcasts\` (
                          \`id\` INT(10) NOT NULL AUTO_INCREMENT,
                          \`title\` TEXT NOT NULL,
                          \`author\` VARCHAR(255) NOT NULL,
                          \`description\` TEXT NOT NULL,
                          \`htmlDescription\` TEXT NULL,
                          \`webUrl\` TEXT NOT NULL,
                          \`imageUrl\` TEXT NOT NULL,
                          \`language\` VARCHAR(45) NOT NULL,
                          \`numberOfEpisodes\` INT(10) NOT NULL,
                          \`avgEpisodeLength\` INT(10) NOT NULL,
                          \`category\` VARCHAR(45) NOT NULL,
                          PRIMARY KEY (\`id\`));`)

    await mysql.runQuery(`CREATE TABLE \`podcasts\`.\`reviews\` (
                          \`rating\` FLOAT(1) NOT NULL,
                          \`id\` INT(10) NOT NULL AUTO_INCREMENT,
                          \`podcastId\` INT(10) NOT NULL,
                          \`text\` TEXT NOT NULL,
                          PRIMARY KEY (\`id\`),
                          INDEX \`podcast_fk_idx\` (\`podcastId\` ASC),
                          CONSTRAINT \`podcast_fk\`
                           FOREIGN KEY (\`podcastId\`)
                           REFERENCES \`podcasts\`.\`podcasts\` (\`id\`)
                           ON DELETE CASCADE
                           ON UPDATE NO ACTION)`)
  } catch (error) {
    console.error(`Error migrating: ${error.message}`)
  }
}

const podcastData = () => {
  try {
    const podcastDb = require('./data/podcasts.json')
    Promise.all(podcastDb.map(async (podcast) => {
      return mysql.runQuery('INSERT INTO `podcasts`.`podcasts` (id,title,author,description,htmlDescription,webUrl,imageUrl,language,numberOfEpisodes,avgEpisodeLength,category) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [podcast.id, podcast.title, podcast.author, podcast.description, podcast.htmlDescription, podcast.webUrl, podcast.imageUrl, podcast.language, podcast.numberOfEpisodes, podcast.avgEpisodeLength, podcast.category])
    }))
    const reviewData = require('./data/reviews.json')
    Promise.all(reviewData.map(async (review) => {
      return mysql.runQuery('INSERT INTO `podcasts`.`reviews` (rating,id,podcastId,text) VALUES(?,?,?,?)', [review.rating, review.id, review.podcastId, review.text])
    }))
    const usersData = require('./data/users.json')
    Promise.all(usersData.map(async (user) => {
      return mysql.runQuery('INSERT INTO `podcasts`.`users` (username,password) VALUES(?,?)', [user.username, user.password])
    }))
  } catch (error) {
    console.error(`Error migrating: ${error.message}`)
  }
  console.log('Done!')
}
