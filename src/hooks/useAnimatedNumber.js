import { useEffect, useRef, useState } from 'react';

const useAnimatedNumber = (target, duration = 600) => {
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      valueRef.current = target;
      setValue(target);
      return;
    }

    const start = valueRef.current;
    const startTime = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // تباطؤ في النهاية
      const current = start + (target - start) * eased;

      valueRef.current = current;
      setValue(current);

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    // Cleanup
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
};

export default useAnimatedNumber;