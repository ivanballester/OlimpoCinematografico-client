import axios from "axios";

const tmdbService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

tmdbService.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: import.meta.env.VITE_API_KEY,
  };
  return config;
});

export default tmdbService;
