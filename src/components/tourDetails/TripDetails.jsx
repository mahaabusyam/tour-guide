import { Box, Typography } from '@mui/material';
import Reveal from '../common/Reveal';
import BulletList from './BulletList';
import MeetingPoint from './MeetingPoint';
import TripSection from './TripSection';

const TripDetails = ({ details, meetingPoint }) => (
  <TripSection title="Details">
    <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: { xs: 5, md: 7 }, rowGap: 3 }}>
      {details.map((group, index) => (
        <Box key={group.id}>
          <Reveal direction="soft" delay={index * 0.1}>
            <Typography variant="h6" sx={{ fontSize: 13, mb: 1.5 }}>
              {group.label}
            </Typography>
          </Reveal>
          <BulletList items={group.values} delay={index * 0.1} />
        </Box>
      ))}
    </Box>

    {meetingPoint && <MeetingPoint {...meetingPoint} />}
  </TripSection>
);

export default TripDetails;