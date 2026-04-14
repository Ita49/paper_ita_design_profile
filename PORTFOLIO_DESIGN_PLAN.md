# Ita Okponung — Portfolio Website Design Plan

**Version:** 1.0  
**Last updated:** April 2026  
**Design tool:** Paper  
**Token file:** `tokens.css`  
**Status:** Complete ✅

---

## 1. Project Overview

A personal portfolio website for **Ita Okponung**, Senior Digital Product & Service Designer with 13+ years of experience across SaaS, fintech, and enterprise platforms (Paystack/Stripe, Wakanow Group, Zenith Bank PLC).

### Design Direction

- **Aesthetic:** Paper.design-inspired — very dark, editorial, bold typographic hierarchy, minimal UI chrome
- **Tone:** Confident and senior — not a student portfolio. The work speaks with authority.
- **Audience:** Hiring managers, heads of design, CTOs, founders at SaaS/fintech companies; design recruiters at senior/staff/principal level
- **Goal:** Position Ita as a senior specialist in complex systems, internal tooling, and service design — not a generalist

### Core Design Principles

1. **Restraint over decoration** — fewer elements, more considered. White space is intentional.
2. **Hierarchy first** — every screen answers: Who? What? Why trust? in under 5 seconds.
3. **Show don't tell** — UI mockups, blueprints, and process artefacts inside cards, not just descriptions.
4. **Consistency via tokens** — every spacing, colour, and type decision references `tokens.css`. No one-offs.
5. **Senior framing** — language, layout density, and project selection reflect 13+ years, not a junior looking for first opportunities.

---

## 2. Site Architecture

```
ita-okponung.com
│
├── / .......................... Home (Landing)           ✅ Complete
├── /work ...................... Work — Case Studies       ✅ Complete
│   ├── /work/paystack-risk .... Case Study: Risk Dashboard
│   ├── /work/paystack-kyc ..... Case Study: Merchant Onboarding
│   ├── /work/wakanow-fraud .... Case Study: Payment & Fraud System
│   ├── /work/wakanow-ops ...... Case Study: Operational Workflow
│   └── /work/zenith-journey ... Case Study: Customer Journey
├── /about ..................... About            ✅ Complete
├── /process ................... Process
└── /contact ................... Contact
```

**Total pages to design:** 11  
**Completed:** 11  
**Remaining:** 0

---

## 3. Global Design System

### 3.1 Artboard Specs


| Page type    | Width  | Height (approx) |
| ------------ | ------ | --------------- |
| Landing page | 1440px | 2380px          |
| Work listing | 1440px | 1960px          |
| Case study   | 1440px | ~3600px         |
| About        | 1440px | ~2000px         |
| Process      | 1440px | ~2200px         |
| Contact      | 1440px | ~1200px         |


### 3.2 Navigation (Global — applies to all pages)

- **Left:** "Ita Okponung" — Archivo Black, 16px, #F2F2F2, letter-spacing -0.02em
- **Right links:** Work · About · Process · Contact — Inter 14px, #505050 (inactive), #D8F552 (active)
- **CTA button:** "Get in touch" — Inter 13px, #0B0B0B on #F2F2F2, pill shape
- **Height:** 72px, border-bottom: 1px solid rgba(255,255,255,0.07)
- **Active state:** Active nav link colour = #D8F552 (lime accent)

### 3.3 Footer (Global)

- Height: 72px, border-top: 1px solid rgba(255,255,255,0.07)
- Left: "Ita Okponung" — Archivo Black 16px, #2A2A2A
- Centre: © 2025 Ita Okponung. All rights reserved. — Inter 12px, #333333
- Right: LinkedIn · Email · CV — Inter 12px, #333333

### 3.4 Design Tokens Reference

All values defined in `/Users/ita/Documents/Paper_Design_1/tokens.css`


| Token                    | Value         | Usage                           |
| ------------------------ | ------------- | ------------------------------- |
| `--color-bg`             | #0B0B0B       | Page background                 |
| `--color-surface`        | #141414       | Card backgrounds                |
| `--color-surface-2`      | #1C1C1C       | Nested surfaces, preview areas  |
| `--color-accent`         | #D8F552       | CTAs, active states, highlights |
| `--color-text-primary`   | #F2F2F2       | Headlines, key text             |
| `--color-text-secondary` | #888888       | Supporting text                 |
| `--color-text-tertiary`  | #505050       | Labels, captions, metadata      |
| `--font-display`         | Archivo Black | All display headings            |
| `--font-body`            | Inter         | All body, labels, UI text       |
| `--space-9`              | 80px          | Horizontal page gutter          |
| `--space-10`             | 96px          | Section vertical padding        |
| `--radius-lg`            | 16px          | Card corners                    |
| `--radius-xl`            | 20px          | Featured/large card corners     |
| `--radius-pill`          | 9999px        | Buttons, tags                   |


