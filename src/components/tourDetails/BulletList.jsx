import { Box, Typography } from '@mui/material';
import Reveal from '../common/Reveal';

const BulletList = ({ items, accent = '#5FB3A9', delay = 0 }) => (
  <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
    {items.map((item, index) => (
      <Box component="li" key={`${item}-${index}`} sx={{ mb: 1.3 }}>
        <Reveal direction="soft" delay={delay + index * 0.07} duration={0.6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.4,
              cursor: 'default',
              '&:hover .dot': { bgcolor: accent, transform: 'scale(1.5)' },
              '&:hover .text': { transform: 'translateX(4px)', color: 'text.primary' },
            }}
          >
            <Box
              className="dot"
              sx={{
                flexShrink: 0,
                width: 6,
                height: 6,
                mt: '7px',
                borderRadius: '50%',
                bgcolor: '#4A5563',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            />
            <Typography
              className="text"
              sx={{
                fontSize: 12.5,
                lineHeight: 1.7,
                color: 'text.secondary',
                transition: 'transform 0.3s ease, color 0.3s ease',
              }}
            >
              {item}
            </Typography>
          </Box>
        </Reveal>
      </Box>
    ))}
  </Box>
);

export default BulletList;