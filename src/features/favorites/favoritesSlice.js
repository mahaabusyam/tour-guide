import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../utils/storage';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { ids: loadFromStorage('favorites', []) },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      state.ids = state.ids.includes(id)
        ? state.ids.filter((item) => item !== id)
        : [...state.ids, id];
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavoriteIds = (state) => state.favorites.ids;

export default favoritesSlice.reducer;