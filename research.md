# Research: Portfolio Codebase — State of the Work

**Date:** 2026-07-06T11:28:26Z  
**Researcher:** Ita  
**Git Commit:** `1f353f2`  
**Branch:** `main`  
**Repository:** p_ita_design_profile

---

## Research Question

What has been built so far? What does the codebase look like, how is it structured, and what is the current state of the portfolio site?

---

## Summary

This is a dark-mode designer portfolio for Ita Okponung — Senior Product & Service Designer at Paystack (Stripe Group). The site exists in two distinct layers: a **production-ready CSS/HTML system** (`website/index.html` + `website/css/`) and a **design screen export layer** (`website/screens/`). Seven commits of work have been completed, building out the homepage, all main pages as design comps, and a robust design token system.

---

## Project Structure

```
p_ita_design_profile/
├── index.html                     ← Root-level duplicate of website/index.html
├── css/                           ← Root-level duplicate of website/css/
│   ├── tokens.css
│   └── main.css
├── assets/images/                 ← Root-level image copies
│   ├── risk_dashboard.png
│   └── heatmap_1.png
├── sparkwash_preview.mp4          ← 852KB, 5s compressed preview (used in site)
├── sparkwash_screenrecording.MP4  ← 10MB, original full recording
├── scripts/
│   └── paper_to_html.py           ← JSX→HTML converter for Paper MCP exports
└── website/
    ├── index.html                 ← PRODUCTION homepage (CSS class-based)
    ├── css/
    │   ├── tokens.css             ← Full design token system
    │   └── main.css               ← Component + layout styles
    ├── assets/images/
    │   ├── risk_dashboard.png
    │   └── heatmap_1.png
    └── screens/                   ← Figma/Paper MCP exports (design comps)
        ├── index.html             ← Screens navigation page
        ├── home.html
        ├── work.html
        ├── about.html
        ├── process.html
        ├── contact.html           ← Partial (has parse artifact)
        ├── case-risk.html
        ├── case-kyc.html
        ├── case-payment.html
        ├── case-journey.html
        └── case-workflow.html
```

---

## Two Distinct Code Layers

### Layer 1 — Production CSS System (`website/index.html`)

The canonical production site. Uses semantic HTML with BEM-adjacent class names, external CSS files, and proper `<a>` tags with `href` routing. Responsive (breakpoints at 1100px and 768px). Font loaded via Google Fonts (Archivo Black + Inter). Deployed to Vercel.

Key files:
- `website/index.html` — Full homepage (364 lines)
- `website/css/tokens.css` — Design tokens (179 lines)
- `website/css/main.css` — All components and layout (1185 lines)

The homepage has these sections in order:
1. Nav (sticky, blur backdrop)
2. Hero — large "Designing systems that work." heading + Status card
3. Credentials bar (Paystack, Wakanow, Zenith Bank + "13+ years")
4. Case Studies section (3 cards in a grid)
5. About + Expertise section
6. Side Projects section (3 phone-frame tiles)
7. CTA section ("Got a complex problem?")
8. Footer

### Layer 2 — Screen Exports (`website/screens/`)

Pixel-faithful HTML renderings of Figma screens, generated from Paper MCP JSX via `scripts/paper_to_html.py`. They use only inline styles, are fixed at 1440px width, and are not responsive. They serve as a design preview/reference layer for Cursor IDE previews.

Each screen file has a minimal wrapper:
```html
<div class="screen-root">
  <div style="background-color: #1A1A1C; width: 1440px; ...">
    <!-- all inline style content -->
  </div>
</div>
```

The screen exports have richer designs in some places than the production homepage — for example, `work.html` has a full work listing page with a featured hero card and 4 additional case cards, which hasn't been built into the production CSS system yet.

---

## Design System

### Typography

