import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Reveal from '../common/Reveal';
import Lightbox from '../home/Gallery/Lightbox';

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const arrowSx = (side) => ({
  position: 'absolute',
  top: '50%',
  [side]: 12,
  color: '#fff',
  bgcolor: 'rgba(15,25,40,0.45)',
  backdropFilter: 'blur(6px)',
  opacity: 0,
  transform: 'translateY(-50%) scale(0.8)',
  transition: 'all 0.35s ease',
  '&:hover': { bgcolor: 'rgba(15,25,40,0.7)', transform: 'translateY(-50%) scale(1.1)' },
  '&:focus-visible': { opacity: 1, transform: 'translateY(-50%) scale(1)' },
  // على اللمس لا يوجد hover، فتبقى الأسهم ظاهرة
  '@media (hover: none)': { opacity: 1, transform: 'translateY(-50%) scale(1)' },
});

const TripGallery = ({ images, title, location }) => {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const thumbsRef = useRef(null);
  const total = images.length;

  const lightboxItems = useMemo(
    () => images.map((image, i) => ({ id: i, image, title, location })),
    [images, title, location]
  );

  const go = (next) => setIndex((next + total) % total);

  // تمرير شريط المصغرات (هو فقط، وليس الصفحة) ليتمركز المختار
  useEffect(() => {
    const container = thumbsRef.current;
    const thumb = container?.children[index];
    if (!container || !thumb) return;

    container.scrollTo({
      left: thumb.offsetLeft - (container.clientWidth - thumb.clientWidth) / 2,
      behavior: 'smooth',
    });
  }, [index]);

  const stop = (event) => event.stopPropagation();

  return (
    <Box sx={{ mb: 3 }}>
      <Reveal>
        <Box
          role="button"
          tabIndex={0}
          aria-label="Open image viewer"
          onClick={() => setLightboxOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') setLightboxOpen(true);
          }}
          sx={{
            position: 'relative',
            aspectRatio: '578 / 345',
            borderRadius: '4px',
            overflow: 'hidden',
            bgcolor: '#D9E4E8',
            cursor: 'zoom-in',
            outline: 'none',
            boxShadow: '0 10px 30px rgba(31,42,55,0.12)',
            '&:focus-visible': { outline: '3px solid #FFD83D' },
            '&:hover .nav-arrow': { opacity: 1, transform: 'translateY(-50%) scale(1)' },
            '&:hover .zoom-hint': { opacity: 1, transform: 'translateY(0)' },
          }}
        >
          {images.map((src, i) => (
            <Box
              key={`${src}-${i}`}
              component="img"
              src={src}
              alt={`${title} - image ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: i === index ? 1 : 0,
                transform: i === index ? 'scale(1)' : 'scale(1.08)',
                transition: `opacity 0.8s ease, transform 1.4s ${EASE}`,
              }}
            />
          ))}

          <Box
            aria-hidden
            sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 70%, rgba(10,20,35,0.5))' }}
          />

          <IconButton
            className="nav-arrow"
            aria-label="previous image"
            onClick={(event) => { stop(event); go(index - 1); }}
            sx={arrowSx('left')}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            className="nav-arrow"
            aria-label="next image"
            onClick={(event) => { stop(event); go(index + 1); }}
            sx={arrowSx('right')}
          >
            <ChevronRightIcon />
          </IconButton>

          {/* العدّاد وتلميح التكبير */}
          <Box
            className="zoom-hint"
            sx={{
              position: 'absolute',
              right: 12,
              bottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 0.6,
              px: 1.4,
              py: 0.5,
              borderRadius: 8,
              color: '#fff',
              bgcolor: 'rgba(15,25,40,0.5)',
              backdropFilter: 'blur(6px)',
              opacity: 0.9,
              transition: 'all 0.35s ease',
            }}
          >
            <ZoomInIcon sx={{ fontSize: 14 }} />
            <Typography sx={{ fontSize: 11, fontWeight: 700 }}>
              {index + 1} / {total}
            </Typography>
          </Box>
        </Box>
      </Reveal>

      {/* المصغرات */}
      <Box
        ref={thumbsRef}
        sx={{
          position: 'relative',
          display: 'flex',
          gap: 1,
          pt: 1.2,
          pb: 0.5,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {images.map((src, i) => {
          const active = i === index;
          return (
            <Reveal
              key={`${src}-${i}`}
              delay={0.2 + i * 0.07}
              duration={0.6}
              sx={{ flex: '0 0 auto', width: { xs: 80, md: 'calc((100% - 40px) / 6)' } }}
            >
              <Box
                component="button"
                type="button"
                aria-label={`Show image ${i + 1}`}
                aria-current={active}
                onClick={() => setIndex(i)}
                sx={{
                  display: 'block',
                  width: '100%',
                  aspectRatio: '90 / 75',
                  p: 0,
                  border: '3px solid',
                  borderColor: active ? 'secondary.main' : 'transparent',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  bgcolor: 'transparent',
                  opacity: active ? 1 : 0.8,
                  transform: active ? 'translateY(-3px)' : 'none',
                  boxShadow: active ? '0 8px 18px rgba(95,179,169,0.45)' : 'none',
                  transition: 'all 0.35s ease',
                  '&:hover': { opacity: 1, transform: 'translateY(-3px)' },
                  '&:hover img': { transform: 'scale(1.1)' },
                }}
              >
                <Box
                  component="img"
                  src={src}
                  alt=""
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                />
              </Box>
            </Reveal>
          );
        })}
      </Box>

      <Lightbox
        items={lightboxItems}
        open={lightboxOpen}
        index={index}
        onClose={() => setLightboxOpen(false)}
        onChange={setIndex}
      />
    </Box>
  );
};

export default TripGallery;