---

## 4. Page Specifications

---

### 4.1 Home — Landing Page ✅ COMPLETE

**Artboard ID:** `8A-0`  
**Height:** 2380px

**Sections:**

1. **Nav** — Global nav component
2. **Hero** — "Designing systems that work." + Designer Status Card (right)
  - Status card shows: availability badge, 2 active / 47+ shipped / 13+ years, current role, specialty tags
3. **Credentials bar** — Paystack · Wakanow · Zenith Bank · 13+ years
4. **Case Studies preview** — 3 cards (Risk Dashboard, Payment & Fraud, Customer Journey)
5. **About + Skills** — compact two-column strip (bio left, 4 skill cards right)
6. **CTA** — "Got a complex problem?" + email + LinkedIn
7. **Footer** — Global footer component

**Design notes:**

- Hero card tells Ita's story (not client data)
- Page scrolls in ~1.5 viewports — intentionally concise
- "Work" link on landing navigates to `/work`

---

### 4.2 Work — Case Studies ✅ COMPLETE

**Artboard ID:** `MV-0`  
**Height:** 1960px

**Sections:**

1. **Nav** — Active: Work
2. **Page header** — "Work 05" + filter bar (All / Product Design / Service Design / Admin Tools / Fintech)
3. **Featured card** — Risk & Compliance Operations Dashboard (full-width, 400px)
  - Left: title, description, company/role/period metadata, tags, CTA
  - Right: live dashboard mockup with stat cards and case rows
4. **Grid row 1** — Merchant Onboarding & KYC · Payment & Fraud Management System
5. **Grid row 2** — Operational Workflow Redesign · Customer Journey Redesign — Zenith Bank
6. **Footer**

**Card anatomy (all work cards):**

- Preview thumbnail (contextual abstract mockup — no identical placeholders)
- Tags (type + company)
- Count badge (01/05 etc.)
- Title — Archivo Black 22px
- Description — Inter 13px, #555555
- Metadata strip — Role + Period + "View →" CTA
- Border-bottom: 1px solid rgba(255,255,255,0.06) above metadata

---

### 4.3 Case Study — Individual Project Pages (Template)

**Applies to:** 5 pages (one per project)  
**Note:** These all share one template structure — build the Paystack Risk Dashboard case study first as the master, then adapt for other projects.

**Sections:**

#### Header / Hero

- Breadcrumb: Work → [Project Name]
- Project title — Archivo Black 64px
- One-line summary — Inter 18px, #666666
- Metadata row: Company · Role · Period · Industry tags
- Preview image or full dashboard mockup (top-right, absolutely positioned or right column)

#### 01 — Context

- Background: what the organisation does, what team Ita was part of
- Problem statement: what was broken, fragmented, or missing
- Constraints: regulatory, technical, timeline

#### 02 — Discovery & Research

- Methods used (stakeholder interviews, user shadowing, journey mapping, etc.)
- Key insights (3–4 bullet callout cards)
- Artefacts: service map snapshot, research synthesis snippet

#### 03 — Design Process

- Stages shown as a horizontal timeline: Discover → Define → Design → Deliver
- Wireframe / lo-fi snippet
- Key decision callout: "We chose X over Y because..." with rationale
- Iteration note (what changed and why)

#### 04 — Final Design

- High-fidelity mockup(s) — detailed UI representation in Paper
- Annotated details for key interactions or components
- Accessibility / WCAG considerations noted

#### 05 — Outcomes

- Impact metrics where available (qualitative or quantitative)
- Team feedback or stakeholder quote
- What shipped vs. what was descoped

#### 06 — Learnings

- 2–3 honest reflections — what worked, what Ita would do differently

#### Navigation footer

- ← Previous project / Next project → (consistent prev/next navigation)

---

### 4.4 About

**Sections:**

#### Hero

- Large personal statement — Archivo Black 64px
  > "I design systems that help people do hard things well."
- 2-line supporting bio — Inter 15px, #555555
- Availability chip (lime)

#### Story

- Two-column layout: left text, right timeline
- Left: personal narrative — how Ita moved from Biochemistry → Operations → Business Analysis → Product Design → Service Design. Written in first person, conversational but authoritative.
- Right: visual career timeline
  - 2009: Zenith Bank — Operations Analyst
  - 2011: Zenith Bank — Business Analyst / Product Operations
  - 2014: Wakanow — Product Operations & Systems Designer
  - 2018: Paystack (Stripe Group) — Sr. Product & Service Designer

#### Philosophy

