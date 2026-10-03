import { Box, Button } from '@mui/material';
import Reveal from '../../common/Reveal';
import { tabPop, withMotion } from '../../../styles/animations';

const CityTabs = ({ cities, selectedId, onSelect }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, mb: 4 }}>
    {cities.map((city, index) => {
      const isSelected = city.id === selectedId;
      return (
        <Reveal key={city.id} delay={index * 0.06} duration={0.6}>
          <Button
            onClick={() => onSelect(city.id)}
            variant={isSelected ? 'contained' : 'outlined'}
            color="secondary"
            aria-pressed={isSelected}
            sx={{
              borderRadius: 50,
              px: 3,
              py: 0.6,
              fontSize: 12,
              minWidth: 90,
              color: isSelected ? '#fff' : 'text.primary',
              boxShadow: isSelected ? '0 4px 12px rgba(95,179,169,0.5)' : 'none',
              transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
              // قفزة خفيفة عند اختيار التاب
              ...(isSelected && withMotion(`${tabPop} 0.45s ease`)),
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 18px rgba(95,179,169,0.35)',
                bgcolor: isSelected ? 'secondary.main' : 'rgba(95,179,169,0.1)',
              },
            }}
          >
            {city.name}
          </Button>
        </Reveal>
      );
    })}
  </Box>
);

export default CityTabs;