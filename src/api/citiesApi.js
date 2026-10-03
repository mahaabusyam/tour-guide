import axiosInstance from './axiosInstance';

export const getCities = async (signal) => {
  const response = await axiosInstance.get('/data/cities.json', { signal });
  return response.data;
};