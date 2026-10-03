import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';
import BackToTop from '../components/common/BackToTop';
import Hero from '../components/home/Hero/Hero';
import PopularCities from '../components/home/PopularCities/PopularCities';
import Featured from '../components/home/Featured/Featured';
import AppPromo from '../components/home/AppPromo/AppPromo';
import Gallery from '../components/home/Gallery/Gallery';
import Stories from '../components/home/Stories/Stories';


const Home = () => (
  <>
    <Navbar />
    <Hero />
    <PopularCities />
    <Featured />
    <AppPromo />
    <Gallery />
    <Stories />
    <Footer />
    <BackToTop />
  </>
);

export default Home;