import { useEffect, useRef } from 'react';

const useScrollParallax = (maxScroll = 1000) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!element || reduceMotion) return;

    let frame;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.setProperty('--scroll', Math.min(window.scrollY, maxScroll));
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });

    // Cleanup
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
    };
  }, [maxScroll]);

  return ref;
};

export default useScrollParallax;