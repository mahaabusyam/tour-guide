import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Snackbar, Typography } from '@mui/material';
import { updateProfile } from '../../features/user/userSlice';
import useShake from '../../hooks/useShake';
import useSimulatedSave from '../../hooks/useSimulatedSave';
import { shake } from '../../styles/animations';
import FormField from './FormField';
import SaveButton from './SaveButton';

const FIELDS = ['name', 'birthDate', 'phone', 'location'];

const pickFields = (profile) => Object.fromEntries(FIELDS.map((field) => [field, profile[field] ?? '']));

const validate = (values) => {
  const errors = {};
  const today = new Date().toLocaleDateString('en-CA');

  if (values.name.trim().length < 2) errors.name = 'Please enter your full name';
  if (values.birthDate && values.birthDate > today) errors.birthDate = 'Date of birth cannot be in the future';
  if (values.phone && !/^[+\d][\d\s-]{6,19}$/.test(values.phone.trim())) errors.phone = 'Enter a valid phone number';

  return errors;
};

const PersonalInfoForm = ({ profile }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(() => pickFields(profile));
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [status, run] = useSimulatedSave();
  const { shaking, triggerShake } = useShake();

  // إن تغيّر الملف من مكان آخر (مثل تسجيل خروج ثم دخول)
  useEffect(() => {
    setValues(pickFields(profile));
  }, [profile.name, profile.birthDate, profile.phone, profile.location]); // eslint-disable-line react-hooks/exhaustive-deps

  const dirty = FIELDS.some((field) => values[field] !== (profile[field] ?? ''));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // يختفي الخطأ عند التعديل
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      triggerShake();
      return;
    }

    run(() => {
      dispatch(
        updateProfile({
          name: values.name.trim(),
          birthDate: values.birthDate,
          phone: values.phone.trim(),
          location: values.location.trim(),
        })
      );
      setMessage('Profile updated');
    });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={shaking ? { animation: `${shake} 0.45s ease` } : undefined}>
      <Typography variant="h2" sx={{ fontFamily: 'inherit', fontSize: 17, fontWeight: 700, mb: 2 }}>
        Personal Information
      </Typography>

      <FormField label="Name:" name="name" value={values.name} onChange={handleChange} error={errors.name} autoComplete="name" />
      <FormField label="Date Of Birth" name="birthDate" type="date" value={values.birthDate} onChange={handleChange} error={errors.birthDate} delay={0.08} />
      <FormField label="Phone" name="phone" type="tel" value={values.phone} onChange={handleChange} error={errors.phone} autoComplete="tel" delay={0.16} />
      <FormField label="Location" name="location" value={values.location} onChange={handleChange} error={errors.location} delay={0.24} />

      <SaveButton status={status} disabled={!dirty && status === 'idle'} />

      <Snackbar open={Boolean(message)} autoHideDuration={2500} onClose={() => setMessage('')} message={message} />
    </Box>
  );
};

export default PersonalInfoForm;