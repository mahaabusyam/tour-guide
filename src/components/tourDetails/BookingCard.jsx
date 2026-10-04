import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, CircularProgress, Divider, InputBase, MenuItem, Paper, Select, Snackbar, Typography,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyIcon from '@mui/icons-material/Reply';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { selectBooking, setFrom, setGuests, setTo } from '../../features/booking/bookingSlice';
import { selectFavoriteIds, toggleFavorite } from '../../features/favorites/favoritesSlice';
import useAnimatedNumber from '../../hooks/useAnimatedNumber';
import { formatPrice } from '../../utils/format';
import { pop, scaleIn, shine, tabPop, withMotion } from '../../styles/animations';
import Reveal from '../common/Reveal';
import { Link as RouterLink } from 'react-router-dom';
import { addBooking } from '../../features/bookingHistory/bookingHistorySlice';

const fieldSx = {
  bgcolor: '#F1F4F6',
  borderRadius: '2px',
  px: 1.5,
  height: 34,
  fontSize: 12,
  transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
  '&:hover': { bgcolor: '#EAF0F2' },
  '&.Mui-focused': { bgcolor: '#fff', boxShadow: '0 0 0 2px #5FB3A9' },
};

const outlineButtonSx = {
  py: 1,
  fontSize: 13,
  color: 'text.primary',
  borderColor: '#CBD3DA',
  borderRadius: '2px',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: 'secondary.main',
    bgcolor: 'rgba(95,179,169,0.06)',
    transform: 'translateY(-2px)',
  },
};

const Label = ({ children }) => (
  <Typography sx={{ fontSize: 12, fontWeight: 700, mb: 0.8 }}>{children}</Typography>
);

const BookingCard = ({ tour }) => {
  const dispatch = useDispatch();
  const { from, to, guests: storedGuests } = useSelector(selectBooking);
  const guests = Math.min(storedGuests, tour.maxGuests);
  const isSaved = useSelector(selectFavoriteIds).includes(tour.id);
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [snack, setSnack] = useState('');

  const today = new Date().toLocaleDateString('en-CA');
  const subtotal = tour.pricePerPerson * guests;
  const animatedSubtotal = useAnimatedNumber(subtotal);
  const handleConfirm = () => {
  dispatch(
    addBooking({
      tourId: tour.id,
      title: tour.title,
      image: tour.images?.[0],
      from,
      to,
      guests,
      total: subtotal,
    })
  );
  setStatus('loading');
};

  // محاكاة طلب الحجز: تحميل ثم نجاح ثم عودة للحالة الأولى
  useEffect(() => {
    if (status === 'idle') return;

    const timer = setTimeout(
      () => {
        if (status === 'loading') {
          setStatus('success');
          setSnack('Booking request sent successfully');
        } else {
          setStatus('idle');
        }
      },
      status === 'loading' ? 1400 : 2800
    );

    // Cleanup
    return () => clearTimeout(timer);
  }, [status]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: tour.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setSnack('Link copied to clipboard');
      }
    } catch {
      // المستخدم أغلق نافذة المشاركة
    }
  };

  const renderConfirmLabel = () => {
    if (status === 'loading') return <CircularProgress size={18} color="inherit" />;
    if (status === 'success') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, animation: `${scaleIn} 0.4s ease` }}>
          <CheckCircleIcon fontSize="small" /> Request Sent
        </Box>
      );
    }
    return 'Confirm Booking';
  };

  return (
    <Reveal direction="right" delay={0.3} duration={0.9}>
      <Paper elevation={0} sx={{ borderRadius: '2px', boxShadow: '0 6px 28px rgba(31,42,55,0.12)' }}>
        <Typography sx={{ px: 2.5, py: 1.8, fontSize: 15, fontWeight: 600 }}>Booking</Typography>
        <Divider />

        <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Label>From</Label>
            <InputBase
              type="date"
              fullWidth
              value={from}
              onChange={(event) => dispatch(setFrom(event.target.value))}
              inputProps={{ min: today, 'aria-label': 'From date' }}
              sx={fieldSx}
            />
          </Box>

          <Box>
            <Label>To</Label>
            <InputBase
              type="date"
              fullWidth
              value={to}
              onChange={(event) => dispatch(setTo(event.target.value))}
              inputProps={{ min: from, 'aria-label': 'To date' }}
              sx={fieldSx}
            />
          </Box>

          <Box>
            <Label>No. Of Guest</Label>
            <Select
              fullWidth
              value={guests}
              onChange={(event) => dispatch(setGuests(event.target.value))}
              inputProps={{ 'aria-label': 'Number of guests' }}
              sx={{
                ...fieldSx,
                px: 0,
                '& fieldset': { border: 'none' },
                '& .MuiSelect-select': { py: 0.9, px: 1.5, fontSize: 12 },
              }}
            >
              {Array.from({ length: tour.maxGuests }, (_, i) => i + 1).map((count) => (
                <MenuItem key={count} value={count} sx={{ fontSize: 12 }}>
                  {count} {count === 1 ? 'adult' : 'adults'}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* المبلغ: يعدّ تصاعدياً، وينبض عند تغيّر القيمة */}
          <Box sx={{ textAlign: 'center', py: 1 }}>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Subtotal</Typography>
            <Typography
              key={subtotal}
              sx={{
                fontSize: 32,
                fontWeight: 800,
                color: 'secondary.main',
                lineHeight: 1.3,
                ...withMotion(`${tabPop} 0.5s ease`),
              }}
            >
              {formatPrice(animatedSubtotal)}
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disabled={status === 'loading'}
            onClick={handleConfirm}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              py: 1.1,
              fontSize: 13,
              color: '#fff',
              boxShadow: '0 8px 18px rgba(95,179,169,0.4)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-60%',
                width: '40%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                ...withMotion(`${shine} 4.5s ease-in-out infinite`),
              },
              '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 24px rgba(95,179,169,0.5)' },
              '&.Mui-disabled': { bgcolor: 'secondary.main', color: '#fff', opacity: 0.85 },
            }}
          >
            {renderConfirmLabel()}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => dispatch(toggleFavorite(tour.id))}
            startIcon={
              isSaved ? (
                <FavoriteIcon
                  key="saved"
                  sx={{ color: '#FF6B8B', animation: `${pop} 0.4s ease` }}
                />
              ) : (
                <FavoriteBorderIcon />
              )
            }
            sx={outlineButtonSx}
          >
            {isSaved ? 'Saved To Wishlist' : 'Save To Wishlist'}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleShare}
            startIcon={<ReplyIcon sx={{ transform: 'scaleX(-1)' }} />}
            sx={outlineButtonSx}
          >
            Share The Activity
          </Button>
        </Box>
      </Paper>

      <Snackbar
  open={Boolean(snack)}
  autoHideDuration={3500}
  onClose={() => setSnack('')}
  message={snack}
  action={
    snack.startsWith('Booking') ? (
      <Button component={RouterLink} to="/profile?tab=bookings" size="small" sx={{ color: '#FFD83D', fontWeight: 700 }}>
        View
      </Button>
    ) : undefined
  }
/>
    </Reveal>
  );
};

export default BookingCard;