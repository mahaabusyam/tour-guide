import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Snackbar, Switch, Typography } from '@mui/material';
import { SETTINGS_PANELS } from '../../constants/profile';
import { selectSettings, updateSettings } from '../../features/user/userSlice';
import Reveal from '../common/Reveal';

const SettingsPanel = ({ type }) => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const [message, setMessage] = useState('');
  const { title, rows } = SETTINGS_PANELS[type];

  const handleToggle = (key, checked) => {
    dispatch(updateSettings({ [key]: checked })); // يُحفظ فوراً
    setMessage('Preferences saved');
  };

  return (
    <Box>
      <Typography variant="h2" sx={{ fontFamily: 'inherit', fontSize: 17, fontWeight: 700, mb: 2 }}>
        {title}
      </Typography>

      {rows.map((row, index) => (
        <Reveal key={row.key} direction="soft" delay={index * 0.08} duration={0.5}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              py: 2,
              px: 1,
              mx: -1,
              borderBottom: '1px solid #EEF1F4',
              borderRadius: '3px',
              transition: 'background-color 0.3s ease',
              '&:hover': { bgcolor: 'rgba(95,179,169,0.05)' },
            }}
          >
            <Box>
              <Typography id={`${row.key}-label`} sx={{ fontSize: 13.5, fontWeight: 700 }}>
                {row.title}
              </Typography>
              <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.3 }}>{row.text}</Typography>
            </Box>

            <Switch
              color="secondary"
              checked={Boolean(settings[row.key])}
              onChange={(event) => handleToggle(row.key, event.target.checked)}
              inputProps={{ 'aria-labelledby': `${row.key}-label` }}
            />
          </Box>
        </Reveal>
      ))}

      <Snackbar open={Boolean(message)} autoHideDuration={1800} onClose={() => setMessage('')} message={message} />
    </Box>
  );
};

export default SettingsPanel;