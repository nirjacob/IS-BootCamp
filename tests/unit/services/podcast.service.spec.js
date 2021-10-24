const app = require('../../../app')
const fileModelFunctions = require('../../../models/fileModel')
const {
  updatePodcastDetails,
  getPodcastById,
  getMaxPodcastId,
  savePodcastToDb,
  deletePodcastFromDb
} = require('../../../services/podcast')

jest.mock('../../../models/fileModel')

describe('Unit test', () => {
  describe('Services tests', () => {
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
