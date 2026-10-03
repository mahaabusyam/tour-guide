import { useEffect, useState } from 'react';

const useActiveSection = (ids) => {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      // شريط رفيع في منتصف الشاشة: القسم الذي يقطعه هو النشط
      { rootMargin: '-45% 0px -50% 0px' }
    );

    elements.forEach((element) => observer.observe(element));

    // Cleanup
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
};

export default useActiveSection;