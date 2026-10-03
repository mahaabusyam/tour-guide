import { Box } from '@mui/material';
import useInView from '../../hooks/useInView';

const OFFSETS = {
  up: 'translateY(40px)',
  soft: 'translateY(18px)',    
  down: 'translateY(-40px)',
  left: 'translateX(-60px)',
  right: 'translateX(60px)',
  none: 'none',
};

const Reveal = ({ children, direction = 'up', delay = 0, duration = 0.7, sx }) => {
  const [ref, inView] = useInView();

  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : OFFSETS[direction],
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: 'opacity, transform',
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          opacity: 1,
          transform: 'none',
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Reveal;