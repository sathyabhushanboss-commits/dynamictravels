'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CalendarDays, CheckCircle2, Car, Loader2, LogOut, Mail, MapPin, Phone, User } from 'lucide-react';
import { formatINR } from '@/lib/pricing';
import CabLoader from './CabLoader';

const STATUS_STYLES = {
  Pending: 'bg-amber-50 text-amber-700',
  Confirmed: 'bg-sky-soft text-sky-deep',
  Completed: 'bg-emerald-50 text-emerald-700',
  Cancelled: 'bg-ink/5 text-ink-mute',
};

function PaymentLine({ b }) {
  if (b.price?.enquiryOnly) return <span className="text-ink-mute">Quote requested</span>;
  if (b.paymentStatus === 'paid') return <span className="font-semibold text-emerald-700">Paid in full online</span>;
  if (b.paymentStatus === 'advance_paid')
    return (
      <span className="font-semibold text-sky-deep">
        {formatINR(b.amountPaid)} paid · {formatINR(b.balanceDue)} to driver
      </span>
    );
  return <span className="text-ink-mute">Pay after ride</span>;
}

export default function AccountClient({ initialUser, welcome }) {
  const router = useRouter();
  const [user, setUser] = useState(initialUser);
  const [form, setForm] = useState({ name: initialUser.name, email: initialUser.email });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    fetch('/api/book')
      .then((r) => r.json())
      .then((d) => setBookings(d.bookings || []))
      .catch(() => setBookings([]));
  }, []);

  async function save(e) {
    e.preventDefault();
    setError('');
    setSaved(false);
    setSaving(true);
    try {
      const res = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUser(data.user);
      setSaved(true);
    } catch (err) {
      setError(err.message || 'Could not save.');
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch('/api/auth/me', { method: 'DELETE' });
    router.push('/');
    router.refresh();
  }

  const upcoming = (bookings || []).filter((b) => b.status !== 'Completed' && b.status !== 'Cancelled');
  const past = (bookings || []).filter((b) => b.status === 'Completed' || b.status === 'Cancelled');

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-dark">My account</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            {welcome ? 'Welcome to Dynamic Travels' : `Hello${user.name ? `, ${user.name.split(' ')[0]}` : ''}!`}
          </h1>
        </div>
        <div className="flex gap-2">
          <Link href="/#book" className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-brand hover:bg-brand-dark">
            Book a ride
          </Link>
          <button type="button" onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-bold text-ink hover:bg-ink hover:text-white">
            <LogOut size={15} /> Log out
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Profile */}
        <form onSubmit={save} className="h-fit rounded-[28px] border border-cream-line bg-white p-6 shadow-soft">
          <h2 className="font-display text-lg font-bold text-ink">Your details</h2>
          {welcome && !user.name && <p className="mt-1 text-sm text-ink-soft">Add your name so our drivers know who to look for.</p>}

          <label className="mt-5 block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-mute">Name</span>
            <span className="flex items-center gap-2 rounded-2xl border-2 border-cream-line px-4 py-3 focus-within:border-brand">
              <User size={16} className="text-ink-mute" />
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className="w-full bg-transparent outline-none" />
            </span>
          </label>
          <label className="mt-4 block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-mute">Email</span>
            <span className="flex items-center gap-2 rounded-2xl border-2 border-cream-line px-4 py-3 focus-within:border-brand">
              <Mail size={16} className="text-ink-mute" />
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                type="email"
                placeholder="you@gmail.com"
                readOnly={Boolean(initialUser.email)}
                className="w-full bg-transparent outline-none read-only:text-ink-mute"
              />
            </span>
          </label>
          <div className="mt-4">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-mute">Mobile</span>
            <span className="flex items-center gap-2 rounded-2xl bg-cream px-4 py-3 text-ink-mute">
              <Phone size={16} /> {user.phone ? `+91 ${user.phone.slice(2)}` : 'Not added'}
            </span>
          </div>

          {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
          <button type="submit" disabled={saving} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3 text-sm font-bold text-white hover:bg-brand disabled:opacity-60">
            {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle2 size={16} /> : null}
            {saved ? 'Saved' : 'Save details'}
          </button>
        </form>

        {/* Bookings */}
        <div>
          {bookings === null ? (
            <CabLoader label="Loading your rides…" className="rounded-[28px] bg-white" />
          ) : bookings.length === 0 ? (
            <div className="rounded-[28px] border-2 border-dashed border-cream-line bg-white p-10 text-center">
              <Car size={36} className="mx-auto text-brand" />
              <p className="mt-3 font-display text-xl font-bold text-ink">No rides yet</p>
              <p className="mt-1 text-sm text-ink-soft">Bookings made with your mobile number or email will appear here.</p>
              <Link href="/#book" className="mt-5 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-brand">
                Book your first ride
              </Link>
            </div>
          ) : (
            [
              ['Upcoming & active', upcoming],
              ['Past rides', past],
            ].map(
              ([title, list]) =>
                list.length > 0 && (
                  <section key={title} className="mb-8">
                    <h2 className="mb-3 font-display text-lg font-bold text-ink">{title}</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {list.map((b) => (
                        <article key={b.id} className="rounded-[24px] border border-cream-line bg-white p-5 shadow-soft">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-xs font-bold tracking-wide text-ink-mute">{b.id}</span>
                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLES[b.status] || STATUS_STYLES.Pending}`}>{b.status}</span>
                          </div>
                          <p className="mt-3 font-display text-lg font-bold text-ink">{b.vehicleLabel}</p>
                          <p className="text-sm text-ink-soft">{b.tripTypeLabel}</p>
                          <p className="mt-3 flex items-start gap-2 text-sm text-ink-soft">
                            <MapPin size={15} className="mt-0.5 shrink-0 text-brand" />
                            {[b.pickup, ...(b.stops || []), b.drop].filter(Boolean).join(' → ') || '—'}
                          </p>
                          <p className="mt-1 flex items-center gap-2 text-sm text-ink-soft">
                            <CalendarDays size={15} className="shrink-0 text-brand" /> {b.date} {b.time}
                          </p>
                          <div className="mt-4 flex items-end justify-between border-t border-cream-line pt-3">
                            <span className="text-xs"><PaymentLine b={b} /></span>
                            <span className="font-display text-lg font-extrabold text-ink">{b.price?.enquiryOnly ? '—' : formatINR(b.price?.total)}</span>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                )
            )
          )}
        </div>
      </div>
    </div>
  );
}
