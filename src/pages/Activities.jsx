import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert, Badge, Box, Button, Container, Drawer, IconButton, Skeleton, Typography,
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { fetchCities, selectCities } from '../features/cities/citiesSlice';
import {
  fetchActivities,
  selectActivities,
  selectActivitiesError,
  selectActivitiesStatus,
} from '../features/activities/activitiesSlice';
import { DURATION_BUCKETS, PAGE_SIZE, THEMES } from '../constants/activities';
import { buildFacets, filterActivities } from '../utils/activities';
import useActivityFilters from '../hooks/useActivityFilters';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';
import BackToTop from '../components/common/BackToTop';
import ActivitiesHeader from '../components/activities/ActivitiesHeader';
import FiltersSidebar from '../components/activities/FiltersSidebar';
import ActiveFilters from '../components/activities/ActiveFilters';
import ActivityList from '../components/activities/ActivityList';
import OutsideSpecials from '../components/activities/OutsideSpecials';
import Gallery from '../components/home/Gallery/Gallery';
import Stories from '../components/home/Stories/Stories';

const Activities = () => {
  const { cityId } = useParams();
  const dispatch = useDispatch();
  const cities = useSelector(selectCities);
  const activities = useSelector(selectActivities);
  const status = useSelector(selectActivitiesStatus);
  const error = useSelector(selectActivitiesError);

  const { filters, toggle, setSort, clear } = useActivityFilters();
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // المدن (للاسم) والأنشطة: من الكاش إن وُجد
  useEffect(() => {
    if (cities.length > 0) return;
    const promise = dispatch(fetchCities());
    return () => promise.abort();
  }, [dispatch, cities.length]);

  useEffect(() => {
    const promise = dispatch(fetchActivities());
    return () => promise.abort();
  }, [dispatch]);

  const city = cities.find((item) => item.id === cityId);
  const cityItems = useMemo(() => activities.filter((item) => item.cityId === cityId), [activities, cityId]);
  const facets = useMemo(() => buildFacets(cityItems), [cityItems]);
  const results = useMemo(() => filterActivities(cityItems, filters), [cityItems, filters]);

  // أي تغيير في الفلتر أو المدينة يعيد العرض لأول 9
  const filterKey = `${cityId}|${JSON.stringify(filters)}`;
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [filterKey]);

  // شرائح الفلاتر النشطة
  const chips = [
    ...filters.theme.map((id) => ({ key: 'theme', id, label: THEMES.find((t) => t.id === id)?.label ?? id })),
    ...filters.duration.map((id) => ({ key: 'duration', id, label: DURATION_BUCKETS.find((b) => b.id === id)?.label ?? id })),
    ...filters.destination.map((id) => ({ key: 'destination', id, label: id })),
  ];

  const renderBody = () => {
    if (status === 'failed' && activities.length === 0) {
      return (
        <Alert
          severity="error"
          action={<Button color="inherit" size="small" onClick={() => dispatch(fetchActivities())}>Retry</Button>}
        >
          {error || 'Something went wrong'}
        </Alert>
      );
    }

    if (cities.length > 0 && !city) {
      return (
        <Alert
          severity="warning"
          action={<Button component={RouterLink} to="/" color="inherit" size="small">Back Home</Button>}
        >
          We could not find this destination.
        </Alert>
      );
    }

    if (!city || activities.length === 0) {
      return (
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '203px minmax(0, 1fr)' } }}>
          <Skeleton variant="rectangular" height={420} sx={{ display: { xs: 'none', md: 'block' } }} />
          <Box>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={105} sx={{ mb: 1.5 }} />
            ))}
          </Box>
        </Box>
      );
    }

    return (
      <Box sx={{ display: 'grid', gap: 3, alignItems: 'start', gridTemplateColumns: { xs: '1fr', md: '203px minmax(0, 1fr)' } }}>
        {/* الفلاتر - شاشات كبيرة */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <FiltersSidebar facets={facets} filters={filters} onToggle={toggle} />
        </Box>

        <Box>
          {/* زر الفلاتر - الجوال */}
          <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
            <Badge badgeContent={chips.length} color="secondary">
              <Button
                variant="outlined"
                startIcon={<FilterAltOutlinedIcon />}
                onClick={() => setDrawerOpen(true)}
                sx={{ bgcolor: '#fff', color: 'text.primary', borderColor: '#CBD3DA' }}
              >
                Filters
              </Button>
            </Badge>
          </Box>

          <ActiveFilters chips={chips} onRemove={toggle} onClear={clear} />

          <ActivityList
            items={results}
            visible={visible}
            onLoadMore={() => setVisible((prev) => prev + PAGE_SIZE)}
            onClear={clear}
            listKey={filterKey}
          />
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Navbar solid />

      <Box component="main">
        {/* القائمة والفلاتر: خلفية رمادية فاتحة */}
        <Box sx={{ bgcolor: '#F6F8FB' }}>
          <ActivitiesHeader
            cityName={city?.name ?? '...'}
            count={results.length}
            sort={filters.sort}
            onSortChange={setSort}
          />

          <Container maxWidth="md" sx={{ py: { xs: 3, md: 4 }, pb: { xs: 8, md: 10 } }}>
            {renderBody()}
          </Container>
        </Box>

        {/* من هنا خلفية بيضاء مثل التصميم، وتظهر فقط عند وجود المدينة */}
        {city && (
          <Box sx={{ bgcolor: '#fff' }}>
            <Container maxWidth="md" sx={{ pt: { xs: 1, md: 2 } }}>
              <OutsideSpecials cityId={cityId} items={cityItems} />
            </Container>

            <Gallery />
            <Stories title={`Latest Stories From ${city.name}`} />
          </Box>
        )}
      </Box>

      {/* درج الفلاتر - الجوال */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ '& .MuiDrawer-paper': { maxHeight: '88vh', borderRadius: '16px 16px 0 0', bgcolor: '#F6F8FB' } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pt: 1.5 }}>
          <Typography sx={{ fontWeight: 700 }}>Filters</Typography>
          <IconButton aria-label="close filters" onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ p: 2, overflowY: 'auto' }}>
          <FiltersSidebar facets={facets} filters={filters} onToggle={toggle} />
        </Box>

        <Box sx={{ p: 2, bgcolor: '#fff', boxShadow: '0 -4px 16px rgba(31,42,55,0.08)' }}>
          <Button fullWidth variant="contained" color="secondary" onClick={() => setDrawerOpen(false)} sx={{ py: 1.2, color: '#fff' }}>
            Show {results.length} results
          </Button>
        </Box>
      </Drawer>

      <Footer />
      <BackToTop />
    </>
  );
};

export default Activities;