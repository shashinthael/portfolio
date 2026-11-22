// The Featured projects as panels on a ring. Spec §6.2. Data: src/data/projects.ts.
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { featured, type Project } from '../data/projects';
import { COLORS, THREE, createRenderer, isPhone, metal, startLoop, studio, type Motion } from './shared';

export interface GalleryOptions {
  motion: Motion;
  /** The project in front right now. */
  index(): number;
  /** Clicked panel or swipe: bring this project forward. */
  pick(index: number): void;
}

function drawPanel(x: CanvasRenderingContext2D, p: Project, i: number) {
  x.fillStyle = COLORS.face;
  x.fillRect(0, 0, 1200, 760);
  x.strokeStyle = '#9c8257';
  x.lineWidth = 2;
  x.strokeRect(34, 34, 1132, 692);
  x.fillStyle = '#765b35';
  x.font = '500 26px Inter';
  x.fillText(p.kind.toUpperCase(), 80, 120);
  x.font = '400 40px Inter';
  x.fillText(String(i + 1).padStart(2, '0'), 1070, 125);
  x.fillStyle = COLORS.ink;
  x.font = `300 ${p.title.length > 12 ? 104 : 140}px "Cormorant Garamond"`;
  x.fillText(p.title, 74, 340);
  x.fillStyle = '#8a6d43';
  x.fillRect(80, 390, 90, 2);
  x.fillStyle = COLORS.muted;
  x.font = '400 28px "JetBrains Mono"';
  x.fillText(p.stack.join(' · '), 80, 650);
}

export function mountGallery(canvas: HTMLCanvasElement, opts: GalleryOptions) {
  const renderer = createRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  const n = featured.length, R = 2.4;
  camera.position.set(0, 0.35, R + (isPhone() ? 6.2 : 5));
  camera.lookAt(0, 0, R - 1);
  studio(renderer, scene);

  const ring = new THREE.Group();
  scene.add(ring);
  const panels = featured.map((p, i) => {
    const c = document.createElement('canvas');
    c.width = 1200; c.height = 760;
    drawPanel(c.getContext('2d')!, p, i);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    const face = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, transparent: true });
    const edge = metal({ roughness: 0.25, transparent: true });
    const m = new THREE.Mesh(new RoundedBoxGeometry(2.4, 1.52, 0.06, 4, 0.05), [edge, edge, edge, edge, face, edge]);
    const a = (i / n) * Math.PI * 2;
    m.position.set(Math.sin(a) * R, 0, Math.cos(a) * R);
    m.rotation.y = a;
    m.userData = { i, redraw: () => { drawPanel(c.getContext('2d')!, p, i); tex.needsUpdate = true; } };
    ring.add(m);
    return m;
  });
  document.fonts?.ready.then(() => { panels.forEach((m) => m.userData.redraw()); loop.poke(); });

  const floor = new THREE.Mesh(new THREE.RingGeometry(R + 0.55, R + 0.565, 256), new THREE.MeshBasicMaterial({ color: COLORS.pulse, transparent: true, opacity: 0.45, side: THREE.DoubleSide }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1;
  ring.add(floor);

  // Click a panel to bring it forward; swipe sideways on touch screens.
  const ray = new THREE.Raycaster(), pointer = new THREE.Vector2();
  let downX: number | null = null;
  const onDown = (e: PointerEvent) => { downX = e.clientX; };
  const onUp = (e: PointerEvent) => {
    if (downX === null) return;
    const dx = e.clientX - downX;
    downX = null;
    if (Math.abs(dx) > 40) return opts.pick(opts.index() + (dx < 0 ? 1 : -1));
    const r = canvas.getBoundingClientRect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
    ray.setFromCamera(pointer, camera);
    const hit = ray.intersectObjects(panels)[0];
    if (hit) opts.pick(hit.object.userData.i as number);
  };
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointerup', onUp);

  // The ring always eases to the chosen project (it snaps when motion is reduced), so it keeps rendering until it arrives.
  let rot = 0;
  const alwaysMove: Motion = { reduced: opts.motion.reduced, paused: () => false };
  const loop = startLoop(canvas, renderer, camera, scene, alwaysMove, (t) => {
    const target = (-opts.index() / n) * Math.PI * 2;
    rot += (target - rot) * (opts.motion.reduced ? 1 : 0.07);
    const breathe = opts.motion.paused() ? 0 : Math.sin(t * 0.5) * 0.03;
    ring.rotation.y = rot + breathe;
    for (const m of panels) {
      const facing = Math.max(0, Math.cos((m.userData.i / n) * Math.PI * 2 + ring.rotation.y));
      const o = 0.12 + 0.88 * Math.pow(facing, 2.5);
      (m.material as THREE.Material[]).forEach((mat) => { mat.opacity = o; });
    }
  });

  return {
    poke: loop.poke,
    dispose() {
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerup', onUp);
      loop.dispose();
    },
  };
}
