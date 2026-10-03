import { Typography } from '@mui/material';
import Reveal from '../common/Reveal';
import TripSection from './TripSection';

const TripDescription = ({ paragraphs }) => (
  <TripSection title="Description" first>
    {paragraphs.map((text, index) => (
      <Reveal key={index} direction="soft" delay={index * 0.1} duration={0.7}>
        <Typography sx={{ fontSize: 12.5, lineHeight: 1.9, color: 'text.secondary', mb: 2.5 }}>
          {text}
        </Typography>
      </Reveal>
    ))}
  </TripSection>
);

export default TripDescription;