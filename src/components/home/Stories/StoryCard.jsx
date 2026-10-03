import { Avatar, Box, Card, Typography } from '@mui/material';

const StoryCard = ({ story }) => (
  <Card
    component="a"
    href={story.href || '#'}
    elevation={0}
    sx={{
      display: 'block',
      height: '100%',
      textDecoration: 'none',
      color: 'inherit',
      borderRadius: '8px',
      boxShadow: '0 6px 24px rgba(31,42,55,0.08)',
      transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 22px 44px rgba(31,42,55,0.16)',
      },
      '&:hover .cover': { transform: 'scale(1.08)' },
      '&:hover .title-text': { backgroundSize: '100% 2px', color: 'secondary.main' },
    }}
  >
    <Box sx={{ height: 150, overflow: 'hidden' }}>
      <Box
        className="cover"
        component="img"
        src={story.image}
        alt={story.title}
        loading="lazy"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
    </Box>

    <Box sx={{ p: 1.8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.2 }}>
        <Avatar src={story.author.avatar} alt={story.author.name} sx={{ width: 22, height: 22 }} />
        <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>{story.author.name}</Typography>
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontSize: 14,
          lineHeight: 1.6,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        <Box
          component="span"
          className="title-text"
          sx={{
            backgroundImage: 'linear-gradient(currentColor, currentColor)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0 100%',
            backgroundSize: '0% 2px',
            transition: 'background-size 0.45s ease, color 0.3s ease',
          }}
        >
          {story.title}
        </Box>
      </Typography>
    </Box>
  </Card>
);

export default StoryCard;