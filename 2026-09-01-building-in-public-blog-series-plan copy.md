# Building in Public: The Enterprise Risk Register Journey
**24-part blog series plan — one post every two weeks, starting 2026-09-01**

---

## 1. Why this series, and why now

You've already built a lot: a full risk taxonomy engine, an incident-to-risk mapping system, a dashboard, and — as of the last few months — Vendor Risk Management, a Regulatory Obligations Tracker, versioned Risk Appetite governance, Product Risk Assessment, multi-org/admin support, and an RCSA workflow. That's a real GRC platform, not a toy. The series' job is to turn that build history into a story worth following — not a changelog.

### The problem worth writing about

Research into how risk and compliance teams actually work in 2026 converges on one complaint: **fragmentation, not lack of data**.

> "Most organizations don't have a data problem — they have a fragmentation problem and a gap between knowing and doing that no dashboard can close. The risk register lives in one system, the controls testing results are in a spreadsheet someone emailed last month, audit findings are in a completely different tool, cyber risk is managed by the security team on their own platform, and policies are spread across a shared drive." — [Granite GRC](https://granitegrc.com/archive/avoiding-spreadsheet-drift-signals-its-time-for-a-dedicated-grc-platform/)

MetricStream frames the same failure as a boardroom moment: a director asks one question about enterprise exposure, and the GRC officer has to stitch together an answer from five disconnected systems — [Five Systems, One Board Question](https://www.metricstream.com/blog/five-systems-one-board-question-grc.htm). CyberArrow and Symbiant both document "spreadsheet drift" — the same risk register forking into a dozen personal copies with no single source of truth ([CyberArrow](https://www.cyberarrow.io/blog/why-spreadsheet-based-grc-is-destroying-your-compliance-program/), [Symbiant](https://www.symbiant.co.uk/why-spreadsheets-fail-modern-risk-management/)). Fintech.global's 2026 coverage puts a number on it: fragmented ERM doesn't just look messy, it costs firms materially more in duplicated effort and missed correlations across risk categories ([fintech.global](https://fintech.global/2026/05/26/why-fragmented-erm-is-costing-firms-more-than-they-think/)).

That's the hook for this series: **this app exists because "what's our biggest risk right now?" shouldn't require three Slack messages, two spreadsheet exports, and a meeting.** Every post should tie back to that thesis from a different angle — the taxonomy, the incident linking, the dashboard, the audit trail, the export engine.

### How to tell it, not just what to tell

2025–2026 "build in public" content has bifurcated, and it matters which half you're writing:

> "Build in public forked into two versions: the 2019 performance-in-public version is dead; the 2026 workflow-in-public version compounds. Performance content like daily MRR screenshots and milestone theater stopped working, while workflow content started compounding." — [Build in Public: The 2026 Definitive Guide](https://www.buildinpublic.so/blog/build-in-public)

That's the editorial rule for this series: **no milestone theater.** Not "shipped feature X 🎉" — instead, "here's the risk-scoring edge case that broke my assumptions about the 5x5 matrix, and how I fixed it." Show the reasoning, the wrong turns, the schema migration you regretted, the hydration bug, the day you realized incidents needed to map to *multiple* risk categories, not one. That's the content that compounds — other people building GRC, compliance, or internal tools software will bookmark it because it saves them the same mistake.

---

## 2. Recurring post template

Use this skeleton for all 24 posts so the series reads as one voice, not 24 random essays. ~1,000–1,500 words is enough for a biweekly cadence — don't over-invest per post at the cost of missing dates.

1. **Cold open (2–3 sentences)** — a concrete, specific moment: a bug, a Slack question, a board-deck screenshot, a design decision you second-guessed. Not "In this post I will discuss..."
2. **The gap this post closes** — one sentence connecting today's post back to the fragmentation thesis (Section 1). Which disconnected spreadsheet/system is this feature replacing?
3. **The build** — what you actually built, with a screenshot, a code snippet, or a schema diagram. Favor showing the *decision* over the *feature list* (e.g., "why incidents map to risk categories many-to-many, not one-to-one").
4. **What broke / what you got wrong** — required section, even a short one. This is the section readers trust the most and share the most.
5. **Where the tool stands now** — 2–3 sentences, plainly. What can a risk officer do today that they couldn't two weeks ago?
6. **Next up** — one sentence teasing the next post. Creates series pull.
7. **CTA** — subscribe / follow along / reply with your own GRC horror story. Keep it low-key, one line.

---

## 3. The three-act arc (Sept 2026 → Jul 2027)

- **Act I — Foundation (Posts 1–8, Sep–Dec 2026).** Retell the build-to-date: why a fintech risk taxonomy needs 5 categories not 3, the incident↔risk mapping model, the first dashboard, the early bugs. Mostly retrospective — you already lived this between March and August 2026.
- **Act II — Expansion (Posts 9–16, Jan–Apr 2027).** The modules that turned this from "a risk register" into "a GRC platform": Vendor Risk, Regulatory Obligations, Risk Appetite governance, RCSA, Product Risk Assessment, multi-org/admin. Blend of retrospective (already built) and live iteration.
- **Act III — Maturity (Posts 17–24, May–Jul 2027).** Forward-looking: trend/pattern detection, the reporting & export engine, accessibility (WCAG/command palette), a real security review, a pilot rollout with real users, and a closing retrospective on what you'd do differently. This is where the series should feel genuinely "in public" — written close to when the work happens, not reconstructed from memory.

---

## 4. The 24 posts

| # | Publish date | Working title | Core angle |
|---|---|---|---|
| 1 | 2026-09-01 | **Why I'm Building a Risk Register Nobody Asked For** | Open the series with the fragmentation thesis + your own trigger moment (years of quarterly board risk reporting pain in fintech, kept generic — no employer named). State the 12-month arc. |
| 2 | 2026-09-15 | **Designing a Risk Taxonomy That Survives Contact With Reality** | Category → Subcategory → Type structure; why 5 categories (Operational, Financial, People, Technology, Legal/Regulatory) beat a flatter model; admin-configurable + versioned taxonomy decision. |
| 3 | 2026-09-29 | **The Data Model Nobody Warns You About: Risks Aren't Trees, They're Graphs** | Why incidents map to risk categories many-to-many; the schema decisions in Prisma; trade-offs of normalization vs. query simplicity for reporting. |
| 4 | 2026-10-13 | **From Spec to Scaffold: The First 48 Hours** | The `dcc28ae` → `b936633` jump — bootstrapping the full GRC platform shape in one sitting. What you deliberately over-built and under-built on day one, and why. |
| 5 | 2026-10-27 | **Every Incident Tells a Risk Story — If You Force the Link** | Incident reporting module, risk classification fields, and why *mandatory* incident-to-risk linking (not optional tagging) is the difference between a log and an intelligence system. |
| 6 | 2026-11-10 | **The Dashboard Has 30 Seconds to Make Its Case** | Design principle: "senior management should understand the dashboard in under 30 seconds." The exposure chart, what got cut, what stayed. |
| 7 | 2026-11-24 | **The Hydration Bug That Taught Me to Distrust My Own Dialogs** | War story on the nested `<button>` hydration error (`91adcfd`). Root cause, the fix, and the broader lesson about React SSR + shadcn dialog triggers. |
| 8 | 2026-12-08 | **Act I Retrospective: What a Risk Register Actually Needs on Day One** | Close Act I. Recap the MVP, what real usage (even internal) revealed, and preview Act II's shift from "register" to "platform." |
| 9 | 2026-12-22 | **Vendor Risk: The Third-Party Blind Spot Everyone Underestimates** | Why Vendor/Third-Party Risk got its own module instead of living inside Operational Risk; the specific fintech pain (payment processors, KYC vendors). |
| 10 | 2027-01-05 | **Regulatory Obligations Aren't a Checklist, They're a Tracker** | Building the Regulatory Obligations Tracker; the multi-jurisdiction reality (data protection, central bank, and securities regulators across several markets) for a fintech operating across multiple African markets — keep generic, no specific employer or country list named. |
| 11 | 2027-01-19 | **Risk Appetite Shouldn't Be a PDF From 2023** | Formalizing Risk Appetite as a versioned, governed entity — why "appetite" needs history and approval workflows, not a static statement nobody re-reads. |
| 12 | 2027-02-02 | **Product Risk Assessment: Shifting Risk Left Into the SDLC** | Diversifying the Product Risk Assessment seed portfolio across SDLC phases; embedding risk thinking into product development instead of bolting it on after launch. |
| 13 | 2027-02-16 | **One Platform, Many Organizations: The Multi-Tenancy Decision** | Adding multi-org support and admin management — the architectural fork point between "internal tool" and "platform," and what you had to retrofit to get there. |
| 14 | 2027-03-02 | **RCSA: Turning Self-Assessment Into a Real Workflow, Not a Form** | Building the Control Self-Assessment (RCSA) module — why this was the hardest workflow yet, and how it closes the loop between register, controls, and evidence. |
| 15 | 2027-03-16 | **Six Months In: Reading My Own Git History Like a Stranger** | Reflective post — walk your own commit log as if reviewing someone else's PRs. What patterns of mistake repeat? What decisions age well? |
| 16 | 2027-03-30 | **Act II Retrospective: From Register to GRC Platform** | Close Act II. What "consolidated view" actually means once 6+ modules share one taxonomy — and what almost broke under that weight. |
| 17 | 2027-04-13 | **Trend Detection: Making the Register Say Something Before You Ask It To** | Building automated trend/pattern detection and period-over-period comparisons — the line between "dashboard" and "early-warning system." |
| 18 | 2027-04-27 | **The Export Engine: Where Good Data Goes to Die in PowerPoint** | Building the presentation-ready PDF/PPT/Excel export engine — the unglamorous feature that determines whether the tool actually reaches the board. |
| 19 | 2027-05-11 | **Nobody Reads a Dashboard They Can't See: Fixing Contrast and Keyboard Nav** | WCAG contrast fixes and a command palette — accessibility as a first-class risk-management feature, not an afterthought, and why that's ironic for a *risk* tool to have skipped. |
| 20 | 2027-05-25 | **Running My Own Security Review on a Risk Management Tool** | The self-referential exercise of subjecting a security/compliance tool to its own standard — audit trail integrity, access control, and what you'd flag if a client submitted this code. |
| 21 | 2027-06-08 | **What Happens When Real Risk Officers Touch the Tool** | First real (or simulated) user pilot — what usability assumptions broke, what the "30-second dashboard" principle actually held up to. |
| 22 | 2027-06-22 | **The Feature I Almost Built and Didn't** | A deliberately scoped-down post: a module or automation you designed, prototyped, and killed — and the reasoning, since restraint is as instructive as building. |
| 23 | 2027-07-06 | **Twelve Modules Later: What "Consolidated Risk View" Actually Delivers** | Concrete before/after: the board-question scenario from Section 1, answered inside this tool in minutes instead of days. Data/screenshots over claims. |
| 24 | 2027-07-20 | **A Year of Building in Public: What I'd Tell Myself in September 2026** | Series closer. Lessons for other builders tackling internal enterprise tools; what's next for the platform; thank the readers who followed along. |

---

## 5. Craft notes carried across all 24 posts

- **Lead with the specific, not the general.** "Here's the day incident-linking broke my 5-category assumption" beats "risk management is important." The research above ([buildinpublic.so](https://www.buildinpublic.so/blog/build-in-public)) is explicit that *workflow* content — real decisions, real failures — is what compounds in 2026; generic "why risk management matters" content doesn't.
- **Anchor every post to the fragmentation thesis**, even loosely. Readers should finish the series able to say "this tool replaces five disconnected systems with one," because you kept restating it from a new angle each time.
- **Use your own repo as the primary source.** Git history, commit messages, and the implementation-plan `.md` files already in this directory (e.g. `2026-07-13-wcag-contrast-command-palette-implementation-plan.md`, `2026-07-10-rcsa-control-self-assessment-implementation-plan.md`) are ready-made first drafts for the "the build" section of each corresponding post — pull real diffs and real decisions rather than reconstructing from memory.
- **Don't fake "in public" timing for Act III.** Posts 17–24 cover work not yet done as of this plan (Sept 2026) — write those close to when you actually do the work, not backfilled. That's the difference between "in public" and "narrated after the fact."
- **Screenshots earn their place.** You already have several (`Screenshot 2026-03-14...`, `2026-03-22...`, `2026-03-24...`) — use real product screenshots, not stock GRC dashboard images.
- **Every post needs one honest failure.** If a post has nothing that went wrong, either it's too early to publish or you're editing out the interesting part.
- **Never name a current or former employer**, even to credit them as the inspiration for a decision. Keep origin-story framing generic (e.g. "years of fintech board-reporting pain," not a named company or its internal framework). Confirmed 2026-09-01 when drafting Post 1.

---

## 6. Logistics checklist per post

- [ ] Title finalized (working titles above are drafts — sharpen before publishing)
- [ ] Cold open written first, not last
- [ ] At least one screenshot, diagram, or code snippet from the actual repo
- [ ] "What broke" section included
- [ ] Links back to Post 1's fragmentation thesis (or the prior post) for series continuity
- [ ] Meta description / social excerpt written (1–2 sentences, specific claim not vague teaser)
- [ ] Scheduled for the correct biweekly date (table in Section 4)

---

## Sources consulted

- [Build in Public: The 2026 Definitive Guide](https://www.buildinpublic.so/blog/build-in-public)
- [Five Systems, One Board Question: A GRC Officer's Wake-Up Call — MetricStream](https://www.metricstream.com/blog/five-systems-one-board-question-grc.htm)
- [Avoiding spreadsheet drift — Granite GRC](https://granitegrc.com/archive/avoiding-spreadsheet-drift-signals-its-time-for-a-dedicated-grc-platform/)
- [Why spreadsheet-based GRC is destroying your compliance program — CyberArrow](https://www.cyberarrow.io/blog/why-spreadsheet-based-grc-is-destroying-your-compliance-program/)
- [Why Spreadsheet-Based Risk Management Is Failing Modern Organisations — Symbiant](https://www.symbiant.co.uk/why-spreadsheets-fail-modern-risk-management/)
- [Why fragmented ERM is costing firms more than they think — Fintech.global](https://fintech.global/2026/05/26/why-fragmented-erm-is-costing-firms-more-than-they-think/)
