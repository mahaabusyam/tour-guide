import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Reveal from '../../common/Reveal';

const GalleryItem = ({ item, index, onOpen }) => {
  const [loaded, setLoaded] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen(index);
    }
  };

  // تأخير متدرج: حسب العمود، ثم زيادة بسيطة للصف الثاني
  const delay = (index % 4) * 0.12 + Math.floor(index / 4) * 0.1;

  return (
    <Reveal delay={delay} duration={0.8}>
      <Box
        role="button"
        tabIndex={0}
        aria-label={`Open ${item.title}`}
        onClick={() => onOpen(index)}
        onKeyDown={handleKeyDown}
        sx={{
          position: 'relative',
          aspectRatio: '203 / 240',
          borderRadius: '4px',
          overflow: 'hidden',
          cursor: 'zoom-in',
          bgcolor: '#E8EDF2',
          boxShadow: '0 2px 8px rgba(31,42,55,0.08)',
          outline: 'none',
          transition: 'box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          '&:hover, &:focus-visible': {
            transform: 'translateY(-6px)',
            boxShadow: '0 22px 44px rgba(31,42,55,0.28)',
          },
          '&:focus-visible': { outline: '3px solid #FFD83D' },
          '&:hover img, &:focus-visible img': { transform: 'scale(1.12)' },
          '&:hover .overlay, &:focus-visible .overlay': { opacity: 1 },
          '&:hover .zoom, &:focus-visible .zoom': { opacity: 1, transform: 'scale(1)' },
          '&:hover .caption, &:focus-visible .caption': { opacity: 1, transform: 'translateY(0)' },
        }}
      >
        <Box
          component="img"
          src={item.image}
          alt={item.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: loaded ? 1 : 0,
            filter: loaded ? 'blur(0)' : 'blur(14px)',
            transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease, filter 0.6s ease',
          }}
        />

        {/* تعتيم متدرج */}
        <Box
          className="overlay"
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            background: 'linear-gradient(to top, rgba(15,25,40,0.8), rgba(15,25,40,0.1) 60%)',
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* أيقونة التكبير */}
        <Box
          className="zoom"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            mt: -3,
            ml: -3,
            width: 48,
            height: 48,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'rgba(255,255,255,0.95)',
            color: 'text.primary',
            opacity: 0,
            transform: 'scale(0.5)',
            transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <ZoomInIcon />
        </Box>

        {/* العنوان */}
        <Box
          className="caption"
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            p: 1.8,
            color: '#fff',
            opacity: 0,
            transform: 'translateY(14px)',
            transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.05s',
          }}
        >
          <Typography variant="h6" sx={{ fontSize: 13, color: '#fff' }}>{item.title}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, opacity: 0.85 }}>
            <LocationOnIcon sx={{ fontSize: 12 }} />
            <Typography sx={{ fontSize: 11 }}>{item.location}</Typography>
          </Box>
        </Box>
      </Box>
    </Reveal>
  );
};

export default GalleryItem;