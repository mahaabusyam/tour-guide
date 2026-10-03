import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, CircularProgress, Divider, InputBase, Paper, Snackbar, Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { selectBooking, setFrom, setTo } from '../../features/booking/bookingSlice';
import { scaleIn, shine, withMotion } from '../../styles/animations';
import Reveal from '../common/Reveal';

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

const Label = ({ children }) => (
  <Typography sx={{ fontSize: 12, fontWeight: 700, mb: 0.8 }}>{children}</Typography>
);

const AvailabilityCard = () => {
  const dispatch = useDispatch();
  const { from, to } = useSelector(selectBooking);
  const [status, setStatus] = useState('idle'); // idle | loading | done
  const [message, setMessage] = useState('');

  const today = new Date().toLocaleDateString('en-CA');

  useEffect(() => {
    if (status === 'idle') return;

    const timer = setTimeout(
      () => {
        if (status === 'loading') {
          setStatus('done');
          setMessage(`Dates saved: ${from} → ${to}. Availability is confirmed when you book.`);
        } else {
          setStatus('idle');
        }
      },
      status === 'loading' ? 900 : 2200
    );

    // Cleanup
    return () => clearTimeout(timer);
  }, [status, from, to]);

  const renderLabel = () => {
    if (status === 'loading') return <CircularProgress size={18} color="inherit" />;
    if (status === 'done') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, animation: `${scaleIn} 0.4s ease` }}>
          <CheckCircleIcon fontSize="small" /> Dates Saved
        </Box>
      );
    }
    return 'Check Availability';
  };

  return (
    <Reveal direction="left">
      <Paper elevation={0} sx={{ borderRadius: '2px', boxShadow: '0 4px 20px rgba(31,42,55,0.07)' }}>
        <Typography sx={{ px: 2.5, py: 1.8, fontSize: 15, fontWeight: 600 }}>Availability</Typography>
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

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disabled={status === 'loading'}
            onClick={() => setStatus('loading')}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              mt: 1,
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
            {renderLabel()}
          </Button>
        </Box>
      </Paper>

      <Snackbar open={Boolean(message)} autoHideDuration={3500} onClose={() => setMessage('')} message={message} />
    </Reveal>
  );
};

export default AvailabilityCard;