import { DURATION_BUCKETS, THEMES } from '../constants/activities';

const SORTERS = {
  popularity: (a, b) => b.reviews - a.reviews,
  rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  duration: (a, b) => a.hours - b.hours,
};

export const filterActivities = (items, { theme, duration, destination, sort }) =>
  items
    .filter((activity) => {
      const matchesTheme = theme.length === 0 || activity.themes.some((id) => theme.includes(id));
      const matchesDuration =
        duration.length === 0 ||
        DURATION_BUCKETS.some((bucket) => duration.includes(bucket.id) && bucket.test(activity.hours));
      const matchesDestination = destination.length === 0 || destination.includes(activity.destination);

      return matchesTheme && matchesDuration && matchesDestination;
    })
    .sort(SORTERS[sort] ?? SORTERS.popularity);

const countWhere = (items, test) => items.filter(test).length;

// الخيارات مع عدد الأنشطة لكل خيار (داخل المدينة الحالية)
export const buildFacets = (items) => ({
  theme: THEMES.map((theme) => ({
    id: theme.id,
    label: theme.label,
    count: countWhere(items, (activity) => activity.themes.includes(theme.id)),
  })).filter((option) => option.count > 0),

  duration: DURATION_BUCKETS.map((bucket) => ({
    id: bucket.id,
    label: bucket.label,
    count: countWhere(items, (activity) => bucket.test(activity.hours)),
  })),

  destination: [...new Set(items.map((activity) => activity.destination))]
    .map((name) => ({
      id: name,
      label: name,
      count: countWhere(items, (activity) => activity.destination === name),
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label)),
});

export const formatDuration = (hours) =>
  hours >= 24 ? `${Math.round(hours / 24)} days` : `${hours} hours`;