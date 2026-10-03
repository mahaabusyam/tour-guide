import { Box, Rating, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { APP_PROMO, ACCENT } from '../../../constants/appPromo';
import { drawRoute, ping, rowGlow, withMotion } from '../../../styles/animations';

const RouteMap = () => (
  <Box sx={{ position: 'relative' }}>
    <Box component="svg" viewBox="0 0 220 165" sx={{ width: '100%', display: 'block' }}>
      <rect width="220" height="165" fill="#E9EFF4" />
      {/* الماء */}
      <path d="M0 125 Q60 105 110 135 T220 112 L220 165 L0 165Z" fill="#D3E5F1" />
      {/* الشوارع */}
      <g stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M-5 62 L230 42" />
        <path d="M42 -5 L72 170" />
        <path d="M132 -5 L152 170" />
        <path d="M-5 102 L230 92" />
      </g>
      <g stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M90 -5 L100 170" />
        <path d="M-5 30 L230 18" />
        <path d="M-5 140 L230 150" />
      </g>
      <text x="26" y="52" fontSize="6" fill="#9AA8B5">HAMILTON</text>
      <text x="96" y="122" fontSize="6" fill="#9AA8B5">AREA</text>

      {/* المسار: يُرسم ثم يعاد */}
      <Box
        component="path"
        d="M22 148 C 60 122, 78 92, 118 88 S 168 74, 172 92"
        fill="none"
        stroke={ACCENT}
        strokeWidth="3"
        strokeLinecap="round"
        pathLength={260}
        strokeDasharray={260}
        sx={withMotion(`${drawRoute} 5s ease-in-out infinite`)}
      />

      {/* نقطة الموقع: حلقة نابضة + نقطة ثابتة */}
      <Box
        component="circle"
        cx="172" cy="92" r="5" fill={ACCENT}
        sx={{ transformBox: 'fill-box', transformOrigin: 'center', ...withMotion(`${ping} 1.8s ease-out infinite`) }}
      />
      <circle cx="172" cy="92" r="5" fill={ACCENT} stroke="#fff" strokeWidth="2" />
    </Box>

    {/* شريط البحث */}
    <Box
      sx={{
        position: 'absolute', top: 10, left: 10, right: 10, height: 22, bgcolor: '#fff', borderRadius: 1,
        boxShadow: '0 3px 10px rgba(30,60,100,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 1,
      }}
    >
      <CloseIcon sx={{ fontSize: 10, color: 'text.secondary' }} />
    </Box>
  </Box>
);

const PlaceRow = ({ item, index }) => (
  <Box
    sx={{
      display: 'flex', alignItems: 'center', gap: 1, p: 0.8, mb: 1, bgcolor: '#fff',
      borderRadius: '22px 12px 12px 22px', boxShadow: '0 3px 10px rgba(30,60,100,0.12)',
      ...withMotion(`${rowGlow} 6s ease-in-out ${index * 1.5}s infinite`),
    }}
  >
    <Box component="img" src={item.image} alt={item.name} sx={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover' }} />
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography noWrap sx={{ fontSize: 8, fontWeight: 700, color: 'text.primary' }}>{item.name}</Typography>
      <Rating value={item.rating} precision={0.5} readOnly sx={{ fontSize: 8, color: '#FFC533' }} />
    </Box>
    <Box sx={{ bgcolor: ACCENT, color: '#fff', fontSize: 8, fontWeight: 800, px: 1, py: 0.3, borderRadius: 8 }}>
      {item.price}
    </Box>
  </Box>
);

const BackPhone = () => (
  <Box sx={{ height: '100%' }}>
    <RouteMap />
    <Box sx={{ px: 1.2, pt: 1.2 }}>
      {APP_PROMO.places.map((item, index) => (
        <PlaceRow key={item.id} item={item} index={index} />
      ))}
    </Box>
  </Box>
);

export default BackPhone;