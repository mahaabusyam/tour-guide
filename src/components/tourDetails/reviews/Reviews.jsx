import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, Link, Skeleton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import {
  fetchReviews,
  selectReviews,
  selectReviewsError,
  selectReviewsStatus,
  selectReviewsSummary,
} from '../../../features/reviews/reviewsSlice';
import { DEFAULT_FILTERS, PAGE_SIZE } from '../../../constants/reviews';
import { filterReviews } from '../../../utils/reviews';
import useDebouncedValue from '../../../hooks/useDebouncedValue';
import { nudge, withMotion } from '../../../styles/animations';
import Reveal from '../../common/Reveal';
import SectionDivider from '../SectionDivider';
import ReviewSummary from './ReviewSummary';
import ReviewFilters from './ReviewFilters';
import ReviewItem from './ReviewItem';

const Reviews = ({ average, total }) => {
  const dispatch = useDispatch();
  const summary = useSelector(selectReviewsSummary);
  const items = useSelector(selectReviews);
  const status = useSelector(selectReviewsStatus);
  const error = useSelector(selectReviewsError);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const debouncedQuery = useDebouncedValue(filters.query.trim().toLowerCase());

  useEffect(() => {
    const promise = dispatch(fetchReviews());
    return () => promise.abort();
  }, [dispatch]);

  const { sort, type, rating } = filters;
  const results = useMemo(
    () => filterReviews(items, { sort, type, rating, query: debouncedQuery }),
    [items, sort, type, rating, debouncedQuery]
  );

  const handleChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setVisible(PAGE_SIZE); // أي تغيير في الفلتر يبدأ العرض من أول 5
  };

  const handleClear = () => {
    setFilters(DEFAULT_FILTERS);
    setVisible(PAGE_SIZE);
  };

  const hasActiveFilter = type !== 'all' || rating !== 'all' || filters.query.trim() !== '';
  const shown = results.slice(0, visible);
  const hasMore = results.length > shown.length;

  const renderBody = () => {
    if (status === 'failed') {
      return (
        <Alert
          severity="error"
          action={<Button color="inherit" size="small" onClick={() => dispatch(fetchReviews())}>Retry</Button>}
        >
          {error || 'Something went wrong'}
        </Alert>
      );
    }

    if (!summary) {
      return (
        <>
          <Skeleton variant="text" width={220} height={70} />
          <Skeleton variant="rectangular" height={56} sx={{ my: 3 }} />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={110} sx={{ mb: 2 }} />
          ))}
        </>
      );
    }

    return (
      <>
       <ReviewSummary
  average={average ?? summary.average}
  total={total ?? summary.total}
  categories={summary.categories}
/>

        <Reveal direction="soft">
          <ReviewFilters
            filters={filters}
            onChange={handleChange}
            onClear={handleClear}
            active={hasActiveFilter}
          />
        </Reveal>

        <Typography aria-live="polite" sx={{ fontSize: 12, color: 'text.secondary', mt: 2 }}>
          Showing {shown.length} of {results.length} reviews
        </Typography>

        {results.length === 0 ? (
          <Reveal>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <SearchOffIcon sx={{ fontSize: 48, color: '#C4CDD5', mb: 1 }} />
              <Typography sx={{ fontSize: 14, color: 'text.secondary', mb: 1.5 }}>
                No reviews match your filters
              </Typography>
              <Button size="small" onClick={handleClear} sx={{ color: 'secondary.main' }}>
                Clear filters
              </Button>
            </Box>
          </Reveal>
        ) : (
          <Box>
            {shown.map((review, index) => (
              <ReviewItem key={review.id} review={review} index={index} />
            ))}
          </Box>
        )}

        {hasMore && (
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Link
              component="button"
              type="button"
              underline="always"
              onClick={() => setVisible((prev) => prev + PAGE_SIZE)}
              aria-label={`View ${Math.min(PAGE_SIZE, results.length - shown.length)} more comments`}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.4,
                fontSize: 12,
                fontWeight: 700,
                color: 'secondary.main',
                transition: 'color 0.3s ease',
                '&:hover': { color: '#3F8F85' },
              }}
            >
              View More Comments
              <ExpandMoreIcon sx={{ fontSize: 16, ...withMotion(`${nudge} 1.6s ease-in-out infinite`) }} />
            </Link>
          </Box>
        )}
      </>
    );
  };

  return (
    <Box component="section" id="reviews" sx={{ mt: { xs: 1, md: 2 } }}>
      <SectionDivider />

      <Reveal direction="soft">
        <Typography variant="h3" sx={{ fontSize: 20, mb: 2 }}>
          Customer Review
        </Typography>
      </Reveal>

      {renderBody()}
    </Box>
  );
};

export default Reviews;