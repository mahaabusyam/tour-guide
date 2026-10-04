import axiosInstance from './axiosInstance';
import { expectArray, expectObject } from './validate';

export const getReviews = async (signal) => {
  const { data } = await axiosInstance.get('/data/reviews.json', { signal });

  expectObject(data, 'reviews.json', ['summary', 'reviews']);
  expectArray(data.reviews, 'reviews.json (reviews)');

  return data;
};