import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from '../features/cities/citiesSlice';
import featuredReducer from '../features/featured/featuredSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import contentReducer from '../features/content/contentSlice';
import preferencesReducer from '../features/preferences/preferencesSlice';
import tourDetailsReducer from '../features/tourDetails/tourDetailsSlice';
import bookingReducer from '../features/booking/bookingSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';
import activitiesReducer from '../features/activities/activitiesSlice';
import userReducer from '../features/user/userSlice';
import bookingHistoryReducer from '../features/bookingHistory/bookingHistorySlice';
import { saveToStorage } from '../utils/storage';

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    featured: featuredReducer,
    favorites: favoritesReducer,
    content: contentReducer,
    preferences: preferencesReducer,
    tourDetails: tourDetailsReducer,
    booking: bookingReducer,
    reviews: reviewsReducer,
    activities: activitiesReducer,
    user: userReducer,
    bookingHistory: bookingHistoryReducer,
  },
});

// يحفظ أي جزء من الـ state في localStorage كلما تغيّر
const persist = (selector, key) => {
  let previous = selector(store.getState());

  store.subscribe(() => {
    const current = selector(store.getState());
    if (current !== previous) {
      previous = current;
      saveToStorage(key, current);
    }
  });
};

persist((state) => state.favorites.ids, 'favorites');
persist((state) => state.preferences, 'preferences');
persist((state) => state.booking, 'booking');
persist((state) => state.reviews.helpfulIds, 'helpful_reviews');
persist((state) => state.user.profile, 'user_profile');
persist((state) => state.user.settings, 'user_settings');
persist((state) => state.bookingHistory.items, 'booking_history');