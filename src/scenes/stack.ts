// The hero's Stack: the parts of the stack he works in, joined by links with pulses running along them.
// Spec §6.1. Data: src/data/stack.ts.
import { stackLinks, stackNodes } from '../data/stack';
import { COLORS, THREE, createRenderer, isPhone, label, metal, startLoop, studio, type Motion } from './shared';

export interface StackOptions {
  motion: Motion;
  /** Called with each frame time (ms) while moving, for the speed check. */
  onFrame?: (dtMs: number) => void;
}

export function mountStack(canvas: HTMLCanvasElement, opts: StackOptions) {
  const renderer = createRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, isPhone() ? 10.5 : 8.6);
  studio(renderer, scene);

  const g = new THREE.Group();
  scene.add(g);
  type Node = { mesh: THREE.Mesh; label: ReturnType<typeof label>; links: Link[] };
  type Link = { a: string; b: string; curve: THREE.QuadraticBezierCurve3; tube: THREE.Mesh<THREE.TubeGeometry, THREE.MeshBasicMaterial>; dot: THREE.Mesh; off: number };
  const nodes = new Map<string, Node>();
  const meshes: THREE.Mesh[] = [];

  for (const n of stackNodes) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(n.hub ? 0.34 : 0.17, 48, 48), metal(n.hub ? {} : { roughness: 0.22 }));
    mesh.position.set(...n.pos);
    mesh.userData.id = n.id;
    g.add(mesh);
    meshes.push(mesh);
    const l = label(isPhone() ? n.short : n.label, COLORS.muted, isPhone() ? 78 : 46); // phones show fewer, larger words
    l.sprite.position.set(n.pos[0], n.pos[1] + (n.hub ? 0.5 : 0.3), n.pos[2]);
    g.add(l.sprite);
    nodes.set(n.id, { mesh, label: l, links: [] });
  }

  const links: Link[] = stackLinks.map(([a, b], i) => {
    const A = nodes.get(a)!.mesh.position.clone(), B = nodes.get(b)!.mesh.position.clone();
    const mid = A.clone().add(B).multiplyScalar(0.5).add(new THREE.Vector3(0, 0.25, 0.35));
    const curve = new THREE.QuadraticBezierCurve3(A, mid, B);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.007, 6), new THREE.MeshBasicMaterial({ color: COLORS.line, transparent: true, opacity: 0.85 }));
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), new THREE.MeshBasicMaterial({ color: COLORS.pulse }));
    g.add(tube, dot);
    const link = { a, b, curve, tube, dot, off: i * 0.37 };
    nodes.get(a)!.links.push(link);
    nodes.get(b)!.links.push(link);
    return link;
  });

  // Hover a part: its links and neighbours light up in gold, the rest fade back.
  const ray = new THREE.Raycaster(), pointer = new THREE.Vector2();
  let hover: string | null = null, mx = 0, my = 0;
  const highlight = (id: string | null) => {
    hover = id;
    canvas.style.cursor = id ? 'pointer' : 'default';
    for (const L of links) {
      const on = !id || L.a === id || L.b === id;
      L.tube.material.color.set(id && on ? COLORS.gold : COLORS.line);
      L.tube.material.opacity = on ? 0.9 : 0.25;
      L.dot.visible = on;
    }
    for (const [k, n] of nodes) {
      const near = !id || k === id || n.links.some((L) => L.a === id || L.b === id);
      n.label.sprite.material.opacity = near ? 1 : 0.3;
      n.label.draw(k === id ? COLORS.ink : COLORS.muted);
    }
    loop.poke();
  };
  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
    mx = pointer.x; my = pointer.y;
    ray.setFromCamera(pointer, camera);
    const id = (ray.intersectObjects(meshes)[0]?.object.userData.id as string) ?? null;
    if (id !== hover) highlight(id);
    else loop.poke();
  };
  const onLeave = () => { mx = my = 0; if (hover) highlight(null); };
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerleave', onLeave);
  document.fonts?.ready.then(() => { for (const n of nodes.values()) n.label.draw(); loop.poke(); });

  const loop = startLoop(canvas, renderer, camera, scene, opts.motion, (t) => {
    for (const L of links) L.dot.position.copy(L.curve.getPointAt((t * 0.35 + L.off) % 1));
    const sway = opts.motion.paused() ? 0 : Math.sin(t * 0.15) * 0.3;
    g.rotation.y += (sway + mx * 0.25 - g.rotation.y) * 0.05;
    g.rotation.x += (-my * 0.1 - g.rotation.x) * 0.05;
    // Handover: as the hero scrolls away, the Stack drifts up and fades out.
    const fade = Math.min(1, scrollY / (innerHeight * 0.8));
    g.position.y = fade * 1.2;
    canvas.style.opacity = String(1 - fade * 0.85);
  }, opts.onFrame);

  const onScroll = () => loop.poke();
  addEventListener('scroll', onScroll, { passive: true });

  return {
    poke: loop.poke,
    dispose() {
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      removeEventListener('scroll', onScroll);
      loop.dispose();
    },
  };
}
