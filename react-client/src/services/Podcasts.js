import axios from 'axios'

export const getBestPodcasts = () => axios.get(`/podcast/best`).then(({ data }) => data)
export const searchPodcasts = (string) => axios.get(`/podcast/search/item/${string}`).then(({ data }) => data)
export const getPodcast = (number) => axios.get(`/podcast/${number}`).then(({ data }) => data)
export const getReviews = (number) => axios.get(`/review/get-by-podcast/${number}`).then(({ data }) => data)
export const updatePodcast = (number, podcast) => axios.put(`/podcast/${number}`, podcast).then(({ data }) => data)
export const deletePodcast = (number) => axios.delete(`/podcast/${number}`).then(({ data }) => data)
export const addNewReview = (review) => axios.post(`/review/`, review).then(({ data }) => data)
export const addNewPodcast = (podcast) => axios.post(`/podcast/new`, podcast).then(({ data }) => data)
export const submitLogin = (loginDetails) => axios.post(`/login`, loginDetails).then(({ data }) => data)
