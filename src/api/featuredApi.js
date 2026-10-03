import axiosInstance from './axiosInstance';

export const getFeatured = async (signal) => {
  const response = await axiosInstance.get(`${import.meta.env.BASE_URL}data/featured.json`, { signal });
  return response.data;
};