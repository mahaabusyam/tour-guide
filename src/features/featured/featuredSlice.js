import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeatured } from '../../api/featuredApi';
import { loadCache, saveCache } from '../../utils/storage';

const CACHE_KEY = 'featured_cache_v1';
const CACHE_TTL = 10 * 60 * 1000;

export const fetchFeatured = createAsyncThunk(
  'featured/fetchFeatured',
  async (_, { signal }) => {
    const cached = loadCache(CACHE_KEY, CACHE_TTL);
    if (cached) return cached;

    const data = await getFeatured(signal);
    saveCache(CACHE_KEY, data);
    return data;
  }
);

const featuredSlice = createSlice({
  name: 'featured',
  initialState: { trending: null, destinations: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeatured.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFeatured.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trending = action.payload.trending;
        state.destinations = action.payload.destinations;
      })
      .addCase(fetchFeatured.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectTrending = (state) => state.featured.trending;
export const selectDestinations = (state) => state.featured.destinations;
export const selectFeaturedStatus = (state) => state.featured.status;
export const selectFeaturedError = (state) => state.featured.error;

export default featuredSlice.reducer;