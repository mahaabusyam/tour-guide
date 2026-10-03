import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getActivities } from '../../api/activitiesApi';
import { loadCache, saveCache } from '../../utils/storage';

const CACHE_KEY = 'activities_cache_v1';
const CACHE_TTL = 10 * 60 * 1000;

export const fetchActivities = createAsyncThunk(
  'activities/fetchActivities',
  async (_, { signal }) => {
    const cached = loadCache(CACHE_KEY, CACHE_TTL);
    if (cached) return cached;

    const data = await getActivities(signal);
    saveCache(CACHE_KEY, data);
    return data;
  }
);

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectActivities = (state) => state.activities.items;
export const selectActivitiesStatus = (state) => state.activities.status;
export const selectActivitiesError = (state) => state.activities.error;

export default activitiesSlice.reducer;