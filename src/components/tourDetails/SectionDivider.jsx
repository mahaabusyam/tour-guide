import { Box } from '@mui/material';
import useInView from '../../hooks/useInView';

const SectionDivider = ({ spacing = 4.5 }) => {
  const [ref, inView] = useInView({ threshold: 0.5 });

  return (
    <Box ref={ref} aria-hidden sx={{ height: '1px', my: spacing }}>
      <Box
        sx={{
          height: '100%',
          bgcolor: '#E3E8ED',
          transform: inView ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
          '@media (prefers-reduced-motion: reduce)': { transition: 'none', transform: 'none' },
        }}
      />
    </Box>
  );
};

export default SectionDivider;