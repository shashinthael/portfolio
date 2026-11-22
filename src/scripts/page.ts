// The only first-load JavaScript (budget: 15 KB gzipped). three.js and the scenes are loaded later, on demand.
import { featured } from '../data/projects';
import { indexFromProgress, isTooSlow, progressForIndex, wrap } from '../lib/motion';

const root = document.documentElement;
const reduced = root.classList.contains('reduce');
const forced = root.classList.contains('force3d');

/* Text fades up as sections arrive. */
const reveal = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); }
}, { rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.rv').forEach((el) => reveal.observe(el));

if (root.classList.contains('has3d')) start3d();

function start3d() {
  let paused = reduced;
  const motion = { reduced, paused: () => paused };
  const scenes: { poke(): void; dispose(): void }[] = [];

  /* Pause motion (WCAG 2.2.2). Reduced motion starts paused. */
  const toggle = document.getElementById('motion-toggle') as HTMLButtonElement;
  const label = () => { toggle.textContent = paused ? 'Play motion' : 'Pause motion'; toggle.setAttribute('aria-pressed', String(paused)); };
  label();
  toggle.addEventListener('click', () => { paused = !paused; label(); scenes.forEach((s) => s.poke()); });

  /* If the 3D can't keep up, drop to the still versions for the rest of the visit (spec §6.3). */
  const fallBack = () => {
    try { sessionStorage.setItem('pf-no3d', '1'); } catch {}
    scenes.splice(0).forEach((s) => s.dispose());
    root.classList.remove('has3d', 'stack-ready');
  };

  /* Stack: after the page is idle, so it never delays the text. */
  const frames: number[] = [];
  let measuring = !forced, measuredMs = 0;
  const onFrame = (dt: number) => {
    if (!measuring) return;
    measuredMs += dt;
    if (measuredMs > 300) frames.push(dt); // skip the warm-up frames
    if (measuredMs >= 2300) {
      measuring = false;
      if (isTooSlow(frames)) fallBack();
    }
  };
  const idle = (fn: () => void) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 2500 }) : setTimeout(fn, 600));
  const whenLoaded = (fn: () => void) => (document.readyState === 'complete' ? fn() : addEventListener('load', fn, { once: true }));
  let stackStarted = false;
  const startStack = async () => {
    const canvas = document.getElementById('stack-gl') as HTMLCanvasElement | null;
    if (stackStarted || !canvas || !root.classList.contains('has3d')) return;
    stackStarted = true;
    try {
      const { mountStack } = await import('../scenes/stack');
      scenes.push(mountStack(canvas, { motion, onFrame }));
      requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('stack-ready')));
    } catch { fallBack(); }
  };
  // Phones: start on the first touch, scroll or key press, so loading three.js never competes with the text.
  // Until then they see the same Stack as a still diagram. Desktops start once the page is idle.
  const phone = matchMedia('(max-width: 760px), (pointer: coarse)').matches;
  if (phone && !forced) {
    const kick = () => { ['pointerdown', 'touchstart', 'scroll', 'keydown', 'wheel'].forEach((t) => removeEventListener(t, kick)); idle(startStack); };
    ['pointerdown', 'touchstart', 'scroll', 'keydown', 'wheel'].forEach((t) => addEventListener(t, kick, { passive: true, once: true }));
  } else {
    whenLoaded(() => idle(startStack));
  }

  /* Gallery controller: which project is in front. */
  const work = document.getElementById('work')!;
  const writeups = [...work.querySelectorAll<HTMLElement>('.wu')];
  const count = document.getElementById('work-count')!;
  const n = featured.length;
  const desktop = matchMedia('(min-width: 761px)');
  let index = 0;
  let pickedAt = -Infinity; // while the page scrolls itself to a picked project, scrolling must not change the project
  let gallery: { poke(): void; dispose(): void } | null = null;

  const show = (i: number) => {
    index = i;
    writeups.forEach((el, k) => {
      const on = k === i;
      el.classList.toggle('on', on);
      el.toggleAttribute('inert', !on);
      if (on) el.removeAttribute('aria-hidden'); else el.setAttribute('aria-hidden', 'true');
    });
    count.textContent = String(i + 1).padStart(2, '0');
    gallery?.poke();
  };
  /** Bring project `i` forward. On desktop that means scrolling to its step, so scroll and buttons always agree. */
  const pick = (i: number) => {
    i = wrap(i, n);
    if (desktop.matches) {
      pickedAt = performance.now();
      const span = work.offsetHeight - innerHeight;
      scrollTo({ top: work.offsetTop + span * progressForIndex(i, n), behavior: reduced ? 'auto' : 'smooth' });
    }
    show(i);
  };
  work.querySelectorAll<HTMLButtonElement>('[data-step]').forEach((b) => b.addEventListener('click', () => pick(index + Number(b.dataset.step))));
  work.querySelector('.gview')!.addEventListener('keydown', (e) => {
    const k = (e as KeyboardEvent).key;
    if (k === 'ArrowRight' || k === 'ArrowLeft') { e.preventDefault(); pick(index + (k === 'ArrowRight' ? 1 : -1)); }
  });
  addEventListener('scroll', () => {
    if (!desktop.matches || !root.classList.contains('has3d')) return;
    if (performance.now() - pickedAt < 1200) return;
    const span = work.offsetHeight - innerHeight;
    if (span <= 0) return;
    const p = (scrollY - work.offsetTop) / span;
    if (p < -0.05 || p > 1.05) return;
    const i = indexFromProgress(p, n);
    if (i !== index) show(i);
  }, { passive: true });
  addEventListener('scrollend', () => { pickedAt = -Infinity; });

  /* Gallery scene: loaded when the section comes within a screen of view. */
  const near = new IntersectionObserver(async ([e]) => {
    if (!e.isIntersecting || !root.classList.contains('has3d')) return;
    near.disconnect();
    try {
      const { mountGallery } = await import('../scenes/gallery');
      gallery = mountGallery(document.getElementById('gallery-gl') as HTMLCanvasElement, { motion, index: () => index, pick });
      scenes.push(gallery);
    } catch { fallBack(); }
  }, { rootMargin: '100% 0px' });
  near.observe(work);
}
