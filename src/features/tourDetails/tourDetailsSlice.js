import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCatalogSources, getTours } from '../../api/toursApi';
import { DEFAULT_TOUR_ID } from '../../constants/tours';
import { loadCache, saveCache } from '../../utils/storage';
import { buildCatalog } from '../../utils/tourCatalog';

const TOURS_CACHE_KEY = 'tours_cache_v5';
const CATALOG_CACHE_KEY = 'catalog_cache_v3';
const CACHE_TTL = 10 * 60 * 1000;

const loadTours = async (signal) => {
  const cached = loadCache(TOURS_CACHE_KEY, CACHE_TTL);
  if (cached) return cached;

  const tours = await getTours(signal);
  saveCache(TOURS_CACHE_KEY, tours);
  return tours;
};

const loadCatalog = async (signal) => {
  const cached = loadCache(CATALOG_CACHE_KEY, CACHE_TTL);
  if (cached) return cached;

  const catalog = buildCatalog(await getCatalogSources(signal));
  saveCache(CATALOG_CACHE_KEY, catalog);
  return catalog;
};

export const fetchTourDetails = createAsyncThunk(
  'tourDetails/fetchTourDetails',
  async (id, { signal, rejectWithValue }) => {
    const tours = await loadTours(signal);

    // 1) رحلة لها تفاصيل كاملة في tours.json
    const detailed = tours.find((item) => item.id === id);
    if (detailed) return detailed;

    // 2) رحلة موجودة في الفهرس: نأخذ بياناتها ونكمل الباقي من القالب
    const catalog = await loadCatalog(signal);
    const summary = catalog[id];
    if (!summary) return rejectWithValue('Tour not found');

    const template = tours.find((item) => item.id === DEFAULT_TOUR_ID) ?? tours[0];
    const durationText = summary.duration.replace('Duration ', '');

    return {
      ...template,
      id,
      title: summary.title,
      location: summary.location,
      rating: summary.rating,
      reviews: summary.reviews,
      pricePerPerson: summary.price,
      images: [summary.image, ...template.images.slice(1)],
      highlights: template.highlights.map((item) =>
        item.icon === 'duration' ? { ...item, title: summary.duration } : item
      ),
      details: template.details.map((group) =>
        group.id === 'duration' ? { ...group, values: [durationText] } : group
      ),
    };
  }
);

const tourDetailsSlice = createSlice({
  name: 'tourDetails',
  initialState: { item: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTourDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.item = null;
      })
      .addCase(fetchTourDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.item = action.payload;
      })
      .addCase(fetchTourDetails.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.status = 'failed';
        state.error = action.payload ?? action.error.message;
      });
  },
});

export const selectTour = (state) => state.tourDetails.item;
export const selectTourStatus = (state) => state.tourDetails.status;
export const selectTourError = (state) => state.tourDetails.error;

export default tourDetailsSlice.reducer;