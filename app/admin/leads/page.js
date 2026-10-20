import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE, isAdminToken } from '@/lib/admin-auth';
import { getLeads } from '@/lib/leads';
import LeadsTable from '@/components/LeadsTable';
import AdminNav from '@/components/AdminNav';

export const dynamic = 'force-dynamic';

export default async function AdminLeads() {
  const isAdmin = isAdminToken(cookies().get(ADMIN_COOKIE)?.value);
  if (!isAdmin) redirect('/admin');

  const leads = await getLeads();

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-route-teal">Admin</div>
          <h1 className="font-display text-3xl font-bold text-asphalt">Leads</h1>
        </div>
        <AdminNav />
        <LeadsTable initialLeads={leads} />
      </div>
    </main>
  );
}
