// Size budgets from docs/portfolio-spec.md §8. Run after `npm run build`; exits 1 if any budget is exceeded.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const dist = new URL('../dist/', import.meta.url).pathname;
const KB = 1024;
const gz = (file) => gzipSync(readFileSync(file), { level: 9 }).length;
const kb = (n) => `${(n / KB).toFixed(1)} KB`;

const html = readFileSync(join(dist, 'index.html'), 'utf8');
const astro = join(dist, '_astro');
const files = readdirSync(astro);

// First-load JS: the entry scripts in index.html, plus every chunk they import statically (not import()).
const entry = [...html.matchAll(/<script[^>]*type="module"[^>]*src="\/_astro\/([^"]+)"/g)].map((m) => m[1]);
const firstLoad = new Set();
const walk = (name) => {
  if (firstLoad.has(name)) return;
  firstLoad.add(name);
  const src = readFileSync(join(astro, name), 'utf8');
  for (const m of src.matchAll(/(?:^|[;\n])\s*import\s*(?:[^'"()]*?from\s*)?["']\.\/([^"']+\.js)["']/g)) walk(m[1]);
};
entry.forEach(walk);

const js = files.filter((f) => f.endsWith('.js'));
const later = js.filter((f) => !firstLoad.has(f));
const cssFiles = files.filter((f) => f.endsWith('.css'));
const fonts = files.filter((f) => f.endsWith('.woff2'));
const images = files.filter((f) => /\.(avif|webp|png|jpe?g)$/.test(f));

const sum = (list, fn) => list.reduce((n, f) => n + fn(join(astro, f)), 0);
const htmlCss = gz(join(dist, 'index.html')) + sum(cssFiles, gz);
const firstJs = sum([...firstLoad], gz);
const laterJs = sum(later, gz);
const fontBytes = sum(fonts, (f) => statSync(f).size);
const heroSerif = fonts.filter((f) => f.startsWith('cormorant-garamond-latin-300-normal')).reduce((n, f) => n + statSync(join(astro, f)).size, 0);
const biggestImage = Math.max(0, ...images.map((f) => statSync(join(astro, f)).size));
// What a visitor downloads scrolling the whole page: the largest AVIF of each screenshot.
const perShot = {};
for (const f of images.filter((f) => f.endsWith('.avif'))) {
  const base = f.split('.')[0];
  perShot[base] = Math.max(perShot[base] ?? 0, statSync(join(astro, f)).size);
}
const page = htmlCss + firstJs + laterJs + fontBytes + Object.values(perShot).reduce((a, b) => a + b, 0);

const checks = [
  ['HTML + CSS (gzip)', htmlCss, 50 * KB],
  ['First-load JS (gzip)', firstJs, 15 * KB],
  ['Fonts (woff2, all faces)', fontBytes, 120 * KB],
  ['Preloaded hero serif', heroSerif, 40 * KB],
  ['three.js + scenes (gzip, after first paint)', laterJs, 180 * KB],
  ['Largest screenshot file', biggestImage, 150 * KB],
  ['Whole page, scrolled to the end', page, 1024 * KB],
];

let failed = false;
for (const [name, size, limit] of checks) {
  const ok = size <= limit;
  failed ||= !ok;
  console.log(`${ok ? '✓' : '✗'} ${name.padEnd(46)} ${kb(size).padStart(10)}  / ${kb(limit)}`);
}
console.log(`  first-load chunks: ${[...firstLoad].join(', ') || '(none)'}`);
process.exit(failed ? 1 : 0);
