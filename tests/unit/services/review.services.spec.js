// const app = require('../../../app')
const reviewDbModel = require('../../../models/reviewDbModel')
const { getReviewById, saveReviewToDb } = require('../../../services/review')
const { mockReview } = require('../../../tests/component/reviews/mockPodcast')

jest.mock('../../../models/podcastDbModel')
jest.mock('../../../models/reviewDbModel')

describe('Unit test', () => {
  describe('Services tests', () => {
    it('should call saveItem function when using saveReviewToDb service', async () => {
      const spy1 = jest.spyOn(reviewDbModel, 'saveItem').mockImplementation(() => Promise.resolve())
      await saveReviewToDb(mockReview)
      expect(spy1).toHaveBeenCalled()
    })
    it('should call getItemReview function when using getReviewById service', async () => {
      const spy = jest.spyOn(reviewDbModel, 'getItem').mockImplementation(() => Promise.resolve())
      await getReviewById(1)
      expect(spy).toHaveBeenCalled()
    })
  })
})
