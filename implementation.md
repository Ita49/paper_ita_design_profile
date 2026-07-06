# Implementation: Modern Classic Design Portfolio

**Date:** 2026-07-06  
**Based on:** `research.md` + `plan.md`  
**Purpose:** Exact build instructions for every file, component, and CSS addition. No ambiguity — this document defines what to write, where to write it, and in what order.

---

## Before You Build Anything

Read the constraints:

- All styles go into `website/css/main.css`. No new CSS files. No style blocks in HTML.
- All token values come from `website/css/tokens.css`. No hardcoded hex values or pixel values in `main.css` or HTML except where a token doesn't exist — add the token first.
- `website/` is the canonical source. The root-level `index.html`, `css/`, and `assets/` are duplicates and should not be edited.
- The responsive breakpoints are already defined: `1100px` and `768px`. New components get responsive rules added to the existing media query blocks at the bottom of `main.css`.

---

## Phase 0 — Housekeeping

Target file: `website/index.html`  
Target file: `website/css/main.css`

### 0.1 Fix the `<head>` on `website/index.html`

Replace the existing `<head>` block with:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ita Okponung — Senior Product & Service Designer</title>
  <meta name="description" content="Senior Digital Product & Service Designer with 13+ years building SaaS, fintech, and enterprise platforms. Based in the UK." />
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
  <meta property="og:title" content="Ita Okponung — Senior Product & Service Designer" />
  <meta property="og:description" content="13+ years designing internal tools, dashboards, and enterprise services. Based in the UK." />
  <meta property="og:image" content="assets/images/og-card.png" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/main.css" />
</head>
```

### 0.2 Fix the LinkedIn placeholder

In `website/index.html`, find every occurrence of `href="https://linkedin.com"` and replace with the real LinkedIn profile URL. There are two: one in the CTA section and one in the footer.

### 0.3 Create the favicon

Create `website/assets/favicon.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#1A1A1C"/>
  <text x="16" y="23" text-anchor="middle"
        font-family="serif" font-size="17" font-weight="900"
        fill="#F2F2F2" letter-spacing="-1">IO</text>
</svg>
```

### 0.4 Confirm nav href values

The nav on the homepage already uses relative paths (`work.html`, `about.html`, etc.) which resolve correctly when the site is served from `website/`. No change needed — but every new page must match this same relative convention.

---

## Page Shell Template

Every page in the site uses this HTML shell. Copy this for each new page and fill in the variable parts (title, description, nav active link, content, css-path prefix).

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PAGE_TITLE — Ita Okponung</title>
  <meta name="description" content="PAGE_DESCRIPTION" />
  <link rel="icon" href="CSS_PREFIX/assets/favicon.svg" type="image/svg+xml" />
  <meta property="og:title" content="PAGE_TITLE — Ita Okponung" />
  <meta property="og:description" content="PAGE_DESCRIPTION" />
  <meta property="og:image" content="CSS_PREFIX/assets/images/og-card.png" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="CSS_PREFIX/css/main.css" />
</head>
<body>
<div class="page-wrapper">

  <!-- Navigation -->
  <nav class="nav">
    <div class="inner">
      <a href="CSS_PREFIX/index.html" class="nav-logo">Ita Okponung</a>
      <div class="nav-right">
        <ul class="nav-links">
          <li><a href="CSS_PREFIX/work.html" CLASS_IF_ACTIVE>Work</a></li>
          <li><a href="CSS_PREFIX/about.html" CLASS_IF_ACTIVE>About</a></li>
          <li><a href="CSS_PREFIX/process.html" CLASS_IF_ACTIVE>Process</a></li>
          <li><a href="CSS_PREFIX/contact.html" CLASS_IF_ACTIVE>Contact</a></li>
        </ul>
        <a href="CSS_PREFIX/contact.html" class="btn btn-nav">Get in touch</a>
      </div>
    </div>
  </nav>

  <!-- Page content here -->

  <!-- Footer -->
  <footer class="footer">
    <div class="inner">
      <span class="footer-logo">IO</span>
      <span class="footer-copy">© 2025 Ita Okponung. All rights reserved.</span>
      <ul class="footer-links">
        <li><a href="LINKEDIN_URL" target="_blank">LinkedIn</a></li>
        <li><a href="mailto:ita.godwin@gmail.com">Email</a></li>
        <li><a href="#">CV</a></li>
      </ul>
    </div>
  </footer>

</div>
</body>
</html>
```

**CSS_PREFIX values by location:**
- Root pages (`website/work.html`, `website/about.html`, etc.) → `CSS_PREFIX` is empty (just `css/main.css`, `index.html`)
- Case study pages (`website/work/risk-compliance.html`, etc.) → `CSS_PREFIX` is `../` (e.g. `../css/main.css`, `../index.html`)

**Active nav link:** Add `class="active"` to the matching `<a>` tag. The `.active` style is already defined in `main.css` (same as `.nav-links a:hover`).

