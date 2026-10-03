import { Box } from '@mui/material';
import { float, withMotion } from '../../../styles/animations';
import FrontPhone from './FrontPhone';
import BackPhone from './BackPhone';

const PhoneShell = ({ width, height, children }) => (
  <Box
    sx={{
      width,
      height,
      bgcolor: '#fff',
      borderRadius: '26px',
      overflow: 'hidden',
      boxShadow: '0 30px 60px rgba(20,20,70,0.35), 0 0 0 1px rgba(255,255,255,0.6)',
    }}
  >
    {children}
  </Box>
);

// depth: كلما زاد، تحرك الهاتف أكثر مع الماوس (إحساس بالعمق)
const PhoneLayer = ({ depth, floatDuration, floatDelay = 0, reverse = false, sx, children }) => (
  <Box
    sx={{
      position: 'absolute',
      transform: `translate3d(calc(var(--px, 0) * ${-26 * depth}px), calc(var(--py, 0) * ${-18 * depth}px), 0)
                  rotateY(calc(var(--px, 0) * ${10 * depth}deg)) rotateX(calc(var(--py, 0) * ${-8 * depth}deg))`,
      transition: 'transform 0.45s ease-out',
      ...sx,
    }}
  >
    <Box
      sx={withMotion(
        `${float} ${floatDuration}s ease-in-out ${floatDelay}s infinite ${reverse ? 'reverse' : 'normal'}`
      )}
    >
      {children}
    </Box>
  </Box>
);

const PhonesShowcase = () => (
  <Box
    sx={{
      position: 'relative',
      width: { xs: 282, md: 380 },
      height: { xs: 322, md: 430 },
      perspective: '1000px',
      flexShrink: 0,
    }}
  >
    {/* مساحة العمل الثابتة 380×430، وتُصغَّر على الجوال */}
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 380,
        height: 430,
        transformOrigin: 'top left',
        transform: { xs: 'scale(0.74)', md: 'none' },
      }}
    >
      <PhoneLayer depth={0.6} floatDuration={7} floatDelay={0.6} reverse sx={{ left: 160, top: 34, zIndex: 1 }}>
        <PhoneShell width={210} height={370}><BackPhone /></PhoneShell>
      </PhoneLayer>

      <PhoneLayer depth={1} floatDuration={6} sx={{ left: 0, top: 0, zIndex: 2 }}>
        <PhoneShell width={220} height={390}><FrontPhone /></PhoneShell>
      </PhoneLayer>
    </Box>
  </Box>
);

export default PhonesShowcase;