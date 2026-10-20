import { NextResponse } from 'next/server';
import { channels } from '@/lib/otp';

export const dynamic = 'force-dynamic';

// Which login methods are available (so the login page can hide the others).
export async function GET() {
  const c = channels();
  return NextResponse.json({ email: c.email, phone: c.phone, devConsole: c.devConsole });
}
