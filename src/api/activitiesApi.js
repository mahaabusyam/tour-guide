import axiosInstance from './axiosInstance';

export const getActivities = async (signal) => {
  const response = await axiosInstance.get(
    `${import.meta.env.BASE_URL}data/activities.json`,
    { signal }
  );

  return response.data;
};