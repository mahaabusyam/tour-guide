import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Container, Skeleton } from '@mui/material';
import {
  fetchFeatured,
  selectTrending,
  selectDestinations,
  selectFeaturedStatus,
  selectFeaturedError,
} from '../../../features/featured/featuredSlice';
import TrendingBanner from './TrendingBanner';
import FeaturedDestinations from './FeaturedDestinations';

const Featured = () => {
  const dispatch = useDispatch();
  const trending = useSelector(selectTrending);
  const destinations = useSelector(selectDestinations);
  const status = useSelector(selectFeaturedStatus);
  const error = useSelector(selectFeaturedError);

  useEffect(() => {
    const promise = dispatch(fetchFeatured());
    return () => promise.abort();
  }, [dispatch]);

  if (status === 'failed') {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Alert
          severity="error"
          action={<Button color="inherit" size="small" onClick={() => dispatch(fetchFeatured())}>Retry</Button>}
        >
          {error || 'Something went wrong'}
        </Alert>
      </Container>
    );
  }

  if (!trending) {
    return <Skeleton variant="rectangular" height={480} />;
  }

  return (
    <>
      <TrendingBanner item={trending} />
      <FeaturedDestinations items={destinations} />
    </>
  );
};

export default Featured;