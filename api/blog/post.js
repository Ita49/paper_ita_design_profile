const { toHTML } = require('@portabletext/to-html');
const { sanityQuery, imageUrl } = require('../_lib/sanity');
const { renderPage, escapeHtml } = require('../_lib/layout');

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = imageUrl(value, { width: 1200 });
      return src ? `<img src="${src}" alt="${escapeHtml(value.alt || '')}" loading="lazy" />` : '';
    },
    flowDiagram: ({ value }) => {
      const steps = Array.isArray(value.steps) ? value.steps : [];
      if (!steps.length) return '';
      return `<div class="blog-flow">
        ${steps
          .map(
            (step, i) => `
        <div class="blog-flow-step">
          <span class="blog-flow-step-number">${i + 1}</span>
          <span class="blog-flow-step-text">${escapeHtml(step)}</span>
        </div>`
          )
          .join('')}
      </div>`;
    },
  },
};

module.exports = async (req, res) => {
  const slug = req.query.slug;

  if (!slug) {
    res.status(400).send('Missing slug');
    return;
  }

  let post;
  try {
    post = await sanityQuery(
      `*[_type == "post" && slug.current == $slug][0]{
        title, excerpt, publishedAt, category, tags, body, coverImage
      }`,
      { slug }
    );
  } catch (err) {
    console.error('Failed to fetch post from Sanity', err);
  }

  if (!post) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(404).send(
      renderPage({
        title: 'Post not found — Ita Okponung',
        description: 'This blog post could not be found.',
        canonicalPath: `/blog/${slug}`,
        activeNav: 'blog',
        bodyHtml: `
        <div class="page-hero">
          <div class="inner">
            <h1 class="page-hero-title">Post not found</h1>
            <p class="page-hero-desc">This post doesn't exist or may have been moved. <a href="/blog" style="color:var(--color-accent-2);text-decoration:underline;">Back to the blog →</a></p>
          </div>
        </div>`,
      })
    );
    return;
  }

  const coverSrc = imageUrl(post.coverImage, { width: 1400 });
  const bodyContentHtml = post.body ? toHTML(post.body, { components: portableTextComponents }) : '';

  const bodyHtml = `
  <article class="blog-post">
    <a href="/blog" class="blog-post-breadcrumb">← Blog</a>
    <div class="blog-post-meta">
      <span>${formatDate(post.publishedAt)}</span>
      ${post.category ? `<a href="/blog?category=${encodeURIComponent(post.category)}" class="blog-post-category">${escapeHtml(post.category)}</a>` : ''}
    </div>
    <h1 class="blog-post-title">${escapeHtml(post.title)}</h1>
    ${
      post.tags && post.tags.length
        ? `<div class="blog-post-tags">${post.tags
            .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
            .join('')}</div>`
        : ''
    }
    ${coverSrc ? `<img class="blog-post-cover" src="${coverSrc}" alt="${escapeHtml(post.title)}" />` : ''}
    <div class="blog-post-body">
      ${bodyContentHtml}
    </div>
    <div class="blog-post-footer">
      <a href="/blog" class="blog-post-breadcrumb">← Back to all posts</a>
    </div>
  </article>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  res.status(200).send(
    renderPage({
      title: `${post.title} — Ita Okponung`,
      description: post.excerpt || `${post.title} — a blog post by Ita Okponung.`,
      canonicalPath: `/blog/${slug}`,
      activeNav: 'blog',
      bodyHtml,
    })
  );
};
