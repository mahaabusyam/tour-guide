import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReviews } from '../../api/reviewsApi';
import { loadCache, loadFromStorage, saveCache } from '../../utils/storage';

const CACHE_KEY = 'reviews_cache_v1';
const CACHE_TTL = 10 * 60 * 1000;

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async (_, { signal }) => {
  const cached = loadCache(CACHE_KEY, CACHE_TTL);
  if (cached) return cached;

  const data = await getReviews(signal);
  saveCache(CACHE_KEY, data);
  return data;
});

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    summary: null,
    items: [],
    status: 'idle',
    error: null,
    helpfulIds: loadFromStorage('helpful_reviews', []),
  },
  reducers: {
    toggleHelpful: (state, action) => {
      const id = action.payload;
      state.helpfulIds = state.helpfulIds.includes(id)
        ? state.helpfulIds.filter((item) => item !== id)
        : [...state.helpfulIds, id];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.summary = action.payload.summary;
        state.items = action.payload.reviews;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleHelpful } = reviewsSlice.actions;

export const selectReviewsSummary = (state) => state.reviews.summary;
export const selectReviews = (state) => state.reviews.items;
export const selectReviewsStatus = (state) => state.reviews.status;
export const selectReviewsError = (state) => state.reviews.error;
export const selectHelpfulIds = (state) => state.reviews.helpfulIds;

export default reviewsSlice.reducer;