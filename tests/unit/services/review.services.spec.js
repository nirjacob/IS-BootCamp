const app = require('../../../app')
const reviewFileModel = require('../../../models/reviewFileModel')
const { getReviewById, saveReviewToDb } = require('../../../services/review')
const { mockReview } = require('../../../tests/component/reviews/mockPodcast')

jest.mock('../../../models/podcastFileModel')
jest.mock('../../../models/reviewFileModel')

describe('Unit test', () => {
  describe('Services tests', () => {
    it('should call saveItem function when using saveReviewToDb service', async () => {
      const spy1 = jest.spyOn(reviewFileModel, 'saveItem').mockImplementation(() => Promise.resolve())
      await saveReviewToDb(mockReview)
      expect(spy1).toHaveBeenCalled()
    })
    it('should call getItemReview function when using getReviewById service', async () => {
      const spy = jest.spyOn(reviewFileModel, 'getItem').mockImplementation(() => Promise.resolve())
      await getReviewById(1)
      expect(spy).toHaveBeenCalled()
    })
  })
})
