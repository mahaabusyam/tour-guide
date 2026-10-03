import { Box, Button, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Reveal from '../common/Reveal';
import ActivityCard from './ActivityCard';

const ActivityList = ({ items, visible, onLoadMore, onClear, listKey }) => {
  const shown = items.slice(0, visible);
  const hasMore = items.length > shown.length;

  if (items.length === 0) {
    return (
      <Reveal>
        <Box sx={{ textAlign: 'center', py: 8, bgcolor: '#fff', borderRadius: '2px' }}>
          <SearchOffIcon sx={{ fontSize: 48, color: '#C4CDD5', mb: 1 }} />
          <Typography sx={{ fontSize: 14, color: 'text.secondary', mb: 1.5 }}>
            No activities match your filters
          </Typography>
          <Button size="small" onClick={onClear} sx={{ color: 'secondary.main' }}>
            Clear filters
          </Button>
        </Box>
      </Reveal>
    );
  }

  return (
    <>
      {/* key: عند تغيّر الفلتر يُعاد إنشاء القائمة فتتكرر حركة الظهور */}
      <Box key={listKey} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {shown.map((activity, index) => (
          <ActivityCard key={activity.id} activity={activity} index={index} />
        ))}
      </Box>

      {hasMore ? (
        <Button
          fullWidth
          variant="outlined"
          onClick={onLoadMore}
          sx={{
            position: 'relative',
            isolation: 'isolate',
            overflow: 'hidden',
            mt: 3,
            py: 1.3,
            borderRadius: 8,
            fontSize: 13,
            color: 'secondary.main',
            borderColor: 'secondary.main',
            transition: 'color 0.35s ease, transform 0.3s ease',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              zIndex: -1,
              backgroundColor: '#5FB3A9',
              transform: 'translateY(101%)',
              transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
            },
            '&:hover': {
              color: '#fff',
              bgcolor: 'transparent',
              borderColor: 'secondary.main',
              transform: 'translateY(-2px)',
              '&::before': { transform: 'translateY(0)' },
            },
          }}
        >
          Load More
        </Button>
      ) : null}

      <Typography sx={{ mt: 1.5, textAlign: 'center', fontSize: 12, color: 'text.secondary' }}>
        Showing {shown.length} of {items.length} activities
      </Typography>
    </>
  );
};

export default ActivityList;