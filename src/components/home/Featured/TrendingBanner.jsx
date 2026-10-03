import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Container, Divider, IconButton, Rating, Snackbar, Typography,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { toggleFavorite, selectFavoriteIds } from '../../../features/favorites/favoritesSlice';
import { pulseGlow, pop, withMotion } from '../../../styles/animations';
import Reveal from '../../common/Reveal';
import BlobImage from './BlobImage';

const glassButton = {
  bgcolor: 'rgba(255,255,255,0.25)',
  color: '#fff',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255,255,255,0.35)',
  transition: 'all 0.3s ease',
  '&:hover': { bgcolor: 'rgba(255,255,255,0.4)', transform: 'translateY(-3px)' },
};

const TrendingBanner = ({ item }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectFavoriteIds).includes(item.id);
  const [message, setMessage] = useState('');

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: item.title, text: item.description, url });
      } else {
        await navigator.clipboard.writeText(url);
        setMessage('Link copied to clipboard');
      }
    } catch {
      // المستخدم أغلق نافذة المشاركة، لا مشكلة
    }
  };

  return (
    <Box component="section" sx={{ position: 'relative', overflow: 'hidden', py: { xs: 8, md: 10 }, color: '#fff' }}>
      {/* خلفية: الصورة نفسها بعد تمويهها */}
      <Box
        sx={{
          position: 'absolute',
          inset: '-30px',
          backgroundImage: `url(${item.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(14px)',
        }}
      />
      {/* تدرّج اللون البنفسجي إلى التركوازي */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(110deg, rgba(155,95,165,0.92) 0%, rgba(90,130,185,0.85) 50%, rgba(20,176,181,0.92) 100%)',
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 6, md: 8 },
        }}
      >
        <Reveal direction="left" duration={0.9}>
          <BlobImage src={item.image} alt={item.title} />
        </Reveal>

        <Box sx={{ maxWidth: 420 }}>
          <Reveal delay={0.1}>
            <Box
              sx={{
                display: 'inline-block',
                px: 1.5, py: 0.5, mb: 1.5,
                borderRadius: 2,
                bgcolor: '#B8F5E6',
                color: '#0B5C57',
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 0.6,
                textTransform: 'uppercase',
              }}
            >
              {item.badge}
            </Box>
          </Reveal>

          <Reveal delay={0.2}>
            <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 38 }, textShadow: '0 2px 12px rgba(0,0,0,0.25)' }}>
              {item.title}
            </Typography>
          </Reveal>

          <Reveal delay={0.3}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, my: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocationOnIcon sx={{ fontSize: 16 }} />
                <Typography sx={{ fontSize: 12 }}>{item.location}</Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.5)' }} />
              <Rating value={item.rating} precision={0.1} size="small" readOnly sx={{ color: '#FFB84D' }} />
              <Typography sx={{ fontSize: 12 }}>
                {item.rating} ({item.reviews} reviews)
              </Typography>
            </Box>
          </Reveal>

          <Reveal delay={0.4}>
            <Typography sx={{ fontSize: 13, lineHeight: 1.9, mb: 4, opacity: 0.95 }}>
              {item.description}
            </Typography>
          </Reveal>

          <Reveal delay={0.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  px: 7, py: 1.3, borderRadius: 2,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  ...withMotion(`${pulseGlow} 2.4s ease-out infinite`),
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 10px 24px rgba(255,216,61,0.55)',
                    animation: 'none',
                  },
                }}
              >
                Book Now
              </Button>

              <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.4)', my: 1 }} />

              <IconButton
                aria-label={isFavorite ? 'remove from favorites' : 'add to favorites'}
                onClick={() => dispatch(toggleFavorite(item.id))}
                sx={glassButton}
              >
                <FavoriteIcon
                  fontSize="small"
                  sx={{
                    color: isFavorite ? '#FF6B8B' : 'inherit',
                    transition: 'color 0.3s',
                    animation: isFavorite ? `${pop} 0.4s ease` : 'none',
                  }}
                />
              </IconButton>

              <IconButton aria-label="share" onClick={handleShare} sx={glassButton}>
                <ShareIcon fontSize="small" />
              </IconButton>
            </Box>
          </Reveal>
        </Box>
      </Container>

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={2500}
        onClose={() => setMessage('')}
        message={message}
      />
    </Box>
  );
};

export default TrendingBanner;