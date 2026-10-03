import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { cancelBooking, selectBookings } from '../../features/bookingHistory/bookingHistorySlice';
import { formatDate } from '../../utils/profile';
import { formatPrice } from '../../utils/format';
import Reveal from '../common/Reveal';

const BookingItem = ({ booking, index, onCancel }) => {
  const cancelled = booking.status === 'cancelled';

  return (
    <Reveal direction="soft" delay={index * 0.08} duration={0.6}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          p: 1.5,
          mb: 1.5,
          border: '1px solid #EEF1F4',
          borderRadius: '4px',
          opacity: cancelled ? 0.65 : 1,
          transition: 'box-shadow 0.3s ease, transform 0.3s ease, opacity 0.3s ease',
          '&:hover': { boxShadow: '0 8px 22px rgba(31,42,55,0.1)', transform: 'translateY(-2px)' },
        }}
      >
        <Box
          component="img"
          src={booking.image}
          alt={booking.title}
          loading="lazy"
          sx={{ width: 84, height: 84, objectFit: 'cover', borderRadius: '3px', flexShrink: 0, bgcolor: '#E6ECF0' }}
        />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
            <Typography
              component={RouterLink}
              to={`/tours/${booking.tourId}`}
              variant="h6"
              sx={{
                fontSize: 14,
                lineHeight: 1.4,
                color: 'text.primary',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                '&:hover': { color: 'secondary.main' },
              }}
            >
              {booking.title}
            </Typography>
            <Chip
              size="small"
              label={cancelled ? 'Cancelled' : 'Confirmed'}
              sx={{
                fontSize: 10.5,
                fontWeight: 700,
                bgcolor: cancelled ? '#ECEFF1' : 'rgba(95,179,169,0.16)',
                color: cancelled ? '#78909C' : '#2E7D72',
              }}
            />
          </Box>

          <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.5 }}>
            {formatDate(booking.from)} → {formatDate(booking.to)} · {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.8 }}>
            <Typography sx={{ color: 'secondary.main', fontWeight: 700, fontSize: 15 }}>
              {formatPrice(booking.total)}
            </Typography>
            {!cancelled && (
              <Button size="small" onClick={() => onCancel(booking)} sx={{ fontSize: 12, color: '#E04B4B' }}>
                Cancel booking
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Reveal>
  );
};

const BookingHistoryPanel = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(selectBookings);
  const [toCancel, setToCancel] = useState(null);

  const confirmCancel = () => {
    dispatch(cancelBooking(toCancel.id));
    setToCancel(null);
  };

  return (
    <Box>
      <Typography variant="h2" sx={{ fontFamily: 'inherit', fontSize: 17, fontWeight: 700, mb: 2 }}>
        Booking History
      </Typography>

      {bookings.length === 0 ? (
        <Reveal>
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <EventBusyIcon sx={{ fontSize: 48, color: '#C4CDD5', mb: 1 }} />
            <Typography sx={{ fontSize: 14, color: 'text.secondary', mb: 2 }}>
              You have no bookings yet.
            </Typography>
            <Button component={RouterLink} to="/things-to-do/london" variant="contained" color="secondary" sx={{ color: '#fff' }}>
              Browse activities
            </Button>
          </Box>
        </Reveal>
      ) : (
        bookings.map((booking, index) => (
          <BookingItem key={booking.id} booking={booking} index={index} onCancel={setToCancel} />
        ))
      )}

      <Dialog open={Boolean(toCancel)} onClose={() => setToCancel(null)}>
        <DialogTitle sx={{ fontSize: 16, fontWeight: 700 }}>Cancel this booking?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: 13 }}>{toCancel?.title}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setToCancel(null)} sx={{ color: 'text.secondary' }}>Keep it</Button>
          <Button onClick={confirmCancel} color="error" variant="contained">Cancel booking</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookingHistoryPanel;