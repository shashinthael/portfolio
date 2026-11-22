# 3D on the web in late 2026: options, cost and fallbacks

Research for ticket [03-3d-on-the-web](../issues/03-3d-on-the-web.md). Written 2026-11-22. All sources were accessed on 2026-11-22 unless a different date is given. "Unverified" means I could not confirm the figure against a primary source.

## Summary

- **three.js is healthy and moves fast.** It ships roughly every 1–3 months (r187 on 2026-10-30). `WebGPURenderer` falls back to WebGL 2 on its own, but the three.js manual still calls it "experimental". `WebGLRenderer` is still maintained and still recommended for plain WebGL 2 work.
- **WebGPU now runs in every major engine, but not everywhere.** It's in Chrome and Edge, Chrome Android 121+, Safari 26 (iOS 26, iPadOS 26, macOS Tahoe) and Firefox 141+ on Windows. It's missing in Firefox for Android, Firefox on Linux and Intel Macs, and any Apple device still on iOS 18 or earlier. MDN still marks it "Limited availability", not Baseline. WebGL 2 reaches about 97% of users (caniuse).
- **Measured bundle cost (gzip, minified, small scene):** vanilla three.js about 131 KB. three.js with `WebGPURenderer` about 220 KB. R3F with React about 312 KB (React alone is 67 KB). Threlte with Svelte about 219 KB. Babylon.js about 266 KB. Spline runtime about 1,072 KB. OGL about 14 KB.
- **A `<canvas>` is never the LCP element** (web.dev's list of LCP element types leaves canvas out). If the real text is HTML, the 3D mainly puts INP (main-thread work) and CLS (unreserved space) at risk. It doesn't put LCP at risk, unless its JavaScript or assets compete with the hero content for bandwidth.
- **Stack fit (facts, not a decision):** Astro ships no JavaScript by default and has `client:visible` and `client:idle` built in. Next.js always ships the React and Next runtime, and has no built-in "load when visible" directive. Cloudflare Pages serves only a *static export* of Next.js. Cloudflare's own recommendation for full Next.js is "vinext on Workers". Cloudflare has owned the Astro team since 2026-01-16.

---

## 1. Libraries

### Maintenance status (npm registry and GitHub, checked 2026-11-22)

| Library | Latest stable | Released | Notes |
|---|---|---|---|
| three.js | r187 (`three@0.187.0`) | 2026-10-30 | Releases since September 2025: r180 (2025-09-03), r181 (2025-11-19), r182 (2025-12-10), r183 (2026-02-20), r184 (2026-04-16), r185 (2026-07-01), r186 (2026-09-24), r187 (2026-10-30). Most of the work is on `WebGPURenderer` and TSL. |
| React Three Fiber (R3F) | 9.8.2 | 2026-10-14 | v9 is "a compatibility release for React 19". v10 is in alpha (10.0.0-alpha.6, October 2026), titled "Going WebGPU First": `WebGPURenderer` becomes the default, `@react-three/fiber/legacy` keeps the GLSL path, and "core no longer imports three.js". There's no date for a stable v10. |
| drei | 10.7.9 | 2026-09-25 | An 11.0.0 alpha exists. |
| `@react-three/offscreen` | 0.0.8 | 2023-05-11 | Experimental. The repo's last push was 2025-01-30, so treat it as dormant. |
| Threlte (`@threlte/core`) | 8.7.0 | 2026-11-02 | Svelte 5. The repo was pushed 2026-11-18. |
| Babylon.js (`@babylonjs/core`) | 9.37.1 | 2026-11-18 | Very active. Its WebGPU engine wasn't re-checked here (unverified). |
| Spline (`@splinetool/runtime`) | 2.0.211 | 2026-11-20 | Closed-source runtime. The scene loads from a `.splinecode` file, which is usually hosted on Spline's CDN. |
| OGL | 1.0.11 | 2025-01-27 | Small WebGL-only library with no release in 2026. |
| Plain WebGPU | n/a | n/a | No library cost, but you write WGSL and the GPU plumbing yourself, with no WebGL fallback unless you write one. |

Sources: [three.js releases](https://github.com/mrdoob/three.js/releases), the GitHub API `repos/mrdoob/three.js/releases`, the [R3F releases](https://github.com/pmndrs/react-three-fiber/releases), the [R3F v9 migration guide](https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide), the npm registry (`registry.npmjs.org/<package>`), and the GitHub API repo metadata for `pmndrs/react-three-offscreen`, `pmndrs/react-three-fiber` and `threlte/threlte`.

### Measured bundle size for a small scene

**Method.** I bundled each library with esbuild 0.x (`--bundle --minify --format=esm`, production `NODE_ENV`) and compressed the output with `gzip -9`. Each scene is a renderer, a camera, two lights and one box with a standard material. "+ loaders" adds `GLTFLoader`, `DRACOLoader`, `KTX2Loader`, the Meshopt decoder and `OrbitControls`. Real sites with Vite or Rollup will differ by a few KB. Measured 2026-11-22 with the versions above, React 19.3 and Svelte 5.59.

| Bundle | gzip | brotli |
|---|---|---|
| three.js `WebGLRenderer`, tree-shaken | **131 KB** | 108 KB |
| three.js `WebGLRenderer` + loaders + OrbitControls | 191 KB | 158 KB |
| three.js, whole library (`import * as THREE`) | 187 KB | n/a |
| three.js `WebGPURenderer` (`three/webgpu`), tree-shaken | **220 KB** | 178 KB |
| `three/webgpu`, whole library | 304 KB | n/a |
| React + ReactDOM only (baseline) | 67 KB | 58 KB |
| R3F `<Canvas>` + box (includes React) | **312 KB** | 250 KB |
| R3F + drei (`OrbitControls`, `useGLTF`, `Environment`) | 356 KB | 287 KB |
| Svelte only (baseline) | 20 KB | n/a |
| Threlte `<Canvas>` + `<T.Mesh>` (includes Svelte) | **219 KB** | n/a |
| Babylon.js ES modules, minimal scene | **266 KB** | 214 KB |
| Spline runtime (main bundle only) | **1,072 KB** | 847 KB |
| OGL | **14 KB** | 12 KB |

Decoders are fetched at runtime, only when a model needs them (from `three/examples/jsm/libs`, gzip):

- Draco: wasm 86 KB plus wrapper 11 KB.
- Basis/KTX2 transcoder: wasm 238 KB plus JS 14 KB.
- Meshopt decoder: 7 KB.

**What the numbers show:**

- **R3F and Threlte pull in the whole of three.js.** Their JSX/`T` catalogue imports `* as THREE`, so tree-shaking is lost. R3F minus React is about 245 KB, against 131 KB for tree-shaken vanilla three.js. R3F v10 says its core no longer imports three.js, which may change this once it's stable (unverified).
- **The Spline runtime alone is about 8× vanilla three.js,** and it also loads extra wasm modules (physics, boolean and so on) on demand.

### Fit with Astro islands and Next.js

**Astro (latest `astro@7.4.13`, 2026-11-18)**

- "Astro will strip out all client-side JavaScript automatically". A framework component gets JavaScript only with a `client:*` directive ([islands](https://docs.astro.build/en/concepts/islands/)).
- Directives ([reference](https://docs.astro.build/en/reference/directives-reference/)):
  - `client:visible` hydrates "once the component has entered the user's viewport", with an optional `rootMargin`.
  - `client:idle` waits until "the page is done with its initial load", with an optional `timeout` passed to `requestIdleCallback()`.
  - `client:media` waits for a CSS media query to match.
  - `client:only="react"` skips server rendering.
- React, Preact, Svelte, Vue and Solid islands are all supported. So **R3F works inside Astro** as a React island, and so does Threlte as a Svelte island.
- **Vanilla three.js in Astro** goes in a `<script>` or a custom element. Astro bundles these scripts as `type="module"`, but `client:*` directives don't apply to them. "Load when visible" then means your own `IntersectionObserver` plus a dynamic `import('three')`, which is about 10 lines ([client-side scripts](https://docs.astro.build/en/guides/client-side-scripts/)).
- Cloudflare acquired The Astro Technology Company on 2026-01-16. Astro stays MIT-licensed and works on any host ([Cloudflare press release](https://www.cloudflare.com/press/press-releases/2026/cloudflare-acquires-astro-to-accelerate-the-future-of-high-performance-web-development/)).

**Next.js (latest `next@16.4.6`, 2026-11-09)**

- `next/dynamic` is "a composite of `React.lazy()` and Suspense".
- `{ ssr: false }` "will only work for Client Components" and is an error in Server Components ([lazy-loading guide](https://nextjs.org/docs/app/guides/lazy-loading), last updated 2026-03-10).
- There's no built-in viewport or idle trigger, so you build it with `IntersectionObserver`.
- Every page ships the React runtime and the Next client runtime. The documentation gives no figure for this, so the baseline is unverified. One observed Next.js and Turbopack portfolio (see section 5) loaded about 143 KB gzip across its first 8 script tags.

**Hosting on Cloudflare Pages (a decision already settled in the map)**

- Cloudflare's Next.js guide says "Cloudflare recommends vinext on Workers for full-stack Next.js applications". It sends a static Next export to Pages ([Cloudflare Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/), modified 2026-08-25).
- An Astro static build deploys to Pages as plain files.

**Cost of the two pairings in the ticket**

| Pairing | Approximate 3D JavaScript cost (gzip) | Notes |
|---|---|---|
| Astro + vanilla three.js | ~131–191 KB, loaded only when the scene is near the viewport | The page shell can ship close to 0 KB of JavaScript. |
| Next.js + R3F | ~312–356 KB for React + R3F + three.js | The React part is shared with the rest of the app. Add the Next runtime on top. |
| Astro + R3F island | ~312–356 KB, loaded only when needed | A middle option. The rest of the page stays free of JavaScript. |

---

## 2. WebGPU versus WebGL (late 2026)

### Browser support

Sources: [MDN browser-compat-data `api/GPU.json`](https://github.com/mdn/browser-compat-data/blob/main/api/GPU.json), [caniuse WebGPU](https://caniuse.com/webgpu) and the [MDN WebGPU API page](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) (modified 2026-09-02).

| Browser | WebGPU |
|---|---|
| Chrome and Edge, desktop | 113+ (Windows, macOS, ChromeOS). Linux from 144 (Intel Gen12+ GPUs only). |
| Chrome Android | 121+ in MDN data. Caniuse marks full support only from 157; it probably counts earlier versions as partial (unverified). |
| Safari | 26.0+ on macOS, iOS, iPadOS and visionOS ([WebKit, Safari 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/); [WWDC25 post](https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/)). A WebKit bug thread says `navigator.gpu` needs macOS Tahoe, iOS 26 or visionOS 26. So Safari 26 on Sonoma or Sequoia has no WebGPU, which probably explains why caniuse marks desktop Safari as "partial" ([WebKit bug 299237](https://bugs.webkit.org/show_bug.cgi?id=299237); the thread wasn't re-read in full). |
| iOS browsers in general | All of them use WebKit, so WebGPU on iOS means iOS 26 or later. |
| Firefox desktop | 141+ on Windows. Apple-silicon macOS from 145 (Tahoe) and 147 (older macOS). Not on Intel Macs or Linux. Partial overall: no service-worker support. |
| Firefox Android | Not supported. |

- **Overall:** caniuse gives WebGPU 88.6% global usage (86.8% full plus 1.8% partial), with usage data from October 2026.
- **Status:** MDN still marks WebGPU "Limited availability, not Baseline". It needs a secure context (HTTPS).
- **WebGL 2:** 97.3% global usage, and in Safari and iOS since 15 ([caniuse WebGL 2](https://caniuse.com/webgl2)).

### Is three.js `WebGPURenderer` production-ready?

From the three.js manual page "WebGPURenderer" (`manual/pages/webgpurenderer.html` on the `dev` branch):

- "If a device/browser doesn't support WebGPU, the renderer can automatically fall back to using a WebGL 2 backend." You can force that backend with `forceWebGL: true`.
- "The renderer itself is still in an experimental state although its maturity level has been greatly improved in the last years. Still, depending on your application and scene setup, you will encounter missing features or a better performance with `WebGLRenderer`."
- "`WebGLRenderer` is still maintained and the recommended choice for pure WebGL 2 applications", but "there are no plans to add larger new features" to it.
- **Migration limits:**
  - `ShaderMaterial`, `RawShaderMaterial` and `onBeforeCompile()` are not supported. You rewrite them in TSL with node materials.
  - `EffectComposer` is not supported. A new TSL post-processing stack replaces it.
  - The renderer starts up asynchronously: use `setAnimationLoop()` or `await renderer.init()`.
- **Fallback-path bugs do happen.** For example, `copyTextureToTexture` failed on the WebGL backend in r170–r180 and was fixed in r181 ([issue #31950](https://github.com/mrdoob/three.js/issues/31950), opened 2025-09-25).
- **R3F:** v9 lets the `gl` prop return a promise, so it can `await renderer.init()` for `WebGPURenderer`. The migration guide says WebGPU support is still a work in progress ([v9 migration guide](https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide)).

**What this means for a portfolio.** Both of these are documented, supported paths:

- `WebGLRenderer`: mature, smallest at 131 KB, and reaches about 97% of users.
- `WebGPURenderer` with its automatic WebGL 2 fallback: about 220 KB, labelled experimental, and needs TSL.

A small scene doesn't need anything WebGPU-only, such as compute shaders.

---

## 3. Performance practice

### Load 3D only when it's on screen or the page is idle

- **Astro:** `client:visible` (with `rootMargin` to start a little early), `client:idle` (with a `timeout`), or `client:media` to skip small screens entirely ([Astro directives](https://docs.astro.build/en/reference/directives-reference/)).
- **Next.js:** `next/dynamic(..., { ssr: false })` inside a Client Component, plus your own `IntersectionObserver` ([Next lazy loading](https://nextjs.org/docs/app/guides/lazy-loading)).
- **In both:** load the decoders (Draco, Basis) only when a model needs them. Three.js loaders fetch them from a path you set (`setDecoderPath`, `setTranscoderPath`).
- **R3F:** `frameloop="demand"` with `invalidate()` renders only when something changes, which "saves battery". `PerformanceMonitor` and `regress()` lower quality, such as DPR (device pixel ratio), when the frame rate drops. Keep plain meshes to "a few hundred at most", and use instancing beyond that ([R3F scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)).
- **three.js:** r186 and r187 worked on `compileAsync()`, which compiles shaders before the first frame so the first frame doesn't cause a long task ([three.js releases](https://github.com/mrdoob/three.js/releases)).

### Keep work off the main thread

- `OffscreenCanvas` is "Baseline: Widely available… since March 2023". `canvas.transferControlToOffscreen()` passes the canvas to a worker, and `requestAnimationFrame` works in workers ([MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas); [caniuse](https://caniuse.com/offscreencanvas): 96.95%).
- WebGL in `OffscreenCanvas` arrived in Safari 17.0. Safari 17.4 fixed a WebGL2 request getting a WebGL1 context and fixed WebGL in nested workers ([WebKit, Safari 17.0](https://webkit.org/blog/14445/webkit-features-in-safari-17-0/); [Safari 17.4](https://webkit.org/blog/15063/webkit-features-in-safari-17-4/)). A WebKit bug says Safari 17.1 on macOS 13 had no WebGL in workers, so feature-detect inside the worker.
- WebGPU is also available in workers through `WorkerNavigator.gpu` ([MDN WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)).
- **Costs:**
  - DOM events don't reach a worker, so pointer input has to be forwarded by hand.
  - `@react-three/offscreen` does this for R3F but hasn't been released since 2023 (see section 1). Its README still says Safari lacks WebGL in OffscreenCanvas, which is out of date since Safari 17.
- For a small scene, off-thread rendering is optional. On-demand rendering and lazy loading remove most main-thread cost already.

### Compress assets

- **glTF-Transform 4.5.1:** `gltf-transform optimize` defaults (read from the CLI source):
  - `--compress meshopt`. The choices are draco, meshopt, quantize or false. The CLI's own help says "Draco compresses geometry; Meshopt and quantization compress geometry and animation."
  - `--texture-compress auto`. The choices are ktx2, webp, avif or auto. The help says "KTX2 optimizes VRAM usage and performance; AVIF and WebP optimize transmission size."
  - `--texture-size 2048`.
  - `--flatten` and `--join` are on, to cut draw calls.

  ([glTF-Transform CLI](https://gltf-transform.dev/cli))
- **gltfpack (meshoptimizer):** `-c` and `-cc` for meshopt compression, `-tc` for KTX2/Basis textures, `-tw` for WebP. It doesn't produce Draco ([gltfpack docs](https://meshoptimizer.org/gltf/)).
- **three.js `KTX2Loader`:** transcodes Basis Universal to whatever GPU-compressed format the device supports. Call `detectSupport(renderer)` before loading. It needs WebAssembly ([KTX2Loader docs](https://threejs.org/docs/pages/KTX2Loader.html)).
- **Decoder weight (measured, gzip):** Meshopt 7 KB, Draco about 97 KB, Basis about 252 KB. Meshopt has the lightest decoder. KTX2 has the heaviest transcoder, but keeps textures compressed in GPU memory, which matters on phones.

### Effect on Core Web Vitals

**Thresholds** (75th percentile of page loads, mobile and desktop judged separately):

| Metric | Good | Poor |
|---|---|---|
| LCP | ≤ 2.5 s | > 4.0 s |
| INP | ≤ 200 ms | > 500 ms |
| CLS | ≤ 0.1 | > 0.25 |

Sources: [web.dev Web Vitals](https://web.dev/articles/vitals) (updated 2024-10-31) and [web.dev, defining the thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds).

- **LCP:** the LCP element types are `<img>`, `<image>` in SVG, `<video>`, `url()` backgrounds and block-level text. **`<canvas>` is not one of them.** Elements that cover the full viewport are also excluded ([web.dev LCP](https://web.dev/articles/lcp), updated 2025-09-04). So the hero name and role in HTML text will be the LCP element. The 3D hurts LCP only if its JavaScript, models or decoders compete with that text or the fonts for bandwidth or main-thread time. Lazy loading prevents that.
- **INP:** long main-thread tasks (script evaluation, shader compilation, parsing large glTF files) delay responses to input. Break the work into smaller tasks and yield to the main thread ([web.dev optimize INP](https://web.dev/articles/optimize-inp), updated 2025-09-02). Pre-compile shaders with `compileAsync()`, render on demand, and decode in workers (three.js decoders already run Draco and Basis in workers).
- **CLS:** "reserve the required space with CSS `aspect-ratio` or similar", or with `min-height`. Animate with `transform`, not `top` or `left` ([web.dev optimize CLS](https://web.dev/articles/optimize-cls), updated 2025-02-07). A canvas container with a fixed aspect ratio and a static poster image underneath shifts nothing when the 3D appears.

---

## 4. Fallbacks and accessibility

### Detecting no WebGL or a weak device

- **No WebGL:** `canvas.getContext('webgl2')` returns `null` when the context can't be created ([MDN getContext](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext), modified 2025-07-02).
- **Software rendering:** the context option `failIfMajorPerformanceCaveat: true` asks the browser not to create a context "if the system performance is low or if no hardware GPU is available". That catches software rendering. MDN doesn't say what is returned in that case; in practice it's `null`, which is unverified.
- **No WebGPU:** `navigator.gpu` is missing, or `requestAdapter()` returns `null` ([MDN WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)). Three.js `WebGPURenderer` handles this for you by falling back to WebGL 2.
- **Device hints from the browser** (from MDN browser-compat-data `api/Navigator.json`):
  - `navigator.deviceMemory` is Chromium only (Chrome 63+). Not in Safari or Firefox.
  - `navigator.connection.saveData` is Chromium only, plus Firefox Android (unverified). Not in Safari.
  - `navigator.hardwareConcurrency` works everywhere, Safari since 15.4.

  So on iPhones none of the memory or data hints exist, and a frame-rate check is the only reliable signal.
- **`@pmndrs/detect-gpu` 6.0.32** (released 2026-11-22) runs a benchmark and returns a tier from 0 to 3:
  - tier 0: no WebGL, a blocklisted GPU, or under 15 fps
  - tiers 1, 2 and 3: at least 15, 30 and 60 fps

  By default it fetches benchmark data from unpkg; you can host that data yourself. Its data source, gfxbench, stopped updating in December 2025 ([detect-gpu README](https://github.com/pmndrs/detect-gpu)).
- **R3F `PerformanceMonitor`:** lowers quality at runtime when the frame rate drops (section 3).

### `prefers-reduced-motion`

- `reduce` means the user has turned on reduced motion. The media query `@media (prefers-reduced-motion)` is the same as `@media (prefers-reduced-motion: reduce)`. "Animations such as scaling or panning large objects can be vestibular motion triggers" ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion), modified 2026-06-10).
- In JavaScript: `matchMedia('(prefers-reduced-motion: reduce)')`, plus a `change` listener.
- **WCAG 2.2 SC 2.2.2 Pause, Stop, Hide (Level A):** moving content that starts automatically, lasts more than 5 seconds and sits next to other content needs a way to pause, stop or hide it ([W3C Understanding 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)). An auto-rotating hero scene falls under this.
- **SC 2.3.3 Animation from Interactions (AAA)** covers motion triggered by scrolling or pointer movement ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html); not re-read here).

### Keep text out of the canvas

- MDN: "The `<canvas>` element on its own is just a bitmap… Canvas content is not exposed to accessibility tools as semantic HTML is." Fallback content inside `<canvas>…</canvas>` is shown only when canvas isn't supported or JavaScript is off ([MDN canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas), modified 2026-04-24).
- **What follows:**
  - Name, role, stack, right to work and project links belong in real HTML, which is readable, indexable and selectable, with the canvas behind or beside them.
  - A purely decorative canvas can be `aria-hidden="true"` and kept out of the tab order.
  - If the canvas is interactive, give it a text label (for example `role="img"` and `aria-label`) and offer every action it provides as ordinary HTML buttons or links too.
- A `<canvas>` isn't focusable by default, so keyboard control needs `tabindex="0"` and key handlers, or, more simply, HTML controls that drive the scene. These are general HTML and ARIA practice; MDN's canvas page lists only "Permitted ARIA roles: Any".

---

## 5. Reference points (observations only, for inspiration, not copying)

**Method.** I fetched each home page once with a generic user agent on 2026-11-22 and recorded the HTML text and the compressed size of the first script tags. These figures don't include later lazy-loaded assets, models or analytics.

1. **Bruno Simon, [bruno-simon.com](https://bruno-simon.com)** (2025 rebuild).
   - **What it is:** a drivable 3D world built with three.js r187, TSL, Rapier physics and Vite. Awwwards: Portfolio Honors (Dec 2025) and Site of the Month (Jan 2026).
   - **Case study** ([Awwwards, 2026-03-11](https://www.awwwards.com/brunos-portfolio-case-study.html)): it runs "on WebGPU when available"; Draco models; ETC1S and UASTC (KTX2) textures; an automatic lower-quality preset on mobile; and a UI kept in 3D "as much as possible". No non-3D version is described.
   - **What I saw:** the HTML has a short welcome text and an options menu with "Quality: Low" and a "Renderer: WebGPU" switch. The main JavaScript is about 950 KB gzip. The code is MIT on GitHub (`brunosimon/folio-2025`).
   - **Note:** iconic, but the whole site *is* the 3D experience. That's the opposite of the Scan test.
2. **Mathis Biabiany, [mathis-biabiany.fr](https://www.mathis-biabiany.fr)** (new portfolio, [three.js forum post, 2026-08-06](https://discourse.threejs.org/t/mathis-biabiany-new-portfolio/93340)).
   - **Stack:** WebGPU and TSL with a statically generated Nuxt 4 site, MSDF text in the GL layer, lazy-loaded parts, and a GPU-tier check at startup that picks assets.
   - **What I saw:** the static HTML already has a "Skip to content" link, his role, a one-line pitch and the full project list as text. The first JavaScript entry is about 103 KB gzip.
   - **Note:** a good example of "HTML first, 3D on top".
3. **Henry Heffernan, [henryheffernan.com](https://henryheffernan.com)** ("Portfolio 2022", still widely shared).
   - **What it is:** a 3D desk with a working computer screen that runs an OS-style portfolio.
   - **What I saw:** the HTML has only a `<title>` and no text content. The bundle is about 250 KB gzip, plus analytics.
   - **Note:** memorable, but nothing is readable or indexable until the JavaScript runs.
4. **Gionatan Nese, [gionatannese.com](https://www.gionatannese.com)** (Awwwards Site of the Day, 2026-09-05; tags three.js, WebGL, GSAP; [Awwwards page](https://www.awwwards.com/sites/gionatan-nese-26)).
   - **What it is:** a Next.js and Turbopack site whose server-rendered HTML holds the name, role, about text and project descriptions. The WebGL is layered on top.
   - **What I saw:** about 143 KB gzip across the first 8 script chunks.
   - **Note:** shows Next.js can also deliver "text first, 3D on top".

Something I couldn't verify: jesse-zhou.com ("Jesse's Ramen", a well-known three.js portfolio) returned a 15-byte bundle on fetch, so it's left out.

---

## Sources (all accessed 2026-11-22)

**three.js**
- [Releases](https://github.com/mrdoob/three.js/releases) and the GitHub API `repos/mrdoob/three.js/releases` (r187 published 2026-10-30)
- Manual: [WebGPURenderer](https://threejs.org/manual/#en/webgpurenderer) (source `manual/pages/webgpurenderer.html`, `dev` branch)
- Docs: [KTX2Loader](https://threejs.org/docs/pages/KTX2Loader.html)
- [Issue #31950](https://github.com/mrdoob/three.js/issues/31950)

**pmndrs**
- [R3F v9 migration guide](https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide)
- [R3F scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [R3F releases](https://github.com/pmndrs/react-three-fiber/releases)
- [react-three-offscreen](https://github.com/pmndrs/react-three-offscreen)
- [detect-gpu](https://github.com/pmndrs/detect-gpu)

**npm registry**
- `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/offscreen`, `@threlte/core`, `@babylonjs/core`, `@splinetool/runtime`, `ogl`, `astro`, `next`, `react`, `svelte`, `@pmndrs/detect-gpu`, `@gltf-transform/cli` 4.5.1 (CLI source read for the `optimize` defaults)

**Astro**
- [Islands](https://docs.astro.build/en/concepts/islands/)
- [Directives reference](https://docs.astro.build/en/reference/directives-reference/)
- [Client-side scripts](https://docs.astro.build/en/guides/client-side-scripts/)
- [React integration](https://docs.astro.build/en/guides/integrations-guide/react/)

**Next.js and Cloudflare**
- [Next.js lazy loading](https://nextjs.org/docs/app/guides/lazy-loading) (updated 2026-03-10)
- [Cloudflare Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/) (modified 2026-08-25)
- [Cloudflare acquires Astro](https://www.cloudflare.com/press/press-releases/2026/cloudflare-acquires-astro-to-accelerate-the-future-of-high-performance-web-development/) (2026-01-16)

**MDN**
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) (2026-09-02)
- browser-compat-data: [`api/GPU.json`](https://github.com/mdn/browser-compat-data/blob/main/api/GPU.json) and [`api/Navigator.json`](https://github.com/mdn/browser-compat-data/blob/main/api/Navigator.json)
- [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [getContext](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext)
- [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas)
- [deviceMemory](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory)
- [saveData](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/saveData)

**caniuse**
- [WebGPU](https://caniuse.com/webgpu)
- [WebGL 2](https://caniuse.com/webgl2)
- [OffscreenCanvas](https://caniuse.com/offscreencanvas)

**WebKit**
- [Safari 26.0 features](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/)
- [WWDC25 Safari 26 beta](https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/)
- [Safari 17.0](https://webkit.org/blog/14445/webkit-features-in-safari-17-0/)
- [Safari 17.4](https://webkit.org/blog/15063/webkit-features-in-safari-17-4/)
- [Bug 299237](https://bugs.webkit.org/show_bug.cgi?id=299237)

**web.dev**
- [Web Vitals](https://web.dev/articles/vitals)
- [Thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds)
- [LCP](https://web.dev/articles/lcp)
- [Optimize INP](https://web.dev/articles/optimize-inp)
- [Optimize CLS](https://web.dev/articles/optimize-cls)

**W3C**
- [Understanding SC 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- [Understanding SC 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

**Compression tools**
- [glTF-Transform CLI](https://gltf-transform.dev/cli)
- [gltfpack](https://meshoptimizer.org/gltf/)

**Reference sites**
- [bruno-simon.com](https://bruno-simon.com) and its [Awwwards case study](https://www.awwwards.com/brunos-portfolio-case-study.html)
- [mathis-biabiany.fr](https://www.mathis-biabiany.fr) and its [forum post](https://discourse.threejs.org/t/mathis-biabiany-new-portfolio/93340)
- [henryheffernan.com](https://henryheffernan.com)
- [gionatannese.com](https://www.gionatannese.com) and its [Awwwards page](https://www.awwwards.com/sites/gionatan-nese-26)
