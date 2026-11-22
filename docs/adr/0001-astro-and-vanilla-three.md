# Astro and plain three.js, not Next.js and React Three Fiber

The Portfolio is a static Astro site in TypeScript, and its two 3D scenes (Stack in the hero, Gallery for the projects) are written in plain three.js with the WebGL renderer. Each scene loads only after the HTML text has rendered. This is surprising, because the owner is a React developer applying for React roles. We chose it anyway, for three reasons:

1. The Scan test puts the text first. Astro sends no JavaScript by default and loads islands only when they're visible or the page is idle. Plain three.js is about 131 KB gzipped, against about 312 KB for React, React Three Fiber and three.js, before the Next.js runtime is added to every page.
2. The 3D scenes chosen in the visual-identity prototype are already plain three.js.
3. React is already proven by Albhadreen, Kivorana (Next.js) and Edirisooriya Stores, so the Portfolio doesn't need to prove it again. Zeylan already runs Astro and three.js on Cloudflare.

## Considered options

- **Next.js (static export) + React Three Fiber.** Rejected. It's heavier on every page, it has no built-in "load when visible", and Cloudflare Pages only takes its static export.
- **three.js WebGPURenderer.** Rejected for now. The three.js manual still calls it experimental, and WebGPU reaches about 89% of users against about 97% for WebGL 2 (late 2026). Revisit when WebGPU is Baseline.

Sources: `.scratch/portfolio/research/3d-on-the-web.md` and the ticket "Tech stack" (`.scratch/portfolio/issues/06-tech-stack.md`).