---

## CSS Additions to `main.css`

All additions go at the end of `main.css`, immediately before the `/* ── Responsive ──` block. This keeps the responsive rules last. Add each section as it becomes needed in Phase 1–2.

### Addition 1 — Page Hero (shared by Work, About, Process, Contact)

```css
/* ── Page Hero ──────────────────────────────── */

.page-hero {
  padding: var(--space-9) 0 var(--space-8);  /* 80px top, 64px bottom */
  border-bottom: 1px solid var(--color-border);
}

.page-hero-eyebrow {
  font-size: var(--text-xs);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-5);
}

.page-hero-title {
  font-family: var(--font-display);
  font-size: clamp(52px, 6vw, 80px);
  letter-spacing: var(--ls-tight);
  line-height: var(--lh-tight);
  color: var(--color-text-primary);
  margin-bottom: var(--space-5);
  max-width: 820px;
}

.page-hero-desc {
  font-size: var(--text-base2);
  color: var(--color-text-secondary);
  line-height: var(--lh-relaxed);
  max-width: 520px;
}

.page-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  height: 32px;
  padding: 0 var(--space-4);
  border-radius: var(--radius-pill);
  font-size: var(--text-sm);
  margin-top: var(--space-5);
}

.page-hero-badge--available {
  background: rgba(216, 245, 82, 0.08);
  border: 1px solid rgba(216, 245, 82, 0.2);
  color: var(--color-accent-2);
}

.page-hero-badge--available::before {
  content: '';
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-accent-2);
  flex-shrink: 0;
}
```

### Addition 2 — Work Page

```css
/* ── Work Page ───────────────────────────────── */

.filter-bar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 var(--space-3-5);
  border-radius: var(--radius-pill);
  font-size: var(--text-xs2);
  font-weight: var(--fw-medium);
  cursor: pointer;
  transition: background var(--duration-fast), color var(--duration-fast);
  border: 1px solid rgba(255,255,255,0.12);
  color: var(--color-text-muted);
  background: transparent;
}

.filter-pill--active {
  background: var(--color-accent);
  color: var(--color-text-inverse);
  border-color: transparent;
}

.work-hero {
  padding: var(--space-9) 0 var(--space-8);
}

.work-hero-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: var(--space-8);
}

.work-title-row {
  display: flex;
  align-items: baseline;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.work-title {
  font-family: var(--font-display);
  font-size: clamp(56px, 6vw, 80px);
  letter-spacing: var(--ls-tight);
  line-height: 1;
  color: var(--color-text-primary);
}

.work-count {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  letter-spacing: var(--ls-snug);
  color: var(--color-text-faint);
}

.work-desc {
  font-size: var(--text-base2);
  color: var(--color-text-muted);
  line-height: var(--lh-relaxed);
  max-width: 480px;
}

/* Featured case card */
.case-featured {
  display: grid;
  grid-template-columns: 520px 1fr;
  min-height: 400px;
  background: var(--color-surface);
  border-radius: var(--radius-xl2);
  border: 1px solid var(--color-border-med);
  overflow: hidden;
  margin-bottom: var(--space-2);
}

.case-featured-body {
  padding: var(--space-8) var(--space-8-5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.case-featured-visual {
  background: var(--color-bg);
  border-left: 1px solid var(--color-border);
  padding: var(--space-6-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  position: relative;
  overflow: hidden;
}

.case-featured-tag-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}

.case-featured-badge {
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 var(--space-3);
  border-radius: var(--radius-pill);
  font-size: var(--text-base2);
  background: rgba(238,233,223,0.12);
  border: 1px solid rgba(238,233,223,0.25);
  color: var(--color-accent);
}

.case-featured-counter {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.case-featured-title {
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  letter-spacing: var(--ls-snug);
  line-height: 1.1;
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.case-featured-desc {
  font-size: var(--text-sm2);
  color: var(--color-text-muted);
  line-height: var(--lh-relaxed);
  max-width: 380px;
}

.case-meta-row {
  display: flex;
  gap: var(--space-6);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-border);
  margin-top: var(--space-5);
}

.case-meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.case-meta-label {
  font-size: var(--text-xs);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.case-meta-value {
  font-size: var(--text-sm);
  font-weight: var(--fw-medium);
  color: var(--color-text-secondary);
}

.case-featured-cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs2);
  font-weight: var(--fw-medium);
  color: var(--color-accent);
  margin-top: var(--space-3);
}

/* Case grid (2-up rows) */
.case-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2);
}

.case-card {
  background: var(--color-surface);
  border-radius: var(--radius-xl2);
  border: 1px solid var(--color-border-med);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color var(--duration-base) var(--ease-default),
              transform var(--duration-base) var(--ease-default);
  text-decoration: none;
}

.case-card:hover {
  border-color: var(--color-border-hi);
  transform: translateY(-3px);
}

.case-card-visual {
  height: 180px;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6) var(--space-6);
}

.case-card-body {
  padding: var(--space-5-5) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  flex: 1;
}

.case-card-tags {
  display: flex;
  gap: var(--space-1-5);
  flex-wrap: wrap;
}

.case-card-number {
  margin-left: auto;
  font-size: var(--text-xs);
  color: var(--color-text-faint);
}

.case-card-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  letter-spacing: var(--ls-snug);
  line-height: 1.15;
  color: var(--color-text-primary);
}

.case-card-desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--lh-relaxed);
  flex: 1;
}

.case-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
  margin-top: var(--space-2);
}

.case-card-footer-meta {
  display: flex;
  gap: var(--space-5);
}

.case-card-cta {
  font-size: var(--text-xs2);
  color: var(--color-text-secondary);
  transition: color var(--duration-fast);
}

.case-card:hover .case-card-cta {
  color: var(--color-accent-2);
}
```

