import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Button, Collapse, Rating, Tooltip, Typography } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { selectHelpfulIds, toggleHelpful } from '../../../features/reviews/reviewsSlice';
import { formatReviewDate } from '../../../utils/reviews';
import { pop } from '../../../styles/animations';
import Reveal from '../../common/Reveal';

const LONG_TEXT = 300;
const COLLAPSED_HEIGHT = 92; // ما يعادل 4 أسطر تقريباً

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

const ReviewItem = ({ review, index }) => {
  const dispatch = useDispatch();
  const isHelpful = useSelector(selectHelpfulIds).includes(review.id);
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > LONG_TEXT;

  return (
    <Reveal direction="soft" delay={(index % 5) * 0.08} duration={0.7}>
      <Box
        component="article"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '190px 1fr auto' },
          gap: { xs: 1.5, md: 2.5 },
          px: 1,
          mx: -1,
          py: 3,
          borderBottom: '1px solid #EDF0F3',
          transition: 'background-color 0.3s ease',
          '&:hover': { bgcolor: 'rgba(95,179,169,0.04)' },
          '&:hover .avatar': { transform: 'scale(1.08)' },
        }}
      >
        {/* الكاتب */}
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Avatar
            className="avatar"
            src={review.avatar}
            alt={review.author}
            sx={{
              width: 42,
              height: 42,
              fontSize: 14,
              fontWeight: 700,
              bgcolor: 'secondary.main',
              border: '2px solid #fff',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 3px 10px rgba(31,42,55,0.25)',
              transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {getInitials(review.author)}
          </Avatar>

          <Box>
            <Rating value={review.rating} readOnly size="small" sx={{ color: '#F9A63B', fontSize: 14 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{review.author}</Typography>
              <Tooltip title="Verified traveler" arrow>
                <DoneAllIcon sx={{ fontSize: 15, color: 'secondary.main' }} />
              </Tooltip>
            </Box>
            <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>{formatReviewDate(review.date)}</Typography>
          </Box>
        </Box>

        {/* المحتوى */}
        <Box>
          <Typography variant="h6" sx={{ fontFamily: 'inherit', fontSize: 13, fontWeight: 700, mb: 1.5 }}>
            {review.title}
          </Typography>

          <Collapse in={expanded || !isLong} collapsedSize={COLLAPSED_HEIGHT}>
            <Typography sx={{ fontSize: 12, lineHeight: 1.9, color: 'text.secondary' }}>{review.text}</Typography>
          </Collapse>

          {isLong && (
            <Button
              size="small"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              endIcon={
                <ExpandMoreIcon
                  sx={{ transition: 'transform 0.3s ease', transform: expanded ? 'rotate(180deg)' : 'none' }}
                />
              }
              sx={{ mt: 0.5, px: 0, fontSize: 12, color: 'secondary.main', '&:hover': { bgcolor: 'transparent' } }}
            >
              {expanded ? 'Show less' : 'Read more'}
            </Button>
          )}
        </Box>

        {/* مفيدة؟ */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.8, whiteSpace: 'nowrap', height: 'fit-content' }}>
          <Typography sx={{ fontSize: 12, color: 'text.secondary', pt: '3px' }}>Helpful?</Typography>
          <Button
            size="small"
            aria-pressed={isHelpful}
            onClick={() => dispatch(toggleHelpful(review.id))}
            startIcon={isHelpful ? <ThumbUpIcon key="on" sx={{ fontSize: 13, animation: `${pop} 0.4s ease` }} /> : null}
            sx={{
              minWidth: 0,
              px: 1,
              py: 0.2,
              fontSize: 12,
              fontWeight: 700,
              borderRadius: 8,
              color: isHelpful ? '#fff' : 'secondary.main',
              bgcolor: isHelpful ? 'secondary.main' : 'transparent',
              transition: 'all 0.3s ease',
              '&:hover': { bgcolor: isHelpful ? 'secondary.main' : 'rgba(95,179,169,0.12)' },
            }}
          >
            Yes{review.helpful + (isHelpful ? 1 : 0) > 0 ? ` (${review.helpful + (isHelpful ? 1 : 0)})` : ''}
          </Button>
        </Box>
      </Box>
    </Reveal>
  );
};

export default ReviewItem;