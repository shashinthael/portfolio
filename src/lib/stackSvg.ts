import { stackLinks, stackNodes } from '../data/stack';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export interface StackSvgOptions {
  width?: number;
  height?: number;
  /** Scene units → pixels. */
  scale?: number;
  fontFamily?: string;
  fontSize?: number;
  colors?: { line: string; node: string; stroke: string; text: string };
}

/**
 * The Stack as a still diagram: the no-WebGL fallback in the hero and the drawing on the share image.
 * Returns the inner SVG markup for a viewBox of `width × height`.
 */
export function stackSvgInner(o: StackSvgOptions = {}): string {
  const { width = 600, height = 520, scale = 120, fontFamily = 'Inter, sans-serif', fontSize = 13 } = o;
  const c = o.colors ?? { line: '#b8b8b4', node: '#e3cfa8', stroke: '#9c8257', text: '#5e5e5e' };
  const at = (id: string) => {
    const n = stackNodes.find((n) => n.id === id)!;
    return [width / 2 + n.pos[0] * scale, height / 2 - n.pos[1] * scale * 0.875] as const;
  };
  let out = '';
  for (const [a, b] of stackLinks) {
    const [x1, y1] = at(a), [x2, y2] = at(b);
    out += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} Q${((x1 + x2) / 2).toFixed(1)} ${((y1 + y2) / 2 - 24).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${c.line}" stroke-width="1.2"/>`;
  }
  for (const n of stackNodes) {
    const [x, y] = at(n.id), r = n.hub ? 14 : 7;
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${c.node}" stroke="${c.stroke}"/>`;
    out += `<text x="${x.toFixed(1)}" y="${(y - r - 8).toFixed(1)}" text-anchor="middle" font-family="${fontFamily}" font-size="${fontSize}" fill="${c.text}">${esc(n.label)}</text>`;
  }
  return out;
}
