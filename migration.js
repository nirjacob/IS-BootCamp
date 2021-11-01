const mysql = require('./utils/mysql')

async function migrate () {
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
                           ON DELETE NO ACTION
                           ON UPDATE NO ACTION)`)
  } catch (error) {
    console.error(`Error migrating: ${error.message}`)
  }
}

async function insertDb () {
  try {
    const podcastDb = require('./data/podcasts.json')
    await Promise.all(podcastDb.map(async (podcast) => {
      return mysql.runQuery('INSERT INTO `podcasts`.`podcasts` (id,title,author,description,htmlDescription,webUrl,imageUrl,language,numberOfEpisodes,avgEpisodeLength,category) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [podcast.id, podcast.title, podcast.author, podcast.description, podcast.htmlDescription, podcast.webUrl, podcast.imageUrl, podcast.language, podcast.numberOfEpisodes, podcast.avgEpisodeLength, podcast.category])
    }))
    const reviewDb = require('./data/reviews.json')
    await Promise.all(reviewDb.map(async (review) => {
      return mysql.runQuery('INSERT INTO `podcasts`.`reviews` (rating,id,podcastId,text) VALUES(?,?,?,?)', [review.rating, review.id, review.podcastId, review.text])
    }))
  } catch (error) {
    console.error(`Error migrating: ${error.message}`)
  }
  console.log('Done!')
}
