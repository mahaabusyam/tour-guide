export const PAGE_SIZE = 9;

export const THEMES = [
  { id: 'water', label: 'Water activities' },
  { id: 'distancing', label: 'Good for social distancing' },
  { id: 'adrenaline', label: 'Adrenaline' },
  { id: 'nature', label: 'Nature' },
  { id: 'hidden', label: 'Hidden gems' },
  { id: 'street', label: 'Street art & graffiti' },
  { id: 'food', label: 'Food' },
  { id: 'culture', label: 'Culture & history' },
  { id: 'family', label: 'Family friendly' },
];

export const DURATION_BUCKETS = [
  { id: '0-3', label: '0-3 hours', test: (hours) => hours <= 3 },
  { id: '3-5', label: '3-5 hours', test: (hours) => hours > 3 && hours <= 5 },
  { id: '5-7', label: '5-7 hours', test: (hours) => hours > 5 && hours <= 7 },
  { id: 'full', label: 'Full day (7+ hours)', test: (hours) => hours > 7 && hours < 24 },
  { id: 'multi', label: 'Multi-day', test: (hours) => hours >= 24 },
];

export const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Top rated' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'duration', label: 'Shortest duration' },
];
export const SPECIAL_SECTIONS = [
  { id: 'water', label: 'Water activities', themeId: 'water', color: '#7BBFB0' },
  { id: 'food', label: 'Special foods', themeId: 'food', color: '#4DA3FF' },
  { id: 'adventure', label: 'Adventure escapes', themeId: 'adrenaline', color: '#FF6B6B' },
];