- 3 design values as large cards:
  1. "Complexity deserves rigour" — systems thinking, not surface decoration
  2. "Users first, always" — including internal users and operators
  3. "Documentation is design" — service blueprints, specs, and artefacts as core outputs

#### Skills & Tools

- Two groups: Design skills (visual tags) + Tools (logo + name)
- Design skills: UX/UI · Service Design · Information Architecture · Systems Thinking · User Research · Accessibility (WCAG) · Dashboard Design · Admin Tool Design · Workflow Design · Agile
- Tools: Figma · FigJam · Miro · Mermaid JS · Draw.io · Lucidchart · Notion · Jira

#### Education & Certifications

- Compact list with icons:
  - BSc Biochemistry (Hons.) — Olabisi Onabanjo University
  - ISO 27001 ISMS Lead Implementer
  - CRISC · CISA
  - Lean Six Sigma (Yellow Belt)
  - Salesforce Administrator
  - Salesforce Service Cloud

---

### 4.5 Process

**Purpose:** Show how Ita works — not just that she works. This differentiates a senior designer who has a repeatable, defensible process from someone who just "makes screens."

**Sections:**

#### Header

- "How I Work" — Archivo Black 72px
- Subtitle: "A structured approach to unstructured problems"

#### Process Overview — 4-stage horizontal diagram

```
Discover → Define → Design → Deliver
```

Each stage is a large card showing:

- Stage name + number
- What Ita does at this stage
- Methods and tools
- Outputs / artefacts

**Stage 1 — Discover**

- Stakeholder interviews, user observation, contextual inquiry
- Service safari, existing system audit
- Tools: Miro, FigJam, Notion
- Outputs: Research synthesis, opportunity map, HMW statements

**Stage 2 — Define**

- Journey maps (customer + operator), service blueprints (3–6 swimlanes)
- Information architecture, systems mapping
- Tools: Miro, FigJam, Mermaid JS, Lucidchart
- Outputs: Service blueprint, IA diagram, problem statement deck

**Stage 3 — Design**

- Lo-fi wireframes → hi-fi UI → interactive prototype
- Design critique, accessibility review (WCAG AA)
- Component specification, annotation
- Tools: Figma, FigJam
- Outputs: Hi-fi prototype, component spec, design documentation

**Stage 4 — Deliver**

- Developer handoff, QA review, implementation support
- Stakeholder sign-off, training materials
- Iteration post-launch
- Tools: Figma, Jira, Notion
- Outputs: Shipped product, handoff doc, retrospective

#### Principles callout

- 3 short maxims that guide Ita's process:
  1. "Operators are users too" — internal tools deserve the same design rigour as consumer products
  2. "Map before you build" — service blueprints before wireframes
  3. "Documentation is not a deliverable — it's design"

#### Collaboration section

- How Ita works with engineering, product, and stakeholders
- Cross-functional approach: embedded in product team, not a downstream resource

---

### 4.6 Contact

**Purpose:** Simple, focused, human. No form friction. Senior designers don't need a contact form — they need a clear email and context.

**Sections:**

#### Hero statement

- "Let's work on something hard together." — Archivo Black 72px
- Subtitle: "I'm available for senior product design roles, service design engagements, and design system leadership. Based in the UK, open to remote."

#### Contact options — two cards side by side

- **Email:** [ita.godwin@gmail.com](mailto:ita.godwin@gmail.com) — primary, lime CTA
- **LinkedIn:** linkedin.com/in/[handle] — secondary

#### Availability card

- Status: ● Available for new projects (lime dot)
- Open to: Full-time roles · Contract engagements · Advisory
- Location: United Kingdom · Open to remote / hybrid

#### What Ita is looking for (brief)

- Senior IC or Lead roles in SaaS, fintech, or enterprise
- Service design engagements with complex operational challenges
- Teams that value research, documentation, and craft

---

## 5. Case Study Content Plan


| #   | Project                                 | Company           | Period       | Type                         | Priority  |
| --- | --------------------------------------- | ----------------- | ------------ | ---------------------------- | --------- |
| 01  | Risk & Compliance Operations Dashboard  | Paystack · Stripe | 2020–Present | Product Design · Admin Tool  | **First** |
| 02  | Merchant Onboarding & KYC Platform      | Paystack · Stripe | 2018–2020    | Product Design · Admin Tool  | Second    |
| 03  | Payment & Fraud Management System       | Wakanow Group     | 2015–2018    | Service Design · Fintech     | Third     |
| 04  | Operational Workflow & Process Redesign | Wakanow Group     | 2014–2015    | Service Blueprint            | Fourth    |
| 05  | Customer Journey Redesign               | Zenith Bank PLC   | 2011–2014    | Journey Mapping · Enterprise | Fifth     |


---

## 6. Component Inventory

Components that appear on multiple pages and must remain consistent:


