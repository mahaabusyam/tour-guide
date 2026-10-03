import { useCallback, useEffect, useRef, useState } from 'react';

const useSimulatedSave = () => {
  const [status, setStatus] = useState('idle'); // idle | saving | saved
  const timers = useRef([]);

  // Cleanup: إلغاء المؤقتات عند مغادرة الصفحة
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = useCallback((onDone) => {
    setStatus('saving');

    timers.current.push(
      setTimeout(() => {
        onDone?.();
        setStatus('saved');
        timers.current.push(setTimeout(() => setStatus('idle'), 1800));
      }, 700)
    );
  }, []);

  return [status, run];
};

export default useSimulatedSave;