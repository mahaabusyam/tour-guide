import { useEffect, useRef } from 'react';

const useMouseParallax = () => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!element || reduceMotion) return;

    let frame;

    const handleMove = (event) => {
      if (event.pointerType !== 'mouse') return; // لا نحتاجه على اللمس
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        // قيمة بين -0.5 و 0.5 حسب موضع الماوس
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.setProperty('--px', x.toFixed(3));
        element.style.setProperty('--py', y.toFixed(3));
      });
    };

    const handleLeave = () => {
      element.style.setProperty('--px', '0');
      element.style.setProperty('--py', '0');
    };

    element.addEventListener('pointermove', handleMove);
    element.addEventListener('pointerleave', handleLeave);

    // Cleanup
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener('pointermove', handleMove);
      element.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  return ref;
};

export default useMouseParallax;