import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUser, updateUserProfile } from '@/lib/auth-db';
import { USER_COOKIE, getUserSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

// Current customer (null when signed out).
export async function GET() {
  const session = getUserSession(cookies());
  if (!session) return NextResponse.json({ user: null });
  const user = await getUser(session.sub);
  return NextResponse.json({ user: user || null });
}

// Update name / email.
export async function PATCH(req) {
  const session = getUserSession(cookies());
  if (!session) return NextResponse.json({ error: 'Please log in again.' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const name = String(body.name ?? '').trim().replace(/\s+/g, ' ').slice(0, 80);
  const email = String(body.email ?? '').trim().toLowerCase().slice(0, 120);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  try {
    const user = await updateUserProfile(session.sub, { name, email });
    return NextResponse.json({ ok: true, user });
  } catch (err) {
    if (String(err.message).includes('unique')) {
      return NextResponse.json({ error: 'That email is already linked to another account.' }, { status: 409 });
    }
    throw err;
  }
}

// Log out.
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(USER_COOKIE, '', { maxAge: 0, path: '/' });
  return res;
}
