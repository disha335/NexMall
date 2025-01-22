import axios from 'axios';

const api = axios.create({
  baseURL: "https://nex-mall.vercel.app",
  // baseURL: "http://localhost:5000/",
  withCredentials: true, // Include cookies if needed
});

export default api;
