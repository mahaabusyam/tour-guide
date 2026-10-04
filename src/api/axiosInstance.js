import axios from 'axios';
import { prefixAssets } from '../utils/assets';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || import.meta.env.BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    response.data = prefixAssets(response.data);
    return response;
  },
  (error) => {
    // الإلغاء المقصود (cleanup) ليس خطأ
    if (axios.isCancel(error)) return Promise.reject(error);

    const target = error.config ? axios.getUri(error.config) : '';

    error.message = error.response
      ? `Request failed (${error.response.status}): ${target}`
      : 'Network error: please check your connection';

    return Promise.reject(error);
  }
);

export default axiosInstance;