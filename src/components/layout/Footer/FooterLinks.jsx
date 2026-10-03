import { Box, Link, Typography } from '@mui/material';
import { headingSx } from './footerStyles';

const FooterLinks = ({ title, links }) => (
  <Box>
    <Typography sx={headingSx}>{title}</Typography>

    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 1.8 }}>
      {links.map((link) => (
        <Box component="li" key={link.label} sx={{ mb: 1.5 }}>
          <Link
            href={link.href}
            underline="none"
            sx={{
              position: 'relative',
              display: 'inline-block',
              fontSize: 13,
              color: 'rgba(255,255,255,0.55)',
              transition: 'color 0.3s ease, transform 0.3s ease',
              // الخط الأصفر: يبدأ بعرض صفر ويُرسم من اليسار
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: -3,
                width: '100%',
                height: '1px',
                backgroundColor: '#FFD83D',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.35s ease',
              },
              '&:hover': {
                color: '#fff',
                transform: 'translateX(4px)',
                '&::after': { transform: 'scaleX(1)' },
              },
            }}
          >
            {link.label}
          </Link>
        </Box>
      ))}
    </Box>
  </Box>
);

export default FooterLinks;