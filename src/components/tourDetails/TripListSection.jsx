import { Typography } from '@mui/material';
import Reveal from '../common/Reveal';
import BulletList from './BulletList';
import TripSection from './TripSection';

const TripListSection = ({ title, subtitle, items }) => (
  <TripSection title={title}>
    <Reveal direction="soft">
      <Typography variant="h6" sx={{ fontSize: 13, mb: 1.5 }}>
        {subtitle}
      </Typography>
    </Reveal>
    <BulletList items={items} />
  </TripSection>
);

export default TripListSection;