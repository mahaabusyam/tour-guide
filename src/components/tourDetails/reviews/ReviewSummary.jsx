import { Box, Rating, Typography } from '@mui/material';
import useInView from '../../../hooks/useInView';
import useAnimatedNumber from '../../../hooks/useAnimatedNumber';

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const MAX_SCORE = 5;

const CategoryBar = ({ label, value, inView, index }) => {
  const animated = useAnimatedNumber(inView ? value : 0, 1200);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.3 }}>
      <Typography sx={{ width: 108, fontSize: 12, fontWeight: 600 }}>{label}</Typography>

      <Box
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={MAX_SCORE}
        sx={{ flex: 1, height: 8, borderRadius: 4, bgcolor: '#E6E9EC', overflow: 'hidden' }}
      >
        <Box
          sx={{
            height: '100%',
            width: inView ? `${(value / MAX_SCORE) * 100}%` : '0%',
            bgcolor: '#FFD83D',
            borderRadius: 4,
            transition: `width 1.2s ${EASE} ${index * 0.15}s`,
            '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          }}
        />
      </Box>

      <Typography
        sx={{ width: 28, fontSize: 12, color: 'text.secondary', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}
      >
        {animated.toFixed(1)}
      </Typography>
    </Box>
  );
};

const ReviewSummary = ({ average, total, categories }) => {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const animatedAverage = useAnimatedNumber(inView ? average : 0, 1200);
  const animatedTotal = useAnimatedNumber(inView ? total : 0, 1400);

  return (
    <Box
      ref={ref}
      sx={{
        display: 'grid',
        gap: 3,
        alignItems: 'center',
        gridTemplateColumns: { xs: '1fr', md: '1fr 300px' },
        mb: 3.5,
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <Typography
            sx={{ fontSize: { xs: 40, md: 48 }, fontWeight: 800, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}
          >
            {animatedAverage.toFixed(2).replace('.', ',')}
          </Typography>
          <Typography
            sx={{ fontSize: { xs: 16, md: 20 }, fontWeight: 300, color: 'text.secondary', fontVariantNumeric: 'tabular-nums' }}
          >
            {Math.round(animatedTotal)} Reviews
          </Typography>
        </Box>

        {/* النجوم تُكشف بمسح من اليسار عند الظهور */}
        <Box
          sx={{
            mt: 1.5,
            clipPath: inView ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
            transition: `clip-path 1.2s ${EASE} 0.3s`,
            '@media (prefers-reduced-motion: reduce)': { transition: 'none', clipPath: 'none' },
          }}
        >
          <Rating
            value={average}
            precision={0.1}
            readOnly
            aria-label={`Average rating ${average} out of 5`}
            sx={{ fontSize: { xs: 34, md: 42 }, color: '#F9A63B', '& .MuiRating-iconEmpty': { color: '#D5DBE0' } }}
          />
        </Box>
      </Box>

      <Box>
        {categories.map((category, index) => (
          <CategoryBar key={category.id} label={category.label} value={category.value} inView={inView} index={index} />
        ))}
      </Box>
    </Box>
  );
};

export default ReviewSummary;