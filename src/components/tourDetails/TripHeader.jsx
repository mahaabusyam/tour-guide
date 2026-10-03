import { Box, Divider, Rating, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { enter, fadeUp, riseUp, wipe } from '../../styles/animations';

const TripHeader = ({ title, location, rating, reviews }) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      variant="h1"
      aria-label={title}
      sx={{ fontSize: { xs: 26, md: 36 }, lineHeight: 1.3, mb: 1.5, maxWidth: 620 }}
    >
      {title.split(' ').map((word, index) => (
        <Box
          key={index}
          component="span"
          aria-hidden
          sx={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', mr: '0.25em', pb: '0.1em' }}
        >
          <Box component="span" sx={{ display: 'inline-block', ...enter(riseUp, 0.1 + index * 0.06, 0.8) }}>
            {word}
          </Box>
        </Box>
      ))}
    </Typography>

    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, ...enter(fadeUp, 0.6, 0.8) }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
        <LocationOnIcon sx={{ fontSize: 15 }} />
        <Typography sx={{ fontSize: 12 }}>{location}</Typography>
      </Box>

      <Divider orientation="vertical" flexItem sx={{ my: 0.3 }} />

      {/* النجوم تُكشف بمسح من اليسار */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
        <Box sx={enter(wipe, 0.9, 1.2)}>
          <Rating value={rating} precision={0.5} size="small" readOnly sx={{ color: '#F4A63C' }} />
        </Box>
        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>({reviews} reviews)</Typography>
      </Box>
    </Box>
  </Box>
);

export default TripHeader;