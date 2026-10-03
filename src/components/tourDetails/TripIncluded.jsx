import { Box, Typography } from '@mui/material';
import Reveal from '../common/Reveal';
import BulletList from './BulletList';
import TripSection from './TripSection';

const Column = ({ title, items, accent, delay }) => (
  <Box>
    <Reveal direction="soft" delay={delay}>
      <Typography variant="h6" sx={{ fontSize: 13, mb: 1.5 }}>
        {title}
      </Typography>
    </Reveal>
    <BulletList items={items} accent={accent} delay={delay} />
  </Box>
);

const TripIncluded = ({ includes, notIncludes }) => (
  <TripSection title="What Is Included / Not Included">
    <Box sx={{ display: 'grid', gap: { xs: 3, sm: 4 }, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
      <Column title="Includes" items={includes} accent="#5FB3A9" delay={0} />
      <Column title="Not Includes" items={notIncludes} accent="#E04B4B" delay={0.15} />
    </Box>
  </TripSection>
);

export default TripIncluded;