import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { updateAdmin } from '@/lib/auth-db';
import { getAdminSession } from '@/lib/session';

// Enable/disable an admin or reset their password. Owners can change anyone
// except disabling themselves; any admin can change their own password.
export async function PATCH(req, { params }) {
  const session = getAdminSession(cookies());
  if (!session) return NextResponse.json({ error: 'Not authorized' }, { status: 401 });

  const self = session.sub === params.id;
  const body = await req.json().catch(() => ({}));
  if (session.role !== 'owner' && !self) return NextResponse.json({ error: 'Only the owner can change other admins.' }, { status: 403 });
  if (self && body.active === false) return NextResponse.json({ error: "You can't disable your own account." }, { status: 400 });
  if (body.password !== undefined && String(body.password).length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
  }

  const admin = await updateAdmin(params.id, {
    active: session.role === 'owner' ? body.active : undefined,
    password: body.password,
  });
  if (!admin) return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
  return NextResponse.json({ ok: true, admin });
}
