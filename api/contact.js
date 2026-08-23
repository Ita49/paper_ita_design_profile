const { Resend } = require('resend');
const { isValidEmail, shortHash } = require('./_lib/email-utils');

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = 'ita.godwin@gmail.com';
const FROM_ADDRESS = 'Ita Okponung - Site <hello@itasstudio.com>';

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const body = req.body || {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  // Honeypot: bots fill every field, real visitors never see or fill this one.
  if (body.company) {
    res.status(200).json({ ok: true });
    return;
  }

  if (!name || name.length > 200) {
    res.status(400).json({ ok: false, error: 'Please enter your name.' });
    return;
  }
  if (!isValidEmail(email)) {
    res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    return;
  }
  if (!message || message.length < 5 || message.length > 5000) {
    res.status(400).json({ ok: false, error: 'Please enter a message (5 to 5000 characters).' });
    return;
  }

  const idempotencyKey = `contact-form/${shortHash(email + message)}`;

  const { error } = await resend.emails.send(
    {
      from: FROM_ADDRESS,
      to: [OWNER_EMAIL],
      replyTo: email,
      subject: `New message from ${name} via itasstudio.com`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    },
    { idempotencyKey }
  );

  if (error) {
    console.error('Resend emails.send failed', error);
    res.status(502).json({ ok: false, error: 'Could not send your message right now - please try again shortly, or email directly.' });
    return;
  }

  res.status(200).json({ ok: true });
};
