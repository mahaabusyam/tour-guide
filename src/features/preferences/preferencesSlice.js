import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../utils/storage';

const defaults = { language: 'en-GB', currency: 'USD' };

const preferencesSlice = createSlice({
  name: 'preferences',
  // القيم المحفوظة تتفوق على الافتراضية
  initialState: { ...defaults, ...loadFromStorage('preferences', {}) },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setLanguage, setCurrency } = preferencesSlice.actions;
export const selectLanguage = (state) => state.preferences.language;
export const selectCurrency = (state) => state.preferences.currency;

export default preferencesSlice.reducer;