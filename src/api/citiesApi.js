import axiosInstance from './axiosInstance';
import { expectArray } from './validate';

export const getCities = async (signal) => {
  const { data } = await axiosInstance.get('/data/cities.json', { signal });

  expectArray(data, 'cities.json');
  if (!data.every((city) => city && Array.isArray(city.tours))) {
    throw new Error('cities.json has an invalid format');
  }

  return data;
};