### Addition 3 — About Page

```css
/* ── About Page ──────────────────────────────── */

.story-section {
  padding: var(--space-9) 0;
  border-top: 1px solid var(--color-border);
}

.story-section-label {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.story-section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

.story-section-label span {
  font-size: var(--text-xs);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.story-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: var(--space-12);
  align-items: start;
}

.story-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.story-body p {
  font-size: var(--text-base2);
  color: var(--color-text-secondary);
  line-height: var(--lh-relaxed);
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
  padding-left: var(--space-5-5);
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 3px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: var(--color-border);
}

.timeline-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: calc(-1 * var(--space-5-5) + 1px);
  top: 6px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-text-faint);
}

.timeline-item--current::before {
  background: var(--color-accent);
}

.timeline-year {
  font-size: var(--text-xs);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-wider);
  color: var(--color-text-muted);
}

.timeline-company {
  font-family: var(--font-display);
  font-size: var(--text-base2);
  letter-spacing: -0.01em;
  color: var(--color-text-primary);
}

.timeline-role {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.credentials-strip {
  padding: var(--space-5) 0;
  border-top: 1px solid var(--color-border);
  font-size: var(--text-xs2);
  color: var(--color-text-secondary);
  letter-spacing: 0.01em;
}
```

### Addition 4 — Process Page

```css
/* ── Process Page ────────────────────────────── */

.process-section {
  padding: var(--space-8) 0 var(--space-12);
}

.process-label {
  font-size: var(--text-xs);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--space-6);
}

.process-stages {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

.process-card {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  padding: var(--space-6) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.process-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.process-stage-number {
  font-size: var(--text-xs);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.process-stage-badge {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 var(--space-2-5);
  border-radius: var(--radius-pill);
  font-size: var(--text-xs);
  border: 1px solid var(--color-border-med);
  color: var(--color-text-secondary);
}

.process-stage-badge--active {
  background: var(--color-accent-2-soft);
  border-color: var(--color-accent-2-border);
  color: var(--color-accent-2);
}

.process-stage-title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  letter-spacing: var(--ls-snug);
  line-height: 1;
  color: var(--color-text-primary);
}

.process-stage-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--lh-relaxed);
}
```

### Addition 5 — Contact Page

```css
/* ── Contact Page ────────────────────────────── */

.contact-hero {
  padding: var(--space-12) 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-5);
  max-width: 900px;
}

.contact-availability {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--color-accent-2);
}

.contact-availability::before {
  content: '';
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-accent-2);
  flex-shrink: 0;
}

.contact-title {
  font-family: var(--font-display);
  font-size: clamp(48px, 6vw, 80px);
  letter-spacing: var(--ls-tight);
  line-height: var(--lh-tight);
  color: var(--color-text-primary);
}

.contact-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-3);
}

.contact-note {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-top: var(--space-4);
}
```

### Addition 6 — Case Study Pages

