import axiosInstance from './axiosInstance';

export const getFeatured = async (signal) => {
  const response = await axiosInstance.get('data/featured.json', { signal });
  return response.data;
};