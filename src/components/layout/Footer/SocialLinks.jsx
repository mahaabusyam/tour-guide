import { Box, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { SOCIALS } from '../../../constants/footer';
import Reveal from '../../common/Reveal';

const ICONS = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  pinterest: PinterestIcon,
};

const SocialLinks = () => (
  <Box sx={{ display: 'flex', gap: 1.5 }}>
    {SOCIALS.map(({ id, label, href, color }, index) => {
      const Icon = ICONS[id];
      return (
        <Reveal key={id} delay={index * 0.1} duration={0.6}>
          <IconButton
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            sx={{
              width: 30,
              height: 30,
              bgcolor: color,
              color: '#fff',
              transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease',
              '& svg': { fontSize: 16, transition: 'transform 0.6s ease' },
              '&:hover': {
                bgcolor: color,
                transform: 'translateY(-5px) scale(1.12)',
                boxShadow: `0 8px 18px ${color}99`,
                '& svg': { transform: 'rotate(360deg)' },
              },
            }}
          >
            <Icon />
          </IconButton>
        </Reveal>
      );
    })}
  </Box>
);

export default SocialLinks;