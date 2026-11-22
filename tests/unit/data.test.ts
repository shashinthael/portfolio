import { describe, expect, it } from 'vitest';
import { facts } from '../../src/data/profile';
import { featured } from '../../src/data/projects';
import { stackLinks, stackNodes } from '../../src/data/stack';
import { stackSvgInner } from '../../src/lib/stackSvg';

describe('content', () => {
  it('has the five Fact strip facts the Scan test needs, in order', () => {
    expect(facts.map((f) => f.label)).toEqual(['Now', 'Stack', 'Based', 'Right to work', 'Education']);
  });

  it('features exactly four projects in the decided order', () => {
    expect(featured.map((p) => p.title)).toEqual(['AXD-Fraud', 'Edirisooriya Stores', 'Zeylan', 'Kivorana']);
  });

  it('gives every project a kind, words and a stack', () => {
    for (const p of featured) {
      expect(p.kind).toBeTruthy();
      expect(p.paragraphs.length).toBeGreaterThan(0);
      expect(p.stack.length).toBeGreaterThan(0);
    }
  });
});

describe('stack', () => {
  const ids = new Set(stackNodes.map((n) => n.id));

  it('has unique node ids and exactly one hub', () => {
    expect(ids.size).toBe(stackNodes.length);
    expect(stackNodes.filter((n) => n.hub)).toHaveLength(1);
  });

  it('only links nodes that exist, with no duplicate links', () => {
    for (const [a, b] of stackLinks) {
      expect(ids.has(a), a).toBe(true);
      expect(ids.has(b), b).toBe(true);
    }
    const keys = stackLinks.map(([a, b]) => [a, b].sort().join('-'));
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('connects every node to the rest', () => {
    const linked = new Set(stackLinks.flat());
    expect(stackNodes.filter((n) => !linked.has(n.id))).toEqual([]);
  });

  it('keeps the AI node labelled experimental', () => {
    const ai = stackNodes.find((n) => n.id === 'ai')!;
    expect(ai.label).toMatch(/experimental/);
    expect(ai.short).toMatch(/exp/);
  });

  it('draws the SVG fallback with every node and link', () => {
    const svg = stackSvgInner();
    expect(svg.match(/<circle/g)).toHaveLength(stackNodes.length);
    expect(svg.match(/<path/g)).toHaveLength(stackLinks.length);
    expect(svg).toContain('.NET microservices');
  });
});
