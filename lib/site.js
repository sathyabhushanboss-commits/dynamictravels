// Central business details — used by the header, footer, floating buttons,
// SEO metadata and structured data. Override any of these in .env.local.

export const SITE = {
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Dynamic Travels',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dynamictravels.in').replace(/\/$/, ''),
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+917349016519',
  phoneDisplay: process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || '+91 73490 16519',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917349016519',
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'dynamictours76@gmail.com',
  tagline: 'Premium Cabs, Tempo Travellers & Bus Rentals in Bengaluru',
  description:
    'Dynamic Travels is an ISO 9001:2015 certified travel company in Bengaluru offering airport taxi, local cabs, outstation trips, Innova Crysta, Urbania, Tempo Traveller and bus rentals with transparent fares and 24/7 support.',
  address: {
    street: 'No. 91, 1st Floor, 11th A Cross, Dasarahalli Main Road, Bhuvaneshwari Nagar, Hebbal, Kempapura',
    locality: 'Bengaluru',
    region: 'Karnataka',
    postalCode: '560024',
    country: 'IN',
  },
  hours: 'Open 24 hours, 7 days a week',
  social: {
    // Add your real profile URLs here — they feed the sameAs field in schema.
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || '',
    google: process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL || '',
  },
};

export const telLink = `tel:${SITE.phone.replace(/\s+/g, '')}`;
export const mailLink = (subject = 'Booking enquiry — Dynamic Travels') =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
export const waLink = (text = 'Hello Dynamic Travels, I would like to book a vehicle.') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const fullAddress = `${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.region} ${SITE.address.postalCode}, India`;
