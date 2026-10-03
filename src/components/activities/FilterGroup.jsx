import { useState } from 'react';
import { Box, Checkbox, Collapse, Divider, FormControlLabel, Link, Paper, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { scaleIn } from '../../styles/animations';
import Reveal from '../common/Reveal';

const OptionList = ({ options, selected, onToggle }) => (
  <Box>
    {options.map((option) => {
      const checked = selected.includes(option.id);

      return (
        <FormControlLabel
          key={option.id}
          sx={{
            display: 'flex',
            width: '100%',
            mx: 0,
            borderRadius: 1,
            transition: 'background-color 0.25s ease, padding-left 0.25s ease',
            '&:hover': { bgcolor: 'rgba(95,179,169,0.08)', pl: 0.5 },
          }}
          control={
            <Checkbox
              size="small"
              color="secondary"
              checked={checked}
              onChange={() => onToggle(option.id)}
              sx={{ py: 0.5, color: '#9AA5B1', '& svg': { fontSize: 18 } }}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.8, opacity: option.count === 0 && !checked ? 0.45 : 1 }}>
              <Typography component="span" sx={{ fontSize: 12, fontWeight: checked ? 700 : 400 }}>
                {option.label}
              </Typography>
              <Typography component="span" sx={{ fontSize: 10, color: 'text.secondary' }}>
                ({option.count})
              </Typography>
            </Box>
          }
        />
      );
    })}
  </Box>
);

const FilterGroup = ({ title, options, selected, onToggle, initialVisible, moreLabel, delay = 0 }) => {
  const [open, setOpen] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const visibleOptions = options.slice(0, initialVisible);
  const extraOptions = options.slice(initialVisible);

  return (
    <Reveal direction="left" delay={delay}>
      <Paper elevation={0} sx={{ borderRadius: '2px', boxShadow: '0 4px 20px rgba(31,42,55,0.07)' }}>
        <Box
          component="button"
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2.5,
            py: 1.6,
            border: 0,
            bgcolor: 'transparent',
            cursor: 'pointer',
            font: 'inherit',
            color: 'text.primary',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{title}</Typography>
            {selected.length > 0 && (
              <Box
                key={selected.length}
                component="span"
                sx={{
                  minWidth: 18,
                  height: 18,
                  px: 0.6,
                  borderRadius: 9,
                  display: 'grid',
                  placeItems: 'center',
                  bgcolor: 'secondary.main',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  animation: `${scaleIn} 0.3s ease`,
                }}
              >
                {selected.length}
              </Box>
            )}
          </Box>
          <ArrowDropDownIcon
            sx={{ transition: 'transform 0.3s ease', transform: open ? 'none' : 'rotate(-90deg)' }}
          />
        </Box>

        <Collapse in={open}>
          <Divider />
          <Box sx={{ px: 2.5, py: 1.5 }}>
            <OptionList options={visibleOptions} selected={selected} onToggle={onToggle} />

            {extraOptions.length > 0 && (
              <>
                <Collapse in={showAll}>
                  <OptionList options={extraOptions} selected={selected} onToggle={onToggle} />
                </Collapse>

                <Link
                  component="button"
                  type="button"
                  underline="none"
                  onClick={() => setShowAll((prev) => !prev)}
                  sx={{
                    mt: 1,
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'secondary.main',
                    transition: 'color 0.3s ease',
                    '&:hover': { color: '#3F8F85' },
                  }}
                >
                  {showAll ? 'Show Less' : moreLabel}
                </Link>
              </>
            )}
          </Box>
        </Collapse>
      </Paper>
    </Reveal>
  );
};

export default FilterGroup;