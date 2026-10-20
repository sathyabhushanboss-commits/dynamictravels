'use client';

import { useMemo, useState } from 'react';

const STATUSES = ['New', 'Contacted', 'Converted', 'Closed'];

const STATUS_STYLES = {
  New: 'bg-amber/10 text-amber-dark',
  Contacted: 'bg-route-teal/10 text-route-teal',
  Converted: 'bg-route-green/10 text-route-green',
  Closed: 'bg-asphalt/10 text-asphalt/50',
};

const SOURCE_LABELS = {
  popup: 'Website popup',
  'whatsapp-widget': 'WhatsApp widget',
  'whatsapp-inbound': 'Messaged on WhatsApp',
};

function toCsv(leads) {
  const cols = ['id', 'createdAt', 'status', 'name', 'phone', 'email', 'tripType', 'source', 'page'];
  const cell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  return [cols.join(','), ...leads.map((l) => cols.map((c) => cell(l[c])).join(','))].join('\n');
}

const waReply = (l) =>
  `https://wa.me/${l.phone}?text=${encodeURIComponent(
    `Hello ${l.name.split(' ')[0]}, this is Dynamic Travels. Are you looking for travelling? Please share your pickup, destination and travel date.`
  )}`;

export default function LeadsTable({ initialLeads }) {
  const [leads, setLeads] = useState(initialLeads);
  const [filter, setFilter] = useState('All');
  const [updating, setUpdating] = useState(null);

  const filtered = useMemo(
    () => (filter === 'All' ? leads : leads.filter((l) => l.status === filter)),
    [leads, filter]
  );

  async function updateStatus(id, status) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    } finally {
      setUpdating(null);
    }
  }

  function downloadCsv() {
    const blob = new Blob([toCsv(filtered)], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {['All', ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                filter === s ? 'bg-asphalt text-paper' : 'bg-white text-asphalt/60 hover:text-asphalt'
              }`}
            >
              {s} {s !== 'All' && `(${leads.filter((l) => l.status === s).length})`}
            </button>
          ))}
        </div>
        <button
          onClick={downloadCsv}
          disabled={!filtered.length}
          className="rounded-full border border-asphalt/20 bg-white px-4 py-1.5 text-xs font-semibold text-asphalt disabled:opacity-40"
        >
          Download CSV
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-asphalt/20 bg-white p-10 text-center text-sm text-asphalt/50">
          No leads here yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-asphalt/10 bg-white shadow-ticket">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-asphalt/10 text-xs uppercase tracking-wide text-asphalt/50">
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Looking for</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id} className="border-b border-asphalt/5 align-top">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-asphalt">{new Date(l.createdAt).toLocaleString('en-IN')}</div>
                    <div className="text-xs text-asphalt/40">{l.id}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-asphalt">{l.name}</div>
                    <div className="text-xs text-asphalt/60">+91 {l.phone?.slice(2)}</div>
                    {l.email && <div className="text-xs text-asphalt/40">{l.email}</div>}
                  </td>
                  <td className="px-4 py-3 text-asphalt/70">
                    {l.tripType || '—'}
                    {l.firstMessage && (
                      <div className="mt-1 max-w-xs text-xs italic text-asphalt/50">&ldquo;{l.firstMessage}&rdquo;</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-asphalt/60">
                    {SOURCE_LABELS[l.source] || l.source}
                    {l.page && <div className="text-asphalt/40">{l.page}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={l.status}
                      disabled={updating === l.id}
                      onChange={(e) => updateStatus(l.id, e.target.value)}
                      className={`rounded-full border-0 px-2 py-1 text-xs font-semibold ${STATUS_STYLES[l.status]}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <a href={`tel:+${l.phone}`} className="focus-ring rounded-full border border-asphalt/20 px-2 py-1 text-xs">
                        Call
                      </a>
                      <a href={waReply(l)} target="_blank" rel="noreferrer" className="focus-ring rounded-full border border-asphalt/20 px-2 py-1 text-xs">
                        WhatsApp
                      </a>
                      {l.email && (
                        <a href={`mailto:${l.email}`} className="focus-ring rounded-full border border-asphalt/20 px-2 py-1 text-xs">
                          Email
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
