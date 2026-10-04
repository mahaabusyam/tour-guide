// هل القيمة المقروءة من نفس نوع القيمة الافتراضية؟ (مصفوفة، كائن، أو أي شيء)
const sameKind = (value, fallback) => {
  if (Array.isArray(fallback)) return Array.isArray(value);

  if (fallback !== null && typeof fallback === 'object') {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  return true;
};

export const loadFromStorage = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw);
    return sameKind(parsed, fallback) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // التخزين ممتلئ أو محظور
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    // لا شيء
  }
};

// يقبل مصفوفة أو كائناً فقط (يرفض النص، وهو ما يحدث عند غياب ملف JSON)
const isStructured = (data) => data !== null && typeof data === 'object';

export const loadCache = (key, ttl, isValid = isStructured) => {
  const cached = loadFromStorage(key);

  if (!cached || typeof cached.savedAt !== 'number') return null;
  if (Date.now() - cached.savedAt >= ttl) return null;

  if (!isValid(cached.data)) {
    removeFromStorage(key); // بيانات فاسدة: احذفيها
    return null;
  }

  return cached.data;
};

export const saveCache = (key, data) => saveToStorage(key, { data, savedAt: Date.now() });