import { Box, Typography } from '@mui/material';
import Reveal from '../common/Reveal';
import SectionDivider from './SectionDivider';

const TripSection = ({ title, first = false, children }) => (
  <Box component="section" sx={{ pt: first ? 5 : 0 }}>
    {!first && <SectionDivider />}

    <Reveal direction="soft">
      <Typography variant="h3" sx={{ fontSize: 20, mb: 2 }}>
        {title}
      </Typography>
    </Reveal>

    {children}
  </Box>
);

export default TripSection;