export const PAGE_SIZE = 5;

export const DEFAULT_FILTERS = { sort: 'recommended', type: 'all', rating: 'all', query: '' };

export const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'Newest' },
  { value: 'highest', label: 'Highest rated' },
  { value: 'lowest', label: 'Lowest rated' },
];

export const TYPE_OPTIONS = [
  { value: 'all', label: 'All travelers' },
  { value: 'Family', label: 'Family' },
  { value: 'Couple', label: 'Couple' },
  { value: 'Solo', label: 'Solo' },
  { value: 'Friends', label: 'Friends' },
  { value: 'Business', label: 'Business' },
];

export const RATING_OPTIONS = [
  { value: 'all', label: 'All ratings' },
  { value: '5', label: '5 stars' },
  { value: '4', label: '4 stars' },
  { value: '3', label: '3 stars' },
  { value: '2', label: '2 stars' },
  { value: '1', label: '1 star' },
];