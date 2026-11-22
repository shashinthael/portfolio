# Tech stack

Type: grilling
Status: resolved
Blocked by: 03
Map: [../map.md](../map.md)

## Question

Using the 3D research, which stack is the Portfolio built on? The main contenders are:

- **Astro + three.js**: what Zeylan uses. Islands keep the page light, and it's proven on Cloudflare.
- **Next.js (static export) + React Three Fiber**: closer to the React and TypeScript both tracks ask for, and what Kivorana uses.

Decide:

- the framework, the 3D library and the styling approach
- TypeScript (assumed)
- the test tools (unit tests and an end-to-end or visual check)
- how the project is deployed to Cloudflare Pages

Weigh how well each option serves the Scan test and Proof of skill, and what the code says to a Reader who opens the repo. The decision is hard to reverse, so offer an ADR.

## Answer

Resolved 2026-11-22 with him. He accepted every recommendation. ADR: [docs/adr/0001-astro-and-vanilla-three.md](../../../docs/adr/0001-astro-and-vanilla-three.md).

- **Framework:** Astro (static output), TypeScript.
- **3D:** plain three.js with `WebGLRenderer` (not WebGPU), one small script for each scene, ported from the visual-identity prototype.
  - **Stack** (hero) loads when the page is idle, after the text has appeared.
  - **Gallery** loads when it comes near the viewport (an `IntersectionObserver`).
- **Styling:** plain scoped CSS in Astro components, using CSS custom-property design tokens for the Porcelain palette, type and spacing. No Tailwind.
- **Fonts:** Cormorant Garamond, Inter and JetBrains Mono, self-hosted through Fontsource and subset. They use `font-display: swap`, and the hero serif is preloaded. No Google Fonts requests.
- **Content (graduated from the "content source" fog):** typed data files in the repo for the profile, facts, experience, education, skills and projects, copied from the Master CV by hand. A **claim-rules unit test** fails the build if:
  - AI work is described with "led", "delivered" or "in production"
  - "MCP" appears
  - any number other than the allowed ones appears (the F1-score of 0.82, dates and the visa date)
  - a phone number appears
- **Tests:**
  - **Vitest:** data, claim rules and 3D helper maths.
  - **Playwright**, on desktop and phone sizes:
    - the Scan test (the Fact strip visible in the first viewport)
    - the no-WebGL fallback
    - reduced motion and the Pause control
  - **axe** accessibility check, inside Playwright.
  - **Lighthouse CI**, with budgets set in the performance-budget work.
- **CI/CD:** GitHub Actions builds and runs every test on each push and pull request. On `main`, if the tests pass, it deploys to Cloudflare with Wrangler. The target, Pages or Workers static assets, is decided in [Domain, and what happens to the old portfolio](08-domain-and-old-portfolio.md).
- **Runtime:** Node 22 LTS (Astro needs 22.12 or later), npm.
