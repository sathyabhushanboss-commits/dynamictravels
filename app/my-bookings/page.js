import { redirect } from 'next/navigation';

// Bookings now live in the customer portal (OTP login) — see /account.
export default function MyBookings() {
  redirect('/account');
}
