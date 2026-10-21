'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OtpInput from '@/components/OtpInput';

// Admin sign-in: email + password, then a one-time code sent to the admin's
// email (or phone). See app/api/admin-login.
export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [challenge, setChallenge] = useState(null);
  const [sentTo, setSentTo] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function signedIn() {
    router.push('/admin/dashboard');
    router.refresh();
  }

  async function submitPassword(e) {
    e?.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      if (data.otpRequired) {
        setChallenge(data.challenge);
        setSentTo(data.sentTo);
        setCode('');
      } else {
        signedIn();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function submitCode(c = code) {
    if (c.length !== 6 || loading) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin-login/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challenge, code: c }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.restart) setChallenge(null);
        throw new Error(data.error || 'Verification failed');
      }
      signedIn();
    } catch (err) {
      setError(err.message);
      setCode('');
      setLoading(false);
    }
  }

  const input = 'w-full rounded-xl border-2 border-asphalt/10 px-3 py-2.5 focus:border-route-teal focus:outline-none';

  return (
    <main className="flex min-h-screen items-center justify-center bg-asphalt-gradient px-5">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-ticket">
        <img src="/images/logo.webp" alt="Dynamic Travels" className="mx-auto mb-6 h-auto w-[190px]" />
        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-route-teal">Admin portal</div>

        {!challenge ? (
          <form onSubmit={submitPassword}>
            <h1 className="font-display text-2xl font-bold text-asphalt">Sign in</h1>
            <p className="mt-1 text-sm text-asphalt/60">Bookings, leads, rates and staff.</p>

            <label className="mt-6 block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-asphalt/50">Email</span>
              <input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={input} required />
            </label>
            <label className="mt-4 block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-asphalt/50">Password</span>
              <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={input} required />
            </label>

            {error && <p className="mt-3 text-sm font-medium text-amber-dark">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="focus-ring mt-6 w-full rounded-full bg-route-gradient py-3 font-display font-bold text-asphalt hover:opacity-90 disabled:opacity-60"
            >
              {loading ? 'Checking…' : 'Continue'}
            </button>
          </form>
        ) : (
          <div>
            <h1 className="font-display text-2xl font-bold text-asphalt">Verify it&apos;s you</h1>
            <p className="mt-1 text-sm text-asphalt/60">
              Enter the 6-digit code sent to <strong className="text-asphalt">{sentTo}</strong>.
            </p>
            <div className="mt-6">
              <OtpInput value={code} onChange={setCode} onComplete={submitCode} disabled={loading} tone="dark" />
            </div>
            {error && <p className="mt-3 text-sm font-medium text-amber-dark">{error}</p>}
            <button
              type="button"
              onClick={() => submitCode()}
              disabled={loading || code.length !== 6}
              className="focus-ring mt-6 w-full rounded-full bg-route-gradient py-3 font-display font-bold text-asphalt hover:opacity-90 disabled:opacity-60"
            >
              {loading ? 'Verifying…' : 'Sign in'}
            </button>
            <div className="mt-4 flex justify-between text-sm">
              <button type="button" onClick={() => setChallenge(null)} className="font-semibold text-asphalt/60 hover:text-asphalt">
                ← Back
              </button>
              <button type="button" onClick={submitPassword} disabled={loading} className="font-semibold text-route-teal hover:underline">
                Resend code
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
