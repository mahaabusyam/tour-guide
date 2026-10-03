import { useCallback, useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Reveal from './Reveal';
import TourCard from '../home/PopularCities/TourCard';

const GAP = 24;

const arrowSx = {
  width: 40,
  height: 40,
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  '& svg': { transition: 'transform 0.3s ease' },
  '&:hover:not(:disabled)': { transform: 'scale(1.12)' },
  '&:disabled': { opacity: 0.4 },
};

// Pill ملوّنة: إن وُجد badge.to تصبح رابطاً، وينزلق فيها سهم عند الـ hover
const CategoryPill = ({ badge }) => {
  const linkProps = badge.to
    ? { component: RouterLink, to: badge.to, onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) }
    : { component: 'span' };

  return (
    <Box
      {...linkProps}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 2.2,
        py: 0.9,
        borderRadius: 8,
        bgcolor: badge.color,
        color: '#fff',
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        textDecoration: 'none',
        boxShadow: `0 6px 14px ${badge.color}66`,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
        '& .pill-arrow': {
          width: 0,
          marginLeft: 0,
          opacity: 0,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
        },
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 10px 20px ${badge.color}88`,
          '& .pill-arrow': { width: 14, marginLeft: '6px', opacity: 1 },
        },
      }}
    >
      {badge.label}
      {badge.to && <ArrowForwardIcon className="pill-arrow" sx={{ fontSize: 14 }} />}
    </Box>
  );
};

const TourCarousel = ({ title, badge, items }) => {
  const label = title ?? badge?.label ?? 'Tours';
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // تحديد هل يمكن التمرير يميناً أو يساراً
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

    // Cleanup
    return () => {
      track.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
    };
  }, [updateButtons, items.length]);

  // الأسهم تنقل صفحة كاملة (بعرض المسار)
  const scrollByPage = (direction) => {
    const track = trackRef.current;
    track?.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' });
  };

  return (
    <Box component="section" aria-label={label}>
      <Reveal direction="soft">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          {badge ? (
            <CategoryPill badge={badge} />
          ) : (
            <Typography variant="h3" sx={{ fontSize: { xs: 18, md: 20 } }}>
              {title}
            </Typography>
          )}

          <Box sx={{ display: 'flex', gap: 1.5, flexShrink: 0 }}>
            <IconButton
              aria-label={`previous ${label}`}
              onClick={() => scrollByPage(-1)}
              disabled={!canPrev}
              sx={{
                ...arrowSx,
                bgcolor: '#fff',
                border: '1px solid',
                borderColor: 'primary.main',
                boxShadow: '0 4px 14px rgba(255,216,61,0.45)',
                '&:hover:not(:disabled)': { transform: 'scale(1.12)', bgcolor: '#fff', '& svg': { transform: 'translateX(-2px)' } },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>

            <IconButton
              aria-label={`next ${label}`}
              onClick={() => scrollByPage(1)}
              disabled={!canNext}
              sx={{
                ...arrowSx,
                bgcolor: 'primary.main',
                boxShadow: '0 4px 14px rgba(255,216,61,0.6)',
                '&:hover:not(:disabled)': { transform: 'scale(1.12)', bgcolor: 'primary.main', '& svg': { transform: 'translateX(2px)' } },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Reveal>

      {/* px و mx: مساحة لظل الكروت حتى لا يُقصّ عند حواف المسار */}
      <Box
        ref={trackRef}
        sx={{
          display: 'flex',
          gap: `${GAP}px`,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          py: 3,
          px: 1,
          mx: -1,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {items.map((tour, index) => (
          <Reveal
            key={tour.slug ?? tour.id}
            delay={index < 4 ? index * 0.1 : 0}
            sx={{
              flex: {
                xs: '0 0 72%',
                sm: `0 0 calc((100% - ${GAP}px) / 2)`,
                md: `0 0 calc((100% - ${GAP * 3}px) / 4)`,
              },
              scrollSnapAlign: 'start',
            }}
          >
            <TourCard tour={tour} />
          </Reveal>
        ))}
      </Box>
    </Box>
  );
};

export default TourCarousel;