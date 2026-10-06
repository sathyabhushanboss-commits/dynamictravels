'use client';

// Small cookie helpers for remembering customers between visits.
//
//  dt_consent        essential — the customer's cookie choice ('all' | 'essential')
//  dt_last_search    trip type, pickup & drop of the last search (30 days)
//  dt_customer       name / phone / email for quick re-booking (180 days)
//  dt_bookings       last 5 booking IDs made on this device (365 days)
//
// Everything except dt_consent is only written after the visitor accepts
// "All cookies" in the banner (components/CookieConsent.js).

export const CONSENT_COOKIE = 'dt_consent';
export const COOKIE_EVENT = 'dt-cookie-consent';

export function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : null;
}

export function setCookie(name, value, days = 30) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${secure}`;
}

export function deleteCookie(name) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export function getConsent() {
  return getCookie(CONSENT_COOKIE); // 'all' | 'essential' | null
}

export function hasConsent() {
  return getConsent() === 'all';
}

export function setConsent(value) {
  setCookie(CONSENT_COOKIE, value, 365);
  if (value !== 'all') {
    ['dt_last_search', 'dt_customer', 'dt_bookings'].forEach(deleteCookie);
  }
  window.dispatchEvent(new CustomEvent(COOKIE_EVENT, { detail: value }));
}

export function getJSON(name, fallback = null) {
  try {
    const raw = getCookie(name);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

/** Writes only when the visitor allowed functional cookies. */
export function setJSON(name, obj, days = 30) {
  if (!hasConsent()) return false;
  try {
    const value = JSON.stringify(obj);
    if (value.length > 3500) return false; // stay under the 4KB cookie limit
    setCookie(name, value, days);
    return true;
  } catch {
    return false;
  }
}

/* ---------- typed helpers used across the site ---------- */

export const getCustomer = () => getJSON('dt_customer', null);
export const saveCustomer = ({ name, phone, email }) =>
  setJSON('dt_customer', { name: name || '', phone: phone || '', email: email || '' }, 180);

export const getLastSearch = () => getJSON('dt_last_search', null);
export const saveLastSearch = (s) => setJSON('dt_last_search', { ...s, savedAt: Date.now() }, 30);

export const getRecentBookings = () => getJSON('dt_bookings', []) || [];
export function saveBookingRef(b) {
  const list = getRecentBookings().filter((x) => x.id !== b.id);
  list.unshift({ id: b.id, vehicle: b.vehicleLabel || '', date: b.date || '', trip: b.tripTypeLabel || '' });
  return setJSON('dt_bookings', list.slice(0, 5), 365);
}
