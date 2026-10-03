import axiosInstance from './axiosInstance';

export const getGallery = async (signal) => {
  const response = await axiosInstance.get('data/gallery.json', { signal });
  return response.data;
};

export const getStories = async (signal) => {
  const response = await axiosInstance.get('data/stories.json', { signal });
  return response.data;
};
export const getRelated = async (signal) => {
  const response = await axiosInstance.get('data/related.json', { signal });
  return response.data;
};