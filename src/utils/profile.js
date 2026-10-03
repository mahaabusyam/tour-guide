export const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

// 1st, 2nd, 3rd, 15th ...
const ordinal = (n) => {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

export const formatBirthday = (iso) => {
  if (!iso) return '';
  const date = new Date(`${iso}T00:00:00`);
  return `${ordinal(date.getDate())} ${date.toLocaleDateString('en-GB', { month: 'long' })}`;
};

export const formatDate = (iso) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB') : '';

const STRENGTH_LEVELS = [
  { label: 'Too weak', color: '#E04B4B' },
  { label: 'Weak', color: '#E04B4B' },
  { label: 'Fair', color: '#F4A63C' },
  { label: 'Good', color: '#5FB3A9' },
  { label: 'Strong', color: '#2E9E6B' },
];

export const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  return { score, ...STRENGTH_LEVELS[score] };
};