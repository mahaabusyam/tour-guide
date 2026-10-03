import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getGallery, getStories, getRelated } from '../../api/contentApi';
import { loadCache, saveCache } from '../../utils/storage';

const CACHE_TTL = 10 * 60 * 1000;

export const fetchGallery = createAsyncThunk('content/fetchGallery', async (_, { signal }) => {
  const cached = loadCache('gallery_cache_v1', CACHE_TTL);
  if (cached) return cached;

  const data = await getGallery(signal);
  saveCache('gallery_cache_v1', data);
  return data;
});

export const fetchStories = createAsyncThunk('content/fetchStories', async (_, { signal }) => {
  const cached = loadCache('stories_cache_v1', CACHE_TTL);
  if (cached) return cached;

  const data = await getStories(signal);
  saveCache('stories_cache_v1', data);
  return data;
});

export const fetchRelated = createAsyncThunk('content/fetchRelated', async (_, { signal }) => {
  const cached = loadCache('related_cache_v3', CACHE_TTL);
  if (cached) return cached;

  const data = await getRelated(signal);
  saveCache('related_cache_v1', data);
  return data;
});

const createSection = () => ({ items: [], status: 'idle', error: null });

// يضيف حالات الطلب الثلاث لأي قسم (key = gallery أو stories أو related)
const addFetchCases = (builder, thunk, key) => {
  builder
    .addCase(thunk.pending, (state) => {
      state[key].status = 'loading';
      state[key].error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state[key].status = 'succeeded';
      state[key].items = action.payload;
    })
    .addCase(thunk.rejected, (state, action) => {
      if (action.meta.aborted) return;
      state[key].status = 'failed';
      state[key].error = action.error.message;
    });
};

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    gallery: createSection(),
    stories: createSection(),
    related: createSection(),
  },
  reducers: {},
  extraReducers: (builder) => {
    addFetchCases(builder, fetchGallery, 'gallery');
    addFetchCases(builder, fetchStories, 'stories');
    addFetchCases(builder, fetchRelated, 'related');
  },
});

export const selectGallery = (state) => state.content.gallery;
export const selectStories = (state) => state.content.stories;
export const selectRelated = (state) => state.content.related;

export default contentSlice.reducer;