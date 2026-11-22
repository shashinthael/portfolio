# Portfolio spec

Label: wayfinder:map

## Destination

A **Portfolio spec** (see `GLOSSARY.md`) at `docs/portfolio-spec.md`: a modern, distinctive 3D portfolio website for Shashintha Edirisooriya, described completely enough that `/implement` can build and deploy it in a later effort without making any more decisions. It covers content and sections, visual identity, the Signature moment and its fallback, tech stack, hosting and domain, contact, the performance and accessibility budget, and the test approach.

## Notes

- **Planning only.** The map produces decisions. The spec is assembled from the resolved tickets once nothing is left to decide. Building the site is a separate effort.
- **Reader:** recruiters and hiring managers for the Full Stack and AI/LLM tracks, UK first, then EU (see `~/Dev/CV/CONTEXT.md`). Kivorana appears as a project, not as a pitch to business clients.
- **Priorities, in order:** the Scan test, then Proof of skill, then the Signature moment. The 3D must never get in the way of a Reader finding the role, stack, right to work and projects.
- **Source of truth:** the Master CV (`~/Dev/CV/deliverables/cv/Shashintha-Edirisooriya-CV.html`) for everything said about him: roles, dates, skills, and how the AI work is worded. A project that isn't on the CV can appear only if its own repo backs every claim about it.
- **Claim rules:** the AI work at Albhadreen is experimental only ("helping the team experiment with", "prototyping"). The F1-score of 0.82 is the only number. No MCP claims. No skill that neither the CV nor the project's repo shows.
- **Settled while charting (2026-11-22):**
  - Built new in `~/Portfolio`. The Bootstrap site in `~/myportfolio` and the August attempts in `~/My projects` (Next.js + Framer Motion, "Command Deck") are retired and not reused.
  - Name: "Shashintha Edirisooriya", matching the CV and LinkedIn.
  - GitHub: `github.com/shashinthael` is the only account. `shashiyaH99` was renamed to it.
  - Contact is a mailto link, LinkedIn and the CV PDF to download, with no form.
  - Projects are shown as **Featured** plus a short **Archive**. AXD-Fraud and Zeylan lead the Featured list, unless the inventory turns up something stronger.
  - No screenshots of Albhadreen work. The private albhadreen proposal repo is excluded.
  - Hosting is Cloudflare (free plan), on Workers static assets (settled in the domain ticket).
  - He'll host the projects around **2026-12-06**, giving them live demo URLs and the republished AXD-Fraud. The spec gives each project a live-link field and doesn't wait for those URLs.
