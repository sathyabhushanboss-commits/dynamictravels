import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAdmin, listAdmins } from '@/lib/auth-db';
import { getAdminSession } from '@/lib/session';

function owner() {
  const s = getAdminSession(cookies());
  return s?.role === 'owner' ? s : null;
}

export async function GET() {
  if (!getAdminSession(cookies())) return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  return NextResponse.json({ admins: await listAdmins() });
}

// Owner only: add a staff/owner admin.
export async function POST(req) {
  if (!owner()) return NextResponse.json({ error: 'Only the owner can add admins.' }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const email = String(body.email || '').trim().toLowerCase();
  const digits = String(body.phone || '').replace(/\D/g, '').slice(-10);
  const name = String(body.name || '').trim().slice(0, 80);
  const role = body.role === 'owner' ? 'owner' : 'staff';
  const password = String(body.password || '');

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 });
  if (digits && !/^[6-9]\d{9}$/.test(digits)) return NextResponse.json({ error: 'Enter a valid 10-digit mobile number.' }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });

  try {
    const admin = await createAdmin({ email, phone: digits ? `91${digits}` : '', name, role, password });
    return NextResponse.json({ ok: true, admin });
  } catch (err) {
    if (String(err.message).includes('unique')) return NextResponse.json({ error: 'An admin with that email already exists.' }, { status: 409 });
    throw err;
  }
}