```css
/* ── Case Study Pages ────────────────────────── */

.case-study-nav {
  padding: var(--space-5) 0;
  border-bottom: 1px solid var(--color-border);
}

.case-study-breadcrumb {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  transition: color var(--duration-fast);
}

.case-study-breadcrumb:hover {
  color: var(--color-text-primary);
}

.case-study-header {
  padding: var(--space-8) 0 var(--space-7);
  border-bottom: 1px solid var(--color-border);
}

.case-study-eyebrow {
  font-size: var(--text-xs);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
}

.case-study-title {
  font-family: var(--font-display);
  font-size: clamp(40px, 5vw, 68px);
  letter-spacing: var(--ls-tight);
  line-height: var(--lh-tight);
  color: var(--color-text-primary);
  max-width: 820px;
  margin-bottom: var(--space-6);
}

.case-study-meta {
  display: flex;
  gap: var(--space-8);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-border);
}

.case-study-meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.case-study-hero-visual {
  width: 100%;
  min-height: 480px;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.case-study-hero-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
}

.case-study-body {
  max-width: 720px;
  margin: 0 auto;
  padding: var(--space-10) var(--space-9);
}

.case-study-section {
  margin-bottom: var(--space-9);
}

.case-study-section-label {
  font-size: var(--text-xs);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
}

.case-study-section-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  letter-spacing: var(--ls-snug);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}

.case-study-section p {
  font-size: var(--text-base2);
  color: var(--color-text-secondary);
  line-height: var(--lh-relaxed);
  margin-bottom: var(--space-4);
}

.case-study-section ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-left: var(--space-4);
}

.case-study-section li {
  font-size: var(--text-base2);
  color: var(--color-text-secondary);
  line-height: var(--lh-relaxed);
  position: relative;
}

.case-study-section li::before {
  content: '—';
  position: absolute;
  left: calc(-1 * var(--space-4));
  color: var(--color-text-faint);
}

.case-study-outcome {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-med);
  padding: var(--space-7) var(--space-7);
  margin-top: var(--space-5);
}

.case-study-outcome-title {
  font-size: var(--text-xs);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--color-accent-2);
  margin-bottom: var(--space-4);
}

.case-study-outcome p {
  font-size: var(--text-base2);
  color: var(--color-text-secondary);
  line-height: var(--lh-relaxed);
  margin-bottom: var(--space-4);
}

.case-study-outcome p:last-child {
  margin-bottom: 0;
}

.case-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-8) 0;
  border-top: 1px solid var(--color-border);
}

.case-pagination-link {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-decoration: none;
}

.case-pagination-dir {
  font-size: var(--text-xs);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.case-pagination-title {
  font-size: var(--text-sm2);
  font-weight: var(--fw-medium);
  color: var(--color-text-secondary);
  transition: color var(--duration-fast);
}

.case-pagination-link:hover .case-pagination-title {
  color: var(--color-text-primary);
}
```

### Addition 7 — Responsive additions (append to existing @media blocks)

Append to the `@media (max-width: 1100px)` block:

```css
  .case-featured { grid-template-columns: 1fr; }
  .case-featured-visual { display: none; }
  .case-grid { grid-template-columns: 1fr; }
  .process-stages { grid-template-columns: 1fr 1fr; }
  .story-grid { grid-template-columns: 1fr; }
```

Append to the `@media (max-width: 768px)` block:

```css
  .work-title { font-size: 48px; }
  .process-stages { grid-template-columns: 1fr; }
  .case-study-meta { flex-direction: column; gap: 20px; }
  .contact-title { font-size: 40px; }
  .case-pagination { flex-direction: column; gap: 32px; align-items: flex-start; }
```

---

## Phase 1 — Core Pages

### `website/work.html`

Use the page shell template. Set `CSS_PREFIX` to empty (root-level page). Active nav: `work.html`. Title: `Work — Case Studies`.

**Content structure:**

```html
<!-- Work Hero -->
<div class="work-hero">
  <div class="inner">
    <div class="work-hero-header">
      <div>
        <p class="page-hero-eyebrow">Selected Projects</p>
        <div class="work-title-row">
          <h1 class="work-title">Work</h1>
          <span class="work-count">05</span>
        </div>
        <p class="work-desc">Enterprise SaaS, fintech, and service design
        projects spanning 13 years — from discovery and research
        through to shipped product.</p>
      </div>
      <div class="filter-bar">
        <p class="case-meta-label" style="margin-right:8px">Filter</p>
        <button class="filter-pill filter-pill--active">All</button>
        <button class="filter-pill">Product Design</button>
        <button class="filter-pill">Service Design</button>
        <button class="filter-pill">Admin Tools</button>
        <button class="filter-pill">Fintech</button>
      </div>
    </div>
  </div>
</div>

<!-- Featured Case (01) -->
<div class="inner">
  <a href="work/risk-compliance.html" class="case-featured">
    <div class="case-featured-body">
      <div>
        <div class="case-featured-tag-row">
          <span class="case-featured-badge">Featured</span>
          <span class="case-featured-counter">01 / 05</span>
        </div>
        <h2 class="case-featured-title">Risk &amp; Compliance<br>Operations Dashboard</h2>
        <p class="case-featured-desc">Led end-to-end design of an internal SaaS platform used daily by
        risk, compliance, and operational teams at Paystack. Replaced fragmented
        tooling with a unified dashboard for transaction monitoring, case management,
        and regulatory reporting.</p>
      </div>
      <div>
        <div class="case-meta-row">
          <div class="case-meta-item">
            <span class="case-meta-label">Company</span>
            <span class="case-meta-value">Paystack · Stripe</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Role</span>
            <span class="case-meta-value">Lead Product Designer</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Period</span>
            <span class="case-meta-value">2020 – Present</span>
          </div>
        </div>
        <div class="case-card-tags" style="margin-top:16px">
          <span class="tag">Product Design</span>
          <span class="tag">Admin Tool</span>
          <span class="tag">SaaS · Fintech</span>
        </div>
        <span class="case-featured-cta">View case study →</span>
      </div>
    </div>
    <!-- Right visual: Risk dashboard mockup (reuse existing CSS mockup from homepage card) -->
    <div class="case-featured-visual">
      <!-- Copy the motion-display + dashboard-window + floating-kpi + floating-status
           markup from the homepage work-card-image for the Risk card. -->
    </div>
  </a>

  <!-- Cases 02–05 grid -->
  <div class="case-grid">

    <!-- Card 02: KYC -->
    <a href="work/kyc-onboarding.html" class="case-card">
      <div class="case-card-visual">
        <!-- KYC CSS mockup: form fields + checkbox + submit -->
        <!-- Build inline using existing tag/surface tokens -->
      </div>
      <div class="case-card-body">
        <div class="case-card-tags">
          <span class="tag">Admin Tool</span>
          <span class="tag">Paystack</span>
          <span class="case-card-number">02 / 05</span>
        </div>
        <h3 class="case-card-title">Merchant Onboarding &amp; KYC Platform</h3>
        <p class="case-card-desc">Designed the full merchant onboarding flow and
        KYC verification admin tool at Paystack — reducing time-to-live for new
        merchants and giving compliance teams clear visibility into document
        status and risk signals.</p>
        <div class="case-card-footer">
          <div class="case-card-footer-meta">
            <div class="case-meta-item">
              <span class="case-meta-label">Role</span>
              <span class="case-meta-value">Sr. Product Designer</span>
            </div>
            <div class="case-meta-item">
              <span class="case-meta-label">Period</span>
              <span class="case-meta-value">2018 – 2020</span>
            </div>
          </div>
          <span class="case-card-cta">View →</span>
        </div>
      </div>
    </a>

    <!-- Card 03: Payment & Fraud — same structure, href="work/payment-fraud.html" -->
    <!-- Card 04: Workflow — same structure, href="work/workflow-redesign.html" -->
    <!-- Card 05: Customer Journey — same structure, href="work/customer-journey.html" -->

  </div>
</div>
```

