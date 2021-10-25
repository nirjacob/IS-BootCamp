const app = require('../../../app')
const supertest = require('supertest')
const {
  mockReview,
  mockReviews,
  mockIllegalFieldsReview,
  mockExtraFieldsReview,
  mockMissingFieldsReview,
  mockNoPodcastIdReview
} = require('./mockPodcast.js')

jest.mock('../../../models/reviewFileModel', () => require('./mockFileModel'))
jest.mock('../../../models/podcastFileModel', () => require('../podcasts/mockFileModel.js'))

describe('Review component test', () => {
  describe('Add new review tests', () => {
    it('should return 200 when review is added with all valid fields', async () => {
      await supertest(app)
        .post('/review')
        .send(mockReview)
        .expect(200)
    })
    it('should return 400 when trying to add review with illegal fields', async () => {
      await supertest(app)
        .post('/review')
        .send(mockIllegalFieldsReview)
        .expect(400)
    })
    it('should return 400 when trying to add review with extra fields', async () => {
      await supertest(app)
        .post('/review')
        .send(mockExtraFieldsReview)
        .expect(400)
    })
    it('should return 400 when trying to add review with missing fields', async () => {
      await supertest(app)
        .post('/review')
        .send(mockMissingFieldsReview)
        .expect(400)
    })
    it('should return 404 when trying to add review for non existed podcast', async () => {
      await supertest(app)
        .post('/review')
        .send(mockNoPodcastIdReview)
        .expect(404)
    })
  })
  describe('Get podcast review tests', () => {
    it('should return 200 and reviews when review is fetched with existing ID ', async () => {
      await supertest(app)
        .get('/review/get-by-podcast/1132')
        .expect(200, mockReviews)
    })
    it('should return 400 when review request is not a number', async () => {
      await supertest(app)
        .get('/review/get-by-podcast/xxxxxxxxx')
        .expect(400)
    })
    it('should return 404 when review is not in DB', async () => {
      await supertest(app)
        .get('/review/get-by-podcast/999999999')
        .expect(404)
    })
  })
})