| Token | Value | Use |
|---|---|---|
| `--font-display` | Archivo Black | Headings, numbers, logo |
| `--font-body` | Inter | Body copy, nav, labels, metadata |
| Scale | 9px → 104px | 20+ stops defined |

### Color Palette (Dark Mode Only)

| Role | Value |
|---|---|
| Background | `#1A1A1C` |
| Surface 1 | `#232326` |
| Surface 2 | `#2C2C30` |
| Surface 3 | `#36363B` |
| Text primary | `#F2F2F2` |
| Text secondary | `#888888` |
| Text muted | `#555555` |
| **Accent 1** (warm off-white) | `#EEE9DF` |
| **Accent 2** (lime) | `#D8F552` |
| Success | `#4DB6AC` |
| Warning | `#E8A020` |
| Error | `#E05050` |
| Borders | `rgba(255,255,255,0.07/0.12/0.20)` |

### Spacing

4px base unit. Scale: 4 → 6 → 8 → 10 → 12 → 14 → 16 → 18 → 24 → 28 → 32 → 40 → 48 → 64 → 72 → 80 → 96 → 120 → 160px.

### Border Radius

2px (chips) → 4px → 6px → 8px → 10px → 12px → 16px → 20px → 24px → 32px → pill (9999px)

### Transitions

- `--ease-default`: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — standard
- `--ease-spring`: `cubic-bezier(0.34, 1.56, 0.64, 1)` — bouncy
- Durations: 150ms / 250ms / 400ms

### Layout

- Page max-width: 1440px
- Content width: 1280px
- Nav height: 72px
- Section padding: 120px top/bottom
- Gutter: 80px horizontal

---

## Pages / Screens Inventory

### Homepage (`website/index.html`)
Production-ready. All sections implemented. Has crossfade slideshow animation on the Risk card (fades between `risk_dashboard.png` and `heatmap_1.png` every 4s). Side Projects section renders CSS-drawn phone frames — Spark Wash uses the actual `sparkwash_preview.mp4` video in the screen export.

### Work Page (`website/screens/work.html`)
Design comp only (not yet a production HTML page). Shows:
- Page header: "Work" in 72px + project count "05"
- Filter tabs: All / Product Design / Service Design / Admin Tools / Fintech
- Featured card (full width, 400px height): Risk & Compliance
- 2×2 grid of 4 more cards: KYC, Payment & Fraud, Operational Workflow, Customer Journey Redesign

### About Page (`website/screens/about.html`)
Design comp only. Contains:
- 64px hero headline: "I design systems that help people do hard things well."
- Bio paragraph
- Availability badge
- Story section (4 body paragraphs tracing career from Zenith Bank → Wakanow → Paystack)
- Timeline (2009 → 2018–Present)

### Process Page (`website/screens/process.html`)
Design comp only. Shows a 4-stage process:
1. **Discover** — Stakeholder interviews, user observation, contextual inquiry, service safari, system audit
2. **Define** — Journey maps, service blueprints (3–6 swimlanes), IA, systems mapping
3. **Design** — Lo-fi to hi-fi, prototyping, design critique, WCAG AA, component spec, annotation
4. **Deliver** — Dev handoff, QA, implementation support, stakeholder sign-off, training, post-launch iteration

### Contact Page (`website/screens/contact.html`)
Partial/broken design comp. Contains a parse artifact (`"(` and `)"` wrapper from Paper MCP JSON). Headline: "Let's work on something hard together." with availability indicator in `#D8F552`.

### Case Study Screens (`case-risk.html`, `case-kyc.html`, `case-payment.html`, `case-journey.html`, `case-workflow.html`)
All five case study detail pages exist as design comps. Not yet examined in full detail.

---

## Case Studies (5 Projects)

