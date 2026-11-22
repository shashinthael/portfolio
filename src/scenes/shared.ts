import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export { THREE };

export const COLORS = { metal: 0xe3cfa8, pulse: 0x9c8257, gold: 0x8a6d43, line: 0xb8b8b4, ink: '#121212', muted: '#5e5e5e', face: '#f6f4ef' } as const;

export const isPhone = () => innerWidth < 761;

export interface Motion {
  /** True while motion is paused (the Pause button, or reduced motion). */
  paused(): boolean;
  reduced: boolean;
}

export function createRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
  const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  r.setPixelRatio(Math.min(devicePixelRatio, isPhone() ? 1.5 : 2));
  r.toneMapping = THREE.ACESFilmicToneMapping;
  r.toneMappingExposure = 0.9;
  return r;
}

export function studio(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  pm.dispose();
  const key = new THREE.DirectionalLight(0xffffff, 2);
  key.position.set(3, 4, 5);
  scene.add(key);
}

export const metal = (o: THREE.MeshPhysicalMaterialParameters = {}) =>
  new THREE.MeshPhysicalMaterial({ color: COLORS.metal, metalness: 1, roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.06, ...o });

/** A text sprite drawn on a canvas, redrawn once the web fonts load so it's measured with the real font. */
export function label(text: string, color: string = COLORS.muted, size = 46, font = 'Inter', weight = 400) {
  const c = document.createElement('canvas'), x = c.getContext('2d')!;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, depthWrite: false, toneMapped: false }));
  const draw = (col = color) => {
    x.font = `${weight} ${size}px ${font}`;
    c.width = Math.ceil(x.measureText(text).width) + 24;
    c.height = size + 24;
    x.font = `${weight} ${size}px ${font}`;
    x.fillStyle = col;
    x.textBaseline = 'middle';
    x.fillText(text, 12, c.height / 2);
    sprite.material.map?.dispose();
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    sprite.material.map = t;
    sprite.material.needsUpdate = true;
    sprite.scale.set(c.width / 480, c.height / 480, 1);
  };
  draw();
  return { sprite, draw };
}

export interface Loop {
  /** Ask for one more frame (after a change while paused or still). */
  poke(): void;
  dispose(): void;
}

/**
 * Renders only while the canvas is on screen and the tab is visible.
 * While paused it renders a single still frame whenever something changes.
 * `onFrame` gets the frame time so a scene can measure its speed.
 */
export function startLoop(
  canvas: HTMLCanvasElement,
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  motion: Motion,
  step: (t: number, dt: number) => void,
  onFrame?: (dtMs: number) => void,
): Loop {
  let onScreen = false, dirty = true, t = 0, last = performance.now(), raf = 0, alive = true;
  const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; dirty = true; });
  io.observe(canvas);
  const size = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    dirty = true;
  };
  const ro = new ResizeObserver(size);
  ro.observe(canvas);
  size();
  const frame = (now: number) => {
    if (!alive) return;
    const dtMs = now - last;
    last = now;
    if (onScreen && !document.hidden && (!motion.paused() || dirty)) {
      if (!motion.paused()) { t += Math.min(dtMs / 1000, 0.05); onFrame?.(dtMs); }
      step(t, dtMs / 1000);
      renderer.render(scene, camera);
      dirty = false;
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return {
    poke: () => { dirty = true; },
    dispose: () => {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
        mats.forEach((mat) => { (mat as THREE.MeshBasicMaterial).map?.dispose(); mat.dispose(); });
      });
      renderer.dispose();
    },
  };
}
