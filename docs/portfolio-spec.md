# Portfolio spec: shashintha.dev

This spec describes the whole Portfolio: what it says, how it looks and moves, what it's built with, and how it's tested and shipped. Every decision here was made with Shashintha on 2026-11-22. Each section links to the ticket that holds the reasoning. Terms in **bold capitals** (Reader, Scan test, Fact strip, Featured, Archive, Signature moment, Proof of skill, Claim rules, Master CV) are defined in [GLOSSARY.md](../GLOSSARY.md).

Map: [.scratch/portfolio/map.md](../.scratch/portfolio/map.md) · ADR: [0001 Astro and plain three.js](adr/0001-astro-and-vanilla-three.md)

---

## 1. Goal and priorities

A one-page portfolio for recruiters and hiring managers (the **Reader**) screening for **Full Stack** and **AI/LLM application** roles in the UK first, then the EU.

Priorities, in this order:

1. **Scan test.** Within 10 seconds, on a phone or a desktop, the Reader sees the current role, stack, right to work, education and projects.
2. **Proof of skill.** The site itself shows engineering quality: speed, accessibility, tests and graceful fallbacks.
3. **Signature moment.** Two memorable 3D scenes that never get in the way of 1.

## 2. Truth rules (apply to every word, including the 3D labels)

