import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || import.meta.env.BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

export default axiosInstance;