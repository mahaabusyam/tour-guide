import { useEffect, useState } from 'react';
import { Box, Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Zoom in={visible}>
      <Box sx={{ position: 'fixed', right: { xs: 16, md: 32 }, bottom: { xs: 16, md: 32 }, zIndex: 1200 }}>
        <Fab
          color="primary"
          size="medium"
          aria-label="back to top"
          onClick={scrollToTop}
          sx={{
            boxShadow: '0 8px 20px rgba(255,216,61,0.5)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 14px 28px rgba(255,216,61,0.65)' },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
};

export default BackToTop;