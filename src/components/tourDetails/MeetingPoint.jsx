import { Box, Link, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Reveal from '../common/Reveal';
import BulletList from './BulletList';
import MapEmbed from './MapEmbed';

const MeetingPoint = ({ address, mapQuery }) => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  return (
    <Box sx={{ mt: 4.5 }}>
      <Reveal direction="soft">
        <Typography variant="h6" sx={{ fontSize: 13, mb: 1.5 }}>
          Meeting Point Address
        </Typography>
      </Reveal>

      <BulletList items={[address]} />

      <Reveal direction="soft" delay={0.2}>
        <Link
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          underline="always"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            my: 2,
            fontSize: 12,
            fontWeight: 700,
            color: 'secondary.main',
            transition: 'color 0.3s ease',
            '& svg': { transition: 'transform 0.3s ease' },
            '&:hover': { color: '#3F8F85', '& svg': { transform: 'translate(3px, -3px)' } },
          }}
        >
          Open In Google Maps
          <OpenInNewIcon sx={{ fontSize: 14 }} />
        </Link>
      </Reveal>

      <MapEmbed query={mapQuery} title="Meeting point map" />
    </Box>
  );
};

export default MeetingPoint;