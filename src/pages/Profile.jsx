import { useEffect, useState } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Breadcrumbs, Button, Container, Divider, Link, Paper, Snackbar, Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { PROFILE_TABS } from '../constants/profile';
import { selectProfile, signIn } from '../features/user/userSlice';
import { selectActiveBookingsCount } from '../features/bookingHistory/bookingHistorySlice';
import { enter, fadeUp, riseUp, scaleIn } from '../styles/animations';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';
import BackToTop from '../components/common/BackToTop';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import PersonalInfoForm from '../components/profile/PersonalInfoForm';
import SecurityForm from '../components/profile/SecurityForm';
import BookingHistoryPanel from '../components/profile/BookingHistoryPanel';
import SettingsPanel from '../components/profile/SettingsPanel';
import SectionDivider from '../components/tourDetails/SectionDivider';

const TITLE = 'My Profile';

const SignInGate = ({ onSignIn }) => (
  <Paper
    elevation={0}
    sx={{
      maxWidth: 480,
      mx: 'auto',
      textAlign: 'center',
      p: 5,
      boxShadow: '0 8px 30px rgba(31,42,55,0.08)',
      animation: `${scaleIn} 0.5s ease`,
    }}
  >
    <LockOutlinedIcon sx={{ fontSize: 44, color: 'secondary.main', mb: 1 }} />
    <Typography variant="h6" sx={{ fontSize: 18, mb: 1 }}>Sign in to view your profile</Typography>
    <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 3 }}>
      Manage your details, bookings and notification preferences in one place.
    </Typography>
    <Button variant="contained" color="primary" onClick={onSignIn} sx={{ px: 5, py: 1.2 }}>
      Sign In (demo)
    </Button>
  </Paper>
);

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const bookingsCount = useSelector(selectActiveBookingsCount);
  const [params, setParams] = useSearchParams();
  const [message, setMessage] = useState('');

  const requested = params.get('tab');
  const tab = PROFILE_TABS.some((item) => item.id === requested) ? requested : 'profile';

  // التبويب في الرابط: /profile?tab=bookings
  const changeTab = (id) => setParams(id === 'profile' ? {} : { tab: id }, { replace: true });

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'My Profile | Tour Guide';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const renderPanel = () => {
    if (tab === 'bookings') return <BookingHistoryPanel />;
    if (tab === 'newsletter') return <SettingsPanel type="newsletter" />;
    if (tab === 'notifications') return <SettingsPanel type="notifications" />;

    return (
      <>
        <PersonalInfoForm profile={profile} />
        <SectionDivider spacing={3.5} />
        <SecurityForm profile={profile} />
      </>
    );
  };

  return (
    <>
      <Navbar solid />

      <Box component="main">
        {/* الترويسة البيضاء */}
        <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #EDF0F3', pt: { xs: 11, md: 13 }, pb: 2.5 }}>
          <Container maxWidth="md">
            <Typography variant="h1" aria-label={TITLE} sx={{ fontSize: { xs: 22, md: 26 } }}>
              {TITLE.split(' ').map((word, index) => (
                <Box
                  key={index}
                  component="span"
                  aria-hidden
                  sx={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', mr: '0.25em', pb: '0.1em' }}
                >
                  <Box component="span" sx={{ display: 'inline-block', ...enter(riseUp, 0.1 + index * 0.1, 0.8) }}>
                    {word}
                  </Box>
                </Box>
              ))}
            </Typography>

            <Breadcrumbs separator="/" aria-label="breadcrumb" sx={{ mt: 0.5, fontSize: 12, ...enter(fadeUp, 0.4, 0.7) }}>
              <Link component={RouterLink} to="/" underline="hover" sx={{ color: 'text.secondary', '&:hover': { color: 'secondary.main' } }}>
                Home
              </Link>
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>My Profile</Typography>
            </Breadcrumbs>
          </Container>
        </Box>

        {/* المحتوى */}
        <Box sx={{ bgcolor: '#F6F8FB', py: { xs: 3, md: 5 }, pb: { xs: 8, md: 10 } }}>
          <Container maxWidth="md">
            {!profile ? (
              <SignInGate onSignIn={() => dispatch(signIn())} />
            ) : (
              <Paper
                elevation={0}
                sx={{
                  maxWidth: 804,
                  mx: 'auto',
                  overflow: 'hidden',
                  boxShadow: '0 10px 36px rgba(31,42,55,0.09)',
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '226px minmax(0, 1fr)' },
                  ...enter(fadeUp, 0.2, 0.9),
                }}
              >
                <ProfileSidebar
                  profile={profile}
                  activeTab={tab}
                  onTabChange={changeTab}
                  bookingsCount={bookingsCount}
                  onNotify={setMessage}
                />

                {/* key: عند تغيّر التبويب تُعاد حركة الظهور */}
                <Box key={tab} sx={{ p: { xs: 2.5, md: 3.5 }, minWidth: 0, ...enter(fadeUp, 0, 0.5) }}>
                  {renderPanel()}
                </Box>
              </Paper>
            )}
          </Container>
        </Box>
      </Box>

      <Footer />
      <BackToTop />

      <Snackbar open={Boolean(message)} autoHideDuration={2500} onClose={() => setMessage('')} message={message} />
    </>
  );
};

export default Profile;