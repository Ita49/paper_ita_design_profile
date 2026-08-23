---
name: blog-update
description: Turn a raw update (usually pasted from a LinkedIn post, but can be any rough notes) into a polished blog post on Ita's portfolio site and publish it to Sanity after approval. Use whenever Ita says "blog update", wants to post a weekly/regular update, or pastes a draft asking for it to become a blog post.
---

# Blog Update

Converts Ita's raw update into a blog post on the portfolio site (https://portfolio.itasstudio.com/blog) and publishes it to Sanity CMS, always with Ita's explicit sign-off before it goes live.

Repo: `/Users/ita/Documents/p_ita_design_profile`. Sanity project `h13zm2yl`, dataset `production`. Credentials in `.env.local` (`SANITY_API_WRITE_TOKEN`, `SANITY_API_PROJECT_ID`, `SANITY_API_DATASET`).

## 1. Get the raw material

If Ita hasn't already pasted an update in this conversation, ask for it. Source is usually a LinkedIn-style draft: hashtags, unicode fake-bold (𝗹𝗶𝗸𝗲 𝘁𝗵𝗶𝘀), emoji, arrow bullets (→).

## 2. Adapt it — never publish LinkedIn formatting as-is

- Strip hashtags entirely (tags/category cover that on the blog).
- Strip unicode fake-bold and emoji; use real Markdown/heading structure instead.
- Convert step-by-step / "here's what changed" arrow-bullet lists into a **flow diagram block** (see §4) rather than a plain list — this is the established recurring visual for step-based content and should stay consistent across posts.
- Keep Ita's actual voice and hooks (the opening line, the closing insight) — don't flatten it into generic corporate copy.
- Keep it short. Nobody reads long posts. Cut anything that doesn't earn its place. A few short paragraphs plus a visual is usually enough.
- Drop meta-commentary about posting cadence (e.g. "52 weeks, X posts a week") — that's LinkedIn audience-building talk, not blog content.

## 3. Hard content rules — check every draft against these before showing it

- **Never name the NGO or any organisation involved**, in any post, ever. If the source material names one, remove it and rephrase around it (e.g. "an NGO that...", "the organisation").
- **Don't over-share internal/sensitive detail.** Focus on the problem being solved and the automation/solution angle — not internals that read as confidential.
- If genuinely unsure whether something is safe to publish, ask Ita rather than guessing.

Full standing context for the recurring NGO series specifically is in Claude's memory (`project_ngo_blog_series` — load it if unsure of a detail like cadence or prior framing).

## 4. Flow diagram visual (for step-by-step content)

A custom Sanity object type `flowDiagram` renders a numbered step list consistently across posts. Use it whenever the update describes a sequence (a pipeline, "before → after", a build's steps). Don't invent a different visual format for this without checking with Ita first — consistency across the series matters to him.

Shape when constructing the body array:
```json
{"_type": "flowDiagram", "_key": "<unique>", "steps": ["Step one text", "Step two text", "..."]}
```
2–8 steps, each a short sentence/phrase (not a full paragraph).

## 5. Pick a category and tags

Existing categories: `NGO`, `Risk Management`, `Product Design`, `Side Projects`. Reuse one when it fits the topic. Propose a new category only if none of these fit, and confirm it with Ita. Suggest 2–4 short tags too (e.g. `["NGO", "Salesforce", "Automation"]`).

## 6. Show the full draft before publishing anything

Present to Ita, in one message:
- Title
- Category + tags
- Proposed slug (`/blog/<slug>`)
- Full body (render headings/paragraphs/flow-diagram steps in readable form, e.g. Markdown blockquote)

Wait for explicit approval (or apply requested edits and re-show) before writing anything to Sanity. Never auto-publish.

## 7. Publish

Once approved, create the post via a one-off Node or Python script that POSTs to the Sanity mutate API:

```
POST https://{SANITY_API_PROJECT_ID}.api.sanity.io/v2024-08-01/data/mutate/{SANITY_API_DATASET}
Authorization: Bearer {SANITY_API_WRITE_TOKEN}
```

Document shape — same pattern as the first two posts (see git history / prior conversation for a working example):
```json
{
  "_type": "post",
  "title": "...",
  "slug": {"_type": "slug", "current": "..."},
  "excerpt": "...",
  "publishedAt": "<ISO 8601, now>",
  "category": "...",
  "tags": ["..."],
  "body": [ /* portable text blocks, each with a unique _key; flowDiagram objects where relevant */ ]
}
```

Portable text blocks need this shape:
```json
{"_type": "block", "_key": "<unique>", "style": "normal", "children": [{"_type": "span", "_key": "<unique>", "text": "...", "marks": []}], "markDefs": []}
```
Use `"style": "h2"` for subheadings. Generate unique `_key` values (e.g. random hex) for every block and span.

## 8. Verify and report back

After publishing, `curl` the live URL (`https://portfolio.itasstudio.com/blog/<slug>`) to confirm it's live (HTTP 200), and check it also appears on `/blog` and `/blog?category=<category>`. Report the live URL back to Ita.
