import { Box, Button, Chip, Collapse } from '@mui/material';
import { scaleIn } from '../../styles/animations';

const ActiveFilters = ({ chips, onRemove, onClear }) => (
  <Collapse in={chips.length > 0}>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, pb: 2 }}>
      {chips.map((chip) => (
        <Chip
          key={`${chip.key}-${chip.id}`}
          label={chip.label}
          size="small"
          onDelete={() => onRemove(chip.key, chip.id)}
          sx={{
            bgcolor: '#fff',
            border: '1px solid #D5E4E1',
            fontSize: 11.5,
            fontWeight: 600,
            animation: `${scaleIn} 0.3s ease`,
            '& .MuiChip-deleteIcon:hover': { color: '#E04B4B' },
          }}
        />
      ))}

      <Button size="small" onClick={onClear} sx={{ fontSize: 12, color: 'secondary.main' }}>
        Clear all
      </Button>
    </Box>
  </Collapse>
);

export default ActiveFilters;