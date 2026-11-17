import nodemailer from 'nodemailer';

// If SMTP_* env vars aren't set, we simply skip sending — the booking is
// still saved and the customer still gets WhatsApp/Call/mailto options.
export async function sendBookingEmail(booking) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_TO) {
    return { skipped: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const priceLine = booking.price?.enquiryOnly
      ? 'Enquiry only — price on request'
      : `₹${booking.price?.total ?? '—'} (incl. GST)`;

    const feeNote = booking.onlineFee ? ` incl. ₹${booking.onlineFee} online payment fee` : '';
    const payLine =
      booking.paymentStatus === 'paid'
        ? `Paid in full online: ₹${booking.amountPaid}${feeNote} (ref ${booking.razorpayPaymentId || '-'})`
        : booking.paymentStatus === 'advance_paid'
        ? `Advance paid online: ₹${booking.amountPaid}${feeNote} (ref ${booking.razorpayPaymentId || '-'}); balance ₹${booking.balanceDue} to driver`
        : 'Pay after ride (cash/UPI to driver)';

    await transporter.sendMail({
      from: `"${booking.name}" <${SMTP_USER}>`,
      to: SMTP_TO,
      subject: `New Booking ${booking.id} — ${booking.vehicleLabel} — ${booking.tripTypeLabel}`,
      text: [
        `New booking received`,
        `Booking ID: ${booking.id}`,
        `Name: ${booking.name}`,
        `Phone: ${booking.phone}`,
        `Email: ${booking.email || '-'}`,
        `Trip type: ${booking.tripTypeLabel}`,
        `Vehicle: ${booking.vehicleLabel}`,
        `Pickup: ${booking.pickup || '-'}`,
        `Drop: ${booking.drop || '-'}`,
        `Date: ${booking.date || '-'} ${booking.time || ''}`,
        booking.returnDate ? `Return date: ${booking.returnDate} (${booking.days} day(s))` : null,
        booking.km ? `Distance: ${booking.km} km` : null,
        booking.passengers ? `Passengers: ${booking.passengers}` : null,
        booking.source ? `Booked from: ${booking.source}` : null,
        `Estimated fare: ${priceLine}`,
        `Payment: ${payLine}`,
        `Notes: ${booking.notes || '-'}`,
      ]
        .filter(Boolean)
        .join('\n'),
    });
    return { sent: true };
  } catch (err) {
    console.error('Email send failed:', err.message);
    return { error: err.message };
  }
}

/* ------------------------------------------------------------------------ */
/* Lead emails — owner alert + customer confirmation                        */
/* ------------------------------------------------------------------------ */

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function leadTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

