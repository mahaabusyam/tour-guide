import axiosInstance from './axiosInstance';

export const getTours = async (signal) => {
  const response = await axiosInstance.get('/data/tours.json', { signal });
  return response.data;
};
export const getCatalogSources = async (signal) => {
  const [cities, featured, activities] = await Promise.all([
    axiosInstance.get('/data/cities.json', { signal }),
    axiosInstance.get('/data/featured.json', { signal }),
    axiosInstance.get('/data/activities.json', { signal }),
  ]);

  return { cities: cities.data, featured: featured.data, activities: activities.data };
};