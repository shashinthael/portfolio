# Performance and accessibility budget

Type: grilling
Status: resolved
Blocked by: 07
Map: [../map.md](../map.md)

## Question

Using the stack decided in [Tech stack](06-tech-stack.md) and the 3D settled in [The Signature moment](07-signature-moment.md), set the numbers the build must meet and the tests that enforce them:

1. **Core Web Vitals targets.** LCP, INP and CLS on a mid-range phone over 4G, and the Lighthouse scores CI fails below.
2. **Weight budgets.** The JavaScript, font, 3D-asset and image size limits for the first load and for the whole page (gzipped).
3. **When the 3D falls back.** The no-WebGL check, the software-rendering check (`failIfMajorPerformanceCaveat`), a frame-rate floor, `prefers-reduced-motion`, and what each fallback shows.
4. **Accessibility bar.** WCAG 2.2 AA, axe with zero violations, keyboard order, a skip link, the Pause control, and contrast for the gold on white.

## Answer

Resolved 2026-11-22 with him. He accepted every recommendation.

**1. Core Web Vitals (Lighthouse mobile, a mid-range phone on 4G):**
- LCP ≤ 2.0 s
- INP ≤ 200 ms
- CLS ≤ 0.05

Lighthouse CI fails below Performance 90 (mobile) or 95 (desktop), Accessibility 100, Best Practices 95, or SEO 100.

**2. Size budgets (gzipped), enforced by a size check in CI:**

| What | Limit | Notes |
|---|---|---|
| HTML + CSS | ≤ 50 KB | |
| First-load JavaScript | ≤ 15 KB | page controls only |
| Fonts | ≤ 120 KB in total | subset WOFF2; only the hero serif (≤ 40 KB) is preloaded |
| three.js + both scenes | ≤ 180 KB | never on first paint; Stack loads when the page is idle, Gallery when it's near view |
| Each screenshot | ≤ 150 KB | AVIF or WebP, responsive `srcset`, lazy-loaded |
| Whole page, scrolled to the end | ≤ 1 MB | |

**3. When the 3D falls back** (Stack becomes the SVG diagram, Gallery becomes HTML cards):
- WebGL 2 isn't available.
- The browser is rendering in software (`failIfMajorPerformanceCaveat: true`).
- The median frame rate over the Stack's first 2 s is below 30 fps. The fallback is then remembered for the session (`sessionStorage`).
- `navigator.connection.saveData` is on, where supported.

Other rules:
- **Reduced motion** keeps the 3D but still: one Stack frame, and the Gallery snaps.
- The pixel ratio is capped at 2 (1.5 on phones).
- Rendering stops when a scene is off screen or the tab is hidden.
- Scenes are disposed when a fallback takes over.

**4. Contrast fix** (refines [Visual identity](04-visual-identity.md)). The Porcelain edge colour `#e6e6e3` made small text fail AA.
- **Text gold** becomes **`#765b35`**: 6.33:1 on white, 5.06:1 on the edge.
- **Secondary grey** becomes **`#5e5e5e`**: 6.48:1 and 5.19:1.
- `#8a6d43` stays for **large** text only (the italic surname and numerals, ≥ 3:1) and the **button background** (white text on it is 4.83:1).
- Hairlines and decorative rings are exempt.

**5. Accessibility bar:** WCAG 2.2 AA, with zero axe violations.
- **Navigation:** a skip link, a visible gold focus outline, and a logical tab order.
- **Gallery controls:** Prev/Next are real buttons, and ←/→ work while the Gallery is focused.
- **Screen readers:**
  - canvases are `aria-hidden`, with the same content in HTML
  - write-up changes are announced with `aria-live="polite"`
- **Motion:** Pause motion is always available.
- **Touch and zoom:** touch targets are at least 24 × 24 px, and the page is usable at 200% zoom.

**6. Enforcement on every pull request:**
- Lighthouse CI (mobile and desktop) and the size check.
- Playwright:
  - with software rendering (SwiftShader), the fallback must appear
  - reduced motion gives a still Stack
  - a keyboard-only walk through the page
  - the Scan test on phone and desktop
- axe.
