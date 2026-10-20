import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AccountClient from '@/components/AccountClient';
import { getUser } from '@/lib/auth-db';
import { getUserSession } from '@/lib/session';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'My Account', robots: { index: false, follow: false } };

export default async function AccountPage({ searchParams }) {
  const session = getUserSession(cookies());
  const user = session ? await getUser(session.sub) : null;
  if (!user) redirect('/login?next=/account');

  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <AccountClient initialUser={user} welcome={searchParams?.welcome === '1'} />
      <Footer />
    </main>
  );
}
