import { Link as RouterLink } from 'react-router-dom';
import { Box, Divider, Rating, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { PAGE_SIZE, THEMES } from '../../constants/activities';
import { formatDuration } from '../../utils/activities';
import { formatPrice } from '../../utils/format';
import Reveal from '../common/Reveal';

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const Info = ({ Icon, text }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
    <Icon sx={{ fontSize: 15 }} />
    <Typography sx={{ fontSize: 12 }}>{text}</Typography>
  </Box>
);

const ActivityCard = ({ activity, index }) => {
  const badge = THEMES.find((theme) => theme.id === activity.themes[0])?.label ?? 'Activity';

  return (
    <Reveal direction="soft" delay={(index % PAGE_SIZE) * 0.06} duration={0.6}>
      <Box
        component={RouterLink}
        to={`/tours/${activity.id}`}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '96px 1fr', sm: '113px 1fr auto' },
          gap: { xs: 1.5, sm: 2.5 },
          alignItems: 'stretch',
          bgcolor: '#fff',
          borderRadius: '2px',
          overflow: 'hidden',
          textDecoration: 'none',
          color: 'inherit',
          boxShadow: '0 3px 14px rgba(31,42,55,0.06)',
          transition: `transform 0.4s ${EASE}, box-shadow 0.4s ease`,
          '&:hover, &:focus-visible': {
            transform: 'translateY(-3px)',
            boxShadow: '0 14px 30px rgba(31,42,55,0.14)',
          },
          '&:focus-visible': { outline: '3px solid #FFD83D' },
          '&:hover img': { transform: 'scale(1.1)' },
          '&:hover .act-title': { color: 'secondary.main' },
        }}
      >
        <Box sx={{ overflow: 'hidden', minHeight: { xs: 96, sm: 105 } }}>
          <Box
            component="img"
            src={activity.image}
            alt={activity.title}
            loading="lazy"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: `transform 0.7s ${EASE}` }}
          />
        </Box>

        <Box sx={{ py: 1.5, pr: { xs: 1.5, sm: 0 }, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.2, mb: 0.8 }}>
            <Box
              component="span"
              sx={{
                px: 1.2,
                py: 0.3,
                borderRadius: 8,
                bgcolor: '#7BBFB0',
                color: '#fff',
                fontSize: 9.5,
                fontWeight: 800,
                letterSpacing: 0.4,
                textTransform: 'uppercase',
              }}
            >
              {badge}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Rating value={activity.rating} precision={0.5} readOnly size="small" sx={{ color: '#F4A63C', fontSize: 14 }} />
              <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>({activity.reviews} reviews)</Typography>
            </Box>
          </Box>

          <Typography
            className="act-title"
            variant="h6"
            sx={{
              fontSize: { xs: 14, sm: 16 },
              lineHeight: 1.4,
              mb: 1.2,
              transition: 'color 0.3s ease',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {activity.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.3, color: 'text.secondary' }}>
            <Info Icon={AccessTimeIcon} text={formatDuration(activity.hours)} />
            <Divider orientation="vertical" flexItem sx={{ my: 0.3 }} />
            <Info Icon={DirectionsCarFilledOutlinedIcon} text="Transport" />
            <Divider orientation="vertical" flexItem sx={{ my: 0.3 }} />
            <Info Icon={PeopleAltOutlinedIcon} text="Family Plan" />
          </Box>
        </Box>

        <Box
          sx={{
            gridColumn: { xs: '1 / -1', sm: 'auto' },
            alignSelf: 'center',
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'column' },
            alignItems: { xs: 'baseline', sm: 'flex-end' },
            justifyContent: { xs: 'flex-end', sm: 'center' },
            gap: { xs: 0.8, sm: 0 },
            px: 2.5,
            pb: { xs: 1.2, sm: 0 },
          }}
        >
          <Typography sx={{ color: 'secondary.main', fontWeight: 700, fontSize: 17 }}>
            {formatPrice(activity.price)}
          </Typography>
          <Typography sx={{ fontSize: 10, color: 'text.secondary' }}>per person</Typography>
        </Box>
      </Box>
    </Reveal>
  );
};

export default ActivityCard;