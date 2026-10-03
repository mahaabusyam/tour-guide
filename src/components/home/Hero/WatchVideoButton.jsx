import { Box, IconButton, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ripple, withMotion } from '../../../styles/animations';

const WatchVideoButton = ({ onClick }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2.5 }}>
    <Box sx={{ position: 'relative', width: 44, height: 44 }}>
      {/* حلقتان موجيتان تتتابعان */}
      {[0, 1.2].map((delay) => (
        <Box
          key={delay}
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.55)',
            ...withMotion(`${ripple} 2.4s ease-out ${delay}s infinite`),
          }}
        />
      ))}

      <IconButton
        onClick={onClick}
        aria-label="watch video"
        sx={{
          position: 'relative',
          width: 44,
          height: 44,
          bgcolor: '#fff',
          color: 'secondary.main',
          boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          '& svg': { transition: 'transform 0.3s ease' },
          '&:hover': { bgcolor: '#fff', transform: 'scale(1.14)', '& svg': { transform: 'scale(1.2)' } },
        }}
      >
        <PlayArrowIcon />
      </IconButton>
    </Box>

    <Typography sx={{ fontWeight: 700, fontSize: 18 }}>Watch Video</Typography>
  </Box>
);

export default WatchVideoButton;