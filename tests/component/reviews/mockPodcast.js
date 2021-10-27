const mockReviews = [
  {
    rating: 7,
    text: 'Nice',
    podcastId: 1132,
    id: 1
  },
  {
    rating: 9,
    text: 'Interesting and witty',
    podcastId: 1132,
    id: 2
  },
  {
    rating: 9,
    text: 'Interesting and witty',
    podcastId: 1132,
    id: 3
  }]

const mockReview = {
  rating: 9,
  text: 'Interesting and witty',
  podcastId: 1132
}

const mockIllegalFieldsReview = {
  IllegalField: 0,
  text: 'Interesting and witty',
  podcastId: 1132,
  id: 3
}
const mockExtraFieldsReview = {
  extraField: 0,
  rating: 9,
  text: 'Interesting and witty',
  podcastId: 1132,
  id: 3
}
const mockMissingFieldsReview = {
  rating: 9,
  podcastId: 1132,
  id: 3
}
const mockNoPodcastIdReview = {
  rating: 9,
  text: 'Interesting and witty',
  podcastId: 0
}

module.exports = {
  mockMissingFieldsReview,
  mockReview,
  mockReviews,
  mockIllegalFieldsReview,
  mockExtraFieldsReview,
  mockNoPodcastIdReview
}
