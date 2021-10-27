const app = require('../../../app')
const podcastFileModelFunctions = require('../../../models/podcastFileModel')
const reviewFileModelFunctions = require('../../../models/reviewFileModel')
const {
  updatePodcastDetails,
  getPodcastById,
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

jest.mock('../../../models/podcastFileModel')
jest.mock('../../../models/reviewFileModel')

describe('Unit test', () => {
  describe('Services tests', () => {
    it('should return the best of 3 out of 5 podcasts and checks that the correct functions has been called', async () => {
      const spy1 = jest.spyOn(reviewFileModelFunctions, 'getReviewsItems').mockImplementation(() => mockBestPodcastsReviews)
      const spy2 = jest.spyOn(podcastFileModelFunctions, 'getPodcastsItems').mockImplementation(() => mockBestPodcastData)
      const mockBestOfThree = await getBestRatedList(3)
      expect(spy1).toHaveBeenCalled()
      expect(spy2).toHaveBeenCalled()
      expect(mockBestOfThree).toStrictEqual(mockActualBestPodcasts)
    })
    it('should return the best podcast by checking the avg calculation and that the correct functions has been called', async () => {
      const spy1 = jest.spyOn(reviewFileModelFunctions, 'getReviewsItems').mockImplementation(() => mockRatingAvgCalculation)
      const spy2 = jest.spyOn(podcastFileModelFunctions, 'getPodcastsItems').mockImplementation(() => mockBestPodcastData)
      const mockAvgCalculation = await getBestRatedList(1)
      expect(spy1).toHaveBeenCalled()
      expect(spy2).toHaveBeenCalled()
      expect(mockAvgCalculation).toStrictEqual(mockRatingAvgPodcast)
    })

    it('should call searchItem function when using getPodcastSearchResults service', async () => {
      const spy = jest.spyOn(podcastFileModelFunctions, 'searchItem').mockImplementation(() => Promise.resolve())
      await getPodcastSearchResults(1)
      expect(spy).toHaveBeenCalled()
    })
    it('should call getItem function when using getPodcastByID service', async () => {
      const spy = jest.spyOn(podcastFileModelFunctions, 'getItem').mockImplementation(() => Promise.resolve())
      await getPodcastById(1)
      expect(spy).toHaveBeenCalled()
    })
    it('should call deleteItem function when using deletePodcastFromDb service', async () => {
      const spy = jest.spyOn(podcastFileModelFunctions, 'deleteItem').mockImplementation(() => Promise.resolve())
      await deletePodcastFromDb(1)
      expect(spy).toHaveBeenCalled()
    })

    it('should call saveItem function when using savePodcastToDb service', async () => {
      const spy = jest.spyOn(podcastFileModelFunctions, 'saveItem').mockImplementation(() => Promise.resolve())
      await savePodcastToDb(1)
      expect(spy).toHaveBeenCalled()
    })

    it('should call updateItem function when using updatePodcastDetails service', async () => {
      const spy = jest.spyOn(podcastFileModelFunctions, 'updateItem').mockImplementation(() => Promise.resolve())
      await updatePodcastDetails(1)
      expect(spy).toHaveBeenCalled()
    })
  })
})
