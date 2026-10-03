import axiosInstance from './axiosInstance';

export const getGallery = async (signal) => {
  const response = await axiosInstance.get(`${import.meta.env.BASE_URL}data/gallery.json`, { signal });
  return response.data;
};

export const getStories = async (signal) => {
  const response = await axiosInstance.get(`${import.meta.env.BASE_URL}data/stories.json`, { signal });
  return response.data;
};
export const getRelated = async (signal) => {
  const response = await axiosInstance.get(`${import.meta.env.BASE_URL}data/related.json`, { signal });
  return response.data;
};