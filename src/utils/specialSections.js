import { SPECIAL_SECTIONS } from '../constants/activities';

// الأنشطة لا تحمل transport وplan، والكرت يعرضهما، فنضيفهما هنا
const toCardItem = (activity) => ({
  ...activity,
  slug: activity.id,
  transport: 'Transport Facility',
  plan: 'Family Plan',
});

export const buildSpecialSections = (items) => {
  const used = new Set(); // أنشطة ظهرت في قسم سابق: لا تتكرر
  const byPopularity = [...items].sort((a, b) => b.reviews - a.reviews);

  return SPECIAL_SECTIONS.map((section) => {
    const tours = byPopularity
      .filter((activity) => activity.themes.includes(section.themeId) && !used.has(activity.id))
      .slice(0, 8);

    tours.forEach((activity) => used.add(activity.id));

    return { ...section, tours: tours.map(toCardItem) };
  }).filter((section) => section.tours.length >= 2);
};