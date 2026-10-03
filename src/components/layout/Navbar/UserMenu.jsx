import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar, Badge, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Snackbar, Typography,
} from '@mui/material';
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { selectProfile, signIn, signOut } from '../../../features/user/userSlice';
import { selectActiveBookingsCount } from '../../../features/bookingHistory/bookingHistorySlice';
import { getInitials } from '../../../utils/profile';
import { shine, withMotion } from '../../../styles/animations';

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const signInSx = {
  position: 'relative',
  overflow: 'hidden',
  px: 4,
  py: 1.2,
  transition: `transform 0.3s ${EASE}, box-shadow 0.3s ease`,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-60%',
    width: '40%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
    ...withMotion(`${shine} 5s ease-in-out infinite`),
  },
  '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 22px rgba(255,216,61,0.5)' },
};

const UserMenu = ({ variant = 'desktop', onNavigate }) => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const bookingsCount = useSelector(selectActiveBookingsCount);
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState('');

  const closeMenu = () => setAnchorEl(null);

  const handleSignIn = () => {
    dispatch(signIn());
    setMessage('Signed in as the demo user');
  };

  const handleSignOut = () => {
    closeMenu();
    onNavigate?.();
    dispatch(signOut());
    setMessage('Signed out');
  };

  const renderContent = () => {
    // قبل تسجيل الدخول
    if (!profile) {
      return (
        <Button
          variant="contained"
          color="primary"
          fullWidth={variant === 'drawer'}
          onClick={handleSignIn}
          sx={signInSx}
        >
          Sign In
        </Button>
      );
    }

    const avatar = (size) => (
      <Avatar src={profile.avatar} alt={profile.name} sx={{ width: size, height: size, fontSize: size / 2.6, fontWeight: 700, bgcolor: 'secondary.main' }}>
        {getInitials(profile.name)}
      </Avatar>
    );

    // داخل درج الجوال
    if (variant === 'drawer') {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            {avatar(40)}
            <Box sx={{ minWidth: 0 }}>
              <Typography noWrap sx={{ fontSize: 14, fontWeight: 700 }}>{profile.name}</Typography>
              <Typography noWrap sx={{ fontSize: 11, opacity: 0.7 }}>{profile.email}</Typography>
            </Box>
          </Box>
          <Button component={RouterLink} to="/profile" onClick={onNavigate} variant="contained" color="primary" fullWidth>
            My Profile
          </Button>
          <Button
            component={RouterLink}
            to="/profile?tab=bookings"
            onClick={onNavigate}
            variant="outlined"
            fullWidth
            sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}
          >
            Booking History {bookingsCount > 0 && `(${bookingsCount})`}
          </Button>
          <Button onClick={handleSignOut} fullWidth sx={{ color: 'rgba(255,255,255,0.75)' }}>
            Sign out
          </Button>
        </Box>
      );
    }

    // الشاشات الكبيرة: صورة بقائمة منسدلة
    return (
      <>
        <IconButton
          aria-label="open account menu"
          aria-haspopup="menu"
          aria-expanded={Boolean(anchorEl)}
          onClick={(event) => setAnchorEl(event.currentTarget)}
          sx={{
            p: 0.4,
            border: '2px solid #FFD83D',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
            '&:hover': { transform: 'scale(1.08)', boxShadow: '0 0 0 4px rgba(255,216,61,0.25)' },
          }}
        >
          <Badge color="secondary" badgeContent={bookingsCount} overlap="circular">
            {avatar(34)}
          </Badge>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{
            '& .MuiPaper-root': {
              mt: 1,
              minWidth: 230,
              bgcolor: '#12234A',
              color: '#fff',
              borderRadius: 2,
              boxShadow: '0 16px 40px rgba(10,20,45,0.4)',
            },
            '& .MuiMenuItem-root': { fontSize: 13, gap: 0.5, py: 1.1, transition: 'background-color 0.2s ease, padding-left 0.2s ease' },
            '& .MuiMenuItem-root:hover': { bgcolor: 'rgba(255,255,255,0.1)', pl: 2.4 },
            '& .MuiListItemIcon-root': { color: '#FFD83D', minWidth: 32 },
          }}
        >
          <Box sx={{ px: 2, py: 1.2 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{profile.name}</Typography>
            <Typography sx={{ fontSize: 11, opacity: 0.7 }}>{profile.email}</Typography>
          </Box>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />

          <MenuItem component={RouterLink} to="/profile" onClick={closeMenu}>
            <ListItemIcon><PersonOutlineIcon fontSize="small" /></ListItemIcon>
            My Profile
          </MenuItem>
          <MenuItem component={RouterLink} to="/profile?tab=bookings" onClick={closeMenu}>
            <ListItemIcon><EventNoteOutlinedIcon fontSize="small" /></ListItemIcon>
            Booking History {bookingsCount > 0 && `(${bookingsCount})`}
          </MenuItem>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
            Sign out
          </MenuItem>
        </Menu>
      </>
    );
  };

  return (
    <>
      {renderContent()}
      <Snackbar open={Boolean(message)} autoHideDuration={2200} onClose={() => setMessage('')} message={message} />
    </>
  );
};

export default UserMenu;