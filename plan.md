# Plan: Modern Classic Design Portfolio

**Date:** 2026-07-06  
**Based on:** `research.md`  
**Goal:** Build a complete, production-ready portfolio site that feels modern but timeless — the kind of site that represents a senior system and service designer at the highest level.

---

## The Goal

> A modern day but classic system/product/service design website.

"Modern" means it reflects contemporary standards: sharp typography, deliberate whitespace, fast loading, no visual debt.  
"Classic" means it is not trend-chasing. No gratuitous scroll animations, no hover particles, no color floods. It earns attention through clarity, structure, and restraint — which is exactly what a system designer's work demands.

The site is not just a container for work. It **is** work. A visitor who looks at it should think: this person builds things that are clear, considered, and built to last.

---

## Current State (from `research.md`)

| What exists | Status |
|---|---|
| Homepage — production CSS | ✅ Built |
| Design token system | ✅ Built |
| Work page | ⚠️ Screen comp only, not wired |
| About page | ⚠️ Screen comp only, not wired |
| Process page | ⚠️ Screen comp only, not wired |
| Contact page | ⚠️ Partial screen comp, has parse error |
| 5 Case study pages | ⚠️ Screen comps only, not wired |
| Nav links | ❌ All broken (pages don't exist in production) |
| Favicon | ❌ Missing |
| Social/OG meta tags | ❌ Missing |
| LinkedIn URL | ❌ Placeholder |
| Root vs website/ structure | ⚠️ Duplicate confusion |

---

## Design Principles

These guide every decision in the implementation.

**1. Typography does the heavy lifting.**  
Archivo Black for display, Inter for everything else. No third font. Size and weight variation replace decorative elements. Headings are large enough to command the room.

**2. Color is information, not decoration.**  
The palette exists: `#1A1A1C` base, `#EEE9DF` warm accent, `#D8F552` lime accent. Lime is reserved for active nav states, positive data, and CTAs. Warm off-white is used for primary actions and availability. Nothing else gets color.

**3. Spacing creates hierarchy.**  
Sections breathe at 120px. Cards live at 72px. Components are dense at 16–24px. This rhythm signals structure without saying a word.

**4. No placeholder states.**  
If a card image doesn't exist, build a real CSS mockup. No broken img tags, no 404s, no lorem ipsum.

**5. Navigation must always work.**  
Every link on every page must resolve. Active page state is always reflected in the nav.

**6. Case studies are the product.**  
The case study pages are where a hiring manager or client makes their decision. They must be detailed, structured, and demonstrate thinking — not just show screenshots.

---

## Site Architecture

### Page Map

```
/index.html              ← Homepage
/work.html               ← Work listing (all 5 case studies)
/about.html              ← About + timeline
/process.html            ← Design process (4 stages)
/contact.html            ← Contact
/work/
    risk-compliance.html   ← Case study 01
    kyc-onboarding.html    ← Case study 02
    payment-fraud.html     ← Case study 03
    workflow-redesign.html ← Case study 04
    customer-journey.html  ← Case study 05
```

All pages share:
- The same nav (sticky, backdrop blur)
- The same footer (IO logo, copyright, LinkedIn/Email/CV links)
- The same CSS files (`css/tokens.css` + `css/main.css`)

### File Structure (target)

```
website/
├── index.html
├── work.html
├── about.html
├── process.html
├── contact.html
├── work/
│   ├── risk-compliance.html
│   ├── kyc-onboarding.html
│   ├── payment-fraud.html
│   ├── workflow-redesign.html
│   └── customer-journey.html
├── css/
│   ├── tokens.css
│   └── main.css
└── assets/
    ├── images/
    │   ├── risk_dashboard.png
    │   └── heatmap_1.png
    └── video/
        └── sparkwash_preview.mp4
```

---

## CSS Architecture

The existing `main.css` covers homepage components only. As new pages are built, all new component styles are added to `main.css`. No per-page CSS files. One stylesheet serves the entire site.

Tokens never get inline-overridden. Any deviation from the token system is a new token, not an inline value.

---

## Pages: Detailed Spec

### 1. Homepage (`index.html`)
**Status:** Production-ready. Minor fixes needed.

Fixes required:
- [ ] Fix nav `href` values — currently link to `work.html`, `about.html` etc. without a path prefix; ensure they resolve relative to the served root
- [ ] Replace placeholder LinkedIn URL with real profile URL
- [ ] Add favicon link
- [ ] Add OG meta tags (title, description, image)
- [ ] Fix `sparkwash_preview.mp4` path reference in the CSS (homepage production uses CSS phone frame mockup — the video is used in the screen comp, not production; confirm or implement)

---

### 2. Work Page (`work.html`)
**Source:** `website/screens/work.html` (design comp)  
**Build approach:** Translate the screen comp into the class-based CSS system.

**Sections:**
- **Page header:** `Selected Projects` eyebrow, large "Work" display heading (72px), project count `05` in a dimmer weight, 2-line descriptor paragraph
- **Filter bar:** `All` / `Product Design` / `Service Design` / `Admin Tools` / `Fintech` — pill buttons; active state uses accent fill; default state uses ghost style
- **Featured card (01/05):** Full-width, 400px min-height. Left column = title, description, metadata (Company / Role / Period), tags, CTA. Right column = CSS UI mockup (Risk dashboard preview).
- **Grid rows (02–05):** Two cards per row. Each card has: a CSS mockup in a header zone, tags, title, description, role + period, and a "View →" CTA.

**Components needed in `main.css`:**
- `.page-hero` — page-level header region
- `.filter-bar` — horizontal pill filter group
- `.filter-pill` — individual filter, with `.filter-pill--active` variant
- `.case-featured` — large featured card (grid: text left, visual right)
- `.case-grid` — 2-column grid for remaining cases
- `.case-card` — individual case card
- `.case-card-visual` — top visual zone
- `.case-card-body` — bottom text zone
- `.case-meta` — role/period/company row
- `.case-number` — `01 / 05` counter label

**CSS mockups needed (no images exist for these):**
- KYC/Onboarding: Form fields + checkbox + submit button mockup
- Payment & Fraud: 4-stage pipeline (Wakanow swimlane diagram)
- Operational Workflow: 3-row swimlane grid (Frontstage / Backstage / Support)
- Customer Journey: 5-bar sentiment chart

---

### 3. About Page (`about.html`)
**Source:** `website/screens/about.html` (design comp)  
**Build approach:** New production HTML using the class-based CSS system.

**Sections:**
- **Page header:** `About` eyebrow, 64px headline "I design systems that help people do hard things well.", sub-copy (13+ years, companies), availability badge
- **Story section:** 4 body paragraphs (narrative, left-column, ~15px/165% line-height), timeline on right (vertical line, 2009 Zenith Bank → 2018–Present Paystack)
- **Credentials bar:** BSc Biochemistry · ISO 27001 · CRISC · CISA · Lean Six Sigma

**Components needed in `main.css`:**
- `.about-hero` — page header zone
- `.story-grid` — 2-column layout (narrative + timeline)
- `.timeline` — vertical line with event nodes
- `.timeline-item` — individual timeline entry (year, company, role)
- `.credentials-strip` — horizontal credential list

---

### 4. Process Page (`process.html`)
**Source:** `website/screens/process.html` (design comp)  
**Build approach:** New production HTML using the class-based CSS system.

**Sections:**
- **Page header:** `Process` eyebrow, 72px "How I Work" heading, sub-descriptor
- **Process section label:** "Design Process — 4 stages" (small caps, border-bottom)
- **4-stage card row:** Equal-width cards side-by-side. Each card: stage number (01–04), stage name badge (active for Discover, ghost for others), large stage name (28px display), description paragraph.

**Active state on "Discover":** `#D8F552` lime badge, lime label color — as shown in the process screen comp.

**Components needed in `main.css`:**
- `.process-hero`
- `.process-stages` — 4-column equal grid
- `.process-card` — individual stage card
- `.process-stage-number` — `01` counter
- `.process-stage-badge` — pill with active/inactive variants
- `.process-stage-title` — 28px display name
- `.process-stage-desc` — body description

---

### 5. Contact Page (`contact.html`)
**Source:** `website/screens/contact.html` (partial/broken screen comp)  
**Build approach:** Build from scratch using established design language.

**Sections:**
- **Availability indicator:** `#D8F552` dot + "Available for new projects" in lime caps
- **Headline:** 72px "Let's work on something hard together."
- **Contact options:**
  - Email button (primary, `ita.godwin@gmail.com →`)
  - LinkedIn button (ghost)
  - Optional: short response-time note ("Usually responds within 24 hours")

**Components needed in `main.css`:**
- `.contact-hero` — centered layout, large headline
- Reuses `.btn-primary` and `.btn-ghost` from existing system

---

### 6. Case Study Pages (`work/*.html`)
**Source:** `website/screens/case-risk.html` and others (design comps)  
**Build approach:** Define a single `case-study` page template. All 5 case studies use the same template with different content.

**Template structure (top to bottom):**

```
← Back to Work                          [breadcrumb]
────────────────────────────────────────
EYEBROW  Case Study · Company
TITLE    Large case study headline
────────────────────────────────────────
Meta row:   Company | Role | Period | Category tags
────────────────────────────────────────
[Full-width visual / screenshot / mockup zone]
────────────────────────────────────────
Overview
    The brief / context paragraph

Problem
    What was broken or missing

Approach
    How it was tackled (bullets or prose)

Solution
    What was designed

Outcome
    Impact, if any
────────────────────────────────────────
← Prev case        Next case →          [pagination]
```

**Components needed in `main.css`:**
- `.case-study-header`
- `.case-study-meta` — Company / Role / Period row
- `.case-study-hero-visual` — full-width image/mockup zone
- `.case-study-body` — constrained reading width (~680px)
- `.case-study-section` — individual content section with heading
- `.case-study-nav` — prev/next pagination footer

**Content required per case study:**
Each case study needs real written content. The screen comps have titles and one-line descriptions. Full case studies require:
- Brief / context (1–2 paragraphs)
- Problem statement
- Approach (what methods were used: research, blueprints, etc.)
- Solution description
- Outcomes (quantified if possible, narrative if not)
- Supporting visuals (screenshots or CSS mockups)

---

## Shared Components (all pages)

### Navigation
Already built. Needs:
- Active link state per page (class `.active` on the matching nav link)
- Correct relative hrefs from all directories (root pages use `work.html`; pages inside `work/` use `../work.html`)

### Footer
Already built. Needs:
- Real LinkedIn URL added
- Consistent across all pages

### Favicon
- SVG favicon: "IO" monogram in Archivo Black, `#F2F2F2` on `#1A1A1C`
- Add to all pages as `<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">`

### Meta Tags (OG + Twitter Card)
All pages need:
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="/assets/images/og-card.png" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## Implementation Phases

### Phase 0 — Housekeeping
Fix what's broken before building more.

- [ ] Decide canonical root: is the site served from `/website/` or from `/`? Consolidate so there's one copy of each file.
- [ ] Fix broken nav `href` values on the homepage
- [ ] Replace placeholder LinkedIn URL
- [ ] Add favicon SVG
- [ ] Add OG meta tags to homepage

**Deliverable:** Homepage fully functional, no broken links, no missing assets.

---

### Phase 1 — Core Pages
Build the four main pages in production HTML/CSS.

Order: **Work → About → Process → Contact**

Work first because it's the most important page after the homepage — it's where case study links live. About and Process are supporting context pages. Contact is the simplest.

- [ ] Build `work.html` (Work listing page)
- [ ] Build `about.html` (About + story + timeline)
- [ ] Build `process.html` (4-stage process)
- [ ] Build `contact.html` (contact CTA)
- [ ] Add all new CSS components to `main.css`
- [ ] Verify nav active states on all pages
- [ ] Verify all internal links resolve

**Deliverable:** Complete 5-page site. Every nav link works. Every page has consistent nav + footer.

---

### Phase 2 — Case Study Template & First Case
Design and build the case study page template, then write and build the first case study (Risk & Compliance — the flagship).

- [ ] Design case study template structure
- [ ] Add `case-study-*` components to `main.css`
- [ ] Write content for Case Study 01: Risk & Compliance Dashboard
- [ ] Build `work/risk-compliance.html`
- [ ] Link from homepage card and work page card

**Deliverable:** One fully working, content-rich case study. Template is reusable for remaining four.

---

### Phase 3 — Remaining Case Studies
Write and build the other four case studies using the Phase 2 template.

- [ ] Case Study 02: KYC Onboarding (`work/kyc-onboarding.html`)
- [ ] Case Study 03: Payment & Fraud Management (`work/payment-fraud.html`)
- [ ] Case Study 04: Operational Workflow Redesign (`work/workflow-redesign.html`)
- [ ] Case Study 05: Customer Journey Redesign (`work/customer-journey.html`)

**Deliverable:** All 5 case studies live and linked from the work page.

---

### Phase 4 — Polish & Production Readiness
Final quality pass before treating the site as production-grade.

- [ ] OG image (`/assets/images/og-card.png`) — 1200×630px, renders the IO monogram + title
- [ ] Add OG/Twitter meta to all pages
- [ ] Verify responsive behavior across all new pages (1100px and 768px breakpoints)
- [ ] Test all links (no 404s)
- [ ] Compress any new images
- [ ] Review `website/css/main.css` for any duplicate rules introduced across phases
- [ ] Review token usage — confirm no hardcoded values slipped in

**Deliverable:** Production-ready, complete site.

---

## What This Plan Deliberately Excludes

- **JavaScript** — The site stays JS-free. No frameworks, no bundlers, no scroll libraries.
- **Dark/light mode toggle** — Dark only. Toggling adds complexity for no benefit.
- **Blog or writing section** — Not part of the current scope.
- **CMS integration** — All content is authored directly in HTML.
- **Animation beyond what exists** — The crossfade slideshow on the homepage is sufficient. No scroll-triggered reveals, no page transition effects.
- **PDF CV download** — Linked in the footer as `#` placeholder; not in scope to attach a PDF.

---

## Success Criteria

The site is done when:

1. Every nav link on every page resolves to a real page.
2. Every case study link from the homepage and work page resolves.
3. The site is navigable from any page to any other page without a 404.
4. Each page has a correct `<title>`, favicon, and meta description.
5. The design reads as coherent — same type scale, same color usage, same spacing rhythm — whether you land on the homepage, the work listing, a case study, or the about page.
6. No inline style overrides exist that contradict the token system.
7. A recruiter or design lead who lands on the site has everything they need without emailing: who you are, what you've built, how you think, and how to reach you.