- **Skills for grilling tickets:** grilling + domain-modeling. Use `GLOSSARY.md` terms.
- **Tracker:** local Markdown. Tickets are in `issues/`, each with `Type`, `Status: open | claimed | resolved` and `Blocked by:`. Research findings go in `research/` (this folder isn't a git repo, so there are no research branches).
- **Related history:** `~/Dev/CV/.scratch/job-search/` (the GitHub audit, and the open ticket "Should I build a small AI portfolio project…") and `~/Dev/CV/.scratch/linkedin-profile/`.

## Decisions so far

- [Domain names and Cloudflare Pages limits](issues/02-domain-and-hosting-facts.md): all five shortlisted names are free (edirisooriya.com is taken); .dev is about $8 for the first year then $12, and .co.uk about $5; hosting allows 25 MiB per file and 20,000 files on the free plan; Cloudflare now recommends Workers static assets over Pages for new projects.
- [3D on the web in late 2026: options, cost and fallbacks](issues/03-3d-on-the-web.md): vanilla three.js is about 131 KB gzip against about 312 KB for R3F with React; WebGPU reaches about 89% of users against about 97% for WebGL 2, and three.js's WebGPU renderer (with automatic WebGL 2 fallback) is still labelled experimental; a canvas can't be the LCP element, so HTML-first text plus a lazy-loaded scene keeps the Scan test safe; Astro has built-in load-when-visible islands, while Next.js has none and Pages takes only its static export.
- [Project inventory: what each project actually is](issues/01-project-inventory.md): four Featured candidates (AXD-Fraud, Zeylan, Edirisooriya Stores, Kivorana); the Archive repos are thin or empty publicly; three of the four are private; Docker and Azure for AXD-Fraud and the Market Price Forecasting code are unconfirmed.
- [Visual identity](issues/04-visual-identity.md): Maison in the Porcelain tone, a luxury editorial look on clean white with muted gold, Cormorant Garamond with Inter, the 3D on the right of the hero, one theme only.
- [Content and structure: what a Reader sees, in what order](issues/05-content-and-structure.md): one page; a five-fact Fact strip (with Education) in the first screen; Experience → Featured (AXD-Fraud, Edirisooriya Stores, Zeylan, Kivorana) → Archive if non-empty → Education → Skills → Contact; CV wording word for word, project copy rewritten in plain web language; no phone number.
- [Tech stack](issues/06-tech-stack.md): static Astro and TypeScript with plain three.js (WebGL), each scene loaded after the text; scoped CSS tokens; self-hosted fonts; typed content files guarded by a claim-rules test; Vitest, Playwright, axe and Lighthouse CI; GitHub Actions deploys with Wrangler (ADR 0001).
- [The Signature moment](issues/07-signature-moment.md): Stack in the hero (ten CV nodes with pulses and hover, fading as you scroll) and the Gallery for Featured projects (scroll-pinned on desktop, swipe on phones, with HTML write-ups); an SVG diagram and cards with no WebGL, still or snapping motion when reduced, and a Pause button.
- [Domain, and what happens to the old portfolio](issues/08-domain-and-old-portfolio.md): `shashintha.dev` from Cloudflare Registrar, on Workers static assets (`workers.dev` preview until launch, then switched off); public repo `shashinthael/portfolio`; the old `myportfolio` becomes a redirect and is archived, `myportfolio.github.io` is deleted; Gmail stays the contact address.
- [Performance and accessibility budget](issues/09-performance-and-accessibility-budget.md): LCP ≤ 2.0 s, INP ≤ 200 ms, CLS ≤ 0.05; Lighthouse 90/95 with Accessibility 100; 15 KB first-load JS, 3D ≤ 180 KB loaded after the text; falls back with no WebGL, software rendering, < 30 fps or Save-Data; text gold `#765b35` and grey `#5e5e5e` for AA; WCAG 2.2 AA with zero axe violations, all enforced in CI.
- [SEO, sharing and analytics](issues/10-seo-sharing-and-analytics.md): a 55-character title and a claim-safe description; a 1200 × 630 share image drawn at build time; JSON-LD `Person`, canonical URL, sitemap, and noindex on the preview; Cloudflare Web Analytics, with no cookies.

**Destination reached (2026-11-22):** [Portfolio spec](../../docs/portfolio-spec.md), assembled from the ten resolved tickets above. Next effort: build it (for example with `/implement`), starting from the spec's launch checklist.

## Not yet specified

_Nothing left. Every question was ticketed and resolved._

## Out of scope

- A domain email address (for example `hello@shashintha.dev`). Gmail stays for now.
- A blog. An empty blog reads worse than none, and posting is a separate effort.
- A contact form. He already built a Turnstile form for Zeylan, so it doesn't prove anything new.
- The Camera and Commerce worlds from the August "Command Deck": DeployedTech videos, photography and dropshipping. They aren't relevant to the Reader.
- Screenshots of the Albhadreen platform, and the private albhadreen proposal repo. Both are confidential to his employer.
- Building and deploying the Portfolio. That's the next effort, built from the spec.
- Adding Edirisooriya Stores (or other repos) to the Master CV. That's a separate CV effort.
- Separate case-study pages for each project. The first version is one page with in-page write-ups, settled in [Content and structure](issues/05-content-and-structure.md).
- Degree certificates, transcripts and university logos on the site.
