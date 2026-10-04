import axiosInstance from './axiosInstance';
import { expectArray } from './validate';

export const getActivities = async (signal) => {
  const { data } = await axiosInstance.get('/data/activities.json', { signal });
  return expectArray(data, 'activities.json');
};