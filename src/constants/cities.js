export const CITY_IDS = ['new-york', 'california', 'alaska', 'sidney', 'dubai', 'london', 'tokyo', 'delhi'];
export const DEFAULT_CITY_ID = 'london';

// 'london-a3' ← 'london' ، 'new-york-1' ← 'new-york'
export const getCityIdFromSlug = (slug = '') => CITY_IDS.find((id) => slug.startsWith(`${id}-`));