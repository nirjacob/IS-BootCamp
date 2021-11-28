import axios from "axios";

export const getPodcasts = (number) => axios.get(`/podcast/best/${number}`).then(({data}) => data);
