const { unsubscribeToken } = require('./email-utils');

const SITE_URL = 'https://portfolio.itasstudio.com';
const FROM_ADDRESS = 'Ita Okponung <hello@itasstudio.com>';

function buildWelcomeEmail(email) {
  const unsubscribeUrl = `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}&token=${unsubscribeToken(email)}`;

  const html = `<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>You're subscribed to updates from Ita Okponung</title>
</head>
<body style="margin:0;padding:0;background-color:#faf7f2;">
<div lang="en" dir="ltr" style="max-width:480px;margin:0 auto;padding:40px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1c1917;">
  <h1 style="font-size:22px;line-height:1.3;margin:0 0 16px;color:#1c1917;">You're subscribed</h1>
  <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">Thanks for signing up. I'll send occasional notes on new case studies, side projects, and things I'm working through. No spam, and you can leave anytime.</p>
  <p style="font-size:16px;line-height:1.6;margin:0 0 32px;">
    <a href="${SITE_URL}/blog" style="color:#1c1917;text-decoration:underline;">Read the blog</a>
  </p>
  <p style="font-size:13px;line-height:1.6;color:#57534e;margin:0;">
    Sent to ${email} because you subscribed at itasstudio.com.
    <a href="${unsubscribeUrl}" style="color:#57534e;text-decoration:underline;">Unsubscribe from these emails</a>.
  </p>
</div>
</body>
</html>`;

  const text = `You're subscribed

Thanks for signing up. I'll send occasional notes on new case studies, side projects, and things I'm working through. No spam, and you can leave anytime.

Read the blog: ${SITE_URL}/blog

---
Sent to ${email} because you subscribed at itasstudio.com.
Unsubscribe: ${unsubscribeUrl}`;

  return {
    from: FROM_ADDRESS,
    to: [email],
    subject: "You're subscribed",
    html,
    text,
    headers: {
      'List-Unsubscribe': `<${unsubscribeUrl}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
  };
}

module.exports = { buildWelcomeEmail };
