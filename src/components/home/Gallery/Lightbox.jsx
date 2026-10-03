import { useCallback, useEffect, useRef } from 'react';
import { Box, Dialog, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { lightboxIn } from '../../../styles/animations';

const glassButton = {
  color: '#fff',
  bgcolor: 'rgba(255,255,255,0.14)',
  backdropFilter: 'blur(6px)',
  border: '1px solid rgba(255,255,255,0.25)',
  transition: 'all 0.3s ease',
  '&:hover': { bgcolor: 'rgba(255,255,255,0.28)', transform: 'scale(1.1)' },
};

const Lightbox = ({ items, open, index, onClose, onChange }) => {
  const touchStartX = useRef(null);
  const total = items.length;

  const goPrev = useCallback(() => onChange((index - 1 + total) % total), [index, total, onChange]);
  const goNext = useCallback(() => onChange((index + 1) % total), [index, total, onChange]);

  // أسهم لوحة المفاتيح، مع cleanup
  useEffect(() => {
    if (!open) return;

    const handleKey = (event) => {
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, goPrev, goNext]);

  // السحب باللمس
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(distance) > 50) (distance > 0 ? goPrev : goNext)();
    touchStartX.current = null;
  };

  const item = items[index];
  if (!item) return null;

  const stop = (event) => event.stopPropagation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      aria-label="Image viewer"
      sx={{
        '& .MuiDialog-paper': { bgcolor: 'transparent', boxShadow: 'none' },
        '& .MuiBackdrop-root': { backgroundColor: 'rgba(10,16,28,0.93)', backdropFilter: 'blur(6px)' },
      }}
    >
      <Box
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          color: '#fff',
        }}
      >
        {/* العدّاد وزر الإغلاق */}
        <Box
          sx={{ position: 'absolute', top: 0, left: 0, right: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
            {index + 1} / {total}
          </Typography>
          <IconButton aria-label="close" onClick={onClose} sx={glassButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* الصورة: key يعيد تشغيل الأنيميشن عند كل تغيير */}
        <Box
          key={item.id}
          component="img"
          src={item.image}
          alt={item.title}
          onClick={stop}
          sx={{
            maxWidth: '88vw',
            maxHeight: '72vh',
            objectFit: 'contain',
            borderRadius: '8px',
            boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
            animation: `${lightboxIn} 0.45s cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        />

        <Box key={`caption-${item.id}`} onClick={stop} sx={{ mt: 2.5, textAlign: 'center', animation: `${lightboxIn} 0.6s ease` }}>
          <Typography variant="h6" sx={{ fontSize: 16, color: '#fff' }}>{item.title}</Typography>
          <Typography sx={{ fontSize: 12, opacity: 0.75 }}>{item.location}</Typography>
        </Box>

        {/* الأسهم */}
        <IconButton
          aria-label="previous image"
          onClick={(event) => { stop(event); goPrev(); }}
          sx={{ ...glassButton, position: 'absolute', left: { xs: 8, md: 32 }, top: '50%', mt: -3 }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          aria-label="next image"
          onClick={(event) => { stop(event); goNext(); }}
          sx={{ ...glassButton, position: 'absolute', right: { xs: 8, md: 32 }, top: '50%', mt: -3 }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Dialog>
  );
};

export default Lightbox;