import axiosInstance from './axiosInstance';

export const getReviews = async (signal) => {
  const response = await axiosInstance.get(`${import.meta.env.BASE_URL}data/reviews.json`, { signal });
  return response.data;
};