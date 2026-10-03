import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, Container, Skeleton } from '@mui/material';
import { fetchStories, selectStories } from '../../../features/content/contentSlice';
import SectionHeader from '../../common/SectionHeader';
import Reveal from '../../common/Reveal';
import StoryCard from './StoryCard';

const gridSx = {
  display: 'grid',
  gap: 3,
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
};

const Stories = ({ title = 'Latest Stories' }) => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(selectStories);

  useEffect(() => {
    const promise = dispatch(fetchStories());
    return () => promise.abort();
  }, [dispatch]);

  const renderContent = () => {
    if (status === 'failed') {
      return (
        <Alert
          severity="error"
          action={<Button color="inherit" size="small" onClick={() => dispatch(fetchStories())}>Retry</Button>}
        >
          {error || 'Something went wrong'}
        </Alert>
      );
    }

    if (items.length === 0) {
      return (
        <Box sx={gridSx}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={260} sx={{ borderRadius: '8px' }} />
          ))}
        </Box>
      );
    }

    return (
      <Box sx={gridSx}>
        {items.map((story, index) => (
          <Reveal key={story.id} delay={index * 0.12} sx={{ height: '100%' }}>
            <StoryCard story={story} />
          </Reveal>
        ))}
      </Box>
    );
  };

  return (
    <Box component="section" id="stories" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <SectionHeader
          title={title}
          description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit"
          buttonLabel="View All Posts"
        />
        {renderContent()}
      </Container>
    </Box>
  );
};

export default Stories;