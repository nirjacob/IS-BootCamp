const supertest = require('supertest')
const express = require('express')
const router = require('../../../routes')
const { badFieldsMockPodcast, mockPodcast, badMockUpdate, mockNewPodcast } = require('./mockPodcast.js')
const bodyParser = require('body-parser')
const app = express()

app.use(router)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

jest.mock('../../../models/fileModel', () => ({
  getItem: (id) => id === 1132 ? mockPodcast : null,
  deleteItem: (id) => Promise.resolve(),
  updateItem: (id, updatedPodcast) => Promise.resolve(),
  saveItem: (podcast) => Promise.resolve(),
  getMaxItem: () => Promise.resolve()
}))

describe('HTTP requests component test', () => {
  describe('`POST` method Succeeds to post new podcast', () => {
    it('calls post /podcast/new, should save mockNewPodcast to database', async () => {
      await supertest(app)
        .post('/podcast/new')
        .send(JSON.parse(JSON.stringify(mockNewPodcast)))
        .expect(200, 'Podcast has been successfully added')
    })
  })
  describe('`POST` method Fails to post podcast request', () => {
    it('calls post /podcast/new, should return 500 error', async () => {
      await supertest(app)
        .post('/podcast/new')
        .send(badFieldsMockPodcast)
        .expect(500)
    })
  })
  describe('`GET` method Succeeds to get podcast request', () => {
    it('calls get /podcast/1132, should return 200 and mockPodcast data', async () => {
      await supertest(app)
        .get('/podcast/1132')
        .expect(200, mockPodcast)
    })
  })
  describe('`GET` method Fails to get podcast request', () => {
    it('calls get /podcast/string, should return 500 error', async () => {
      await supertest(app)
        .get('/podcast/string')
        .expect(500)
    })
    it('calls get /podcast/0, should return 404 podcast not found error', async () => {
      await supertest(app)
        .get('/podcast/0')
        .expect(404, 'Podcast not found')
    })
  })
  describe('`PUT` method Succeeds to update podcast', () => {
    it('calls put /podcast/1132, should mock update', async () => {
      await supertest(app)
        .put('/podcast/1132')
      // .send(JSON.parse(JSON.stringify(mockNewPodcast)))
        .expect(200)
    })
  })
  describe('`PUT` method Fails to update podcast', () => {
    it('calls put /podcast/1132, should return 500 error', async () => {
      await supertest(app)
        .put('/podcast/1132')
        .send(badMockUpdate)
        .expect(500)
    })
    it('calls put /podcast/0, should return 404 podcast not found error', async () => {
      await supertest(app)
        .put('/podcast/0')
        .expect(404, 'Unable to update, podcast does not exists!')
    })
  })
  describe('`DELETE` method Succeeds to delete podcast', () => {
    it('calls delete /podcast/1133, should delete newly created podcast to database', async () => {
      await supertest(app)
        .delete('/podcast/1132')
        .expect(200, 'Podcast has been successfully removed')
    })
  })
  describe('`DELETE` method Fails to delete podcast request', () => {
    it('calls delete /podcast/0, should return 500 error', async () => {
      await supertest(app)
        .delete('/podcast/0')
        .expect(404, 'Podcast not found')
    })
  })
})
