import { Box, Button, Collapse, InputBase, MenuItem, Select, Typography } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { RATING_OPTIONS, SORT_OPTIONS, TYPE_OPTIONS } from '../../../constants/reviews';

const FilterSelect = ({ label, value, options, defaultValue, placeholder, onChange }) => {
  const isActive = value !== defaultValue;

  return (
    <Select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      size="small"
      inputProps={{ 'aria-label': label }}
      renderValue={(selected) =>
        selected === defaultValue && placeholder
          ? placeholder
          : options.find((option) => option.value === selected)?.label
      }
      sx={{
        flex: { xs: '1 1 140px', md: '0 0 158px' },
        bgcolor: '#fff',
        fontSize: 12.5,
        borderRadius: '3px',
        // حدّ تركوازي عند تفعيل الفلتر
        boxShadow: isActive ? '0 0 0 1.5px #5FB3A9' : '0 2px 8px rgba(31,42,55,0.08)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        '& fieldset': { border: 'none' },
        '& .MuiSelect-select': { py: 1.2 },
        '&:hover': { transform: 'translateY(-2px)' },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value} sx={{ fontSize: 12.5 }}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

const ReviewFilters = ({ filters, onChange, onClear, active }) => (
  <Box>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 1.5,
        p: 1.5,
        bgcolor: '#F8FAFB',
        border: '1px solid #EDF0F3',
        borderRadius: '3px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, px: 1, width: { xs: '100%', md: 'auto' } }}>
        <FilterAltOutlinedIcon sx={{ fontSize: 20 }} />
        <Typography sx={{ fontSize: 12.5, fontWeight: 700 }}>Filtering:</Typography>
      </Box>

      <FilterSelect
        label="Sort reviews"
        value={filters.sort}
        options={SORT_OPTIONS}
        defaultValue="recommended"
        onChange={(value) => onChange('sort', value)}
      />
      <FilterSelect
        label="Traveler type"
        value={filters.type}
        options={TYPE_OPTIONS}
        defaultValue="all"
        placeholder="Traveler type"
        onChange={(value) => onChange('type', value)}
      />
      <FilterSelect
        label="Rating"
        value={filters.rating}
        options={RATING_OPTIONS}
        defaultValue="all"
        placeholder="Rating"
        onChange={(value) => onChange('rating', value)}
      />

      <Box
        sx={{
          flex: '1 1 200px',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.5,
          height: 40,
          bgcolor: '#fff',
          border: '1px solid #CBD3DA',
          borderRadius: '3px',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          '&:focus-within': {
            borderColor: 'secondary.main',
            boxShadow: '0 0 0 3px rgba(95,179,169,0.2)',
            '& .search-icon': { color: 'secondary.main', transform: 'scale(1.15)' },
          },
        }}
      >
        <SearchIcon className="search-icon" sx={{ fontSize: 18, transition: 'all 0.3s ease' }} />
        <InputBase
          fullWidth
          placeholder="Search Here"
          value={filters.query}
          onChange={(event) => onChange('query', event.target.value)}
          inputProps={{ 'aria-label': 'Search reviews' }}
          sx={{ fontSize: 12.5 }}
        />
      </Box>
    </Box>

    {/* زر المسح: ينزلق عند وجود فلتر نشط */}
    <Collapse in={active}>
      <Button
        size="small"
        startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
        onClick={onClear}
        sx={{ mt: 1, fontSize: 12, color: 'secondary.main' }}
      >
        Clear filters
      </Button>
    </Collapse>
  </Box>
);

export default ReviewFilters;