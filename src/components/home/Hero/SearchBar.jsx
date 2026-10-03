import { useState } from 'react';
import { Box, Button, Divider, InputBase, Paper, Typography , Snackbar } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { shine, withMotion } from '../../../styles/animations';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCities } from '../../../features/cities/citiesSlice';
import { setFrom, setGuests } from '../../../features/booking/bookingSlice';

const SearchField = ({ icon, label, ...inputProps }) => (
  <Box
    sx={{
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 1.5,
      flex: 1,
      px: 2,
      py: 0.8,
      borderRadius: 2,
      transition: 'background-color 0.3s ease',
      '&:hover': { bgcolor: 'rgba(95,179,169,0.07)' },
      // خط سفلي يُرسم عند التركيز
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 0,
        height: 2,
        backgroundColor: '#5FB3A9',
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.35s ease',
      },
      '&:focus-within': {
        bgcolor: 'rgba(95,179,169,0.1)',
        '&::after': { transform: 'scaleX(1)' },
        '& .field-icon': { transform: 'scale(1.2) rotate(-8deg)' },
      },
    }}
  >
    <Box
      className="field-icon"
      sx={{ color: 'secondary.main', mt: 0.3, display: 'flex', transition: 'transform 0.3s ease' }}
    >
      {icon}
    </Box>
    <Box sx={{ width: '100%' }}>
      <Typography sx={{ color: 'secondary.main', fontWeight: 700, fontSize: 14 }}>{label}</Typography>
      <InputBase fullWidth sx={{ fontSize: 13 }} {...inputProps} />
    </Box>
  </Box>
);

const SearchBar = () => {
  const [form, setForm] = useState({ location: '', guests: '', date: '' });

  const handleChange = (event) =>
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const handleSearch = () => {
  const query = form.location.trim().toLowerCase();

  // نحفظ التاريخ وعدد الضيوف لتظهر نفسها في صفحة الحجز
  const today = new Date().toLocaleDateString('en-CA');
  if (form.date && form.date >= today) dispatch(setFrom(form.date));

  const guests = Number(form.guests);
  if (guests >= 1 && guests <= 10) dispatch(setGuests(guests));

  // بدون وجهة: ننزل لقسم المدن
  if (!query) {
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const city = cities.find((item) => item.name.toLowerCase().includes(query));

  if (city) navigate(`/things-to-do/${city.id}`);
  else setMessage(`No destination found for "${form.location.trim()}"`);
};
  const navigate = useNavigate();
const dispatch = useDispatch();
const cities = useSelector(selectCities);
const [message, setMessage] = useState('');

  return (
    <>
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
        gap: { xs: 2, md: 0 },
        p: 2,
        borderRadius: 3,
        width: '100%',
        maxWidth: 750,
        boxShadow: '0 18px 50px rgba(20,60,90,0.18)',
        transition: 'box-shadow 0.4s ease, transform 0.4s ease',
        '&:hover': { boxShadow: '0 26px 64px rgba(20,60,90,0.26)', transform: 'translateY(-3px)' },
      }}
    >
      <SearchField
        icon={<LocationOnIcon fontSize="small" />}
        label="Location"
        name="location"
        placeholder="Search For A Destination"
        value={form.location}
        onChange={handleChange}
      />
      <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
      <SearchField
        icon={<PeopleAltOutlinedIcon fontSize="small" />}
        label="Guests"
        name="guests"
        type="number"
        placeholder="How many Guests?"
        value={form.guests}
        onChange={handleChange}
      />
      <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
      <SearchField
        icon={<CalendarMonthOutlinedIcon fontSize="small" />}
        label="Date"
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />

      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 8,
          px: 5,
          py: 1.5,
          boxShadow: '0 6px 16px rgba(255,216,61,0.6)',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-60%',
            width: '40%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)',
            ...withMotion(`${shine} 4s ease-in-out infinite`),
          },
          '&:hover': { transform: 'translateY(-3px) scale(1.04)', boxShadow: '0 14px 28px rgba(255,216,61,0.65)' },
          '&:active': { transform: 'scale(0.97)' },
        }}
      >
        Search
      </Button>
    </Paper>
      <Snackbar open={Boolean(message)} autoHideDuration={3000} onClose={() => setMessage('')} message={message} />
    </>
  );
};

export default SearchBar;