import { useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, Container, Skeleton } from '@mui/material';
import {
  fetchTourDetails,
  selectTour,
  selectTourError,
  selectTourStatus,
} from '../features/tourDetails/tourDetailsSlice';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';
import BackToTop from '../components/common/BackToTop';
import TripHeader from '../components/tourDetails/TripHeader';
import TripGallery from '../components/tourDetails/TripGallery';
import TripHighlights from '../components/tourDetails/TripHighlights';
import BookingCard from '../components/tourDetails/BookingCard';
import TripDescription from '../components/tourDetails/TripDescription';
import TripListSection from '../components/tourDetails/TripListSection';
import TripIncluded from '../components/tourDetails/TripIncluded';
import TripDetails from '../components/tourDetails/TripDetails';
import RelatedTours from '../components/tourDetails/RelatedTours';
import Reviews from '../components/tourDetails/reviews/Reviews';
import TripBreadcrumbs from '../components/tourDetails/TripBreadcrumbs';

const TourDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tour = useSelector(selectTour);
  const status = useSelector(selectTourStatus);
  const error = useSelector(selectTourError);

  useEffect(() => {
    const promise = dispatch(fetchTourDetails(id));
    return () => promise.abort();
  }, [dispatch, id]);

  // عنوان التبويب باسم الرحلة، ويعود للأصلي عند المغادرة
  useEffect(() => {
    if (!tour) return;
    const previousTitle = document.title;
    document.title = `${tour.title} | Tour Guide`;
    return () => {
      document.title = previousTitle;
    };
  }, [tour]);

  const renderContent = () => {
    if (status === 'failed') {
      return (
        <Alert
          severity="error"
          action={
            <Button component={RouterLink} to="/" color="inherit" size="small">
              Back Home
            </Button>
          }
        >
          {error || 'Something went wrong'}
        </Alert>
      );
    }

    if (!tour) {
      return (
        <>
          <Skeleton variant="text" width="70%" height={50} />
          <Skeleton variant="text" width="30%" sx={{ mb: 3 }} />
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 278px' } }}>
            <Skeleton variant="rectangular" sx={{ aspectRatio: '578 / 345', height: 'auto' }} />
            <Skeleton variant="rectangular" height={420} />
          </Box>
        </>
      );
    }

    return (
      <>
        <TripBreadcrumbs tour={tour} />
        <TripHeader
          title={tour.title}
          location={tour.location}
          rating={tour.rating}
          reviews={tour.reviews}
        />

        <Box
  sx={{
    display: 'grid',
    gap: 3,
    alignItems: 'start',
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
    gridTemplateColumns: {
      xs: 'minmax(0, 1fr)',
      md: 'minmax(0, 1fr) 278px',
    },
  }}
>
          <Box sx={{ minWidth: 0, width: '100%' }}>
            <TripGallery images={tour.images} title={tour.title} location={tour.location} />
            <TripHighlights items={tour.highlights} />
            {/* الجزء التالي: Description, Activity, Included, Safety, Details, Meeting Point */}
            {tour.description && <TripDescription paragraphs={tour.description} />}
{tour.activity && <TripListSection title="Activity" {...tour.activity} />}
{tour.included && <TripIncluded {...tour.included} />}
{tour.safety && <TripListSection title="Safety" {...tour.safety} />}
{tour.details && <TripDetails details={tour.details} meetingPoint={tour.meetingPoint} />}
          </Box>

          {/* العمود الأيمن ثابت أثناء التمرير */}
          <Box sx={{
    position: { md: 'sticky' },
    top: 90,
    minWidth: 0,
    width: '100%',
  }}>
            <BookingCard tour={tour} />
          </Box>
        </Box>
        <RelatedTours tour={tour} />
<Reviews average={tour.rating} total={tour.reviews} />
      </>
    );
  };

  return (
    <>
      <Navbar solid />
      <Box component="main" sx={{ pt: { xs: 11, md: 14 }, pb: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">{renderContent()}</Container>
      </Box>
      <Footer />
      <BackToTop />
    </>
  );
};

export default TourDetails;