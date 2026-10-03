import { useCallback, useEffect, useState } from 'react';

const useShake = () => {
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (!shaking) return;

    const timer = setTimeout(() => setShaking(false), 500);
    return () => clearTimeout(timer);
  }, [shaking]);

  const triggerShake = useCallback(() => setShaking(true), []);

  return { shaking, triggerShake };
};

export default useShake;