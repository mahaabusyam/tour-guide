import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, IconButton, InputAdornment, Snackbar, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { updateProfile } from '../../features/user/userSlice';
import useShake from '../../hooks/useShake';
import useSimulatedSave from '../../hooks/useSimulatedSave';
import { getPasswordStrength, isValidEmail } from '../../utils/profile';
import { shake } from '../../styles/animations';
import FormField from './FormField';
import SaveButton from './SaveButton';

const EMPTY_PASSWORDS = { password: '', confirm: '' };

const PasswordToggle = ({ visible, onToggle }) => (
  <InputAdornment position="end">
    <IconButton
      size="small"
      edge="end"
      aria-label={visible ? 'hide password' : 'show password'}
      onClick={onToggle}
      sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.15)' } }}
    >
      {visible ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
    </IconButton>
  </InputAdornment>
);

const StrengthMeter = ({ password }) => {
  const { score, label, color } = getPasswordStrength(password);

  return (
    <Box sx={{ mt: -1, mb: 2 }}>
      <Box sx={{ height: 5, borderRadius: 3, bgcolor: '#E6E9EC', overflow: 'hidden' }}>
        <Box
          sx={{
            height: '100%',
            width: password ? `${Math.max(score, 1) * 25}%` : '0%',
            bgcolor: color,
            borderRadius: 3,
            transition: 'width 0.4s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease',
          }}
        />
      </Box>
      <Typography sx={{ fontSize: 11, mt: 0.5, color: password ? color : 'text.secondary', fontWeight: 600 }}>
        {password ? label : 'Use 8+ characters with letters, numbers and symbols'}
      </Typography>
    </Box>
  );
};

const SecurityForm = ({ profile }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(profile.email ?? '');
  const [passwords, setPasswords] = useState(EMPTY_PASSWORDS);
  const [visible, setVisible] = useState({ password: false, confirm: false });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [status, run] = useSimulatedSave();
  const { shaking, triggerShake } = useShake();

  const dirty = email !== (profile.email ?? '') || passwords.password !== '' || passwords.confirm !== '';

  const handlePassword = (event) => {
    const { name, value } = event.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const toggleVisible = (name) => setVisible((prev) => ({ ...prev, [name]: !prev[name] }));

  const validate = () => {
    const found = {};

    if (!isValidEmail(email)) found.email = 'Enter a valid email address';

    if (passwords.password || passwords.confirm) {
      if (passwords.password.length < 8) found.password = 'Password must be at least 8 characters';
      if (passwords.confirm !== passwords.password) found.confirm = 'Passwords do not match';
    }

    return found;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      triggerShake();
      return;
    }

    const changedPassword = passwords.password !== '';

    run(() => {
      // كلمة المرور لا تُحفظ أبداً: نحدّث البريد فقط ونفرّغ الحقول
      dispatch(updateProfile({ email: email.trim() }));
      setPasswords(EMPTY_PASSWORDS);
      setMessage(changedPassword ? 'Email and password updated' : 'Email updated');
    });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={shaking ? { animation: `${shake} 0.45s ease` } : undefined}>
      <Typography variant="h2" sx={{ fontFamily: 'inherit', fontSize: 17, fontWeight: 700, mb: 2 }}>
        Security
      </Typography>

      <FormField
        label="Email Address"
        name="email"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        error={errors.email}
        autoComplete="email"
      />

      <FormField
        label="Password"
        name="password"
        type={visible.password ? 'text' : 'password'}
        value={passwords.password}
        onChange={handlePassword}
        error={errors.password}
        placeholder="••••••••••"
        autoComplete="new-password"
        endAdornment={<PasswordToggle visible={visible.password} onToggle={() => toggleVisible('password')} />}
        delay={0.08}
      />
      <StrengthMeter password={passwords.password} />

      <FormField
        label="Confirm Password"
        name="confirm"
        type={visible.confirm ? 'text' : 'password'}
        value={passwords.confirm}
        onChange={handlePassword}
        error={errors.confirm}
        placeholder="••••••••••"
        autoComplete="new-password"
        endAdornment={<PasswordToggle visible={visible.confirm} onToggle={() => toggleVisible('confirm')} />}
        delay={0.16}
      />

      <SaveButton status={status} disabled={!dirty && status === 'idle'} />

      <Snackbar open={Boolean(message)} autoHideDuration={2500} onClose={() => setMessage('')} message={message} />
    </Box>
  );
};

export default SecurityForm;