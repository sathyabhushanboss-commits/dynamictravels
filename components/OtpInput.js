'use client';

import { useEffect, useRef } from 'react';

// Six single-digit boxes. Supports typing, backspace, arrow keys, pasting the
// whole code, and SMS autofill (autocomplete="one-time-code").
export default function OtpInput({ value, onChange, onComplete, disabled = false, autoFocus = true, tone = 'light' }) {
  const refs = useRef([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || '');

  useEffect(() => {
    if (autoFocus) refs.current[0]?.focus();
  }, [autoFocus]);

  function set(next) {
    const clean = next.replace(/\D/g, '').slice(0, 6);
    onChange(clean);
    if (clean.length === 6) onComplete?.(clean);
  }

  function handleChange(i, e) {
    const v = e.target.value.replace(/\D/g, '');
    if (!v) return;
    if (v.length > 1) {
      // Paste or SMS autofill into one box
      set(v);
      refs.current[Math.min(v.length, 6) - 1]?.focus();
      return;
    }
    const arr = [...digits];
    arr[i] = v;
    set(arr.join(''));
    if (i < 5) refs.current[i + 1]?.focus();
  }

  function handleKey(i, e) {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const arr = [...digits];
      if (arr[i]) {
        arr[i] = '';
      } else if (i > 0) {
        arr[i - 1] = '';
        refs.current[i - 1]?.focus();
      }
      onChange(arr.join('').slice(0, 6));
    } else if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus();
    else if (e.key === 'ArrowRight' && i < 5) refs.current[i + 1]?.focus();
  }

  const box =
    tone === 'dark'
      ? 'border-asphalt/15 bg-white text-asphalt focus:border-route-teal'
      : 'border-cream-line bg-white text-ink focus:border-brand focus:ring-4 focus:ring-brand/10';

  return (
    <div className="flex justify-between gap-2" role="group" aria-label="One-time code">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          value={d}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={(e) => {
            e.preventDefault();
            set(e.clipboardData.getData('text'));
          }}
          onFocus={(e) => e.target.select()}
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          maxLength={6}
          disabled={disabled}
          aria-label={`Digit ${i + 1}`}
          className={`h-14 w-full min-w-0 rounded-2xl border-2 text-center font-display text-2xl font-bold outline-none transition disabled:opacity-60 ${box}`}
        />
      ))}
    </div>
  );
}
