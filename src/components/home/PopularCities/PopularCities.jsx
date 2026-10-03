import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, Container, Skeleton, Typography } from '@mui/material';
import {
  fetchCities,
  selectCity,
  selectCities,
  selectCitiesStatus,
  selectCitiesError,
  selectSelectedCity,
} from '../../../features/cities/citiesSlice';
import { saveToStorage } from '../../../utils/storage';
import Reveal from '../../common/Reveal';
import CityTabs from './CityTabs';
import CityHero from './CityHero';
import TourCard from './TourCard';

const PopularCities = () => {
  const dispatch = useDispatch();
  const cities = useSelector(selectCities);
  const status = useSelector(selectCitiesStatus);
  const error = useSelector(selectCitiesError);
  const selectedCity = useSelector(selectSelectedCity);
  const selectedCityId = selectedCity?.id;

  useEffect(() => {
    const promise = dispatch(fetchCities());
    return () => promise.abort();
  }, [dispatch]);

  useEffect(() => {
    if (selectedCityId) saveToStorage('selectedCityId', selectedCityId);
  }, [selectedCityId]);

  const renderContent = () => {
    if (status === 'loading' || status === 'idle') {
      return <Skeleton variant="rectangular" height={500} />;
    }

    if (status === 'failed') {
      return (
        <Alert
          severity="error"
          action={<Button color="inherit" size="small" onClick={() => dispatch(fetchCities())}>Retry</Button>}
        >
          {error || 'Something went wrong'}
        </Alert>
      );
    }

    if (!selectedCity) return null;

    return (
      <>
        <CityTabs
          cities={cities}
          selectedId={selectedCity.id}
          onSelect={(id) => dispatch(selectCity(id))}
        />

        {/* key: يُعاد إنشاء المكوّن عند تغيير المدينة فتتكرر حركة الدخول */}
        <CityHero key={selectedCity.id} city={selectedCity} />

        {selectedCity.tours.length === 0 ? (
          <Reveal key={`empty-${selectedCity.id}`}>
            <Typography align="center" color="text.secondary" sx={{ py: 6 }}>
              No tours available for this city yet.
            </Typography>
          </Reveal>
        ) : (
          <Box
            key={`tours-${selectedCity.id}`}
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            }}
          >
            {selectedCity.tours.map((tour, index) => (
              <Reveal key={tour.id} delay={index * 0.1} sx={{ height: '100%' }}>
                <TourCard tour={tour} />
              </Reveal>
            ))}
          </Box>
        )}
      </>
    );
  };

  return (
    <Box id="destinations" component="section" sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Reveal>
          <Typography variant="h3" align="center" sx={{ fontSize: { xs: 26, md: 32 }, mb: 2 }}>
            Explore Popular Cities
          </Typography>
          <Typography
            align="center"
            sx={{ maxWidth: 480, mx: 'auto', mb: 4, fontSize: 13, color: 'text.secondary', lineHeight: 1.8 }}
          >
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            Velit officia consequat duis enim velit mollit
          </Typography>
        </Reveal>

        {renderContent()}
      </Container>
    </Box>
  );
};

export default PopularCities;