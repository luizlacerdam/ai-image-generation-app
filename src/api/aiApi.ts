import axios from "axios";
const { VITE_AI_API_URL, VITE_API_KEY } = import.meta.env;

const aiApi = axios.create({
  baseURL: VITE_AI_API_URL,
  params: {
    model: "turbo",
  },
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${VITE_API_KEY}`,
  },
});

export default aiApi;
