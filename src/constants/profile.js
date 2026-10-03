export const PROFILE_TABS = [
  { id: 'profile', label: 'Profile Informations' },
  { id: 'bookings', label: 'Booking History' },
  { id: 'newsletter', label: 'Newsletter Subscription' },
  { id: 'notifications', label: 'Manage Notifications' },
];

// مستخدم تجريبي: لا يوجد Backend حقيقي
export const DEMO_USER = {
  name: 'Masum Rana',
  birthDate: '1990-03-15',
  phone: '+46-7644 394 68',
  location: 'Gothenburg',
  email: 'masumrana15@gmail.com',
  avatar: '/images/avatars/masum.webp',
};

export const DEFAULT_SETTINGS = {
  newsletter: true,
  newsletterWeekly: true,
  notifyBookings: true,
  notifyOffers: false,
  notifyReminders: true,
};

export const SETTINGS_PANELS = {
  newsletter: {
    title: 'Newsletter Subscription',
    rows: [
      { key: 'newsletter', title: 'Email newsletter', text: 'Hand-picked tours and travel stories, straight to your inbox.' },
      { key: 'newsletterWeekly', title: 'Weekly digest', text: 'Receive one summary email per week instead of every update.' },
    ],
  },
  notifications: {
    title: 'Manage Notifications',
    rows: [
      { key: 'notifyBookings', title: 'Booking updates', text: 'Confirmations, changes and cancellations for your trips.' },
      { key: 'notifyOffers', title: 'Special offers', text: 'Deals and discounts on activities you may like.' },
      { key: 'notifyReminders', title: 'Trip reminders', text: 'A reminder before each activity starts.' },
    ],
  },
};