| Component              | Used on              | Notes                                                         |
| ---------------------- | -------------------- | ------------------------------------------------------------- |
| Nav                    | All pages            | Active link = #D8F552. "Ita Okponung" always top-left         |
| Footer                 | All pages            | Same across all pages                                         |
| Work card (small)      | Home, Work           | Consistent anatomy — tags, title, desc, metadata strip        |
| Work card (featured)   | Work                 | Full-width, left/right split                                  |
| Availability badge     | Home, Contact, About | "● Available for new projects" — lime pill                    |
| Filter pills           | Work                 | All · Product Design · Service Design · Admin Tools · Fintech |
| Section label          | All                  | Inter 11px, #505050, uppercase, 0.1em tracking                |
| Tag (accent)           | All                  | Lime bg/border, rounded pill                                  |
| Tag (muted)            | All                  | rgba(255,255,255,0.05) bg, rgba border                        |
| Tag (status)           | Case studies         | Red=Review, Lime=Cleared/Done, Grey=Pending                   |
| CTA button (primary)   | All                  | #D8F552 bg, #0B0B0B text, pill                                |
| CTA button (secondary) | All                  | Transparent, 1px rgba border, #505050 text                    |
| CTA button (nav)       | All                  | #F2F2F2 bg, #0B0B0B text, pill — "Get in touch"               |


---

## 7. Build Sequence

Pages are built in this order to maximise component reuse and narrative flow:


| Order | Page                                      | Status |
| ----- | ----------------------------------------- | ------ |
| 1     | Home — Landing                            | ✅ Done |
| 2     | Work — Case Studies                       | ✅ Done |
| 3     | Design Tokens — Visual Library            | ✅ Done |
| 4     | Case Study: Risk & Compliance Dashboard   | ✅ Done |
| 5     | About                                     | ✅ Done |
| 6     | Process                                   | ✅ Done |
| 7     | Contact                                   | ✅ Done |
| 8     | Case Study: Merchant Onboarding & KYC     | ✅ Done |
| 9     | Case Study: Payment & Fraud Management    | ✅ Done |
| 10    | Case Study: Operational Workflow Redesign | ✅ Done |
| 11    | Case Study: Customer Journey Redesign     | ✅ Done |


---

## 8. Writing Style Guide

All copy across the portfolio must reflect senior authority and clarity.

### Voice

- First person, direct, no filler
- Confident without being arrogant
- Precise about tools and methods — not vague
- Avoids buzzwords: "synergy", "leverage", "impactful", "passionate"

### Approved phrasing


| ❌ Avoid                            | ✅ Use instead                                                           |
| ---------------------------------- | ----------------------------------------------------------------------- |
| "I am passionate about UX"         | "I specialise in complex systems..."                                    |
| "I collaborated with stakeholders" | "I ran discovery sessions with risk ops and compliance leads"           |
| "I helped improve the product"     | "I redesigned the case management workflow, reducing review time by..." |
| "User-centric approach"            | "Service blueprints, user research, and structured discovery"           |


### Project descriptions — structure

1. **What was the problem** (1 sentence)
2. **What Ita did** (2–3 sentences — methods, decisions, process)
3. **What changed** (1–2 sentences — outcome or impact)

---

## 9. Quality Checklist (per page, before sign-off)

- Spacing: Sections use consistent padding from tokens.css
- Typography: Only Archivo Black and Inter used. No mixed weights outside spec.
- Colour: No colours outside the token palette
- Navigation: Active state correct. "Get in touch" CTA present.
- Footer: Consistent with global footer spec
- No clipping: Content fits within artboard. Overflow set to visible or artboard resized.
- Visual interest: Preview thumbnails in work cards are varied and contextual (not identical grey boxes)
- Alignment: All elements on 80px horizontal grid
- Naming: Artboard named clearly in Paper layer tree (e.g. "Home — Landing Page", "Work — Case Studies")
- Content: All text is real (from CV or accurate to Ita's experience) — no lorem ipsum

---

## 10. File Locations


| File          | Location                                                                                         | Purpose                                      |
| ------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| Design tokens | `/Users/ita/Documents/Paper_Design_1/tokens.css`                                                 | Single source of truth for all design values |
| This plan     | `/Users/ita/Documents/Paper_Design_1/PORTFOLIO_DESIGN_PLAN.md`                                   | Design and build reference                   |
| Resume / CV   | `/Users/ita/Documents/Paper_Design_1/Ita_Okponung_Digital_Product_Service_Designer_SaaS_CV.docx` | Source of truth for all content              |
| Paper file    | Paper app — "Welcome to Paper"                                                                   | Design canvas                                |


---

*This plan is the single reference for all design decisions across the portfolio. Update build sequence status and version number as pages are completed.*