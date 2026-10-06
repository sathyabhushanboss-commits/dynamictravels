// Web app manifest — lets customers "Add to Home Screen" on Android/iOS.
export default function manifest() {
  return {
    name: 'Dynamic Travels — Cab & Bus Booking',
    short_name: 'Dynamic Travels',
    description: 'Book cabs, Tempo Travellers and buses in Bengaluru.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFF8EE',
    theme_color: '#E67817',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
  };
}
