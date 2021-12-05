import axios from "axios";

export const getPodcasts = (number) => axios.get(`/podcast/best/${number}`).then(({data}) => data);
export const searchPodcasts = (string) => axios.get(`/podcast/search/${string}`).then(({data}) => data);
export const getPodcast = (number) => axios.get(`/podcast/${number}`).then(({data}) => data);
export const getReviews = (number) => axios.get(`/review/get-by-podcast/${number}`).then(({data}) => data);
