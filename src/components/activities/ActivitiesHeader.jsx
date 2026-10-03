import { Box, Container, MenuItem, Select, Typography } from '@mui/material';
import { SORT_OPTIONS } from '../../constants/activities';
import useAnimatedNumber from '../../hooks/useAnimatedNumber';
import { enter, fadeUp, riseUp } from '../../styles/animations';

const ActivitiesHeader = ({ cityName, count, sort, onSortChange }) => {
  const animatedCount = useAnimatedNumber(count, 700);
  const title = `Things To Do In ${cityName}`;

  return (
    <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #EDF0F3', pt: { xs: 11, md: 13 }, pb: 2.5 }}>
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h1" aria-label={title} sx={{ fontSize: { xs: 22, md: 26 } }}>
            {title.split(' ').map((word, index) => (
              <Box
                key={index}
                component="span"
                aria-hidden
                sx={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', mr: '0.25em', pb: '0.1em' }}
              >
                <Box component="span" sx={{ display: 'inline-block', ...enter(riseUp, 0.1 + index * 0.08, 0.8) }}>
                  {word}
                </Box>
              </Box>
            ))}
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: 'text.secondary',
              mt: 0.5,
              fontVariantNumeric: 'tabular-nums',
              ...enter(fadeUp, 0.5, 0.8),
            }}
          >
            {Math.round(animatedCount)} Activities Found
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: { xs: '100%', sm: 'auto' } }}>
          <Typography id="sort-label" sx={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>
            Sort by:
          </Typography>
          <Select
            labelId="sort-label"
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
            size="small"
            sx={{
              flex: { xs: 1, sm: '0 0 232px' },
              bgcolor: '#F1F4F6',
              fontSize: 12.5,
              borderRadius: '3px',
              transition: 'background-color 0.3s ease',
              '& fieldset': { border: 'none' },
              '&:hover': { bgcolor: '#E9EEF1' },
            }}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value} sx={{ fontSize: 12.5 }}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Container>
    </Box>
  );
};

export default ActivitiesHeader;