import axiosInstance from './axiosInstance';

export const getActivities = async (signal) => {
  const response = await axiosInstance.get('data/activities.json', { signal });
  return response.data;
};