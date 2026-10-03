import { Button } from '@mui/material';
import { shine, withMotion } from '../../../styles/animations';

const StoreButton = ({ Icon, label, href = '#' }) => (
  <Button
    component="a"
    href={href}
    variant="contained"
    color="primary"
    startIcon={<Icon />}
    sx={{
      position: 'relative',
      overflow: 'hidden',
      px: 4,
      py: 1.6,
      borderRadius: 8,
      fontSize: 14,
      boxShadow: '0 10px 28px rgba(255,216,61,0.5)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '& .MuiButton-startIcon svg': { fontSize: 24, transition: 'transform 0.3s ease' },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-60%',
        width: '40%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)',
        ...withMotion(`${shine} 4.5s ease-in-out infinite`),
      },
      '&:hover': {
        transform: 'translateY(-4px) scale(1.03)',
        boxShadow: '0 16px 34px rgba(255,216,61,0.65)',
      },
      '&:hover .MuiButton-startIcon svg': { transform: 'rotate(-12deg) scale(1.15)' },
      '&:active': { transform: 'scale(0.97)' },
    }}
  >
    {label}
  </Button>
);

export default StoreButton;