import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCities } from '../../api/citiesApi';
import { loadFromStorage } from '../../utils/storage';
import { saveToStorage } from '../../utils/storage';

const CACHE_KEY = 'cities_cache_v10';
const CACHE_TTL = 10 * 60 * 1000; // 10 دقائق

// يعطي كل رحلة slug فريداً: اسم المدينة + رقم الرحلة
const addSlugs = (cities) =>
  cities.map((city) => ({
    ...city,
    tours: city.tours.map((tour) => ({ ...tour, slug: tour.slug ?? `${city.id}-${tour.id}` })),
  }));

export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async (_, { signal }) => {
    const cached = loadFromStorage(CACHE_KEY);
    if (cached && Date.now() - cached.savedAt < CACHE_TTL) {
      return addSlugs(cached.data);
    }

    const data = await getCities(signal);
    saveToStorage(CACHE_KEY, { data, savedAt: Date.now() });
    return addSlugs(data);
  }
);

const initialState = {
  items: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  selectedCityId: loadFromStorage('selectedCityId'), // آخر مدينة اختارها المستخدم
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    selectCity: (state, action) => {
      state.selectedCityId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
     })
      .addCase(fetchCities.rejected, (state, action) => {
        if (action.meta.aborted) return; // إلغاء مقصود، ليس خطأ
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { selectCity } = citiesSlice.actions;

// Selectors
export const selectCities = (state) => state.cities.items;
export const selectCitiesStatus = (state) => state.cities.status;
export const selectCitiesError = (state) => state.cities.error;
export const selectSelectedCity = (state) => {
  const { items, selectedCityId } = state.cities;
  return items.find((c) => c.id === selectedCityId) ?? items[0] ?? null;
};

export default citiesSlice.reducer;