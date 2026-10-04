import axiosInstance from './axiosInstance';
import { expectArray } from './validate';

const fetchList = async (path, signal) => {
  const { data } = await axiosInstance.get(path, { signal });
  return expectArray(data, path);
};

export const getGallery = (signal) => fetchList('/data/gallery.json', signal);
export const getStories = (signal) => fetchList('/data/stories.json', signal);
export const getRelated = (signal) => fetchList('/data/related.json', signal);