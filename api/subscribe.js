const { Resend } = require('resend');
const { isValidEmail } = require('./_lib/email-utils');

const resend = new Resend(process.env.RESEND_API_KEY);
const SEGMENT_ID = process.env.RESEND_NEWSLETTER_SEGMENT_ID;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const body = req.body || {};
  const email = typeof body.email === 'string' ? body.email.trim() : '';

  // Honeypot: bots fill every field, real visitors never see or fill this one.
  if (body.company) {
    res.status(200).json({ ok: true });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    return;
  }

  const { error: createError } = await resend.contacts.create({
    email,
    segments: [{ id: SEGMENT_ID }],
  });

  if (createError) {
    const message = String(createError.message || '');
    const alreadyExists = createError.name === 'validation_error' && /already exists|duplicate/i.test(message);

    if (!alreadyExists) {
      console.error('Resend contacts.create failed', createError);
      res.status(502).json({ ok: false, error: 'Could not subscribe right now - please try again shortly.' });
      return;
    }

    // Contact already exists - make sure they're still in the newsletter segment.
    const { data: existing, error: getError } = await resend.contacts.get({ email });
    if (getError || !existing) {
      console.error('Resend contacts.get failed after duplicate', getError);
      res.status(502).json({ ok: false, error: 'Could not subscribe right now - please try again shortly.' });
      return;
    }

    const { error: addError } = await resend.contacts.segments.add({
      contactId: existing.id,
      segmentId: SEGMENT_ID,
    });

    if (addError) {
      console.error('Resend contacts.segments.add failed', addError);
      res.status(502).json({ ok: false, error: 'Could not subscribe right now - please try again shortly.' });
      return;
    }
  }

  res.status(200).json({ ok: true });
};
