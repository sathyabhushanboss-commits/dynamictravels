'use client';

import { useState } from 'react';

const EMPTY = { name: '', email: '', phone: '', role: 'staff', password: '' };

export default function AdminsManager({ initialAdmins, me }) {
  const [admins, setAdmins] = useState(initialAdmins);
  const [form, setForm] = useState(EMPTY);
  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [busy, setBusy] = useState(false);
  const isOwner = me.role === 'owner';

  const flash = (type, text) => setMsg({ type, text });

  async function call(url, method, body) {
    setBusy(true);
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      return data;
    } finally {
      setBusy(false);
    }
  }

  async function add(e) {
    e.preventDefault();
    try {
      const { admin } = await call('/api/admin/admins', 'POST', form);
      setAdmins((a) => [...a, admin]);
      setForm(EMPTY);
      flash('ok', `${admin.email} added. Share the password with them privately — they'll also need the login code sent to their email.`);
    } catch (err) {
      flash('err', err.message);
    }
  }

  async function toggle(a) {
    try {
      const { admin } = await call(`/api/admin/admins/${a.id}`, 'PATCH', { active: !a.active });
      setAdmins((list) => list.map((x) => (x.id === admin.id ? admin : x)));
    } catch (err) {
      flash('err', err.message);
    }
  }

  async function changeMyPassword(e) {
    e.preventDefault();
    try {
      await call(`/api/admin/admins/${me.id}`, 'PATCH', { password: pw });
      setPw('');
      flash('ok', 'Your password has been changed.');
    } catch (err) {
      flash('err', err.message);
    }
  }

  const input = 'w-full rounded-xl border-2 border-asphalt/10 px-3 py-2 text-sm focus:border-route-teal focus:outline-none';

  return (
    <div className="space-y-8">
      {msg.text && (
        <p className={`rounded-xl px-4 py-3 text-sm font-medium ${msg.type === 'ok' ? 'bg-route-green/10 text-route-green' : 'bg-amber/10 text-amber-dark'}`}>
          {msg.text}
        </p>
      )}

      <div className="overflow-x-auto rounded-2xl border border-asphalt/10 bg-white shadow-ticket">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-asphalt/10 text-xs uppercase tracking-wide text-asphalt/50">
              <th className="px-4 py-3">Admin</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Last login</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.id} className="border-b border-asphalt/5">
                <td className="px-4 py-3">
                  <div className="font-medium text-asphalt">
                    {a.name || '—'} {a.id === me.id && <span className="text-xs text-asphalt/40">(you)</span>}
                  </div>
                  <div className="text-xs text-asphalt/60">{a.email}</div>
                </td>
                <td className="px-4 py-3 text-asphalt/70">{a.phone ? `+91 ${a.phone.slice(2)}` : '—'}</td>
                <td className="px-4 py-3 capitalize text-asphalt/70">{a.role}</td>
                <td className="px-4 py-3 text-xs text-asphalt/50">{a.lastLoginAt ? new Date(a.lastLoginAt).toLocaleString('en-IN') : 'Never'}</td>
                <td className="px-4 py-3">
                  {isOwner && a.id !== me.id ? (
                    <button
                      onClick={() => toggle(a)}
                      disabled={busy}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${a.active ? 'bg-route-green/10 text-route-green' : 'bg-asphalt/10 text-asphalt/50'}`}
                    >
                      {a.active ? 'Active — disable' : 'Disabled — enable'}
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-route-green">{a.active ? 'Active' : 'Disabled'}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {isOwner && (
          <form onSubmit={add} className="rounded-2xl border border-asphalt/10 bg-white p-6 shadow-ticket">
            <h2 className="font-display text-lg font-bold text-asphalt">Add an admin</h2>
            <div className="mt-4 grid gap-3">
              <input className={input} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className={input} type="email" placeholder="Email (login + codes)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <input className={input} type="tel" placeholder="Mobile (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <select className={input} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="staff">Staff — bookings, leads, rates</option>
                <option value="owner">Owner — everything + manage admins</option>
              </select>
              <input className={input} type="password" placeholder="Temporary password (8+ characters)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={8} />
            </div>
            <button disabled={busy} className="mt-4 rounded-full bg-asphalt px-5 py-2 text-sm font-semibold text-paper disabled:opacity-60">
              Add admin
            </button>
          </form>
        )}

        <form onSubmit={changeMyPassword} className="h-fit rounded-2xl border border-asphalt/10 bg-white p-6 shadow-ticket">
          <h2 className="font-display text-lg font-bold text-asphalt">Change my password</h2>
          <input className={`${input} mt-4`} type="password" autoComplete="new-password" placeholder="New password (8+ characters)" value={pw} onChange={(e) => setPw(e.target.value)} required minLength={8} />
          <button disabled={busy} className="mt-4 rounded-full bg-asphalt px-5 py-2 text-sm font-semibold text-paper disabled:opacity-60">
            Update password
          </button>
        </form>
      </div>
    </div>
  );
}
