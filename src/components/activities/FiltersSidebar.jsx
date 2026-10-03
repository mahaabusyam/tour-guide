import { Box } from '@mui/material';
import AvailabilityCard from './AvailabilityCard';
import FilterGroup from './FilterGroup';

const FiltersSidebar = ({ facets, filters, onToggle }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <AvailabilityCard />

    <FilterGroup
      title="Theme"
      options={facets.theme}
      selected={filters.theme}
      onToggle={(id) => onToggle('theme', id)}
      initialVisible={7}
      moreLabel="Show More Themes"
      delay={0.1}
    />
    <FilterGroup
      title="Duration"
      options={facets.duration}
      selected={filters.duration}
      onToggle={(id) => onToggle('duration', id)}
      initialVisible={5}
      delay={0.2}
    />
    <FilterGroup
      title="Destination"
      options={facets.destination}
      selected={filters.destination}
      onToggle={(id) => onToggle('destination', id)}
      initialVisible={6}
      moreLabel="Show More Destinations"
      delay={0.3}
    />
  </Box>
);

export default FiltersSidebar;