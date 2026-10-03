import axiosInstance from './axiosInstance';

export const getCities = async (signal) => {
  const response = await axiosInstance.get(`${import.meta.env.BASE_URL}data/cities.json`, { signal });
  return response.data;
};