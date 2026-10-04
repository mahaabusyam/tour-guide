// يعمل في الحالتين: base = '/' أو '/tour-guide/'
const BASE = import.meta.env.BASE_URL.replace(/\/$/, ''); // '' أو '/tour-guide'

export const withBase = (path) =>
  typeof path === 'string' && path.startsWith('/') && !path.startsWith(`${BASE}/`)
    ? `${BASE}${path}`
    : path;

// يضيف البادئة لكل مسار صورة داخل أي كائن أو مصفوفة (بيانات JSON أو ثوابت)
export const prefixAssets = (value) => {
  if (typeof value === 'string') return value.startsWith('/images/') ? withBase(value) : value;
  if (Array.isArray(value)) return value.map(prefixAssets);

  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, prefixAssets(item)]));
  }

  return value;
};