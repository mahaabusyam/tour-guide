import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Reveal from '../../common/Reveal';
import TourCard from '../PopularCities/TourCard';

const CARD_WIDTH = 210;
const GAP = 24;

const FeaturedDestinations = ({ items }) => {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // تحديث حالة الأسهم حسب موضع التمرير
  const updateButtons = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateButtons();
    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);

    // Cleanup: إزالة المستمعين
    return () => {
      track.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
    };
  }, [updateButtons, items.length]);

  const scrollByCards = (direction) => {
    trackRef.current?.scrollBy({
      left: direction * (CARD_WIDTH + GAP) * 2,
      behavior: 'smooth',
    });
  };

  const arrowSx = {
    width: 42,
    height: 42,
    transition: 'all 0.3s ease',
    '&:hover:not(:disabled)': { transform: 'scale(1.12)' },
    '&:disabled': { opacity: 0.4 },
  };

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="md">
        <Reveal>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ maxWidth: 420 }}>
              <Typography variant="h3" sx={{ fontSize: { xs: 26, md: 32 }, mb: 2 }}>
                Featured Destinations
              </Typography>
              <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.8 }}>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                Velit officia consequat duis enim velit mollit
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5, flexShrink: 0 }}>
              <IconButton
                aria-label="previous"
                onClick={() => scrollByCards(-1)}
                disabled={!canPrev}
                sx={{
                  ...arrowSx,
                  bgcolor: '#fff',
                  border: '1px solid',
                  borderColor: 'primary.main',
                  boxShadow: '0 4px 14px rgba(255,216,61,0.45)',
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                aria-label="next"
                onClick={() => scrollByCards(1)}
                disabled={!canNext}
                sx={{
                  ...arrowSx,
                  bgcolor: 'primary.main',
                  boxShadow: '0 4px 14px rgba(255,216,61,0.6)',
                  '&:hover:not(:disabled)': { transform: 'scale(1.12)', bgcolor: 'primary.main' },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
          </Box>
        </Reveal>
      </Container>

      {/* المسار: يمتد لحافة الشاشة اليمنى، وبداية الكروت تتماشى مع العنوان */}
      <Box
        ref={trackRef}
        sx={{
          display: 'flex',
          gap: `${GAP}px`,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          py: 4, // مساحة لارتفاع الكرت وظله عند الـ hover
          pl: 'max(24px, calc((100% - 900px) / 2 + 24px))',
          scrollPaddingLeft: 'max(24px, calc((100% - 900px) / 2 + 24px))',
          pr: 3,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {items.map((tour, index) => (
          <Reveal
            key={tour.id}
            direction="right"
            delay={index < 5 ? index * 0.1 : 0}
            sx={{ flex: '0 0 auto', width: { xs: 200, md: CARD_WIDTH }, scrollSnapAlign: 'start' }}
          >
            <TourCard tour={tour} />
          </Reveal>
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedDestinations;