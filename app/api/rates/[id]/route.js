import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, isAdminToken } from '@/lib/admin-auth';
import { upsertVehicle, deleteVehicle } from '@/lib/rates-store';

function isAdmin() {
  return isAdminToken(cookies().get(ADMIN_COOKIE)?.value);
}

export async function PUT(req, { params }) {
  if (!isAdmin()) return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  const vehicle = await req.json();
  if (!vehicle?.label) {
    return NextResponse.json({ error: 'Vehicle needs at least a label' }, { status: 400 });
  }
  const data = await upsertVehicle(params.id, vehicle);
  return NextResponse.json({ ok: true, ...data });
}

export async function DELETE(req, { params }) {
  if (!isAdmin()) return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  const data = await deleteVehicle(params.id);
  return NextResponse.json({ ok: true, ...data });
}
