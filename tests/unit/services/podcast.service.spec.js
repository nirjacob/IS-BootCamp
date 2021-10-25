const app = require('../../../app')
const fileModelFunctions = require('../../../models/fileModel')
const {
  updatePodcastDetails,
  getPodcastById,
  getMaxPodcastId,
  savePodcastToDb,
  deletePodcastFromDb,
  getPodcastSearchResults,
  getBestRatedList
} = require('../../../services/podcast')
const {
  mockActualBestPodcasts,
  mockBestPodcastsReviews,
  mockBestPodcastData,
  mockRatingAvgCalculation,
  mockRatingAvgPodcast
} = require('./mockPodcast')

jest.mock('../../../models/fileModel')

describe('Unit test', () => {
  describe('Services tests', () => {
    it('should call getReviewsItems and getPodcastsItems function when using getBestRatedList service', async () => {
      const spy1 = jest.spyOn(fileModelFunctions, 'getReviewsItems').mockImplementation(() => mockBestPodcastsReviews)
      const spy2 = jest.spyOn(fileModelFunctions, 'getPodcastsItems').mockImplementation(() => mockBestPodcastData)
      const mockBestOfThree = await getBestRatedList(3)
      expect(spy1).toHaveBeenCalled()
      expect(spy2).toHaveBeenCalled()
      expect(mockBestOfThree).toStrictEqual(mockActualBestPodcasts)
    })
    it('should call getReviewsItems and getPodcastsItems function when using getBestRatedList service', async () => {
      const spy1 = jest.spyOn(fileModelFunctions, 'getReviewsItems').mockImplementation(() => mockRatingAvgCalculation)
      const spy2 = jest.spyOn(fileModelFunctions, 'getPodcastsItems').mockImplementation(() => mockBestPodcastData)
      const mockAvgCalculation = await getBestRatedList(1)
      expect(spy1).toHaveBeenCalled()
      expect(spy2).toHaveBeenCalled()
      expect(mockAvgCalculation).toStrictEqual(mockRatingAvgPodcast)
    })

    it('should call getItemByTitleOrAuthor function when using getPodcastSearchResults service', async () => {
      const spy = jest.spyOn(fileModelFunctions, 'getItemByTitleOrAuthor').mockImplementation(() => Promise.resolve())
      await getPodcastSearchResults(1)
      expect(spy).toHaveBeenCalled()
    })
    it('should call getItem function when using getPodcastByID service', async () => {
      const spy = jest.spyOn(fileModelFunctions, 'getItem').mockImplementation(() => Promise.resolve())
      await getPodcastById(1)
      expect(spy).toHaveBeenCalled()
    })
    it('should call deleteItem function when using deletePodcastFromDb service', async () => {
      const spy = jest.spyOn(fileModelFunctions, 'deleteItem').mockImplementation(() => Promise.resolve())
      await deletePodcastFromDb(1)
      expect(spy).toHaveBeenCalled()
    })

    it('should call saveItem function when using savePodcastToDb service', async () => {
      const spy = jest.spyOn(fileModelFunctions, 'saveItem').mockImplementation(() => Promise.resolve())
      await savePodcastToDb(1)
      expect(spy).toHaveBeenCalled()
    })

    it('should call updateItem function when using updatePodcastDetails service', async () => {
      const spy = jest.spyOn(fileModelFunctions, 'updateItem').mockImplementation(() => Promise.resolve())
      await updatePodcastDetails(1)
      expect(spy).toHaveBeenCalled()
    })
    it('should call getMaxItem function when using getMaxPodcastId service', async () => {
      const spy = jest.spyOn(fileModelFunctions, 'getMaxItem').mockImplementation(() => Promise.resolve())
      await getMaxPodcastId(1)
      expect(spy).toHaveBeenCalled()
    })
  })
})
