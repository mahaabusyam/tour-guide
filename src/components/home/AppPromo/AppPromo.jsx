import { Box, Container, Typography } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import { APP_PROMO } from '../../../constants/appPromo';
import useMouseParallax from '../../../hooks/useMouseParallax';
import Reveal from '../../common/Reveal';
import AnimatedBackground from './AnimatedBackground';
import PhonesShowcase from './PhonesShowcase';
import StoreButton from './StoreButton';

const STORE_ICONS = { ios: AppleIcon, android: AndroidIcon };

const AppPromo = () => {
  const sectionRef = useMouseParallax();

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="app"
      sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#5A6FC0', color: '#fff', py: { xs: 8, md: 11 } }}
    >
      <AnimatedBackground image={APP_PROMO.background} />

      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: { xs: 5, md: 6 },
        }}
      >
        <Reveal direction="left" duration={1}>
          <PhonesShowcase />
        </Reveal>

        <Box sx={{ maxWidth: 400, textAlign: { xs: 'center', md: 'left' } }}>
          <Reveal delay={0.1}>
            <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 34 }, mb: 1, textShadow: '0 2px 14px rgba(0,0,0,0.25)' }}>
              {APP_PROMO.title}
            </Typography>
          </Reveal>

          <Reveal delay={0.2}>
            <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 2 }}>{APP_PROMO.subtitle}</Typography>
          </Reveal>

          <Reveal delay={0.3}>
            <Typography sx={{ fontSize: 13, lineHeight: 1.9, mb: 4, opacity: 0.95 }}>
              {APP_PROMO.description}
            </Typography>
          </Reveal>

          <Reveal delay={0.4}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              {APP_PROMO.stores.map((store) => (
                <StoreButton key={store.id} Icon={STORE_ICONS[store.id]} label={store.label} href={store.href} />
              ))}
            </Box>
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
};

export default AppPromo;