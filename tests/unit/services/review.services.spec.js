const app = require('../../../app')
const reviewFileModel = require('../../../models/reviewFileModel')
const { getReviewById, getMaxReviewId, saveReviewToDb } = require('../../../services/review')
const { mockReview, mockReviews } = require('../../../tests/component/reviews/mockPodcast')

jest.mock('../../../models/podcastFileModel')
jest.mock('../../../models/reviewFileModel')

describe('Unit test', () => {
  describe('Services tests', () => {
    it('should call saveItem function when using saveReviewToDb service', async () => {
      const spy1 = jest.spyOn(reviewFileModel, 'saveItem').mockImplementation(() => Promise.resolve())
      const spy2 = jest.spyOn(reviewFileModel, 'getReviewsItems').mockImplementation(() => mockReviews)
      await saveReviewToDb(mockReview)
      expect(spy1).toHaveBeenCalled()
      expect(spy2).toHaveBeenCalled()
    })
    it('should return the max review ID from the given mock reviews and call the relevant function', async () => {
      const spy = jest.spyOn(reviewFileModel, 'getReviewsItems').mockImplementation(() => mockReviews)
      const maxId = await getMaxReviewId()
      expect(spy).toHaveBeenCalled()
      expect(maxId.id + 1).toBe(4)
    })
    it('should call getItemReview function when using getReviewById service', async () => {
      const spy = jest.spyOn(reviewFileModel, 'getItem').mockImplementation(() => Promise.resolve())
      await getReviewById(1)
      expect(spy).toHaveBeenCalled()
    })
  })
})
