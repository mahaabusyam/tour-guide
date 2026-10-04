import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Typography } from '@mui/material';
import { CURRENCIES, FOOTER_LINKS, LANGUAGES } from '../../../constants/footer';
import {
  selectCurrency,
  selectLanguage,
  setCurrency,
  setLanguage,
} from '../../../features/preferences/preferencesSlice';
import { gradientShift, withMotion } from '../../../styles/animations';
import Reveal from '../../common/Reveal';
import FooterLinks from './FooterLinks';
import PaymentMethods from './PaymentMethods';
import PreferenceSelect from './PreferenceSelect';
import SocialLinks from './SocialLinks';

const Footer = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const currency = useSelector(selectCurrency);

  return (
    <Box
      component="footer"
      id="contact"
      sx={{
        position: 'relative',
        bgcolor: '#12234A',
        color: '#fff',
        // خط علوي متدرج متحرك
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #FFD83D, #5FB3A9, #22CFF0, #FFD83D)',
          backgroundSize: '300% 100%',
          ...withMotion(`${gradientShift} 8s linear infinite`),
        },
      }}
    >
      <Container maxWidth="md" sx={{ pt: { xs: 6, md: 9 }, pb: { xs: 6, md: 11 } }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 4, md: 3 },
            gridTemplateColumns: { xs: '1fr 1fr', md: '1.35fr 1fr 1.2fr 1.1fr' },
          }}
        >
          <Reveal>
            <PreferenceSelect
              label="Language"
              value={language}
              options={LANGUAGES}
              onChange={(value) => dispatch(setLanguage(value))}
            />
            <PreferenceSelect
              label="Currency"
              value={currency}
              options={CURRENCIES}
              onChange={(value) => dispatch(setCurrency(value))}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <FooterLinks {...FOOTER_LINKS.company} />
          </Reveal>

          <Reveal delay={0.2}>
            <FooterLinks {...FOOTER_LINKS.help} />
          </Reveal>

          <Reveal delay={0.3} sx={{ gridColumn: { xs: '1 / -1', md: 'auto' } }}>
            <PaymentMethods />
            <Box sx={{ mt: 3.5 }}>
              <FooterLinks {...FOOTER_LINKS.partner} />
            </Box>
          </Reveal>
        </Box>
      </Container>

      {/* الشريط السفلي */}
      <Box sx={{ bgcolor: '#0E1B38', py: 1.8 }}>
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
            Copyright {new Date().getFullYear()} Tour Guide. All Rights Reserved
          </Typography>
          <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>
  build {__BUILD_TIME__.slice(0, 16).replace('T', ' ')}
</Typography>
          <SocialLinks />
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;