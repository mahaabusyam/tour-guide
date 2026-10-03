import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../utils/storage';

const bookingHistorySlice = createSlice({
  name: 'bookingHistory',
  initialState: { items: loadFromStorage('booking_history', []) },
  reducers: {
    addBooking: {
      reducer: (state, action) => {
        state.items.unshift(action.payload); // الأحدث أولاً
      },
      // prepare: مكان الأشياء غير النقية مثل الوقت والمعرّف
      prepare: (booking) => ({
        payload: {
          ...booking,
          id: `bk-${Date.now()}`,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
        },
      }),
    },
    cancelBooking: (state, action) => {
      const booking = state.items.find((item) => item.id === action.payload);
      if (booking) booking.status = 'cancelled';
    },
  },
});

export const { addBooking, cancelBooking } = bookingHistorySlice.actions;

export const selectBookings = (state) => state.bookingHistory.items;
export const selectActiveBookingsCount = (state) =>
  state.bookingHistory.items.filter((item) => item.status === 'confirmed').length;

export default bookingHistorySlice.reducer;