**CSS mockups for case cards 02–05** — build these inside `.case-card-visual` using only `<div>` elements and inline-style variants of the existing palette. Mirror the pattern from the homepage placeholder cards. Key shapes per case:

- **KYC (02):** Three input field bars (varying widths) + a checkbox row + a submit button bar. Use `rgba(255,255,255,0.08/0.12)` fills.
- **Payment & Fraud (03):** Four equal-width stage blocks connected by thin horizontal lines. One active stage in `rgba(216,245,82,0.15)` with lime border.
- **Workflow Blueprint (04):** Three rows labeled Frontstage / Backstage / Support with varying-width cell blocks per row.
- **Customer Journey (05):** Five bars at different heights with colored dots below them. One bar highlighted in `rgba(216,245,82,0.14)`.

---

### `website/about.html`

Use the page shell template. Active nav: `about.html`. Title: `About`.

```html
<!-- Page Hero -->
<div class="page-hero">
  <div class="inner">
    <p class="page-hero-eyebrow">About</p>
    <h1 class="page-hero-title">I design systems that help people<br>do hard things well.</h1>
    <p class="page-hero-desc">Senior Digital Product &amp; Service Designer with 13+ years
    building complex internal tools, fintech platforms, and enterprise systems.
    Formerly at Paystack · Stripe Group, Wakanow Group, and Zenith Bank PLC.</p>
    <span class="page-hero-badge page-hero-badge--available">
      Available for new opportunities
    </span>
  </div>
</div>

<!-- Story Section -->
<div class="story-section">
  <div class="inner">
    <div class="story-section-label"><span>Story</span></div>
    <div class="story-grid">
      <div class="story-body">
        <p>I didn't start in design school. I started in operations — as an analyst at
        Zenith Bank, learning how large systems work from the inside, where the friction
        actually lives.</p>
        <p>From operations I moved into business analysis: mapping processes, documenting
        systems, asking why things worked the way they did. That curiosity became my
        practice.</p>
        <p>At Wakanow I started designing — not screens, but the systems behind them.
        Service blueprints, operational workflows, payment flows. Complex work with real
        stakes, which taught me that design at this level requires rigour, not just taste.</p>
        <p>At Paystack I led design for the internal compliance and risk infrastructure
        used by operations teams every day. Six years building tools that had to be fast,
        accurate, and trusted under pressure. That's the work I'm built for.</p>
      </div>
      <div class="timeline">
        <div class="timeline-item">
          <span class="timeline-year">2009</span>
          <span class="timeline-company">Zenith Bank PLC</span>
          <span class="timeline-role">Operations Analyst</span>
        </div>
        <div class="timeline-item">
          <span class="timeline-year">2014 – 2018</span>
          <span class="timeline-company">Wakanow Group</span>
          <span class="timeline-role">Product &amp; Systems Designer</span>
        </div>
        <div class="timeline-item timeline-item--current">
          <span class="timeline-year">2018 — Present</span>
          <span class="timeline-company">Paystack · Stripe Group</span>
          <span class="timeline-role">Sr. Product &amp; Service Designer</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Credentials -->
<div class="inner">
  <p class="credentials-strip">
    BSc Biochemistry &nbsp;·&nbsp; ISO 27001 &nbsp;·&nbsp; CRISC &nbsp;·&nbsp;
    CISA &nbsp;·&nbsp; Lean Six Sigma
  </p>
</div>
```

