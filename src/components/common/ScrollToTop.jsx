import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    const pathChanged = previousPath.current !== pathname;
    previousPath.current = pathname;

    // صفحة جديدة أو لا يوجد hash: ابدئي من الأعلى
    if (pathChanged || !hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    // رابط داخلي: انتظري إطاراً حتى تُرسم الصفحة ثم انزلي بسلاسة
    if (hash) {
      const frame = requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;