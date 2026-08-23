const { sanityQuery } = require('../_lib/sanity');
const { renderPage, escapeHtml } = require('../_lib/layout');

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

module.exports = async (req, res) => {
  let posts = [];
  try {
    posts = await sanityQuery(
      `*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc){
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        category,
        tags
      }`
    );
  } catch (err) {
    console.error('Failed to fetch posts from Sanity', err);
  }

  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))].sort();

  const rawCategory = req.query && req.query.category;
  const activeCategory = typeof rawCategory === 'string' && categories.includes(rawCategory) ? rawCategory : null;

  const visiblePosts = activeCategory ? posts.filter((p) => p.category === activeCategory) : posts;

  const filterHtml = categories.length
    ? `<div class="blog-filters">
        <a href="/blog" class="blog-filter-pill${!activeCategory ? ' is-active' : ''}">All</a>
        ${categories
          .map(
            (c) =>
              `<a href="/blog?category=${encodeURIComponent(c)}" class="blog-filter-pill${
                activeCategory === c ? ' is-active' : ''
              }">${escapeHtml(c)}</a>`
          )
          .join('')}
      </div>`
    : '';

  const listHtml = visiblePosts.length
    ? `<div class="blog-grid">
        ${visiblePosts
          .map(
            (post) => `
        <a href="/blog/${escapeHtml(post.slug)}" class="blog-card">
          <div class="blog-card-meta">
            <span>${formatDate(post.publishedAt)}</span>
            ${post.category ? `<span class="blog-card-category">${escapeHtml(post.category)}</span>` : ''}
            ${
              post.tags && post.tags.length
                ? `<div class="blog-card-tags">${post.tags
                    .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
                    .join('')}</div>`
                : ''
            }
          </div>
          <h2 class="blog-card-title">${escapeHtml(post.title)}</h2>
          ${post.excerpt ? `<p class="blog-card-excerpt">${escapeHtml(post.excerpt)}</p>` : ''}
          <span class="blog-card-cta">Read post →</span>
        </a>`
          )
          .join('\n')}
      </div>`
    : activeCategory
    ? `<div class="blog-empty">No posts in “${escapeHtml(activeCategory)}” yet.</div>`
    : `<div class="blog-empty">No posts yet - check back soon. New updates on what I'm building and working through will show up here.</div>`;

  const bodyHtml = `
  <div class="page-hero">
    <div class="inner">
      <span class="page-hero-eyebrow">Writing</span>
      <h1 class="page-hero-title">Blog</h1>
      <p class="page-hero-desc">Updates on what I'm building, working through, and thinking about - product design, service design, and side projects.</p>
    </div>
  </div>

  <section class="section">
    <div class="inner">
      ${filterHtml}
      ${listHtml}
    </div>
  </section>

  <section class="newsletter-section">
    <div class="inner">
      <div class="newsletter-box">
        <span class="label">Stay in the loop</span>
        <h2 class="newsletter-title">Get new posts by email</h2>
        <p class="newsletter-desc">Occasional notes on new case studies, side projects, and things I'm working through. No spam, unsubscribe anytime.</p>
        <form class="newsletter-form" data-endpoint="/api/subscribe" data-success-message="Subscribed - thanks for joining.">
          <input type="text" name="company" class="form-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <input type="email" name="email" class="newsletter-input" placeholder="you@email.com" required />
          <button type="submit" class="btn btn-primary newsletter-submit">Subscribe</button>
        </form>
        <p class="form-status" data-status></p>
      </div>
    </div>
  </section>

  <script src="/js/forms.js" defer></script>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  res.status(200).send(
    renderPage({
      title: activeCategory ? `${activeCategory} | Blog | Ita Okponung` : 'Blog | Ita Okponung',
      description: "Updates on product design, service design, and what I'm building - from Ita Okponung.",
      canonicalPath: activeCategory ? `/blog?category=${encodeURIComponent(activeCategory)}` : '/blog',
      activeNav: 'blog',
      bodyHtml,
    })
  );
};
