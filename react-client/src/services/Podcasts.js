import axios from 'axios'

export const getBestPodcasts = () => axios.get(`/api/podcast/best`).then(({ data }) => data)
export const searchPodcasts = (string) => {
  const filteredString = string.replaceAll('/', '')
  return axios.get(`/api/podcast/search/item/${filteredString}`).then(({ data }) => data)
}
export const getPodcast = (number) => axios.get(`/api/podcast/${number}`).then(({ data }) => data)
export const getReviews = (number) => axios.get(`/api/review/get-by-podcast/${number}`).then(({ data }) => data)
export const updatePodcast = (number, podcast) => axios.put(`/api/podcast/${number}`, podcast).then(({ data }) => data)
export const deletePodcast = (number) => axios.delete(`/api/podcast/${number}`).then(({ data }) => data)
export const addNewReview = (review) => axios.post(`/api/review`, review).then(({ data }) => data)
export const addNewPodcast = (podcast) => axios.post(`/api/podcast/new`, podcast).then(({ data }) => data)
export const submitLogin = (loginDetails) => axios.post(`/api/login`, loginDetails).then(({ data }) => data)
