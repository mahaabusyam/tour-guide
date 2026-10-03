import { Box, Paper, Typography , Button} from '@mui/material';

import { TOUR_CATEGORIES } from '../../../constants/tourCategories';
import useInView from '../../../hooks/useInView';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const noMotion = {
  '@media (prefers-reduced-motion: reduce)': { transition: 'none', opacity: 1, transform: 'none' },
};

// غلاف خارجي للظهور، وPaper داخلي للـ hover: حتى لا يتعارضا
const CategoryChip = ({ label, Icon, color, visible, delay }) => (
  <Box
    sx={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'scale(1)' : 'scale(0.6)',
      transition: `opacity 0.5s ease ${delay}s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
      ...noMotion,
    }}
  >
    <Paper
      elevation={1}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.7,
        px: 1.5,
        py: 0.8,
        color,
        cursor: 'default',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '& svg': { transition: 'transform 0.3s ease' },
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: 3,
          '& svg': { transform: 'rotate(-12deg) scale(1.2)' },
        },
      }}
    >
      <Icon sx={{ fontSize: 16 }} />
      <Typography sx={{ fontSize: 11, fontWeight: 700 }}>{label}</Typography>
    </Paper>
  </Box>
);

const CityHero = ({ city }) => {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <Box ref={ref} sx={{ mb: 4 }}>
      {/* الصورة: تستقر من تكبير إلى حجمها الطبيعي */}
      <Box sx={{ overflow: 'hidden', height: { xs: 220, md: 375 }, bgcolor: '#DCE7EE' }}>
        <Box
          component="img"
          src={city.image}
          alt={city.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: inView ? 1 : 0.4,
            transform: inView ? 'scale(1)' : 'scale(1.2)',
            transition: `transform 1.6s ${EASE}, opacity 1s ease`,
            ...noMotion,
          }}
        />
      </Box>

      {/* البطاقة: تصعد من الأسفل بعد الصورة */}
      <Box
        sx={{
          position: 'relative',
          mt: { xs: -6, md: -8 },
          mx: { xs: 1, md: 3 },
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(50px)',
          transition: `opacity 0.8s ease 0.3s, transform 0.9s ${EASE} 0.3s`,
          ...noMotion,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, md: 5 },
            bgcolor: '#F9FCFE',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box sx={{ maxWidth: 340 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: 36, md: 48 }, mb: 2 }}>
              {city.name}
            </Typography>
            <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.8 }}>
              {city.description}
            </Typography>
            <Button
  component={RouterLink}
  to={`/things-to-do/${city.id}`}
  variant="contained"
  color="primary"
  endIcon={<ArrowForwardIcon />}
  sx={{
    mt: 3,
    px: 3,
    borderRadius: 2,
    '& .MuiButton-endIcon': { transition: 'transform 0.3s ease' },
    '&:hover .MuiButton-endIcon': { transform: 'translateX(4px)' },
  }}
>
  Explore {city.name} Activities
</Button>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', gap: 1.5, maxWidth: 330 }}>
            {city.categories.map((key, index) => {
              const category = TOUR_CATEGORIES[key];
              return category ? (
                <CategoryChip key={key} {...category} visible={inView} delay={0.6 + index * 0.1} />
              ) : null;
            })}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default CityHero;