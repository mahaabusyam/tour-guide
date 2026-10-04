import { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { CITY_IDS } from '../constants/cities';
import { drift, enter, fadeUp, float, riseUp, scaleIn, swing, withMotion } from '../styles/animations';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';
import BackToTop from '../components/common/BackToTop';

const toLabel = (id) =>
  id
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');

const Compass = () => (
  <Box
    component="svg"
    viewBox="0 0 100 100"
    aria-hidden
    sx={{ width: { xs: 90, md: 130 }, height: 'auto', ...withMotion(`${float} 4s ease-in-out infinite`) }}
  >
    <circle cx="50" cy="50" r="44" fill="#fff" stroke="#5FB3A9" strokeWidth="6" />
    <circle cx="50" cy="50" r="35" fill="none" stroke="#CFE4E0" strokeWidth="2" strokeDasharray="2 6" />
    {/* الإبرة تتأرجح حول مركز البوصلة */}
    <Box
      component="g"
      sx={{ transformBox: 'view-box', transformOrigin: '50px 50px', ...withMotion(`${swing} 3.2s ease-in-out infinite`) }}
    >
      <polygon points="50,15 58,50 42,50" fill="#E04B4B" />
      <polygon points="50,85 58,50 42,50" fill="#FFD83D" />
    </Box>
    <circle cx="50" cy="50" r="4.5" fill="#12234A" />
  </Box>
);

const Digit = ({ children, delay }) => (
  <Box sx={{ overflow: 'hidden', pb: '0.08em' }}>
    <Typography
      variant="h1"
      component="span"
      sx={{
        display: 'block',
        fontSize: { xs: 96, md: 150 },
        lineHeight: 1,
        color: '#12234A',
        ...enter(riseUp, delay, 0.9),
      }}
    >
      {children}
    </Typography>
  </Box>
);

const NotFound = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Page not found | Tour Guide';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  // إن فتحتِ الرابط مباشرة فلا يوجد "رجوع"، فنذهب للرئيسية
  const goBack = () => (window.history.length > 1 ? navigate(-1) : navigate('/'));

  return (
    <>
      <Navbar solid />

      <Box
        component="main"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '82vh',
          display: 'grid',
          placeItems: 'center',
          pt: { xs: 14, md: 16 },
          pb: 10,
          background: 'linear-gradient(180deg, #F6F8FB 0%, #EAF3F1 100%)',
        }}
      >
        {/* كرتان ضوئيتان تتحركان ببطء */}
        {[
          { top: '10%', left: '-6%', size: 320, color: 'rgba(95,179,169,0.22)', duration: 16 },
          { top: '55%', left: '72%', size: 380, color: 'rgba(255,216,61,0.2)', duration: 20 },
        ].map((blob) => (
          <Box
            key={blob.left}
            aria-hidden
            sx={{
              position: 'absolute',
              top: blob.top,
              left: blob.left,
              width: blob.size,
              height: blob.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${blob.color}, transparent 70%)`,
              ...withMotion(`${drift} ${blob.duration}s ease-in-out infinite`),
            }}
          />
        ))}

        <Container maxWidth="sm" sx={{ position: 'relative', textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
            <Digit delay={0.1}>4</Digit>
            <Box sx={enter(scaleIn, 0.4, 0.8)}>
              <Compass />
            </Box>
            <Digit delay={0.25}>4</Digit>
          </Box>

          <Typography variant="h2" sx={{ fontSize: { xs: 24, md: 30 }, mt: 2, ...enter(fadeUp, 0.6, 0.8) }}>
            Lost in the wild?
          </Typography>

          <Typography sx={{ color: 'text.secondary', fontSize: 14, lineHeight: 1.9, mt: 1.5, ...enter(fadeUp, 0.75, 0.8) }}>
            The page you are looking for has wandered off the map. Let's get you back on the trail.
          </Typography>

          <Typography
            sx={{
              display: 'inline-block',
              mt: 2,
              px: 1.5,
              py: 0.4,
              borderRadius: 1,
              bgcolor: 'rgba(18,35,74,0.07)',
              color: '#12234A',
              fontFamily: 'monospace',
              fontSize: 12,
              direction: 'ltr',
              maxWidth: '100%',
              overflowWrap: 'anywhere',
              ...enter(fadeUp, 0.85, 0.8),
            }}
          >
            {pathname}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mt: 4, ...enter(fadeUp, 1, 0.8) }}>
            <Button component={RouterLink} to="/" variant="contained" color="primary" startIcon={<HomeOutlinedIcon />} sx={{ px: 4, py: 1.2 }}>
              Back to Home
            </Button>
            <Button variant="outlined" onClick={goBack} startIcon={<ArrowBackIcon />} sx={{ px: 4, py: 1.2, color: 'text.primary', borderColor: '#B7C4CF' }}>
              Go back
            </Button>
          </Box>

          {/* روابط للمدن: تربط الصفحة بباقي الموقع */}
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'text.secondary', mt: 5, mb: 1.5, ...enter(fadeUp, 1.1, 0.8) }}>
            Or explore a popular destination
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
            {CITY_IDS.map((id, index) => (
              <Chip
                key={id}
                component={RouterLink}
                to={`/things-to-do/${id}`}
                clickable
                label={toLabel(id)}
                sx={{
                  bgcolor: '#fff',
                  border: '1px solid #D5E4E1',
                  fontWeight: 600,
                  fontSize: 12,
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease, color 0.3s ease',
                  '&:hover': { bgcolor: 'secondary.main', color: '#fff', transform: 'translateY(-3px)' },
                  ...enter(scaleIn, 1.2 + index * 0.06, 0.5),
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      <Footer />
      <BackToTop />
    </>
  );
};

export default NotFound;