import { useEffect, useState } from 'react';
import { Badge, Box, Button, Fab, Paper, Typography } from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';

const COLORS = { error: '#E04B4B', promise: '#E04B4B', image: '#F4A63C', warning: '#8D6E00' };
const MAX_ISSUES = 50;

// يستبدل %s في رسائل React بقيمها
const formatArgs = ([first, ...rest]) => {
  if (typeof first !== 'string') return String(first?.message ?? first);

  let index = 0;
  const message = first.replace(/%[sdo]/g, () => String(rest[index++] ?? ''));
  const leftovers = rest.slice(index).map((item) => String(item?.message ?? item));

  return [message, ...leftovers].join(' ').slice(0, 600);
};

const DevDiagnostics = () => {
  const [issues, setIssues] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const add = (type, text) =>
      setIssues((prev) => {
        if (prev.some((item) => item.type === type && item.text === text)) return prev; // بدون تكرار
        return [...prev, { type, text }].slice(-MAX_ISSUES);
      });

    // true = مرحلة الالتقاط: ضرورية لأن خطأ تحميل الصورة لا "يصعد" في الشجرة
    const onError = (event) => {
      const target = event.target;

      if (target && target.tagName === 'IMG') {
        add('image', target.getAttribute('src') ?? 'unknown image');
        return;
      }

      const file = event.filename ? event.filename.split('/').pop() : '';
      add('error', `${event.message ?? 'Unknown error'} ${file ? `(${file}:${event.lineno})` : ''}`);
    };

    const onRejection = (event) => add('promise', String(event.reason?.message ?? event.reason));

    // تحذيرات React تمر عبر console.error: نلتقطها ثم نمررها كما هي
    const originalError = console.error;
    const originalWarn = console.warn;

    const wrap = (original) => (...args) => {
      original(...args);
      const text = formatArgs(args);
      setTimeout(() => add('warning', text), 0); // خارج مرحلة الرسم: لا تحذيرات إضافية
    };

    console.error = wrap(originalError);
    console.warn = wrap(originalWarn);

    window.addEventListener('error', onError, true);
    window.addEventListener('unhandledrejection', onRejection);

    // Cleanup: إعادة console كما كان
    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      window.removeEventListener('error', onError, true);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);

  if (issues.length === 0) return null;

  return (
    <Box sx={{ position: 'fixed', left: 12, bottom: 12, zIndex: 2000, direction: 'ltr' }}>
      {open && (
        <Paper elevation={8} sx={{ mb: 1, width: 'min(92vw, 520px)', maxHeight: '55vh', overflow: 'auto', p: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700 }}>Dev diagnostics ({issues.length})</Typography>
            <Box>
              <Button size="small" onClick={() => setIssues([])}>Clear</Button>
              <Button size="small" onClick={() => setOpen(false)}>Close</Button>
            </Box>
          </Box>

          {issues.map((issue, index) => (
            <Box key={index} sx={{ mb: 1, p: 1, borderLeft: `4px solid ${COLORS[issue.type]}`, bgcolor: '#FAFAFA' }}>
              <Typography sx={{ fontSize: 10, fontWeight: 700, color: COLORS[issue.type], textTransform: 'uppercase' }}>
                {issue.type}
              </Typography>
              <Typography sx={{ fontSize: 11.5, fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {issue.text}
              </Typography>
            </Box>
          ))}
        </Paper>
      )}

      <Badge badgeContent={issues.length} color="error" max={99}>
        <Fab size="small" aria-label="toggle diagnostics" onClick={() => setOpen((prev) => !prev)}>
          <BugReportIcon />
        </Fab>
      </Badge>
    </Box>
  );
};

export default DevDiagnostics;