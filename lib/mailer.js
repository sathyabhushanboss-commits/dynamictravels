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

    const payLine =
      booking.paymentStatus === 'paid'
        ? `Paid in full online: ₹${booking.amountPaid} (ref ${booking.razorpayPaymentId || '-'})`
        : booking.paymentStatus === 'advance_paid'
        ? `Advance paid online: ₹${booking.amountPaid} (ref ${booking.razorpayPaymentId || '-'}); balance ₹${booking.balanceDue} to driver`
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
