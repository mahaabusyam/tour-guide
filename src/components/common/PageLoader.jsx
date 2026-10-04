import { useEffect, useState } from 'react';
import { Box, CircularProgress, LinearProgress } from '@mui/material';

const PageLoader = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);

    // Cleanup
    return () => clearTimeout(timer);
  }, []);

  // قبل مرور 150ms: مساحة فارغة بدون وميض
  if (!visible) return <Box sx={{ minHeight: '100vh' }} />;

  return (
    <>
      <LinearProgress
        aria-label="Loading page"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          zIndex: 2000,
          bgcolor: 'transparent',
          '& .MuiLinearProgress-bar': { bgcolor: '#FFD83D' },
        }}
      />
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', bgcolor: '#F6F8FB' }}>
        <CircularProgress color="secondary" size={36} />
      </Box>
    </>
  );
};

export default PageLoader;