---

### `website/process.html`

Use the page shell template. Active nav: `process.html`. Title: `Process`.

```html
<!-- Page Hero -->
<div class="page-hero">
  <div class="inner">
    <p class="page-hero-eyebrow">Process</p>
    <h1 class="page-hero-title">How I Work</h1>
    <p class="page-hero-desc">A structured approach to unstructured problems —
    from ambiguous brief to shipped product.</p>
  </div>
</div>

<!-- Process Stages -->
<div class="process-section">
  <div class="inner">
    <p class="process-label">Design Process — 4 stages</p>
    <div class="process-stages">

      <div class="process-card">
        <div class="process-card-header">
          <span class="process-stage-number">01</span>
          <span class="process-stage-badge process-stage-badge--active">Discover</span>
        </div>
        <h2 class="process-stage-title">Discover</h2>
        <p class="process-stage-desc">Stakeholder interviews, user observation,
        contextual inquiry, service safari, and existing system audit to map the
        real problem space.</p>
      </div>

      <div class="process-card">
        <div class="process-card-header">
          <span class="process-stage-number">02</span>
          <span class="process-stage-badge">Define</span>
        </div>
        <h2 class="process-stage-title">Define</h2>
        <p class="process-stage-desc">Journey maps, service blueprints across
        3–6 swimlanes, information architecture, and systems mapping to frame
        the solution space precisely.</p>
      </div>

      <div class="process-card">
        <div class="process-card-header">
          <span class="process-stage-number">03</span>
          <span class="process-stage-badge">Design</span>
        </div>
        <h2 class="process-stage-title">Design</h2>
        <p class="process-stage-desc">Lo-fi wireframes to hi-fi UI, interactive
        prototyping, design critique, WCAG AA accessibility review, component
        specification, and annotation.</p>
      </div>

      <div class="process-card">
        <div class="process-card-header">
          <span class="process-stage-number">04</span>
          <span class="process-stage-badge">Deliver</span>
        </div>
        <h2 class="process-stage-title">Deliver</h2>
        <p class="process-stage-desc">Developer handoff, QA review, implementation
        support, stakeholder sign-off, training materials, and post-launch
        iteration.</p>
      </div>

    </div>
  </div>
</div>
```

---

### `website/contact.html`

Use the page shell template. Active nav: `contact.html`. Title: `Contact`.

```html
<div class="section">
  <div class="inner">
    <div class="contact-hero">
      <span class="contact-availability">Available for new projects</span>
      <h1 class="contact-title">Let's work on something<br>hard together.</h1>
      <div class="contact-actions">
        <a href="mailto:ita.godwin@gmail.com" class="btn btn-primary">
          ita.godwin@gmail.com →
        </a>
        <a href="LINKEDIN_URL" target="_blank" class="btn btn-ghost">LinkedIn</a>
      </div>
      <p class="contact-note">Usually responds within 24 hours.</p>
    </div>
  </div>
</div>
```

---

## Phase 2 — Case Study Template + Case Study 01

### Create `website/work/` directory

All 5 case study files live in `website/work/`.

CSS path prefix for all case study pages: `../`  
Nav hrefs: `../index.html`, `../work.html`, `../about.html`, etc.

### Case Study Template HTML structure

