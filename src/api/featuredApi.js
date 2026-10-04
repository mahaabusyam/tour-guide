import axiosInstance from './axiosInstance';
import { expectArray, expectObject } from './validate';

export const getFeatured = async (signal) => {
  const { data } = await axiosInstance.get('/data/featured.json', { signal });

  expectObject(data, 'featured.json', ['trending', 'destinations']);
  expectArray(data.destinations, 'featured.json (destinations)');

  return data;
};