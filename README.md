# shashintha.dev

Shashintha Edirisooriya's portfolio: one page, with two 3D moments. The **Stack** in the hero shows the stack he works in, and the **Gallery** turns through his Featured projects. Everything a recruiter needs is plain HTML in the first screen.

- **What and why:** [docs/portfolio-spec.md](docs/portfolio-spec.md) (the spec), [docs/adr/0001-astro-and-vanilla-three.md](docs/adr/0001-astro-and-vanilla-three.md) and [GLOSSARY.md](GLOSSARY.md).
- **Built with:** Astro (static) and TypeScript, plain three.js (WebGL), plain CSS, and self-hosted fonts. Hosted on Cloudflare Workers static assets.

## Run it

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run check      # build + unit tests + size budget + browser tests
```

Needs Node 22.12 or later. The browser tests use your installed Chrome locally, and Playwright's Chromium in CI.

## Change the words

Every word on the page, in the 3D labels and on the share image comes from `src/data/`, copied by hand from the Master CV:

| To change… | Edit |
|---|---|
| Name, role, lede, links, the five Fact strip facts, title and description | `src/data/profile.ts` |
| Jobs | `src/data/experience.ts` |
| Featured projects (Gallery order), and the Archive | `src/data/projects.ts` |
| Degrees and skills | `src/data/education.ts` |
| The Stack's parts and links | `src/data/stack.ts` |
| Project screenshots | `src/assets/screens/` (then reference them in `projects.ts` and `SelectedWork.astro`) |
| The CV people download | `public/cv/Shashintha-Edirisooriya-CV.pdf` |

`tests/unit/claim-rules.test.ts` fails the build if a change breaks the claim rules. In particular:
- AI work is described as experimental only
- no numbers except dates and the F1-score of 0.82
- no MCP and no phone number
- no Azure or Docker claim for AXD-Fraud yet

## Checks (all run in CI on every push)

- **Unit tests** (`npm test`): claim rules, data integrity, and the maths for the speed check and the Gallery position.
- **Size budget** (`npm run size`): first-load JS 15 KB, 3D 180 KB, fonts 120 KB and the whole page 1 MB, all gzipped.
- **Browser tests** (`npm run test:e2e`), desktop and phone:
  - the Scan test
  - the no-WebGL fallback
  - pause and reduced motion
  - Gallery controls
  - keyboard
  - axe (zero WCAG 2.2 AA violations)
- **Lighthouse CI:** Performance 90 on mobile and 95 on desktop, Accessibility 100, Best Practices 95, SEO 100.

`?force3d` is a test hook that skips the software-rendering and speed checks, so the 3D path can be tested in headless browsers.

## Deploy

GitHub Actions deploys `main` to Cloudflare Workers once every check passes. It needs these settings in the GitHub repo:

- **Secret** `CLOUDFLARE_API_TOKEN`, from Cloudflare → My Profile → API Tokens → "Edit Cloudflare Workers".
- **Variable** `CLOUDFLARE_ACCOUNT_ID`.
- **Variable** `INDEXABLE`: leave it unset (or `false`) until launch, so the `workers.dev` preview is `noindex`.
- **Variable** `CF_BEACON_TOKEN` (optional): the Cloudflare Web Analytics token.

`npm run deploy` deploys by hand.

### Launch day

1. Buy `shashintha.dev` at Cloudflare Registrar.
2. In `wrangler.jsonc`, uncomment the `shashintha.dev` route and set `"workers_dev": false`.
3. Set the repo variable `INDEXABLE` to `true`, then push to `main`.
4. Replace the old `myportfolio` repo with a one-line redirect to `https://shashintha.dev` and archive it. Delete `myportfolio.github.io`.
5. Check the link preview in LinkedIn's Post Inspector.

The full checklist, including what to confirm before naming Edirisooriya Stores, is in [docs/portfolio-spec.md §12](docs/portfolio-spec.md#12-launch-checklist).

Fonts in `src/assets/fonts/` are used only for the share image. They're under the SIL Open Font Licence (see the OFL files there).
