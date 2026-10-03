const titlePrefix = (title) => title.split(':')[0].trim();

// يجمع رحلات المدن وFeatured والأنشطة في فهرس واحد: { slug: بيانات الرحلة }
export const buildCatalog = ({ cities, featured, activities }) => {
  const catalog = {};
  const cityNames = {};

  cities.forEach((city) => {
    cityNames[city.id] = city.name;

    city.tours.forEach((tour) => {
      const slug = `${city.id}-${tour.id}`;
      catalog[slug] = { ...tour, slug, location: city.name };
    });
  });

  featured.destinations.forEach((tour) => {
    const slug = String(tour.id);
    catalog[slug] ??= { ...tour, slug, location: titlePrefix(tour.title) };
  });

  activities.forEach((activity) => {
    catalog[activity.id] = {
      ...activity,
      slug: activity.id,
      location: cityNames[activity.cityId] ?? 'Tour',
    };
  });

  return catalog;
};