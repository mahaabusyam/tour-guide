import axiosInstance from './axiosInstance';

export const getReviews = async (signal) => {
  const response = await axiosInstance.get('data/reviews.json', { signal });
  return response.data;
};