import trendingImage from '../assets/images/Trending.jpg';
import hotel1Image from '../assets/images/hotel-1.jpg';
import hotel2Image from '../assets/images/hotel-2.jpg';
import { prefixAssets } from '../utils/assets';
export const ACCENT = '#22CFF0';
export const APP_PROMO = prefixAssets({
  background: trendingImage,
  title: 'Smart City Tour Mobile App',
  subtitle: 'Available on IOS & Android',
  description:
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
  stores: [
    { id: 'ios', label: 'Download For IOS', href: '#' },
    { id: 'android', label: 'Download For Android', href: '#' },
  ],
  hotels: [
    {
      id: 1,
      name: 'Hotel Seagull Int.',
      place: "Cox's Bazar",
      price: '$34/n',
      rating: 4.5,
      reviews: 28,
      distance: '0.4 MILE',
      image: hotel1Image,
      liked: false,
      tag: 'FREE WIFI',
    },
    {
      id: 2,
      name: 'Ocean Paradise Hotel',
      place: "Cox's Bazar",
      price: '$34/n',
      rating: 4.5,
      reviews: 28,
      distance: '1.2 MILE',
      image: hotel2Image,
      liked: true,
    },
    {
      id: 3,
      name: 'Sunset Bay Resort',
      place: 'Marine Drive',
      price: '$41/n',
      rating: 4,
      reviews: 19,
      distance: '2.0 MILE',
      image: hotel2Image,
      liked: false,
    },
  ],

  places: [
  {
    id: 1,
    name: 'The Seagull Hotel Int.',
    price: '$15/n',
    rating: 4,
    image: '/tour-guide/images/dubai.webp',
  },
  {
    id: 2,
    name: 'Palace Grand',
    price: '$20/n',
    rating: 4.5,
    image: '/tour-guide/images/london.webp',
  },
  {
    id: 3,
    name: 'Blue Lagoon Inn',
    price: '$32/n',
    rating: 4,
    image: '/tour-guide/images/sidney.webp',
  },
  {
    id: 4,
    name: 'The Seagull Hotel Int.',
    price: '$54/n',
    rating: 4.5,
    image: '/tour-guide/images/tokyo.webp',
  },
],
});