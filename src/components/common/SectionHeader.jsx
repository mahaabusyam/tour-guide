import { Box, Button, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Reveal from './Reveal';

const SectionHeader = ({ title, description, buttonLabel, href = '#' }) => (
  <Reveal>
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2.5,
        mb: { xs: 4, md: 6 },
      }}
    >
      <Box sx={{ maxWidth: 400 }}>
        <Typography variant="h3" sx={{ fontSize: { xs: 26, md: 32 }, mb: 2 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.8 }}>
          {description}
        </Typography>
      </Box>

      <Button
        component="a"
        href={href}
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        sx={{
          position: 'relative',
          isolation: 'isolate', // لتبقى طبقة التعبئة خلف النص وفوق الخلفية
          overflow: 'hidden',
          flexShrink: 0,
          bgcolor: '#4A5563',
          color: '#fff',
          px: 3.5,
          py: 1.2,
          borderRadius: '4px',
          fontSize: 12,
          boxShadow: '0 6px 16px rgba(74,85,99,0.3)',
          transition: 'color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            backgroundColor: '#FFD83D',
            transform: 'translateX(-101%)',
            transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
          },
          '& .MuiButton-endIcon': {
            ml: 0,
            width: 0,
            overflow: 'hidden',
            opacity: 0,
            transition: 'all 0.35s ease',
            '& svg': { fontSize: 16 },
          },
          '&:hover': {
            bgcolor: '#4A5563',
            color: 'text.primary',
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 24px rgba(74,85,99,0.35)',
            '&::before': { transform: 'translateX(0)' },
            '& .MuiButton-endIcon': { width: 18, ml: 1, opacity: 1 },
          },
        }}
      >
        {buttonLabel}
      </Button>
    </Box>
  </Reveal>
);

export default SectionHeader;