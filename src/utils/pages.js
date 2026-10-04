// كل دالة تحمّل ملف الصفحة عند استدعائها فقط (import ديناميكي)
export const pageLoaders = {
  activities: () => import('../pages/Activities'),
  tourDetails: () => import('../pages/TourDetails'),
  profile: () => import('../pages/Profile'),
  notFound: () => import('../pages/NotFound'),
};

// الصفحات التي نجلبها في الخلفية (404 نادرة فلا حاجة لها)
export const prefetchList = ['activities', 'tourDetails', 'profile'];