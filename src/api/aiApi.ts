import axios from "axios";
const { VITE_AI_API_URL } = import.meta.env;
const baseURL = `${VITE_AI_API_URL}`;

const aiApi = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

export default aiApi;
