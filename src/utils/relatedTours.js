// "Duration 2 hours" أو "2 hours" أو "3.5" ← 2 / 2 / 3.5
const hoursOf = (text) => Number.parseFloat(String(text ?? '').replace(/[^\d.]/g, '')) || 0;

export const getRelatedSections = (cities, tour) => {
  // مدينة الرحلة الحالية: نبحث بالـ slug أولاً، ثم باسم المدينة
  const currentCity =
    cities.find((city) => city.tours.some((item) => item.slug === tour.id)) ??
    cities.find((city) => city.name === tour.location);

  const sections = [];

  // 1) رحلات المدينة نفسها، بدون الرحلة الحالية
  if (currentCity) {
    const sameCity = currentCity.tours.filter((item) => item.slug !== tour.id);

    if (sameCity.length > 0) {
      sections.push({
        id: 'same-city',
        title: `Related Tours In ${currentCity.name}`,
        tours: sameCity,
      });
    }
  }

  // 2) رحلات من مدن أخرى: الأقرب في المدة، ثم الأعلى تقييماً
  const currentHours = hoursOf(tour.details?.find((group) => group.id === 'duration')?.values?.[0]);

  const others = cities
    .filter((city) => city !== currentCity)
    .flatMap((city) => city.tours)
    .sort(
      (a, b) =>
        Math.abs(hoursOf(a.duration) - currentHours) - Math.abs(hoursOf(b.duration) - currentHours) ||
        b.rating - a.rating
    )
    .slice(0, 8);

  if (others.length > 0) {
    sections.push({ id: 'you-may-like', title: 'You May Also Like', tours: others });
  }

  return sections;
};