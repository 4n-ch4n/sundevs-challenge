import axios from 'axios';

const videosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export { videosApi };
