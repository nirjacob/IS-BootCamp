const supertest = require('supertest')
const {
  mockIllegalFieldsPodcast,
  mockPodcast,
  mockNewPodcast,
  mockExtraFieldsPodcast,
  mockWrongTypesFields
} = require('./mockPodcast.js')

const app = require('../../../app')

jest.mock('../../../models/fileModel', () => require('./mockFileModel.js'))

describe('Podcast component test', () => {
  describe('Search podcast tests', () => {
    it('should return 200 when podcast found in search', async () => {
      await supertest(app)
        .get('/podcast/search/ben')
        .expect(200)
    })
    it('should return 404 when podcast not found in search', async () => {
      await supertest(app)
        .get('/podcast/search/xxxxxxxx')
        .expect(404)
    })
  })
  describe('Add podcast tests', () => {
    it('should return 200 when podcast is added with all valid fields', async () => {
      await supertest(app)
        .post('/podcast/new')
        .send(mockNewPodcast)
        .expect(200)
    })
    it('should return 400 when trying to add podcast with illegal fields', async () => {
      await supertest(app)
        .post('/podcast/new')
        .send(mockIllegalFieldsPodcast)
        .expect(400)
    })
    it('should return 400 when trying to add podcast extra fields', async () => {
      await supertest(app)
        .post('/podcast/new')
        .send(mockExtraFieldsPodcast)
        .expect(400)
    })
  })
  describe('Get podcast tests', () => {
    it('should return 200 when podcast is fetched with existing ID', async () => {
      await supertest(app)
        .get('/podcast/1132')
        .expect(200, mockPodcast)
    })
    it('should return 400 when podcast request is not a number', async () => {
      await supertest(app)
        .get('/podcast/string')
        .expect(400)
    })
    it('should return 404 when podcast is not in DB', async () => {
      await supertest(app)
        .get('/podcast/0')
        .expect(404)
    })
  })
  describe('Update podcast tests', () => {
    it('should return 200 when podcast is updated with valid fields', async () => {
      await supertest(app)
        .put('/podcast/1132')
        .send(mockNewPodcast)
        .expect(200)
    })
    it('should return 400 when trying to update podcast with illegal fields', async () => {
      await supertest(app)
        .put('/podcast/1132')
        .send(mockIllegalFieldsPodcast)
        .expect(400)
    })
    it('should return 400 when trying to update podcast with non existing fields', async () => {
      await supertest(app)
        .put('/podcast/1132')
        .send(mockExtraFieldsPodcast)
        .expect(400)
    })
    it('should return 400 when trying to update podcast with wrong types of fields', async () => {
      await supertest(app)
        .put('/podcast/1132')
        .send(mockWrongTypesFields)
        .expect(400)
    })
    it('should return 404 when trying to update podcast that does not exist', async () => {
      await supertest(app)
        .put('/podcast/0')
        .expect(404)
    })
  })
  describe('Delete podcast tests', () => {
    it('should return 200 when trying to delete existing podcast', async () => {
      await supertest(app)
        .delete('/podcast/1132')
        .expect(200)
    })
    it('should return 404 when trying to delete non existing podcast', async () => {
      await supertest(app)
        .delete('/podcast/0')
        .expect(404)
    })
  })
})
