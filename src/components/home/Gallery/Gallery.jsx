import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, Container, Skeleton } from '@mui/material';
import { fetchGallery, selectGallery } from '../../../features/content/contentSlice';
import SectionHeader from '../../common/SectionHeader';
import GalleryItem from './GalleryItem';
import Lightbox from './Lightbox';

const gridSx = {
  display: 'grid',
  gap: { xs: 1.5, md: 2.8 },
  gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
};

const Gallery = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(selectGallery);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  useEffect(() => {
    const promise = dispatch(fetchGallery());
    return () => promise.abort();
  }, [dispatch]);

  const renderContent = () => {
    if (status === 'failed') {
      return (
        <Alert
          severity="error"
          action={<Button color="inherit" size="small" onClick={() => dispatch(fetchGallery())}>Retry</Button>}
        >
          {error || 'Something went wrong'}
        </Alert>
      );
    }

    if (items.length === 0) {
      return (
        <Box sx={gridSx}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" sx={{ aspectRatio: '203 / 240', height: 'auto', borderRadius: '4px' }} />
          ))}
        </Box>
      );
    }

    return (
      <Box sx={gridSx}>
        {items.map((item, index) => (
          <GalleryItem
            key={item.id}
            item={item}
            index={index}
            onOpen={(i) => setLightbox({ open: true, index: i })}
          />
        ))}
      </Box>
    );
  };

  return (
    <Box component="section" id="gallery" sx={{ pt: { xs: 8, md: 10 }, pb: { xs: 4, md: 6 } }}>
      <Container maxWidth="md">
        <SectionHeader
          title="From The Gallery"
          description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit"
          buttonLabel="View All Images"
        />
        {renderContent()}
      </Container>

      <Lightbox
        items={items}
        open={lightbox.open}
        index={lightbox.index}
        onClose={() => setLightbox((prev) => ({ ...prev, open: false }))}
        onChange={(index) => setLightbox({ open: true, index })}
      />
    </Box>
  );
};

export default Gallery;