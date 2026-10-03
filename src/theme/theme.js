import { createTheme } from '@mui/material/styles';
const headingFont = '"Merriweather", serif';
const theme = createTheme({
  palette: {
    primary: { main: '#FFD83D', contrastText: '#1F2A37' }, // الأصفر
    secondary: { main: '#5FB3A9' },                          // الأخضر المائي للأيقونات
    text: { primary: '#1F2A37', secondary: '#6B7280' },
  },
  typography: {
  fontFamily: '"Mulish", sans-serif',
  h1: { fontFamily: headingFont, fontWeight: 700 },
  h2: { fontFamily: headingFont, fontWeight: 700 },
  h3: { fontFamily: headingFont, fontWeight: 700 },
  h6: { fontFamily: headingFont, fontWeight: 700 },
  button: { textTransform: 'none', fontWeight: 700 },
},
  shape: { borderRadius: 8 },
  components: {
  MuiCssBaseline: {
    styleOverrides: {
      html: { scrollBehavior: 'smooth', scrollPaddingTop: '70px' },
      '@media (prefers-reduced-motion: reduce)': { html: { scrollBehavior: 'auto' } },
    },
  },
},
});

export default theme;