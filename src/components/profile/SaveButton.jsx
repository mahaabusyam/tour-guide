import { Box, Button, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { scaleIn } from '../../styles/animations';

const SaveButton = ({ status, disabled = false }) => (
  <Button
    type="submit"
    variant="contained"
    color="secondary"
    disabled={disabled || status === 'saving'}
    sx={{
      width: { xs: '100%', sm: 210 },
      height: 42,
      mt: 1,
      color: '#fff',
      borderRadius: '2px',
      boxShadow: disabled ? 'none' : '0 8px 18px rgba(95,179,169,0.35)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
      '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 24px rgba(95,179,169,0.45)' },
      // خافت إن لم يوجد تغيير، وبلونه الطبيعي أثناء الحفظ
      '&.Mui-disabled': disabled
        ? { bgcolor: '#9ACBC2', color: '#fff' }
        : { bgcolor: 'secondary.main', color: '#fff' },
    }}
  >
    {status === 'saving' && <CircularProgress size={18} color="inherit" />}
    {status === 'saved' && (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, animation: `${scaleIn} 0.4s ease` }}>
        <CheckCircleIcon fontSize="small" /> Saved
      </Box>
    )}
    {status === 'idle' && 'Save'}
  </Button>
);

export default SaveButton;