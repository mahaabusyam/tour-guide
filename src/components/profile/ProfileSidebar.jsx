import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Box, ButtonBase, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import { PROFILE_TABS } from '../../constants/profile';
import { setAvatar } from '../../features/user/userSlice';
import { resizeImage } from '../../utils/image';
import { formatBirthday, getInitials } from '../../utils/profile';
import { scaleIn } from '../../styles/animations';

const ITEM_HEIGHT = 45;
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const ProfileSidebar = ({ profile, activeTab, onTabChange, bookingsCount, onNotify }) => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const activeIndex = Math.max(0, PROFILE_TABS.findIndex((tab) => tab.id === activeTab));

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = ''; // للسماح باختيار نفس الصورة مرة أخرى
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onNotify('Please choose an image file');
      return;
    }

    try {
      dispatch(setAvatar(await resizeImage(file)));
      onNotify('Profile photo updated');
    } catch {
      onNotify('Could not read this image');
    }
  };

  return (
    <Box sx={{ minWidth: 0, borderRight: { md: '1px solid #EEF1F4' }, borderBottom: { xs: '1px solid #EEF1F4', md: 'none' } }}>
      <Box sx={{ pt: 4, pb: 2.5, textAlign: 'center' }}>
        <Box sx={{ position: 'relative', width: 90, mx: 'auto' }}>
          {/* key: عند تغيّر الصورة تُعاد قفزة الظهور */}
          <Avatar
            key={profile.avatar}
            src={profile.avatar}
            alt={profile.name}
            sx={{
              width: 90,
              height: 90,
              fontSize: 30,
              fontWeight: 700,
              bgcolor: 'secondary.main',
              boxShadow: '0 8px 22px rgba(31,42,55,0.22)',
              animation: `${scaleIn} 0.5s ease`,
            }}
          >
            {getInitials(profile.name)}
          </Avatar>

          <IconButton
            aria-label="change profile photo"
            onClick={() => fileRef.current?.click()}
            sx={{
              position: 'absolute',
              right: -2,
              bottom: -2,
              width: 28,
              height: 28,
              bgcolor: 'secondary.main',
              color: '#fff',
              border: '2px solid #fff',
              transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              '&:hover': { bgcolor: 'secondary.main', transform: 'scale(1.15) rotate(-12deg)' },
            }}
          >
            <EditIcon sx={{ fontSize: 14 }} />
          </IconButton>

          <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
        </Box>

        <Typography sx={{ fontSize: 18, fontWeight: 700, mt: 1.5 }}>{profile.name}</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.2, mt: 0.5, color: 'text.secondary' }}>
          {profile.location && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
              <LocationOnIcon sx={{ fontSize: 14 }} />
              <Typography sx={{ fontSize: 11 }}>{profile.location}</Typography>
            </Box>
          )}
          {profile.birthDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
              <CakeOutlinedIcon sx={{ fontSize: 14 }} />
              <Typography sx={{ fontSize: 11 }}>{formatBirthday(profile.birthDate)}</Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* القائمة: المؤشر عنصر واحد ينزلق خلف العناصر */}
      <Box
        component="nav"
        aria-label="Profile sections"
        sx={{ position: 'relative', display: { xs: 'flex', md: 'block' }, overflowX: { xs: 'auto', md: 'visible' } }}
      >
        <Box
          aria-hidden
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: ITEM_HEIGHT,
            bgcolor: '#7DBBB0',
            transform: `translateY(${activeIndex * ITEM_HEIGHT}px)`,
            transition: `transform 0.45s ${EASE}`,
          }}
        />

        {PROFILE_TABS.map((tab) => {
          const active = tab.id === activeTab;

          return (
            <ButtonBase
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              aria-current={active ? 'page' : undefined}
              sx={{
                position: 'relative',
                zIndex: 1,
                flexShrink: 0,
                width: { md: '100%' },
                height: ITEM_HEIGHT,
                px: 2.5,
                justifyContent: 'flex-start',
                gap: 1,
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                color: active ? '#fff' : 'text.primary',
                bgcolor: { xs: active ? '#7DBBB0' : 'transparent', md: 'transparent' },
                transition: 'color 0.3s ease, background-color 0.3s ease, padding-left 0.3s ease',
                '&:hover': { pl: 3, bgcolor: { xs: active ? '#7DBBB0' : 'rgba(95,179,169,0.08)', md: active ? 'transparent' : 'rgba(95,179,169,0.08)' } },
              }}
            >
              {tab.label}
              {tab.id === 'bookings' && bookingsCount > 0 && (
                <Box
                  component="span"
                  sx={{
                    minWidth: 18,
                    height: 18,
                    px: 0.6,
                    borderRadius: 9,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 10,
                    fontWeight: 700,
                    bgcolor: active ? '#fff' : 'secondary.main',
                    color: active ? 'secondary.main' : '#fff',
                  }}
                >
                  {bookingsCount}
                </Box>
              )}
            </ButtonBase>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProfileSidebar;