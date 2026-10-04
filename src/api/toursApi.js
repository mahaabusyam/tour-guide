import axiosInstance from './axiosInstance';
import { expectArray, expectObject } from './validate';

export const getTours = async (signal) => {
  const { data } = await axiosInstance.get('/data/tours.json', { signal });
  return expectArray(data, 'tours.json');
};

export const getCatalogSources = async (signal) => {
  const [cities, featured, activities] = await Promise.all([
    axiosInstance.get('/data/cities.json', { signal }),
    axiosInstance.get('/data/featured.json', { signal }),
    axiosInstance.get('/data/activities.json', { signal }),
  ]);

  expectArray(cities.data, 'cities.json');
  expectObject(featured.data, 'featured.json', ['destinations']);
  expectArray(featured.data.destinations, 'featured.json (destinations)');
  expectArray(activities.data, 'activities.json');

  return { cities: cities.data, featured: featured.data, activities: activities.data };
};