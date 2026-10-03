import { useState } from 'react';
import { Box } from '@mui/material';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Reveal from '../common/Reveal';
import { shimmer, withMotion } from '../../styles/animations';

const MapEmbed = ({ query, title }) => {
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(false);

  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;

  return (
    <Reveal delay={0.3} duration={0.9}>
      <Box
        onMouseLeave={() => setActive(false)}
        sx={{
          position: 'relative',
          aspectRatio: '578 / 255',
          borderRadius: '8px',
          overflow: 'hidden',
          bgcolor: '#E6ECF0',
          boxShadow: '0 8px 26px rgba(31,42,55,0.12)',
          transition: 'box-shadow 0.4s ease',
          '&:hover': { boxShadow: '0 16px 40px rgba(31,42,55,0.2)' },
        }}
      >
        {/* هيكل لامع أثناء التحميل */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: loaded ? 0 : 1,
            transition: 'opacity 0.6s ease',
            background: 'linear-gradient(110deg, #E6ECF0 30%, #F4F7F9 50%, #E6ECF0 70%)',
            backgroundSize: '200% 100%',
            ...withMotion(`${shimmer} 1.4s linear infinite`),
          }}
        />

        <Box
          component="iframe"
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          onLoad={() => setLoaded(true)}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 0,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.8s ease',
            pointerEvents: active ? 'auto' : 'none',
          }}
        />

        {/* طبقة التفعيل */}
        {!active && (
          <Box
            role="button"
            tabIndex={0}
            aria-label="Activate map"
            onClick={() => setActive(true)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') setActive(true);
            }}
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'end center',
              pb: 2,
              cursor: 'pointer',
              outline: 'none',
              '&:hover .hint, &:focus-visible .hint': { opacity: 1, transform: 'translateY(0)' },
            }}
          >
            <Box
              className="hint"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.8,
                px: 2,
                py: 0.8,
                borderRadius: 8,
                color: '#fff',
                fontSize: 12,
                fontWeight: 600,
                bgcolor: 'rgba(18,35,74,0.82)',
                backdropFilter: 'blur(6px)',
                opacity: 0,
                transform: 'translateY(8px)',
                transition: 'all 0.35s ease',
                '@media (hover: none)': { opacity: 1, transform: 'none' },
              }}
            >
              <TouchAppIcon sx={{ fontSize: 16 }} />
              Tap to explore the map
            </Box>
          </Box>
        )}
      </Box>
    </Reveal>
  );
};

export default MapEmbed;