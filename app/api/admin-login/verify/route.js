import { NextResponse } from 'next/server';
import { getAdmin } from '@/lib/auth-db';
import { OtpError, verifyOtp } from '@/lib/otp';
import { verifyToken } from '@/lib/session';
import { startAdminSession } from '@/lib/admin-session';

// Step 2: the one-time code from email/SMS.
export async function POST(req) {
  const { challenge, code } = await req.json().catch(() => ({}));
  const pending = verifyToken(challenge, 'admin-otp');
  if (!pending) return NextResponse.json({ error: 'Your sign-in expired. Please start again.', restart: true }, { status: 401 });
  if (!/^\d{6}$/.test(String(code || '').trim())) return NextResponse.json({ error: 'Enter the 6-digit code.' }, { status: 400 });

  try {
    await verifyOtp('admin', pending.t, code);
  } catch (err) {
    const status = err instanceof OtpError ? err.status : 500;
    return NextResponse.json({ error: err.message }, { status });
  }

  const admin = await getAdmin(pending.sub);
  if (!admin?.active) return NextResponse.json({ error: 'This admin account is disabled.' }, { status: 403 });
  return startAdminSession(admin, req);
}