```html
<!-- Breadcrumb -->
<div class="case-study-nav">
  <div class="inner">
    <a href="../work.html" class="case-study-breadcrumb">← Work</a>
  </div>
</div>

<!-- Header -->
<div class="case-study-header">
  <div class="inner">
    <p class="case-study-eyebrow">CASE_TYPE · COMPANY</p>
    <h1 class="case-study-title">CASE_TITLE</h1>
    <div class="case-study-meta">
      <div class="case-study-meta-item">
        <span class="case-meta-label">Company</span>
        <span class="case-meta-value">COMPANY</span>
      </div>
      <div class="case-study-meta-item">
        <span class="case-meta-label">Role</span>
        <span class="case-meta-value">ROLE</span>
      </div>
      <div class="case-study-meta-item">
        <span class="case-meta-label">Period</span>
        <span class="case-meta-value">PERIOD</span>
      </div>
      <div class="case-study-meta-item">
        <span class="case-meta-label">Disciplines</span>
        <div class="case-card-tags" style="margin-top:4px">
          <span class="tag">TAG1</span>
          <span class="tag">TAG2</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Hero Visual -->
<div class="case-study-hero-visual">
  <!-- Either: <img src="../assets/images/screenshot.png" alt="..."> -->
  <!-- Or: CSS-only dashboard/mockup div -->
</div>

<!-- Body -->
<div class="case-study-body">

  <div class="case-study-section">
    <p class="case-study-section-label">Overview</p>
    <p>OVERVIEW_PARAGRAPH</p>
  </div>

  <div class="case-study-section">
    <p class="case-study-section-label">Problem</p>
    <p>PROBLEM_PARAGRAPH</p>
  </div>

  <div class="case-study-section">
    <p class="case-study-section-label">Approach</p>
    <p>APPROACH_PARAGRAPH</p>
    <ul>
      <li>METHOD_1</li>
      <li>METHOD_2</li>
      <li>METHOD_3</li>
    </ul>
  </div>

  <div class="case-study-section">
    <p class="case-study-section-label">Solution</p>
    <p>SOLUTION_PARAGRAPH</p>
  </div>

  <div class="case-study-outcome">
    <p class="case-study-outcome-title">Outcome</p>
    <p>OUTCOME_PARAGRAPH</p>
  </div>

</div>

<!-- Pagination -->
<div class="inner">
  <div class="case-pagination">
    <a href="../work.html" class="case-pagination-link">
      <span class="case-pagination-dir">← All work</span>
      <span class="case-pagination-title">Back to case studies</span>
    </a>
    <a href="NEXT_CASE.html" class="case-pagination-link" style="text-align:right">
      <span class="case-pagination-dir">Next →</span>
      <span class="case-pagination-title">NEXT_CASE_TITLE</span>
    </a>
  </div>
</div>
```

---

### Case Study 01: Risk & Compliance Dashboard

**File:** `website/work/risk-compliance.html`  
**Eyebrow:** Product Design · Paystack  
**Title:** Risk & Compliance Operations Dashboard  
**Role:** Lead Product Designer  
**Period:** 2020 – Present  
**Tags:** Product Design, Admin Tool, SaaS, Fintech  
**Hero visual:** Use the real screenshots — `../assets/images/risk_dashboard.png` as `<img>` inside `.case-study-hero-visual`

**Content:**

- **Overview:** Led end-to-end design of an internal SaaS platform used daily by risk, compliance, and operational teams at Paystack. The platform consolidated fragmented tooling into a single dashboard covering transaction monitoring, case management, and regulatory reporting.

- **Problem:** Risk and compliance teams were working across multiple disconnected tools — spreadsheets, legacy admin panels, and direct database queries. There was no single view of a case, no clear audit trail, and operational decisions were slow because information required manual assembly. The tools created risk, not reduced it.

- **Approach:**
  - Embedded with the risk operations team for two weeks, shadowing daily workflows
  - Conducted stakeholder interviews with compliance leads, operations analysts, and engineering
  - Mapped the existing workflow into a service blueprint — identifying 11 handoff points that were causing delays
  - Ran collaborative design critiques with engineering at each fidelity stage
  - Tested prototypes with 6 ops analysts before any engineering build started

- **Solution:** A unified dashboard with four primary modules: transaction monitoring (real-time queue with severity scoring), case management (full case lifecycle with audit log), regulatory reporting (templated exports), and team management. Established a component library for the admin tooling space at Paystack, which was later adopted by two other internal teams.

- **Outcome:** The platform reduced average case resolution time. Operations teams adopted it as their primary tool within the first month. The design system foundations built here were reused in the KYC platform built in the same period.

**Pagination:** Next → `kyc-onboarding.html` — Merchant Onboarding & KYC Platform

---

### Case Studies 02–05: Content Reference

**02 — Merchant Onboarding & KYC Platform** (`kyc-onboarding.html`)  
Paystack · Sr. Product Designer · 2018–2020  
Overview: Designed the end-to-end merchant onboarding experience and KYC admin tool. Merchants needed a faster path to going live; compliance teams needed structured document review with clear risk signals.  
Problem: New merchant activation took too long due to manual document review steps and no shared visibility between ops and compliance.  
Approach: Mapped the merchant onboarding journey (8 stages), identified 4 friction points in the compliance review step, redesigned the document upload flow and the admin-side review interface in parallel.  
Solution: A two-sided platform — a clean merchant-facing onboarding wizard and an internal KYC review dashboard with document status, risk flags, and batch approval capability.  
Outcome: Reduced the average time for a merchant to reach "live" status. Compliance teams had full structured visibility for the first time.  
Pagination: ← risk-compliance.html | → payment-fraud.html

---

**03 — Payment & Fraud Management System** (`payment-fraud.html`)  
Wakanow · Product & Systems Designer · 2015–2018  
Overview: Redesigned Wakanow's payment workflows and fraud detection system across their travel booking and ancillary products.  
Problem: High rate of false-positive fraud flags was blocking legitimate transactions and requiring excessive manual review. The payment flow had no consistent states across product lines.  
Approach: Mapped 4 swimlane service blueprints covering the full payment lifecycle. Ran workshops with fraud operations, payments engineering, and product leads to align on decision criteria and edge cases.  
Solution: A redesigned payment flow with consistent states and error messaging, paired with a new fraud management admin tool with configurable rule thresholds and a manual review queue.  
Outcome: Reduction in false-positive rate. Manual review time cut significantly. Payment flow states standardised across 3 product lines.  
Pagination: ← kyc-onboarding.html | → workflow-redesign.html

