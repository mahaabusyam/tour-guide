import { useEffect, useRef, useState } from 'react';

const useInView = ({ threshold = 0.15, once = true } = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect(); // يكفي ظهور واحد
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    // Cleanup: إيقاف المراقبة عند إزالة المكوّن
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, inView];
};

export default useInView;