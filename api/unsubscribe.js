const { Resend } = require('resend');
const { isValidEmail, isValidUnsubscribeToken } = require('./_lib/email-utils');
const { renderPage, escapeHtml } = require('./_lib/layout');

const resend = new Resend(process.env.RESEND_API_KEY);

function page(message) {
  return renderPage({
    title: 'Unsubscribe | Ita Okponung',
    description: 'Manage your newsletter subscription.',
    canonicalPath: '/api/unsubscribe',
    bodyHtml: `
    <div class="page-hero">
      <div class="inner">
        <h1 class="page-hero-title">Unsubscribe</h1>
        <p class="page-hero-desc">${message}</p>
      </div>
    </div>`,
  });
}

async function unsubscribe(email) {
  const { error } = await resend.contacts.update({ email, unsubscribed: true });
  // A contact that's already gone or never existed still ends in the desired state, so treat it as success.
  if (error && !/not found/i.test(String(error.message || ''))) {
    console.error('Resend contacts.update (unsubscribe) failed', error);
    return false;
  }
  return true;
}

module.exports = async (req, res) => {
  const email = typeof req.query.email === 'string' ? req.query.email.trim() : '';
  const token = typeof req.query.token === 'string' ? req.query.token : '';
  // Mail clients send a plain POST for one-click unsubscribe (RFC 8058) - no HTML page in that path.
  const isOneClick = req.method === 'POST';

  if (!isValidEmail(email) || !isValidUnsubscribeToken(email, token)) {
    if (isOneClick) {
      res.status(202).end();
      return;
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res
      .status(400)
      .send(
        page(
          `This unsubscribe link isn't valid. If you'd like to be removed from the list, email <a href="mailto:ita.godwin@gmail.com">ita.godwin@gmail.com</a> and I'll take care of it.`
        )
      );
    return;
  }

  const ok = await unsubscribe(email);

  if (isOneClick) {
    res.status(ok ? 200 : 502).end();
    return;
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res
    .status(ok ? 200 : 502)
    .send(
      ok
        ? page(`${escapeHtml(email)} has been unsubscribed. You won't get any more updates from this list.`)
        : page(
            `Something went wrong processing this - please try again shortly, or email <a href="mailto:ita.godwin@gmail.com">ita.godwin@gmail.com</a>.`
          )
    );
};