| # | Title | Client | Period | Category |
|---|---|---|---|---|
| 01 | Risk & Compliance Operations Dashboard | Paystack | 2020–Present | Product Design, Admin Tool, SaaS/Fintech |
| 02 | Merchant Onboarding & KYC Platform | Paystack | 2018–2020 | Admin Tool, Paystack |
| 03 | Payment & Fraud Management System | Wakanow | 2015–2018 | Service Design, Fintech |
| 04 | Operational Workflow & Process Redesign | Wakanow | 2014–2015 | Service Blueprint |
| 05 | Customer Journey Redesign | Zenith Bank | 2011–2014 | Journey Mapping, Enterprise |

---

## Side Projects (3 apps)

| App | Theme color | Description |
|---|---|---|
| Spark Wash | `#0EA5E9` sky-blue | On-demand car wash booking — has real `sparkwash_preview.mp4` |
| JustBuns | `#F59E0B` amber | Artisan bakery ordering & delivery |
| ZenRadar | `#8B5CF6` violet | Mindfulness & focus tracking |

Each is rendered as a CSS phone frame (168×300px, rotated ±1deg) with a per-brand accent glow. Spark Wash is unique in using actual video footage inside the phone frame.

---

## Toolchain

### `scripts/paper_to_html.py`

A ~150-line Python script that converts Paper MCP JSX output into standalone HTML files. It:

1. Parses the outer JSON string literal wrapper from Paper's `get_jsx` response
2. Strips the JSX outer parentheses `( ... )`
3. Converts `style={{ camelCase: value }}` → `style="kebab-case: value"`
4. Converts SVG camelCase attributes (e.g. `strokeWidth` → `stroke-width`)
5. Wraps output in an HTML template with Google Fonts and minimal reset CSS

Usage:
```bash
cat screen.jsx | python3 scripts/paper_to_html.py --title "Work" --output website/screens/work.html
```

---

## Git History (7 Commits)

| Commit | Message |
|---|---|
| `faaccfe` | Initial commit — portfolio landing page |
| `fd7460f` | Add portfolio website — HTML/CSS build |
| `479546d` | Export Paper screens to individual HTML files for Cursor preview |
| `c8a64a3` | Update stats on home screen to 10+ |
| `c8194af` | Audit and fix token consistency across all screens |
| `4a56a85` | Add Spark Wash screen recording to side projects section |
| `1f353f2` | Replace Spark Wash video with compressed 5s preview (852KB) |

---

## Key Observations (Current State)

1. **Duality between production and comps** — The production site (`website/index.html`) only covers the homepage. The screens directory has all pages designed but not yet converted to the class-based CSS system.

2. **No routing** — The production site has `<a href="work.html">` etc. but those HTML files don't exist at `website/work.html`. The screens directory files are the closest thing to those pages.

3. **Duplicate files** — Root-level `/index.html`, `/css/`, and `/assets/` appear to mirror `website/` — likely an artifact of how the project was initially structured vs. how Vercel is configured to serve it.

4. **Case study pages** — 5 case studies exist as design comps in `screens/` but none exist in the production CSS system. Links in the homepage point to `work/risk-compliance.html` etc., which don't exist.

5. **Contact page** — Has a parse artifact in the screen comp: the JSON string wrapper (`"(` / `)"`) was not fully stripped, resulting in literal quote characters in the HTML.

6. **Media** — Two video files at root: a 10MB original (`sparkwash_screenrecording.MP4`) and an 852KB 5-second preview (`sparkwash_preview.mp4`). Only the preview is used in the site.

7. **No JavaScript** — The entire production site uses zero JavaScript. Animations are pure CSS (keyframe crossfade, hover transforms). Interactivity is CSS-only.

---

## Open Questions / What's Missing from Production

- `website/work.html` — not built
- `website/about.html` — not built
- `website/process.html` — not built
- `website/contact.html` — not built
- `website/work/risk-compliance.html` — not built (and 4 other case studies)
- No Vercel config (`vercel.json`) or deployment config visible
- No favicon
- No `<meta og:*>` social tags
- LinkedIn URL is placeholder (`https://linkedin.com` — not a real profile link)
