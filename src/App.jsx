import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TourDetails from './pages/TourDetails';
import Activities from './pages/Activities';
import Profile from './pages/Profile';
import ScrollToTop from './components/common/ScrollToTop';

const App = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/things-to-do/:cityId" element={<Activities />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
);

export default App;