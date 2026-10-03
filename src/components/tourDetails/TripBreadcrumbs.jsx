import { Link as RouterLink } from 'react-router-dom';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { getCityIdFromSlug } from '../../constants/cities';
import { enter, fadeDown } from '../../styles/animations';

const linkSx = { fontSize: 12, color: 'text.secondary', '&:hover': { color: 'secondary.main' } };

const TripBreadcrumbs = ({ tour }) => {
  const cityId = getCityIdFromSlug(tour.id);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon sx={{ fontSize: 16 }} />}
      sx={{ mb: 2, ...enter(fadeDown, 0.05, 0.7) }}
    >
      <Link component={RouterLink} to="/" underline="hover" sx={linkSx}>
        Home
      </Link>

      {cityId && (
        <Link component={RouterLink} to={`/things-to-do/${cityId}`} underline="hover" sx={linkSx}>
          Things to do in {tour.location}
        </Link>
      )}

      <Typography noWrap sx={{ fontSize: 12, fontWeight: 700, maxWidth: { xs: 140, sm: 320 } }}>
        {tour.title}
      </Typography>
    </Breadcrumbs>
  );
};

export default TripBreadcrumbs;