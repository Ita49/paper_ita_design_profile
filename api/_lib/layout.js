function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderPage({ title, description, canonicalPath, activeNav, bodyHtml }) {
  const canonicalUrl = `https://portfolio.itasstudio.com${canonicalPath}`;
  const navItem = (href, label, key) =>
    `<li><a href="${href}"${activeNav === key ? ' class="active"' : ''}>${label}</a></li>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="https://portfolio.itasstudio.com/assets/images/og-card.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="https://portfolio.itasstudio.com/assets/images/og-card.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/main.css" />
</head>
<body>

<div class="page-wrapper">

  <nav class="nav">
    <div class="inner">
      <a href="/" class="nav-logo">Ita Okponung</a>
      <div class="nav-right">
        <ul class="nav-links">
          <li><a href="/work.html">Work</a></li>
          ${navItem('/blog', 'Blog', 'blog')}
          <li><a href="/about.html">About</a></li>
          <li><a href="/process.html">Process</a></li>
          <li><a href="/contact.html">Contact</a></li>
        </ul>
        <a href="/contact.html" class="btn btn-nav">Get in touch</a>
      </div>
    </div>
  </nav>

  ${bodyHtml}

  <footer class="footer">
    <div class="inner">
      <span class="footer-logo">IO</span>
      <span class="footer-copy">© 2025 Ita Okponung. All rights reserved.</span>
      <ul class="footer-links">
        <li><a href="https://paper-ita-design-profile.vercel.app/" target="_blank">LinkedIn</a></li>
        <li><a href="mailto:ita.godwin@gmail.com">Email</a></li>
      </ul>
    </div>
  </footer>

</div>

</body>
</html>
`;
}

module.exports = { renderPage, escapeHtml };
