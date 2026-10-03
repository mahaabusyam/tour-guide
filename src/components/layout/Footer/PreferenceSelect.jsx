import { Box, MenuItem, Select, Typography } from '@mui/material';
import { headingSx } from './footerStyles';

const PreferenceSelect = ({ label, value, options, onChange }) => {
  const labelId = `${label.toLowerCase()}-select-label`;

  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography id={labelId} sx={headingSx}>
        {label}
      </Typography>

      <Select
        labelId={labelId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        size="small"
        fullWidth
        renderValue={(selected) => {
          const option = options.find((item) => item.value === selected);
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {option?.flag && <span>{option.flag}</span>}
              {option?.label}
            </Box>
          );
        }}
        sx={{
          mt: 1.2,
          maxWidth: 160,
          fontSize: 12,
          color: 'rgba(255,255,255,0.75)',
          borderRadius: '2px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255,255,255,0.14)',
            transition: 'border-color 0.3s ease',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.4)' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FFD83D', borderWidth: 1 },
          '& .MuiSelect-select': { py: 1.3 },
          '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.6)' },
        }}
        MenuProps={{
          sx: {
            '& .MuiPaper-root': {
              bgcolor: '#1A2E5A',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              mt: 0.5,
            },
            '& .MuiMenuItem-root': { fontSize: 12, gap: 1, transition: 'background-color 0.2s' },
            '& .MuiMenuItem-root:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
            '& .MuiMenuItem-root.Mui-selected': { bgcolor: 'rgba(255,216,61,0.16)' },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.flag && <span>{option.flag}</span>}
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default PreferenceSelect;