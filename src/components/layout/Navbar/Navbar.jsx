import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar, Box, Button, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NAV_LINKS } from '../../../constants/navLinks';
import useActiveSection from '../../../hooks/useActiveSection';
import { enter, fadeDown, shine, slideInRight, withMotion } from '../../../styles/animations';
import UserMenu from './UserMenu';

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const SECTION_IDS = NAV_LINKS.map((link) => link.section).filter(Boolean);

const Navbar = ({ solid = false }) => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const progressRef = useRef(null);
  const lastY = useRef(0);
  const activeSection = useActiveSection(SECTION_IDS);

  const filled = solid || scrolled; // خلفية ملوّنة دائماً في الصفحات الداخلية

  // هل هذا الرابط هو الحالي؟ (قسم في الرئيسية، أو صفحة كاملة)
  const isActive = (link) =>
    link.section
      ? pathname === '/' && activeSection === link.section
      : pathname.startsWith(link.match ?? link.to);

  // الضغط على Home وأنتِ في الرئيسية: ارجعي للأعلى بسلاسة
  const handleLinkClick = (link) => {
    setDrawerOpen(false);
    if (link.to === '/' && pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(y > 300 && delta > 0);
        lastY.current = y;
      }

      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const signInSx = {
    position: 'relative',
    overflow: 'hidden',
    px: 4,
    py: 1.2,
    transition: `transform 0.3s ${EASE}, box-shadow 0.3s ease`,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-60%',
      width: '40%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
      ...withMotion(`${shine} 5s ease-in-out infinite`),
    },
    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 22px rgba(255,216,61,0.5)' },
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: filled ? 'rgba(18,35,74,0.82)' : 'transparent',
          backdropFilter: filled ? 'blur(14px)' : 'none',
          boxShadow: filled ? '0 8px 30px rgba(10,20,45,0.25)' : 'none',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: `transform 0.45s ${EASE}, background-color 0.4s ease, box-shadow 0.4s ease`,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: { xs: 2, md: 4 },
            py: scrolled ? 0.2 : 1.2,
            transition: 'padding 0.35s ease',
          }}
        >
          <Typography
            component={RouterLink}
            to="/"
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: 2,
              color: '#fff',
              textDecoration: 'none',
              transition: 'letter-spacing 0.4s ease',
              ...enter(fadeDown, 0.1, 0.8),
              '&:hover': { letterSpacing: 3.5 },
            }}
          >
            tour guide
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2.5 }}>
            {NAV_LINKS.map((link, index) => (
              <Button
                key={link.label}
                component={RouterLink}
                to={link.to}
                onClick={() => handleLinkClick(link)}
                sx={{
                  position: 'relative',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 14,
                  ...enter(fadeDown, 0.25 + index * 0.08, 0.7),
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: '18%',
                    right: '18%',
                    bottom: 4,
                    height: 2,
                    borderRadius: 2,
                    backgroundColor: '#FFD83D',
                    transform: isActive(link) ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: `transform 0.4s ${EASE}`,
                  },
                  '&:hover': { bgcolor: 'transparent', '&::after': { transform: 'scaleX(1)' } },
                }}
              >
                {link.label}
              </Button>
            ))}

            <Box sx={enter(fadeDown, 0.25 + NAV_LINKS.length * 0.08, 0.7)}>
  <UserMenu />
</Box>
          </Box>

          <IconButton
            aria-label="open menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#fff', ...enter(fadeDown, 0.2, 0.7) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

        <Box
          ref={progressRef}
          aria-hidden
          sx={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: 3,
            background: 'linear-gradient(90deg, #FFD83D, #5FB3A9)',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
          }}
        />
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: 280, bgcolor: '#12234A', color: '#fff' } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography sx={{ fontWeight: 700, letterSpacing: 2 }}>tour guide</Typography>
          <IconButton aria-label="close menu" onClick={() => setDrawerOpen(false)} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ px: 1 }}>
          {NAV_LINKS.map((link, index) => (
            <ListItemButton
              key={link.label}
              component={RouterLink}
              to={link.to}
              onClick={() => handleLinkClick(link)}
              selected={isActive(link)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                ...enter(slideInRight, 0.1 + index * 0.07, 0.6),
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                '&.Mui-selected': { bgcolor: 'rgba(255,216,61,0.16)', color: '#FFD83D' },
                '& .MuiListItemText-primary': { fontSize: 15, fontWeight: 600 },
              }}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ px: 2, mt: 1, ...enter(slideInRight, 0.1 + NAV_LINKS.length * 0.07, 0.6) }}>
  <UserMenu variant="drawer" onNavigate={() => setDrawerOpen(false)} />
</Box>
      </Drawer>
    </>
  );
};

export default Navbar;