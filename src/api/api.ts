import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
  const token = match ? decodeURIComponent(match[1]) : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
