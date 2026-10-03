import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const readList = (params, key) => params.get(key)?.split(',').filter(Boolean) ?? [];

const useActivityFilters = () => {
  const [params, setParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      theme: readList(params, 'theme'),
      duration: readList(params, 'duration'),
      destination: readList(params, 'destination'),
      sort: params.get('sort') ?? 'popularity',
    }),
    [params]
  );

  // إضافة القيمة للفلتر إن لم تكن موجودة، وحذفها إن كانت موجودة
  const toggle = useCallback(
    (key, value) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          const current = readList(next, key);
          const updated = current.includes(value)
            ? current.filter((item) => item !== value)
            : [...current, value];

          if (updated.length > 0) next.set(key, updated.join(','));
          else next.delete(key);
          return next;
        },
        { replace: true }
      );
    },
    [setParams]
  );

  const setSort = useCallback(
    (value) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value === 'popularity') next.delete('sort');
          else next.set('sort', value);
          return next;
        },
        { replace: true }
      );
    },
    [setParams]
  );

  const clear = useCallback(() => setParams({}, { replace: true }), [setParams]);

  return { filters, toggle, setSort, clear };
};

export default useActivityFilters;