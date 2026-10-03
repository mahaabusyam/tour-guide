import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, Skeleton } from '@mui/material';
import {
  fetchCities,
  selectCities,
  selectCitiesError,
  selectCitiesStatus,
} from '../../features/cities/citiesSlice';
import { getRelatedSections } from '../../utils/relatedTours';
import TourCarousel from '../common/TourCarousel';
import SectionDivider from './SectionDivider';

const RelatedTours = ({ tour }) => {
  const dispatch = useDispatch();
  const cities = useSelector(selectCities);
  const status = useSelector(selectCitiesStatus);
  const error = useSelector(selectCitiesError);

  // نجلب المدن فقط إن لم تكن محمّلة (من الصفحة الرئيسية مثلاً)
  useEffect(() => {
    if (cities.length > 0) return;

    const promise = dispatch(fetchCities());
    return () => promise.abort();
  }, [dispatch, cities.length]);

  // تُعاد الحسبة فقط عند تغيّر المدن أو الرحلة
  const sections = useMemo(() => getRelatedSections(cities, tour), [cities, tour]);

  if (cities.length === 0) {
    if (status === 'failed') {
      return (
        <Alert
          severity="error"
          sx={{ mt: 6 }}
          action={<Button color="inherit" size="small" onClick={() => dispatch(fetchCities())}>Retry</Button>}
        >
          {error || 'Something went wrong'}
        </Alert>
      );
    }

    return (
      <Box sx={{ mt: 6 }}>
        <Skeleton variant="text" width={240} height={36} />
        <Box sx={{ display: 'grid', gap: 3, mt: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={290} />
          ))}
        </Box>
      </Box>
    );
  }

  if (sections.length === 0) return null;

  return (
    <Box sx={{ mt: { xs: 5, md: 7 } }}>
      {sections.map((section) => (
        <Box key={section.id}>
          <SectionDivider />
          <TourCarousel title={section.title} items={section.tours} />
        </Box>
      ))}
    </Box>
  );
};

export default RelatedTours;