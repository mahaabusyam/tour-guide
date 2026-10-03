import { Box, Typography } from '@mui/material';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import Reveal from '../common/Reveal';

const ICONS = {
  cancellation: BlockOutlinedIcon,
  health: HealthAndSafetyOutlinedIcon,
  ticket: ConfirmationNumberOutlinedIcon,
  duration: AccessTimeOutlinedIcon,
  confirmation: BoltOutlinedIcon,
  guide: RecordVoiceOverOutlinedIcon,
};

const Highlight = ({ item }) => {
  const Icon = ICONS[item.icon] ?? BoltOutlinedIcon;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        '&:hover .hl-icon': {
          bgcolor: 'secondary.main',
          color: '#fff',
          transform: 'rotate(-10deg) scale(1.12)',
        },
      }}
    >
      <Box
        className="hl-icon"
        sx={{
          flexShrink: 0,
          width: 30,
          height: 30,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          color: 'secondary.main',
          bgcolor: 'rgba(95,179,169,0.12)',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <Icon sx={{ fontSize: 17 }} />
      </Box>

      <Box>
        <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 0.5 }}>{item.title}</Typography>
        <Typography sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1.7 }}>{item.text}</Typography>
      </Box>
    </Box>
  );
};

const TripHighlights = ({ items }) => (
  <Reveal>
    <Box
      sx={{
        bgcolor: '#F7F9FB',
        border: '1px solid #E8EDF2',
        borderRadius: '4px',
        p: { xs: 2.5, md: 4 },
        display: 'grid',
        gap: 3,
        columnGap: 4,
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
      }}
    >
      {items.map((item, index) => (
        <Reveal key={item.id} delay={0.15 + index * 0.08} duration={0.6}>
          <Highlight item={item} />
        </Reveal>
      ))}
    </Box>
  </Reveal>
);

export default TripHighlights;