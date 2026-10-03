import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { buildSpecialSections } from '../../utils/specialSections';
import Reveal from '../common/Reveal';
import TourCarousel from '../common/TourCarousel';
import SectionDivider from '../tourDetails/SectionDivider';

const OutsideSpecials = ({ cityId, items }) => {
  // تُحسب مرة واحدة، وتُعاد فقط عند تغيّر أنشطة المدينة
  const sections = useMemo(() => buildSpecialSections(items), [items]);

  if (sections.length === 0) return null;

  return (
    <Box component="section" sx={{ mt: { xs: 6, md: 8 } }}>
      <Reveal direction="soft">
        <Typography variant="h3" sx={{ fontSize: 20 }}>
          Outside The City Specials
        </Typography>
      </Reveal>

      <SectionDivider spacing={2} />

      {sections.map((section) => (
        <Box key={section.id} sx={{ mt: 1 }}>
          <TourCarousel
            badge={{
              label: section.label,
              color: section.color,
              // الضغط على الـ Pill يفتح القائمة أعلاه مفلترة بهذا التصنيف
              to: `/things-to-do/${cityId}?theme=${section.themeId}`,
            }}
            items={section.tours}
          />
        </Box>
      ))}
    </Box>
  );
};

export default OutsideSpecials;