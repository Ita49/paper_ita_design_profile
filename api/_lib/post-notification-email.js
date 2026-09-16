const SITE_URL = 'https://portfolio.itasstudio.com';
const FROM_ADDRESS = 'Ita Okponung <hello@itasstudio.com>';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Broadcasts (unlike resend.emails.send) auto-populate {{{RESEND_UNSUBSCRIBE_URL}}},
// so this doesn't need the manual signed-token link that welcome-email.js builds.
function buildPostNotificationBroadcast({ title, slug, excerpt, category }) {
  const postUrl = `${SITE_URL}/blog/${slug}`;

  const html = `<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#faf7f2;">
<div lang="en" dir="ltr" style="max-width:480px;margin:0 auto;padding:40px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1c1917;">
  <p style="font-size:13px;line-height:1.5;letter-spacing:0.04em;text-transform:uppercase;color:#57534e;margin:0 0 8px;">New post${category ? ` &middot; ${escapeHtml(category)}` : ''}</p>
  <h1 style="font-size:22px;line-height:1.3;margin:0 0 16px;color:#1c1917;">${escapeHtml(title)}</h1>
  ${excerpt ? `<p style="font-size:16px;line-height:1.6;margin:0 0 24px;">${escapeHtml(excerpt)}</p>` : ''}
  <p style="font-size:16px;line-height:1.6;margin:0 0 32px;">
    <a href="${postUrl}" style="color:#1c1917;text-decoration:underline;">Read the post</a>
  </p>
  <p style="font-size:13px;line-height:1.6;color:#57534e;margin:0;">
    You're getting this because you subscribed at itasstudio.com.
    <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#57534e;text-decoration:underline;">Unsubscribe</a>.
  </p>
</div>
</body>
</html>`;

  return {
    name: `New post: ${slug}`,
    from: FROM_ADDRESS,
    subject: `New post: ${title}`,
    html,
    postUrl,
  };
}

module.exports = { buildPostNotificationBroadcast };
