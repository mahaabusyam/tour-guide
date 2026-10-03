import { Box } from '@mui/material';
import { kenBurns, gradientShift, drift, withMotion } from '../../../styles/animations';

const ORBS = [
  { size: 220, top: '8%', left: '4%', delay: 0, duration: 14 },
  { size: 160, top: '60%', left: '38%', delay: 3, duration: 17 },
  { size: 260, top: '15%', left: '78%', delay: 6, duration: 20 },
];

const AnimatedBackground = ({ image }) => (
  <Box aria-hidden sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    {/* الصورة: تتحرك عكس الماوس بعمق بسيط */}
    <Box
      sx={{
        position: 'absolute',
        inset: '-8%',
        transform: 'translate3d(calc(var(--px, 0) * 24px), calc(var(--py, 0) * 16px), 0)',
        transition: 'transform 0.5s ease-out',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
          willChange: 'transform',
          ...withMotion(`${kenBurns} 24s ease-in-out infinite alternate`),
        }}
      />
    </Box>

    {/* التدرّج اللوني المتنقل */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(120deg, rgba(110,60,170,0.85), rgba(70,110,190,0.78), rgba(25,180,200,0.85), rgba(110,60,170,0.85))',
        backgroundSize: '300% 300%',
        ...withMotion(`${gradientShift} 18s ease infinite`),
      }}
    />

    {/* كرات الضوء */}
    {ORBS.map((orb) => (
      <Box
        key={orb.top + orb.left}
        sx={{
          position: 'absolute',
          top: orb.top,
          left: orb.left,
          width: orb.size,
          height: orb.size,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)',
          filter: 'blur(8px)',
          ...withMotion(`${drift} ${orb.duration}s ease-in-out ${orb.delay}s infinite`),
        }}
      />
    ))}
  </Box>
);

export default AnimatedBackground;