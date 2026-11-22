# 3D on the web in late 2026: options, cost and fallbacks

Type: research
Status: resolved
Blocked by: none
Map: [../map.md](../map.md)

## Question

The Portfolio needs a Signature moment in 3D that never gets in the way of the Scan test, especially on phones. What do the stack and prototype decisions need to know? Use primary sources (official docs, release notes, the web.dev and MDN pages) from 2025–2026.

1. **Libraries:** the current state of three.js, React Three Fiber (and drei), and any serious alternatives (Threlte, Babylon.js, Spline exports, plain WebGPU). For each: maintenance status, typical gzipped bundle size for a small scene, and fit with Astro islands versus Next.js.
2. **WebGPU versus WebGL:** browser support as of late 2026, including Safari on iOS, and whether three.js's WebGPU renderer is production-ready, with a WebGL fallback.
3. **Performance practice:** loading 3D only when it's on screen or idle, keeping it off the main thread (OffscreenCanvas, workers), asset compression (Draco, Meshopt, KTX2), and the effect on Core Web Vitals (LCP, INP, CLS). Quote current Core Web Vitals thresholds.
4. **Fallbacks and accessibility:** detecting no WebGL or a weak device, respecting `prefers-reduced-motion`, keeping text out of the canvas so it's readable and indexable, and keyboard and screen-reader behaviour around a canvas.
5. **Reference points:** 3–5 portfolio sites that are widely cited (for example, Awwwards winners) and use 3D without hurting load speed. Note what each does in one line, and observations only: they're for inspiration, not for copying.

Write findings, with sources and dates, to `research/3d-on-the-web.md`, and summarise them in an `## Answer` section on this ticket.

## Answer

Full findings, sources and access dates are in [research/3d-on-the-web.md](../research/3d-on-the-web.md). Researched 2026-11-22.

- **Libraries.** three.js is active: r187 came out on 2026-10-30, with a release every 1–3 months.
  - R3F 9.8 (React 19) is stable. v10, which puts WebGPU first, is still in alpha. Threlte 8 and Babylon 9 are active too.
  - OGL hasn't had a release since January 2025. `@react-three/offscreen` hasn't had one since 2023.
- **Measured gzip size for a small scene:**

  | Library | gzip |
  |---|---|
  | vanilla three.js | about 131 KB |
  | three.js with the WebGPU renderer | about 220 KB |
  | R3F with React | about 312 KB |
  | Threlte with Svelte | about 219 KB |
  | Babylon | about 266 KB |
  | Spline runtime | about 1,072 KB |

  R3F and Threlte pull in the whole of three.js, so tree-shaking doesn't help them.
- **WebGPU.**
  - It works in Chrome and Edge, Chrome Android 121+, Safari 26 (iOS 26 and macOS Tahoe) and Firefox 141+ on Windows.
  - It doesn't work in Firefox Android, on Linux and Intel-Mac Firefox, or on iPhones that haven't updated to iOS 26.
  - It reaches about 89% of users, against about 97% for WebGL 2. MDN still marks it "Limited availability", not Baseline.
  - three.js `WebGPURenderer` falls back to WebGL 2 on its own, but its manual still calls it "experimental". `WebGLRenderer` is still the recommended choice for plain WebGL 2.
- **Core Web Vitals.** Good is LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1, measured at the 75th percentile.
  - A `<canvas>` can't be the LCP element, so HTML hero text sets LCP.
  - The 3D's real risks are main-thread work (INP) and unreserved space (CLS). Lazy loading, shader pre-compiling with `compileAsync`, on-demand rendering and a container with a fixed aspect ratio deal with them.
- **Assets.** glTF-Transform's `optimize` defaults to Meshopt compression and a 2048 px texture limit.
  - Decoder sizes (gzip): Meshopt 7 KB, Draco about 97 KB, KTX2/Basis about 252 KB.
  - KTX2 keeps textures compressed in GPU memory, which helps phones.
- **Fallbacks and accessibility.**
  - **Detection:** `getContext('webgl2')` returns `null` when WebGL is missing, and `failIfMajorPerformanceCaveat` catches software rendering. Safari has no `deviceMemory` or `saveData`, so on iPhones a frame-rate check (detect-gpu or R3F `PerformanceMonitor`) is the only weak-device signal.
  - **Motion:** honour `prefers-reduced-motion`. WCAG 2.2.2 (Level A) requires a pause control for auto-playing motion that lasts more than 5 seconds.
  - **Text:** canvas content isn't exposed to assistive technology, so all Scan test text must be real HTML. A decorative canvas should be `aria-hidden`, and every action in the scene should also be an HTML control.
- **Stack fit (facts, not a decision):**
  - **Astro.** Ships no JavaScript by default and has built-in `client:visible` and `client:idle`.
    - Vanilla three.js needs about 10 lines of `IntersectionObserver` code, because directives only apply to framework islands.
    - R3F and Threlte can also run as Astro islands.
    - Astro deploys to Cloudflare Pages as static files, and Cloudflare has owned the Astro team since 2026-01-16.
  - **Next.js + R3F.** Ships the React and Next runtime on every page, on top of about 312 KB for React, R3F and three.js.
    - It has `next/dynamic({ ssr: false })` but no built-in load-when-visible trigger.
    - Cloudflare Pages only takes a static Next export. Cloudflare recommends "vinext on Workers" for full Next.js.
- **Reference sites (observations):**
  - **Bruno Simon (2025):** a drivable WebGPU/TSL world with a low-quality mode on mobile. About 950 KB of gzipped JavaScript, and the whole site is the 3D.
  - **Mathis Biabiany (2026):** Nuxt static HTML with a skip link and the full project list as text, a WebGPU layer on top and a GPU-tier check.
  - **Henry Heffernan:** a 3D desk with an OS on its screen. The HTML is an empty shell until the JavaScript runs.
  - **Gionatan Nese (Awwwards Site of the Day, September 2026):** Next.js, server-rendered text first, WebGL on top.
