import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { listAdmins } from '@/lib/auth-db';
import { getAdminSession } from '@/lib/session';
import AdminNav from '@/components/AdminNav';
import AdminsManager from '@/components/AdminsManager';

export const dynamic = 'force-dynamic';

export default async function AdminAdmins() {
  const session = getAdminSession(cookies());
  if (!session) redirect('/admin');

  const admins = await listAdmins();

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-route-teal">Admin</div>
          <h1 className="font-display text-3xl font-bold text-asphalt">Admins</h1>
        </div>
        <AdminNav />
        <AdminsManager initialAdmins={admins} me={{ id: session.sub, role: session.role }} />
      </div>
    </main>
  );
}
