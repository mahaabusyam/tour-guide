import { Box, Container, Typography } from '@mui/material';
import heroBg from '../../../assets/images/hero-bg.webp';
import useScrollParallax from '../../../hooks/useScrollParallax';
import { enter, fadeUp, kenBurns, riseUp, scaleIn, withMotion } from '../../../styles/animations';
import WatchVideoButton from './WatchVideoButton';
import SearchBar from './SearchBar';

const TITLE = 'We Find The Best Tours For You';

const Hero = () => {
  const heroRef = useScrollParallax(1000);

  return (
    <Box
      ref={heroRef}
      id="home"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        pt: { xs: 14, md: 22 },
        pb: 4,
      }}
    >
      {/* الخلفية: طبقة Parallax تحتها طبقة Ken Burns */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: '-30%',
          left: 0,
          right: 0,
          bottom: 0,
          transform: 'translate3d(0, calc(var(--scroll, 0) * 0.25px), 0)',
          willChange: 'transform',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            ...withMotion(`${kenBurns} 28s ease-in-out infinite alternate`),
          }}
        />
      </Box>

      {/* تدرّج: تعتيم خفيف أعلى (لوضوح الـ Navbar) وضباب أبيض أسفل */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(10,30,55,0.45) 0%, rgba(10,30,55,0) 28%, rgba(255,255,255,0) 62%, rgba(255,255,255,0.35) 100%)',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* العنوان: كل كلمة تصعد من خلف قناع */}
        <Typography variant="h1" aria-label={TITLE} sx={{ fontSize: { xs: 32, md: 44 }, mb: 3 }}>
          {TITLE.split(' ').map((word, index) => (
            <Box
              key={index}
              component="span"
              aria-hidden
              sx={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', mr: '0.28em', pb: '0.14em' }}
            >
              <Box component="span" sx={{ display: 'inline-block', ...enter(riseUp, 0.35 + index * 0.1, 0.9) }}>
                {word}
              </Box>
            </Box>
          ))}
        </Typography>

        <Typography sx={{ maxWidth: 480, mx: 'auto', mb: 5, fontSize: 14, lineHeight: 1.8, ...enter(fadeUp, 1) }}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
          Velit officia consequat duis enim velit mollit. Exercitation veniam consequat
          sunt nostrud amet.
        </Typography>

        <Box sx={enter(scaleIn, 1.2, 0.8)}>
          <WatchVideoButton onClick={() => console.log('play video')} />
        </Box>
      </Container>

      <Container
        sx={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', mt: 8, ...enter(fadeUp, 1.4, 1) }}
      >
        <SearchBar />
      </Container>
    </Box>
  );
};

export default Hero;