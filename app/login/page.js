'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Loader2, Mail, Phone, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OtpInput from '@/components/OtpInput';

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next')?.startsWith('/') ? params.get('next') : '/account';

  const [method, setMethod] = useState('phone');
  const [available, setAvailable] = useState({ phone: true, email: true });
  const [target, setTarget] = useState('');
  const [step, setStep] = useState('enter'); // enter | code
  const [sentTo, setSentTo] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [devNote, setDevNote] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => d.user && router.replace(next))
      .catch(() => {});
    fetch('/api/auth/channels')
      .then((r) => r.json())
      .then((c) => {
        setAvailable({ phone: c.phone, email: c.email });
        setDevNote(c.devConsole);
        if (!c.phone && c.email) setMethod('email');
      })
      .catch(() => {});
  }, [router, next]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  async function sendCode(e) {
    e?.preventDefault();
    setError('');
    setBusy(true);
    try {
      const res = await fetch('/api/auth/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSentTo(data.sentTo);
      setStep('code');
      setCode('');
      setResendIn(30);
    } catch (err) {
      setError(err.message || 'Could not send the code.');
    } finally {
      setBusy(false);
    }
  }

  async function verify(c = code) {
    if (c.length !== 6 || busy) return;
    setError('');
    setBusy(true);
    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, code: c }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.replace(data.isNew ? `/account?welcome=1` : next);
      router.refresh();
    } catch (err) {
      setError(err.message || 'Could not verify the code.');
      setCode('');
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-[28px] border border-cream-line bg-white p-7 shadow-[0_30px_80px_-30px_rgba(15,42,61,0.35)] sm:p-9">
      <img src="/images/logo.webp" alt="Dynamic Travels" className="mx-auto h-auto w-[210px]" />

      {step === 'enter' ? (
        <form onSubmit={sendCode} className="mt-7">
          <h1 className="text-center font-display text-2xl font-extrabold text-ink">Log in or sign up</h1>
          <p className="mt-1 text-center text-sm text-ink-soft">We&apos;ll send you a one-time code — no password needed.</p>

          {available.phone && available.email && (
            <div className="mt-6 grid grid-cols-2 gap-1 rounded-full bg-cream p-1">
              {[
                ['phone', 'Mobile', Phone],
                ['email', 'Email', Mail],
              ].map(([id, label, Icon]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setMethod(id);
                    setTarget('');
                    setError('');
                  }}
                  className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold transition ${
                    method === id ? 'bg-white text-ink shadow-soft' : 'text-ink-mute hover:text-ink'
                  }`}
                >
                  <Icon size={15} /> {label}
                </button>
              ))}
            </div>
          )}

          <label className="mt-5 flex items-center gap-2.5 rounded-2xl border-2 border-cream-line bg-white px-4 py-3.5 transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
            {method === 'phone' ? (
              <>
                <Phone size={18} className="text-ink-mute" />
                <span className="font-semibold text-ink">+91</span>
                <input
                  value={target}
                  onChange={(e) => setTarget(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="Mobile number"
                  autoFocus
                  className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-mute/70"
                />
              </>
            ) : (
              <>
                <Mail size={18} className="text-ink-mute" />
                <input
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  type="email"
                  autoComplete="email"
                  placeholder="you@gmail.com"
                  autoFocus
                  className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-mute/70"
                />
              </>
            )}
          </label>

          {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={busy || (method === 'phone' ? target.length !== 10 : !target.includes('@'))}
            className="btn-shine mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 font-bold text-white shadow-brand transition hover:bg-brand-dark disabled:opacity-50"
          >
            {busy && <Loader2 size={18} className="animate-spin" />} Send code
          </button>
        </form>
      ) : (
        <div className="mt-7">
          <button
            type="button"
            onClick={() => {
              setStep('enter');
              setError('');
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-mute hover:text-ink"
          >
            <ArrowLeft size={15} /> Change
          </button>
          <h1 className="mt-3 font-display text-2xl font-extrabold text-ink">Enter the code</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Sent to <strong className="text-ink">{sentTo}</strong>. It expires in 5 minutes.
          </p>

          <div className="mt-6">
            <OtpInput value={code} onChange={setCode} onComplete={verify} disabled={busy} />
          </div>

          {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}

          <button
            type="button"
            onClick={() => verify()}
            disabled={busy || code.length !== 6}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 font-bold text-white shadow-brand transition hover:bg-brand-dark disabled:opacity-50"
          >
            {busy && <Loader2 size={18} className="animate-spin" />} Verify &amp; continue
          </button>

          <p className="mt-4 text-center text-sm text-ink-mute">
            Didn&apos;t get it?{' '}
            {resendIn > 0 ? (
              <span>Resend in {resendIn}s</span>
            ) : (
              <button type="button" onClick={sendCode} disabled={busy} className="font-bold text-brand-dark hover:underline">
                Resend code
              </button>
            )}
          </p>
        </div>
      )}

      {devNote && (
        <p className="mt-5 rounded-xl bg-sky-soft px-3 py-2 text-center text-[11px] text-sky-deep">
          Development mode: codes are printed in the server terminal until SMTP / SMS is configured.
        </p>
      )}

      <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-[11px] text-ink-mute">
        <ShieldCheck size={13} className="text-sky-deep" /> By continuing you agree to our{' '}
        <Link href="/terms" className="underline">
          Terms
        </Link>{' '}
        &amp;{' '}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <section className="flex justify-center px-5 py-14 sm:py-20">
        <Suspense fallback={null}>
          <LoginInner />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
}