// Table-based layout + inline styles so it renders the same in Gmail,
// Outlook and phone mail apps.
function emailShell({ preheader, title, body, site }) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#FFF8EE;font-family:Arial,Helvetica,sans-serif;color:#0F2A3D">
<span style="display:none;max-height:0;overflow:hidden">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8EE;padding:32px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #EFE2CF">
<tr><td style="height:6px;background:#E67817"></td></tr>
<tr><td style="padding:28px 32px 8px">
<p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#C2600B;font-weight:bold">${esc(site.name)}</p>
<h1 style="margin:10px 0 0;font-size:24px;line-height:1.3;color:#0F2A3D">${esc(title)}</h1>
</td></tr>
<tr><td style="padding:12px 32px 28px;font-size:15px;line-height:1.7;color:#3d4f5c">${body}</td></tr>
<tr><td style="padding:18px 32px;background:#0F2A3D;color:#cfd8df;font-size:12px;line-height:1.6">
${esc(site.name)} · ISO 9001:2015 Certified · Bengaluru<br>
📞 ${esc(site.phoneDisplay)} &nbsp;·&nbsp; ✉️ ${esc(site.email)} &nbsp;·&nbsp; <a href="${esc(site.url)}" style="color:#F59E42">${esc(site.url.replace(/^https?:\/\//, ''))}</a>
</td></tr>
</table></td></tr></table></body></html>`;
}

export async function sendLeadEmails(lead, site) {
  const transporter = leadTransport();
  if (!transporter) return { skipped: true };

  const { SMTP_USER, SMTP_TO } = process.env;
  const owner = SMTP_TO || site.email;
  const local = lead.phone.slice(2);
  const results = {};

  const row = (k, v) =>
    `<tr><td style="padding:8px 0;color:#7a8791;width:120px;vertical-align:top">${k}</td><td style="padding:8px 0;font-weight:bold;color:#0F2A3D">${v}</td></tr>`;

  try {
    await transporter.sendMail({
      from: `"${site.name} Website" <${SMTP_USER}>`,
      to: owner,
      replyTo: lead.email || undefined,
      subject: `New enquiry: ${lead.name} · +91 ${local}${lead.tripType ? ` · ${lead.tripType}` : ''}`,
      text: [
        'New website enquiry',
        `Name: ${lead.name}`,
        `Phone: +91 ${local}`,
        `Email: ${lead.email || '-'}`,
        `Looking for: ${lead.tripType || '-'}`,
        `Source: ${lead.source} (${lead.page || '/'})`,
        `Lead ID: ${lead.id}`,
        `WhatsApp: https://wa.me/${lead.phone}`,
      ].join('\n'),
      html: emailShell({
        site,
        preheader: `${lead.name} · +91 ${local}`,
        title: 'New website enquiry',
        body: `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">
${row('Name', esc(lead.name))}
${row('Phone', `<a href="tel:+${lead.phone}" style="color:#0F2A3D">+91 ${esc(local)}</a>`)}
${row('Email', lead.email ? `<a href="mailto:${esc(lead.email)}" style="color:#0F2A3D">${esc(lead.email)}</a>` : '—')}
${row('Looking for', esc(lead.tripType || '—'))}
${row('Source', `${esc(lead.source)} · ${esc(lead.page || '/')}`)}
${row('Lead ID', esc(lead.id))}
</table>
<p style="margin:24px 0 0">
<a href="https://wa.me/${lead.phone}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:999px;margin-right:8px">Reply on WhatsApp</a>
<a href="tel:+${lead.phone}" style="display:inline-block;background:#0F2A3D;color:#fff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:999px">Call now</a>
</p>`,
      }),
    });
    results.owner = 'sent';
  } catch (err) {
    console.error('Lead owner email failed:', err.message);
    results.owner = err.message;
  }

  if (lead.email) {
    const first = lead.name.split(/\s+/)[0];
    try {
      await transporter.sendMail({
        from: `"${site.name}" <${SMTP_USER}>`,
        to: lead.email,
        replyTo: site.email,
        subject: `Thank you, ${first} — your travel expert will be in touch`,
        text: [
          `Hello ${first},`,
          '',
          `Thank you for contacting ${site.name}. Our travel expert will call or WhatsApp you on +91 ${local} shortly.`,
          '',
          'To get your fare faster, reply with your pickup, destination, travel date and number of passengers.',
          '',
          `Need us right now? Call ${site.phoneDisplay} (24x7) or check live fares at ${site.url}/#book`,
          '',
          `Team ${site.name}`,
        ].join('\n'),
        html: emailShell({
          site,
          preheader: 'Our travel expert will be in touch shortly.',
          title: `Thank you, ${first}!`,
          body: `<p style="margin:0 0 14px">We've received your enquiry. One of our travel experts will call or WhatsApp you on <strong>+91 ${esc(local)}</strong> shortly.</p>
<p style="margin:0 0 6px">To get your fare faster, just reply with:</p>
<ul style="margin:0 0 18px;padding-left:20px">
<li>Pickup location &amp; destination</li>
<li>Travel date &amp; time</li>
<li>Number of passengers</li>
</ul>
<p style="margin:0 0 22px">
<a href="${esc(site.url)}/#book" style="display:inline-block;background:#E67817;color:#fff;text-decoration:none;font-weight:bold;padding:13px 24px;border-radius:999px;margin-right:8px">See live fares</a>
<a href="https://wa.me/${esc(site.whatsapp)}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-weight:bold;padding:13px 24px;border-radius:999px">Chat on WhatsApp</a>
</p>
<p style="margin:0;color:#7a8791;font-size:13px">Warm regards,<br><strong style="color:#0F2A3D">Team ${esc(site.name)}</strong></p>`,
        }),
      });
      results.customer = 'sent';
    } catch (err) {
      console.error('Lead customer email failed:', err.message);
      results.customer = err.message;
    }
  }

  return results;
}

/* ------------------------------------------------------------------------ */
/* Booking confirmation to the customer                                     */
/* ------------------------------------------------------------------------ */

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

/**
 * Sends the customer every detail of their booking (only if they gave an
 * email). `payUrl` is their private pay page when something is still due.
 */
