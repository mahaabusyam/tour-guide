import { Box, Card, CardMedia, Divider, Rating, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { Link as RouterLink } from 'react-router-dom';

const InfoRow = ({ Icon, text }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.primary' }}>
    <Icon sx={{ fontSize: 16 }} />
    <Typography sx={{ fontSize: 12 }}>{text}</Typography>
  </Box>
);

const TourCard = ({ tour }) => (
  <Card
  component={RouterLink}
  to={`/tours/${tour.slug ?? tour.id}`}
  elevation={2}
  sx={{
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
      borderRadius: 1,
      transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 18px 36px rgba(31,42,55,0.18)',
      },
      '&:hover img': { transform: 'scale(1.08)' },
    }}
  >
    <Box sx={{ p: 1 }}>
      {/* الإطار يقصّ الصورة عند تكبيرها */}
      <Box sx={{ overflow: 'hidden', borderRadius: 0.5 }}>
        <CardMedia
          component="img"
          loading="lazy"
          image={tour.image}
          alt={tour.title}
          sx={{ height: 135, transition: 'transform 0.6s ease' }}
        />
      </Box>
    </Box>

    <Box sx={{ px: 1.5, pb: 1.5, flexGrow: 1 }}>
      <Typography
        variant="h6"
        sx={{
          fontSize: 13,
          mb: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {tour.title}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.7 }}>
        <InfoRow Icon={AccessTimeIcon} text={tour.duration} />
        <InfoRow Icon={DirectionsCarFilledOutlinedIcon} text={tour.transport} />
        <InfoRow Icon={PeopleAltOutlinedIcon} text={tour.plan} />
      </Box>
    </Box>

    <Divider />

    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1.5, py: 1 }}>
      <Box>
        <Rating value={tour.rating} precision={0.5} size="small" readOnly sx={{ color: '#F4A63C' }} />
        <Typography sx={{ fontSize: 10, color: 'text.secondary' }}>
          {tour.reviews} reviews
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'right' }}>
        <Typography sx={{ color: 'secondary.main', fontWeight: 700, fontSize: 16 }}>
          ${tour.price.toFixed(2)}
        </Typography>
        <Typography sx={{ fontSize: 10, color: 'text.secondary' }}>per person</Typography>
      </Box>
    </Box>
  </Card>
);

export default TourCard;