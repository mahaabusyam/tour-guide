import { Box, Rating, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WifiIcon from '@mui/icons-material/Wifi';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { APP_PROMO, ACCENT } from '../../../constants/appPromo';
import { scrollUp, tagBounce, withMotion } from '../../../styles/animations';

const AMENITIES = [DirectionsCarIcon, WifiIcon, MusicNoteIcon, RestaurantIcon, EmojiEventsIcon];
const TABS = ['SEARCH', 'NEARBY', 'FAVORITES'];

const HotelCard = ({ hotel }) => (
  <Box sx={{ display: 'flex', gap: 1, mb: 1.8, color: 'text.primary' }}>
    {/* الشريط الأيسر المنقّط مع المسافة */}
    <Box sx={{ width: 14, position: 'relative', borderLeft: '1px dashed #C9D3DB', ml: 0.5 }}>
      <Typography
        sx={{
          position: 'absolute', top: 44, left: -5, fontSize: 6, color: 'text.secondary',
          writingMode: 'vertical-rl', transform: 'rotate(180deg)',
        }}
      >
        {hotel.distance}
      </Typography>
    </Box>

    <Box sx={{ flex: 1 }}>
      <Box sx={{ position: 'relative', height: 100, borderRadius: 1, overflow: 'hidden' }}>
        <Box component="img" src={hotel.image} alt={hotel.name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 55%, rgba(0,0,0,0.5))' }} />

        <Box
          sx={{
            position: 'absolute', top: 5, left: 5, width: 14, height: 14, borderRadius: '50%',
            bgcolor: hotel.liked ? '#fff' : 'transparent', display: 'grid', placeItems: 'center',
          }}
        >
          {hotel.liked
            ? <FavoriteIcon sx={{ fontSize: 9, color: ACCENT }} />
            : <FavoriteBorderIcon sx={{ fontSize: 11, color: '#fff' }} />}
        </Box>

        <Box
          sx={{
            position: 'absolute', left: 6, bottom: 6, bgcolor: ACCENT, color: '#fff',
            fontSize: 7, fontWeight: 800, px: 0.9, py: 0.2, borderRadius: 8,
          }}
        >
          {hotel.price}
        </Box>

        <Box sx={{ position: 'absolute', right: 6, bottom: 5, display: 'flex', alignItems: 'center', gap: 0.4 }}>
          <Rating value={hotel.rating} precision={0.5} readOnly sx={{ fontSize: 9, color: '#FFC533' }} />
          <Typography sx={{ fontSize: 7, color: '#fff' }}>({hotel.reviews})</Typography>
        </Box>
      </Box>

      <Typography variant="h6" sx={{ fontSize: 10, mt: 0.8 }}>{hotel.name}</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 8, color: 'text.secondary' }}>{hotel.place}</Typography>
        <Box sx={{ display: 'flex', gap: 0.7 }}>
          {AMENITIES.map((Icon, i) => (
            <Box key={i} sx={{ position: 'relative', display: 'flex' }}>
              <Icon sx={{ fontSize: 11, color: i === 1 ? ACCENT : '#C4CDD5' }} />
              {i === 1 && hotel.tag && (
                <Box sx={{ position: 'absolute', bottom: 15, left: '50%', transform: 'translateX(-50%)' }}>
                  <Box
                    sx={{
                      bgcolor: ACCENT, color: '#fff', fontSize: 6, fontWeight: 800, px: 0.8, py: 0.3,
                      borderRadius: 8, whiteSpace: 'nowrap', boxShadow: '0 4px 10px rgba(34,207,240,0.5)',
                      ...withMotion(`${tagBounce} 2s ease-in-out infinite`),
                    }}
                  >
                    {hotel.tag}
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  </Box>
);

const FrontPhone = () => {
  const list = [...APP_PROMO.hotels, ...APP_PROMO.hotels]; // تكرار لحلقة سلسة

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', color: 'text.primary' }}>
      <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1.6, pb: 0.8 }}>
        <MenuIcon sx={{ position: 'absolute', left: 14, fontSize: 14 }} />
        <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6 }}>HOTELS</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', px: 1, pb: 1 }}>
        {TABS.map((tab) => (
          <Typography
            key={tab}
            sx={{
              fontSize: 7, fontWeight: 700, px: tab === 'NEARBY' ? 2 : 0, py: 0.3, borderRadius: 8,
              border: '1px solid', borderColor: tab === 'NEARBY' ? ACCENT : 'transparent',
              color: tab === 'NEARBY' ? ACCENT : 'text.secondary',
            }}
          >
            {tab}
          </Typography>
        ))}
      </Box>

      <Typography sx={{ fontSize: 6.5, color: 'text.secondary', textAlign: 'center', pb: 1 }}>
        30 HOTELS FOUND NEAR YOU
      </Typography>

      <Box sx={{ flex: 1, overflow: 'hidden', px: 1.2, position: 'relative' }}>
        <Box
          sx={{
            ...withMotion(`${scrollUp} 22s linear infinite`),
            '&:hover': { animationPlayState: 'paused' },
          }}
        >
          {list.map((hotel, i) => <HotelCard key={`${hotel.id}-${i}`} hotel={hotel} />)}
        </Box>
        {/* تلاشي أسفل الشاشة */}
        <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 34, background: 'linear-gradient(transparent, #fff)', pointerEvents: 'none' }} />
      </Box>
    </Box>
  );
};

export default FrontPhone;