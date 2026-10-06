import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, adminToken } from '@/lib/admin-auth';

export async function POST(req) {
  const { password } = await req.json();
  const correct = process.env.ADMIN_PASSWORD || 'admin123';

  if (password !== correct) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  // Signed, unforgeable session token (was the plain value "1").
  res.cookies.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, '', { maxAge: 0, path: '/' });
  return res;
}