- **Source:** the **Master CV** (`~/Dev/CV/deliverables/cv/Shashintha-Edirisooriya-CV.html`) is the only source for anything about him. A project that isn't on the CV (Edirisooriya Stores) may be described only from its own repo.
- **AI work** at Albhadreen is experimental only: "helping the team experiment with", "prototyping". Never "led", "delivered" or "in production".
- **Numbers:** the only metric is the dissertation's **F1-score of 0.82**. Dates, the visa date, and the CV's "three developers" and "eight-person" team size are allowed.
- **Banned:** no "MCP", no skill the CV (or the project's repo) doesn't show, and no phone number anywhere on the site.
- **AXD-Fraud:** say "Flask API and React dashboard". **Don't** claim Azure or Docker deployment until he confirms where that version lives.
- **Market Price Forecasting:** text only, with no link, until its code is found.
- **Kivorana's chat:** describe it as a *scripted demo*.

These rules are enforced by the claim-rules test (§10).

## 3. Page structure (one page)

Settled in [Content and structure](../.scratch/portfolio/issues/05-content-and-structure.md).

```
Top bar (fixed): Work · Experience   [S·E monogram]   Contact · CV
1. Hero              name, role, lede, CTAs  |  Stack 3D (right)
2. Fact strip        Now · Stack · Based · Right to work · Education
3. Experience        Albhadreen, Innovio
4. Selected work     Gallery 3D (pinned) + HTML write-ups: AXD-Fraud, Edirisooriya Stores, Zeylan, Kivorana
5. Archive           only if non-empty (see §5)
6. Education         MSc, BSc
7. Skills            six CV groups
8. Contact sign-off  "Let's build something." + Email me
Footer               LinkedIn · GitHub · CV PDF · analytics note
```

There are no separate case-study pages, no blog, no contact form, no phone number, no university logos and no certificates.

## 4. Copy

### Hero
- **Eyebrow:** FULL STACK DEVELOPER · AI & LLM APPLICATIONS
- **Name:** "Shashintha" / *"Edirisooriya"*. The surname is italic, gold and indented.
- **Lede:** "I build .NET microservices, React front ends and the pipelines that ship them to Azure, and I'm helping my team experiment with agentic AI."
- **CTAs:** **Download CV** (solid button, links to the CV PDF) and **Get in touch** (underlined link to the contact section).
- **Phone-only line** under the name: "Albhadreen · London · UK right to work to Nov 2028 · MSc, BSc First Class".

### Fact strip
| Label | Value |
|---|---|
| Now | Intermediate Full Stack Developer, Albhadreen |
| Stack | C#, .NET, React, TypeScript, Python, Azure |
| Based | London · hybrid, remote or relocation |
| Right to work | UK Graduate visa, valid to Nov 2028 |
| Education | MSc Software Engineering (Merit) · BSc First Class |

### Experience (copied word for word from the CV)

**Intermediate Full Stack Developer**, Albhadreen (Pvt) Ltd, Sri Lanka · remote from London · Aug 2025 – Present
*Part-time while completing my MSc, full-time from May 2026.*
- Build and maintain .NET microservices and REST APIs for the company's overseas recruitment platform, as one of three developers in an eight-person Scrum team.
- Develop the React and TypeScript front end.
- Set up the GitHub Actions pipelines that build, test and deploy every service to Azure in Docker containers.
- Write unit tests with xUnit and pytest, review pull requests, and monitor services with Application Insights.
- Help the team experiment with agentic AI workflows on Azure OpenAI and Azure AI Foundry to automate manual recruitment processes.
- Use Claude Code day to day for development work.

Stack: C#, .NET, React, TypeScript, SQL Server, Python, Azure (OpenAI, AI Foundry), Docker, GitHub Actions, Application Insights

**Junior Full Stack Developer**, Innovio IT Solutions, Colombo, Sri Lanka · Jun 2024 – Jan 2025
- Built front-end features in React for a commercial point-of-sale system.
- Developed Node.js REST endpoints and the SQL queries behind them.
- Wrote automated tests and reviewed pull requests.
- Shipped through Azure DevOps pipelines as part of a Scrum team.

Stack: React, Node.js, SQL, Docker, Azure DevOps, Application Insights

No screenshots of Albhadreen work.

### Featured projects (Gallery order; one HTML write-up each)

| # | Title | Kind label | Write-up | Stack line | Links |
|---|---|---|---|---|---|
| 01 | AXD-Fraud | MSc dissertation · 2026 | "My MSc dissertation. A neural network spots fraudulent card transactions, SHAP explains each prediction, and a drift detector I wrote from scratch flags when the model starts to degrade." / "The best model reached an F1-score of 0.82, evaluated without data leakage." | Python · TensorFlow · SHAP · Flask · React | GitHub (`shashinthael/Fraud-Detection-`); live demo only once hosted |
| 02 | Edirisooriya Stores | Shop system · 2026 | "A shop system for a retail and wholesale shop: a counter POS with billing, credit customers and stock, an iPhone app for the owner, and a cloud copy." / "The business rules are plain TypeScript with their own tests, and the cloud security rules are tested too." | Electron · React · TypeScript · SQLite · Supabase | Screenshots (demo mode only); repo stays private |
| 03 | Zeylan | Personal project · 2026 | "A trip planner for Sri Lanka holidays. Visitors choose who's travelling, how long and a comfort level, then see a price estimate and the best route on a 3D island." / "Enquiries are spam-checked, stored and emailed, and every change is tested and deployed by CI." | TypeScript · Astro · three.js · Cloudflare Workers · D1 | Live site (`zeylan.zeylan-travel.workers.dev`), GitHub once public |
| 04 | Kivorana | My web studio · 2026 | "The site for my own web studio for local businesses. Every price on every page is calculated from one config file." / "It includes a scripted demo of the AI assistant I offer to cafés and B&Bs." | Next.js · TypeScript · Cloudflare Pages | Live site (`kivorana.pages.dev`) |

**Edirisooriya Stores:** name the shop or its town (Tissamaharama Market) **only with the shop owner's OK**, and say "in use" only if it's true at launch. Without that OK, use the wording above, which names neither.

No "coming soon" labels. Add a live link only once it works.

### Archive
Physio Clinic booking system (Java, JUnit) and the Android chat app (Java, Firebase), one line each, **only once their code is public with a README**. Until then the section is left out. DashboardnewUi, company_portfolio and B-132 never appear.

### Education
**MSc Software Engineering** <span>MERIT</span>. University of Hertfordshire · Jan 2025 – May 2026
- Modules included software quality and validation, design patterns, and agile development.
- Dissertation: AXD-Fraud, fraud detection with neural networks (links to the AXD-Fraud write-up).

**BSc (Hons) Software Engineering** <span>FIRST CLASS</span>. University of Wolverhampton · 2021 – 2024
- Final-year project: Market Price Forecasting Platform (text only, per §2).

Grades appear as small gold uppercase labels.

### Skills (copied word for word from the CV, six groups)
- **AI & ML:** Agentic workflows, Azure OpenAI, Azure AI Foundry, Claude Code, TensorFlow, LSTM, SHAP, pandas, NumPy
- **Software Development:** C#, .NET, Python, Node.js, REST APIs, Microservices, FastAPI, Flask
- **Frontend:** React, Next.js, TypeScript, JavaScript, HTML, CSS, Astro, three.js
- **Cloud & DevOps:** Azure, Amazon Web Services (AWS), Docker, CI/CD, GitHub Actions, Azure DevOps, Application Insights
- **Data:** SQL Server, PostgreSQL, MongoDB
- **Testing & Practices:** xUnit, pytest, Code review, Git, Agile / Scrum

### Contact and footer
- **Sign-off:** "Let's build something." with an **Email me** button (mailto to shashinthael@gmail.com).
- **Footer links:** LinkedIn (`linkedin.com/in/shashinthael`), GitHub (`github.com/shashinthael`), CV PDF.
- **Footer note:** "No cookies. Simple visit counts by Cloudflare Web Analytics."

## 5. Visual identity: Maison · Porcelain

Settled in [Visual identity](../.scratch/portfolio/issues/04-visual-identity.md), with contrast refined in [Performance and accessibility budget](../.scratch/portfolio/issues/09-performance-and-accessibility-budget.md). Reference rendering: [prototypes/signature-moment/index.html](../prototypes/signature-moment/index.html), which is throwaway: rewrite it properly, don't copy it.

**Colour tokens**
| Token | Value | Use |
|---|---|---|
| `--bg` | `radial-gradient(1100px 800px at 72% 30%, #ffffff 0%, #f3f3f1 55%, #e6e6e3 100%)`, fixed | page |
| `--ink` | `#121212` | headings, body emphasis |
| `--lede` | `#434343` | body text |
| `--muted` | `#5e5e5e` | secondary text (AA on every background) |
| `--gold-text` | `#765b35` | small gold text: eyebrows, labels, grades, numerals |
| `--gold` | `#8a6d43` | large text only (the italic surname, big numerals) and the button background (white text) |
| `--rule` | `#d9d9d6` | hairlines |
| `--line` | `#b8b8b4` | underlines, Stack links |
| `--panel` | `rgba(255,255,255,.62)` | Fact strip and card backgrounds |
| 3D metal / pulses / panel face | `#e3cfa8` / `#9c8257` / `#f6f4ef` | scenes |

**Type** (self-hosted through Fontsource, subset, `font-display: swap`; only the hero serif is preloaded)
- **Cormorant Garamond 300/400, and italic:** name (clamp 52–116 px, line-height .9), section titles (60 px), project and degree titles, Fact strip values (19 px).
- **Inter 300–600:** body (15–16.5 px, line-height 1.75) and the uppercase labels (10.5 px, letter-spacing 2.4 px).
- **JetBrains Mono 400:** stack lines and captions (11–12 px).

**Layout**
- The page has 48 px side padding (20 px on phones).
- The hero is about 78vh tall, so the Fact strip shows in the first desktop screen. It's a two-column grid: text on the left, Stack on the right.
- The Fact strip has five columns (two on phones, with the last spanning both).
- Sections open with a gold numeral (01, 02…) and a serif title.
- Rows are separated by hairline rules.
- Text fades up when revealed, unless reduced motion is set.
- One theme only, with no dark mode.

## 6. Signature moment: two 3D scenes

Settled in [The Signature moment](../.scratch/portfolio/issues/07-signature-moment.md).

**Shared rules:**
- Each scene has its own `<canvas aria-hidden="true">` and renders only while on screen.
- Each stops rendering when still and is disposed when a fallback takes over.
- All its text comes from the same typed data as the HTML.

### 6.1 Stack (hero)

Caption: "The stack I work in at Albhadreen". Positions are in scene units, with .NET at the centre.

| id | Label (phone label) | Position |
|---|---|---|
| fe | React · TypeScript (React · TS) | −1.8, 1.2, 0.3 |
| api | REST APIs (REST) | −1.1, −0.35, 0.9 |
| **net** | **.NET microservices (.NET)**, the large node | 0, 0.35, 0 |
| sql | SQL Server (SQL) | 1.5, −1.1, 0.4 |
| az | Azure | 1.7, 1.05, −0.4 |
| ai | Azure OpenAI · AI Foundry (experimental) (Azure OpenAI (exp.)) | 0.2, 1.95, −0.9 |
| gha | GitHub Actions (Actions) | −0.5, −1.55, −0.6 |
| dock | Docker | 0.6, −1.95, 0.9 |
| ins | App Insights (Insights) | 1.75, −0.2, 1.1 |
| test | xUnit · pytest (Tests) | −1.9, −1.2, −0.2 |

**Links:** fe–api, api–net, net–sql, net–az, net–ai, gha–dock, dock–az, az–ins, ins–net, gha–net, test–gha, test–net.

**Look:** champagne-metal spheres; curved hairline links; gold pulse dots travelling along each link.

**Motion:**
- A slow sway, plus a tilt that follows the pointer.
- **Hover** a node to highlight its links and neighbours in gold and fade the rest.
- As the hero scrolls away, the Stack drifts up and fades: this is the handover to Selected work.
- **Pause motion:** a button, always visible.

### 6.2 Gallery (Selected work)

**Panels:** four rounded panels on a ring, in the §4 order. Each shows the kind and year, the title in Cormorant, a gold rule, the stack in mono, and a 01–04 number. The front panel is opaque and the side panels fade back.

**Desktop:**
- The section is about 4 viewports tall with a sticky viewer. Each scroll step brings the next panel forward.
- The HTML write-up on the left crossfades and is announced with `aria-live="polite"`.
- A 01/04 counter and **Prev/Next** buttons sit beside it. ←/→ work while the Gallery is focused, and clicking a panel brings it forward.

**Phone:** no pinning. Swipe the ring or tap Prev/Next. The canvas sits above the write-up.

### 6.3 Fallbacks

| Condition | Stack | Gallery |
|---|---|---|
| No WebGL 2, or software rendering (`failIfMajorPerformanceCaveat: true`) | Still SVG diagram from the same node and link data | Four HTML cards with screenshots |
| Median fps < 30 over the Stack's first 2 s (remembered in `sessionStorage`) | as above | as above |
| `navigator.connection.saveData` on | as above | as above |
| `prefers-reduced-motion` | One still frame | Snaps to the chosen panel, with no turning |

Other rules: pixel ratio is capped at 2 (1.5 on phones), and scenes pause when the tab is hidden.

## 7. Tech stack

Settled in [Tech stack](../.scratch/portfolio/issues/06-tech-stack.md) and [ADR 0001](adr/0001-astro-and-vanilla-three.md).

- **Framework:** Astro (static output) and TypeScript, on Node 22 LTS (Astro needs 22.12 or later), with npm.
- **3D:** three.js `WebGLRenderer`, not WebGPU. Each scene is a module loaded with dynamic `import()`.
  - **Desktop:** the Stack loads on `requestIdleCallback` after the page loads.
  - **Phones** (≤ 760 px or a coarse pointer): it loads on the first touch, scroll or key press, showing the identical still diagram until then. This was added during the build, after Lighthouse mobile measured 2.4 s of blocking time when three.js loaded on idle on a throttled CPU. With the change, both mobile and desktop score 100.
  - **Gallery:** loads through an `IntersectionObserver` with a root margin of about one viewport.
- **Styling:** plain scoped CSS in Astro components, using the §5 tokens as custom properties. No Tailwind.
- **Content:** typed data files are the single source for the HTML, the 3D labels, the share image and the JSON-LD. They're copied from the Master CV by hand.

Suggested layout (guidance, not a contract):

```
src/
  data/        profile.ts  facts.ts  experience.ts  projects.ts  education.ts  skills.ts  stack.ts (nodes + links)
  components/  TopBar  Hero  FactStrip  Experience  SelectedWork  ProjectWriteup  Archive  Education  Skills  Contact  Footer  (.astro)
  scenes/      capability.ts (WebGL/fps/save-data checks)  stack.ts  gallery.ts  stackSvg.ts (fallback)  shared.ts
  pages/       index.astro  og.png.ts (share image)
  styles/      tokens.css  global.css
public/        cv/Shashintha-Edirisooriya-CV.pdf  favicon.svg  apple-touch-icon.png  robots.txt  screenshots/*.avif|webp
tests/         unit/ (vitest)  e2e/ (playwright)
wrangler.jsonc  lighthouserc.json  .size-limit.json  .github/workflows/ci.yml
```

## 8. Performance and accessibility budget

Settled in [Performance and accessibility budget](../.scratch/portfolio/issues/09-performance-and-accessibility-budget.md).

- **Core Web Vitals** (Lighthouse mobile): LCP ≤ 2.0 s, INP ≤ 200 ms, CLS ≤ 0.05.
- **Lighthouse floors:** Performance 90 (mobile) / 95 (desktop), Accessibility 100, Best Practices 95, SEO 100.
- **Size budgets (gzipped):**

  | What | Limit | Notes |
  |---|---|---|
  | HTML + CSS | ≤ 50 KB | |
  | First-load JS | ≤ 15 KB | |
  | Fonts | ≤ 120 KB | preloaded hero serif ≤ 40 KB |
  | three.js + both scenes | ≤ 180 KB | after first paint |
  | Each screenshot | ≤ 150 KB | AVIF or WebP, `srcset`, lazy |
  | Whole page, scrolled to the end | ≤ 1 MB | |

  The Cloudflare analytics beacon isn't counted.
- **Accessibility:** WCAG 2.2 AA, with zero axe violations.
  - skip link
  - visible gold focus outline
  - logical tab order
  - real buttons for every control
  - canvases `aria-hidden`, with HTML equivalents
  - `aria-live` write-ups
  - Pause motion
  - targets at least 24 × 24 px
  - usable at 200% zoom
  - all §5 text colours pass AA on every background

## 9. SEO and sharing

Settled in [SEO, sharing and analytics](../.scratch/portfolio/issues/10-seo-sharing-and-analytics.md).

- **Title:** "Shashintha Edirisooriya · Full Stack Developer · London".
- **Description:** "Full stack developer in London working across .NET microservices, React and Azure, and helping my team experiment with agentic AI. UK right to work. Projects, experience and CV."
- **Language:** `lang="en-GB"`.
- **Share image:** `og:image` / `twitter:image` (`summary_large_image`), a 1200 × 630 PNG drawn at build time with resvg (see Zeylan's `src/pages/og/[slug].png.ts`). It shows a Porcelain background, the name with the italic gold surname, "Full Stack Developer · AI & LLM Applications", a gold rule, the still Stack diagram and "shashintha.dev".
- **JSON-LD `Person`:** name, jobTitle "Full Stack Developer", worksFor Albhadreen, alumniOf both universities, address London, url, and sameAs LinkedIn and GitHub. No phone and no email.
- **Indexing:** canonical `https://shashintha.dev/`, `@astrojs/sitemap`, and a `robots.txt` that allows everything and points to the sitemap. The preview address sends `X-Robots-Tag: noindex`.
- **Icons:** an SVG "S·E" monogram favicon and an `apple-touch-icon`.
- **Analytics:** Cloudflare Web Analytics, deferred and cookieless.

## 10. Tests and CI

- **Vitest:**
  - **Claim rules:** scan every string in `src/data/` and fail on:
    - "led", "delivered" or "in production" in any AI-related entry
    - "MCP"
    - any digit sequence that isn't a date, a year, "0.82", "F1" or the visa date
    - anything shaped like a phone number
  - **Data integrity:** every Stack link points to an existing node, and there are exactly 4 Featured projects.
  - **3D helpers:** the maths for the fps-median check and the ring-angle index.
- **Playwright** (desktop 1440 × 900 and phone 390 × 844):
  - the **Scan test** (all five Fact strip values, the name and the CV link are visible without scrolling on desktop, and the phone line on phone)
  - the Gallery advances with scroll, buttons and keys
  - with SwiftShader or WebGL disabled, the fallbacks appear
  - with `reducedMotion: 'reduce'`, the Stack is still
  - a keyboard-only walk through the page
  - an **axe** scan with zero violations
- **Lighthouse CI:** mobile and desktop, against the §8 floors.
- **Size check:** against the §8 budgets.
- **GitHub Actions:**
  - on every push and pull request: install, build, then run all of the above
  - on `main`, once everything is green: deploy with Wrangler

## 11. Hosting, domain and repo

Settled in [Domain, and what happens to the old portfolio](../.scratch/portfolio/issues/08-domain-and-old-portfolio.md).

- **Repo:** `github.com/shashinthael/portfolio`, public from day one. The Cloudflare API token lives only in GitHub Actions secrets.
- **Hosting:** Cloudflare Workers static assets (Astro `dist/`, no adapter), on the free plan.
- **Before launch:** deploys go to the `*.workers.dev` preview, with `noindex`.
- **Domain:** `shashintha.dev`, bought at Cloudflare Registrar in his existing account (about $8 for the first year, then $12). `.dev` is HTTPS-only.
- **At launch:** attach `shashintha.dev` as the custom domain and set `workers_dev = false`.

## 12. Launch checklist

**Before launch (his actions):**
- [ ] Buy `shashintha.dev` at Cloudflare Registrar.
- [ ] Create the `portfolio` repo, and add `CLOUDFLARE_API_TOKEN` and the account ID to GitHub Actions.
- [ ] Get the shop owner's OK to name Edirisooriya Stores and its town (otherwise keep the anonymous wording).
- [ ] Remove the personal email from Zeylan's README, then make the `zeylan` repo public.
- [ ] Take Edirisooriya Stores screenshots from demo mode only (`ES_DEMO=1`, or the owner app's `?sample`).
- [ ] Confirm where the Docker/Azure AXD-Fraud version and the Market Price Forecasting code live. Until then §2 applies.
- [ ] Optional: publish the Physio Clinic and chat app code with READMEs to turn the Archive on.
- [ ] Export the current Master CV to `public/cv/Shashintha-Edirisooriya-CV.pdf`.

**At launch:**
- [ ] Attach the custom domain and switch off `workers.dev`. Check that the HSTS/HTTPS redirect works.
- [ ] Replace `myportfolio` with a single `index.html` that meta-refreshes to `https://shashintha.dev` (with a canonical link), then archive the repo.
- [ ] Delete `myportfolio.github.io`. Leave `company_portfolio` private and untouched.
- [ ] Check the share preview in LinkedIn's Post Inspector.

**After launch (CV effort):**
- [ ] Add `shashintha.dev` to the Master CV header, the LinkedIn contact info and Featured section, the GitHub profile's website field, and the cover-letter template.
- [ ] Add AXD-Fraud's live link once the hosting planned for about 2026-12-06 is up.

## 13. Out of scope

- a blog
- a contact form
- separate case-study pages
- a dark mode
- a domain email address
- the Camera and Commerce worlds from the August "Command Deck"
- Albhadreen screenshots, and the albhadreen proposal repo
- certificates, transcripts and university logos
- adding new projects to the Master CV