export async function sendBookingCustomerEmail(booking, site, payUrl = '') {
  if (!booking.email) return { skipped: 'no email' };
  const transporter = leadTransport();
  if (!transporter) return { skipped: 'smtp not configured' };

  const b = booking;
  const first = String(b.name || '').trim().split(/\s+/)[0] || 'there';
  const enquiry = Boolean(b.price?.enquiryOnly);
  const route = [b.pickup, ...(b.stops || []), b.drop].filter(Boolean).join(' → ');
  const when = [b.date, b.time].filter(Boolean).join(' at ');

  const rows = [
    ['Booking ID', b.id],
    ['Status', b.status],
    ['Trip', b.tripTypeLabel],
    ['Vehicle', b.vehicleLabel],
    ['Pickup', b.pickup],
    b.stops?.length ? ['Stops', b.stops.join(', ')] : null,
    ['Drop', b.drop],
    ['Date & time', when],
    b.returnDate ? ['Return', `${b.returnDate} (${b.days} day${b.days > 1 ? 's' : ''})`] : null,
    b.km ? ['Distance', `${b.km} km (estimated)`] : null,
    b.passengers ? ['Passengers', b.passengers] : null,
    b.notes ? ['Notes', b.notes] : null,
  ].filter((r) => r && r[1]);

  const fareLines = enquiry
    ? [['Fare', 'Our team will share a quote shortly']]
    : [
        ...(b.price?.breakdown || []).filter((x) => x.amount !== null).map((x) => [x.label, inr(x.amount)]),
        [`GST (${Math.round((b.price?.gstRate || 0) * 100)}%)`, inr(b.price?.gst)],
        ['Total fare', inr(b.price?.total)],
      ];

  const payment =
    b.paymentStatus === 'paid'
      ? `Paid in full online: ${inr(b.amountPaid)}${b.onlineFee ? ` (incl. ${inr(b.onlineFee)} online payment fee)` : ''}. Nothing to pay the driver.`
      : b.paymentStatus === 'advance_paid'
      ? `Advance paid online: ${inr(b.amountPaid)}${b.onlineFee ? ` (incl. ${inr(b.onlineFee)} online payment fee)` : ''}. Balance ${inr(b.balanceDue)} to the driver.`
      : enquiry
      ? 'No payment needed now.'
      : `Pay ${inr(b.balanceDue)} to the driver by cash or UPI after your ride — or pay online now.`;

  const table = (list) =>
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;border-collapse:collapse">${list
      .map(
        ([k, v], i) =>
          `<tr><td style="padding:8px 0;color:#7a8791;width:140px;vertical-align:top;${i ? 'border-top:1px solid #F1E7D8;' : ''}">${esc(k)}</td><td style="padding:8px 0;font-weight:bold;color:#0F2A3D;${i ? 'border-top:1px solid #F1E7D8;' : ''}">${esc(v)}</td></tr>`
      )
      .join('')}</table>`;

  const html = emailShell({
    site,
    preheader: `Booking ${b.id} — ${b.vehicleLabel} on ${when || 'your date'}`,
    title: enquiry ? `Thank you, ${first} — we've got your request` : `Your ride is booked, ${first}!`,
    body: `<p style="margin:0 0 18px">${
      enquiry
        ? 'We have received your trip request. Our travel expert will call you shortly with the best quote.'
        : 'Thank you for booking with us. Here are all your booking details — we will share the driver and vehicle details before pickup.'
    }</p>
<h3 style="margin:0 0 6px;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:#C2600B">Trip details</h3>
${table(rows)}
<h3 style="margin:22px 0 6px;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:#C2600B">Fare</h3>
${table(fareLines)}
<p style="margin:14px 0 0;padding:12px 14px;background:#FFF8EE;border-radius:12px;font-size:14px"><strong>Payment:</strong> ${esc(payment)}</p>
${
  payUrl
    ? `<p style="margin:20px 0 0"><a href="${esc(payUrl)}" style="display:inline-block;background:#E67817;color:#fff;text-decoration:none;font-weight:bold;padding:13px 24px;border-radius:999px">Pay online now</a></p>
<p style="margin:8px 0 0;font-size:12px;color:#7a8791">A small online payment fee applies. Paying the driver after the ride has no fee.</p>`
    : ''
}
${
  enquiry
    ? ''
    : '<p style="margin:20px 0 0;font-size:13px;color:#7a8791">Toll, state permit and parking charges are extra, as applicable.</p>'
}
<p style="margin:22px 0 0">
<a href="https://wa.me/${esc(site.whatsapp)}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-weight:bold;padding:11px 20px;border-radius:999px;margin-right:8px">WhatsApp us</a>
<a href="tel:${esc(site.phone)}" style="display:inline-block;background:#0F2A3D;color:#fff;text-decoration:none;font-weight:bold;padding:11px 20px;border-radius:999px">Call ${esc(site.phoneDisplay)}</a>
</p>
<p style="margin:22px 0 0;color:#7a8791;font-size:13px">Have a great trip,<br><strong style="color:#0F2A3D">Team ${esc(site.name)}</strong></p>`,
  });

  const text = [
    `Hello ${first},`,
    '',
    enquiry ? 'We have received your trip request. Our team will call you with a quote shortly.' : 'Thank you for booking with us. Your booking details:',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    ...fareLines.map(([k, v]) => `${k}: ${v}`),
    '',
    `Payment: ${payment}`,
    payUrl ? `Pay online: ${payUrl}` : null,
    '',
    `Questions? Call ${site.phoneDisplay} or WhatsApp https://wa.me/${site.whatsapp}`,
    `Team ${site.name}`,
  ]
    .filter((l) => l !== null)
    .join('\n');

  try {
    await transporter.sendMail({
      from: `"${site.name}" <${process.env.SMTP_USER}>`,
      to: b.email,
      replyTo: site.email,
      subject: enquiry ? `We've received your trip request — ${b.id}` : `Booking confirmed — ${b.id} · ${b.vehicleLabel}${when ? ` · ${when}` : ''}`,
      text,
      html,
    });
    return { sent: true };
  } catch (err) {
    console.error('Customer booking email failed:', err.message);
    return { error: err.message };
  }
}
