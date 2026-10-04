import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCities } from '../../api/citiesApi';
import { loadCache, loadFromStorage, saveCache } from '../../utils/storage';

const CACHE_KEY = 'cities_cache_v3'; // مفتاح جديد: يمسح أي كاش قديم أو فاسد
const CACHE_TTL = 10 * 60 * 1000;

const isCities = (data) =>
  Array.isArray(data) && data.every((city) => city && Array.isArray(city.tours));

// يعطي كل رحلة slug فريداً: اسم المدينة + رقم الرحلة
const addSlugs = (cities) =>
  cities.map((city) => ({
    ...city,
    tours: city.tours.map((tour) => ({ ...tour, slug: tour.slug ?? `${city.id}-${tour.id}` })),
  }));

export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async (_, { signal }) => {
    const cached = loadCache(CACHE_KEY, CACHE_TTL, isCities);
    if (cached) return addSlugs(cached);

    const data = await getCities(signal);
    saveCache(CACHE_KEY, data);
    return addSlugs(data);
  }
);

const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    selectedCityId: loadFromStorage('selectedCityId'),
  },
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
        if (action.meta.aborted) return;
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { selectCity } = citiesSlice.actions;

export const selectCities = (state) => state.cities.items;
export const selectCitiesStatus = (state) => state.cities.status;
export const selectCitiesError = (state) => state.cities.error;
export const selectSelectedCity = (state) => {
  const { items, selectedCityId } = state.cities;
  return items.find((city) => city.id === selectedCityId) ?? items[0] ?? null;
};

export default citiesSlice.reducer;