---

**04 — Operational Workflow & Process Redesign** (`workflow-redesign.html`)  
Wakanow · Product & Systems Designer · 2014–2015  
Overview: Mapped and redesigned core operational workflows at Wakanow Group, producing 3-swimlane service blueprints and system documentation to drive process improvement across payment operations.  
Problem: Payment operations ran on undocumented, person-dependent processes. When key people left or were unavailable, operations stalled. There was no shared understanding of how systems connected.  
Approach: Facilitated process mapping workshops with each operational team. Produced service blueprints (frontstage / backstage / support layers) for each core workflow. Documented system integration points and handoffs.  
Solution: A set of 6 service blueprints and a process documentation pack adopted as the operational reference for the payments and customer service teams.  
Outcome: Process knowledge was made explicit and transferable. The blueprints became the input for the subsequent payment flow redesign (Case Study 03).  
Pagination: ← payment-fraud.html | → customer-journey.html

---

**05 — Customer Journey Redesign — Zenith Bank** (`customer-journey.html`)  
Zenith Bank PLC · Operations Analyst / Designer · 2011–2014  
Overview: Gathered requirements and mapped 5-phase customer and internal journeys for Zenith Bank's digital services, supporting solution design across banking operations and customer-facing touchpoints.  
Problem: Digital banking services at Zenith had been built incrementally, resulting in inconsistent experiences and internal processes that didn't match customer expectations. There was no holistic view of the end-to-end customer journey.  
Approach: Conducted contextual inquiry with customers at branch and digital touchpoints. Ran internal workshops to map the backstage processes corresponding to each customer action. Produced sentiment-mapped journey diagrams for 5 service phases.  
Solution: Journey maps and process documentation delivered to the product and operations leadership teams as the foundation for a subsequent digital service redesign programme.  
Outcome: The journey maps directly informed the scoping of a digital transformation initiative. This project established the practice of customer journey mapping within the organisation.  
Pagination: ← workflow-redesign.html | Back to work

---

## Phase 3 — Verification Checklist

Run through this after Phase 2 is complete.

**Links:**
- [ ] Homepage → Work page (nav + card CTAs)
- [ ] Homepage → About (nav)
- [ ] Homepage → Process (nav)
- [ ] Homepage → Contact (nav + CTA button + footer)
- [ ] Work page → all 5 case studies
- [ ] Each case study → next case study (pagination)
- [ ] Each case study → ← Work (breadcrumb)
- [ ] All pages → back to homepage (nav logo)
- [ ] Footer LinkedIn link on all pages (real URL, not placeholder)

**Visual:**
- [ ] Nav active state correct on every page
- [ ] No page has a broken `<img>` (missing src)
- [ ] No CSS mockup is missing (every `.case-card-visual` has content)
- [ ] Spark Wash phone frame video resolves on homepage (path: `sparkwash_preview.mp4`)

**Meta:**
- [ ] Every page has a unique `<title>`
- [ ] Every page has `<meta name="description">`
- [ ] Every page has the favicon link
- [ ] Homepage has OG tags

**CSS:**
- [ ] No hardcoded hex values in `main.css` that have a token equivalent
- [ ] No `style=""` attributes in HTML that belong in `main.css`
- [ ] Responsive breakpoints tested at 1100px and 768px

---

## Phase 4 — OG Card Image

Create `website/assets/images/og-card.png` at 1200×630px.

The simplest valid OG card for this site:
- Background: `#1A1A1C`
- Center: "IO" monogram in Archivo Black, very large (~280px), `#F2F2F2`
- Below: "Ita Okponung — Senior Product & Service Designer" in Inter Medium, 28px, `#888888`
- Bottom-right: "ita.godwin@gmail.com" in Inter, 18px, `#444444`

This can be created in Figma using the existing design tokens and exported as PNG.

---

## File Creation Order

Build and test in this exact sequence to avoid broken links at any step:

```
1. website/assets/favicon.svg
2. website/css/main.css          (add all new CSS additions)
3. website/index.html            (Phase 0 fixes)
4. website/work.html             (Phase 1)
5. website/about.html            (Phase 1)
6. website/process.html          (Phase 1)
7. website/contact.html          (Phase 1)
8. website/work/                 (create directory)
9. website/work/risk-compliance.html    (Phase 2)
10. website/work/kyc-onboarding.html    (Phase 3)
11. website/work/payment-fraud.html     (Phase 3)
12. website/work/workflow-redesign.html (Phase 3)
13. website/work/customer-journey.html  (Phase 3)
14. website/assets/images/og-card.png   (Phase 4)
```
