import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ScrollToTop from './components/common/ScrollToTop';
import PageLoader from './components/common/PageLoader';
import { pageLoaders, prefetchList } from './utils/pages';

// الرئيسية تُحمَّل مباشرة (أول ما يراه الزائر)، والباقي عند الحاجة
const Activities = lazy(pageLoaders.activities);
const TourDetails = lazy(pageLoaders.tourDetails);
const Profile = lazy(pageLoaders.profile);
const NotFound = lazy(pageLoaders.notFound);

const schedule = (callback) =>
  'requestIdleCallback' in window ? window.requestIdleCallback(callback) : setTimeout(callback, 2000);

const cancelSchedule = (id) =>
  'cancelIdleCallback' in window ? window.cancelIdleCallback(id) : clearTimeout(id);

const App = () => {
  // بعد أن تهدأ الصفحة: نجلب بقية الصفحات في الخلفية، فيصير التنقل فورياً
  useEffect(() => {
    if (navigator.connection?.saveData) return; // المستخدم فعّل "توفير البيانات"

    const id = schedule(() => prefetchList.forEach((name) => pageLoaders[name]()));

    // Cleanup
    return () => cancelSchedule(id);
  }, []);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/things-to-do/:cityId" element={<Activities />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;