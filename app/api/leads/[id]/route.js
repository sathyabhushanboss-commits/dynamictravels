import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, isAdminToken } from '@/lib/admin-auth';
import { LEAD_STATUSES, updateLeadStatus } from '@/lib/leads';

export async function PATCH(req, { params }) {
  if (!isAdminToken(cookies().get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }
  const { status } = await req.json();
  if (!LEAD_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  const updated = await updateLeadStatus(params.id, status);
  if (!updated) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  return NextResponse.json({ ok: true, lead: updated });
}
