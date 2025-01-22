import axios from 'axios';

const api = axios.create({
  baseURL: "https://nex-mall.vercel.app",
  withCredentials: true, // Include cookies if needed
});

export default api;
