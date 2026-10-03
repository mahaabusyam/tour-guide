import { Box, Collapse, InputBase, Typography } from '@mui/material';
import Reveal from '../common/Reveal';

const FormField = ({
  label, name, value, onChange, type = 'text', error, placeholder,
  autoComplete, endAdornment, delay = 0,
}) => (
  <Reveal direction="soft" delay={delay} duration={0.5}>
    <Box sx={{ mb: 2 }}>
      <Typography component="label" htmlFor={name} sx={{ display: 'block', fontSize: 12, fontWeight: 700, mb: 0.8 }}>
        {label}
      </Typography>

      <InputBase
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        endAdornment={endAdornment}
        fullWidth
        inputProps={{ 'aria-invalid': Boolean(error) }}
        sx={{
          bgcolor: '#F4F4F4',
          px: 2,
          height: 40,
          fontSize: 12,
          borderRadius: '2px',
          border: '1px solid',
          borderColor: error ? '#E04B4B' : 'transparent',
          transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          '&:hover': { bgcolor: '#EFEFEF' },
          '&.Mui-focused': {
            bgcolor: '#fff',
            borderColor: error ? '#E04B4B' : '#5FB3A9',
            boxShadow: error ? '0 0 0 3px rgba(224,75,75,0.15)' : '0 0 0 3px rgba(95,179,169,0.2)',
          },
        }}
      />

      {/* رسالة الخطأ تنزلق للأسفل */}
      <Collapse in={Boolean(error)}>
        <Typography role="alert" sx={{ fontSize: 11, color: '#E04B4B', mt: 0.5 }}>
          {error}
        </Typography>
      </Collapse>
    </Box>
  </Reveal>
);

export default FormField;