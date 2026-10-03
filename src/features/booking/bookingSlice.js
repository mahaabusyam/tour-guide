import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../utils/storage';

const today = () => new Date().toLocaleDateString('en-CA'); // صيغة YYYY-MM-DD
const saved = loadFromStorage('booking', {});

const from = typeof saved.from === 'string' && saved.from >= today() ? saved.from : today();
const to = typeof saved.to === 'string' && saved.to >= from ? saved.to : from;
const guests = saved.guests >= 1 && saved.guests <= 10 ? saved.guests : 2;

const bookingSlice = createSlice({
  name: 'booking',
  initialState: { from, to, guests },
  reducers: {
    setFrom: (state, action) => {
      state.from = action.payload;
      if (state.to < state.from) state.to = state.from; // "To" لا يسبق "From"
    },
    setTo: (state, action) => {
      state.to = action.payload < state.from ? state.from : action.payload;
    },
    setGuests: (state, action) => {
      state.guests = action.payload;
    },
  },
});

export const { setFrom, setTo, setGuests } = bookingSlice.actions;
export const selectBooking = (state) => state.booking;

export default bookingSlice.reducer;