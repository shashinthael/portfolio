import { describe, expect, it } from 'vitest';
import { indexFromProgress, isTooSlow, median, progressForIndex, wrap } from '../../src/lib/motion';

describe('speed check', () => {
  it('takes the median frame time', () => {
    expect(median([16, 17, 100, 16, 18])).toBe(17);
    expect(median([10, 20])).toBe(15);
    expect(median([])).toBe(0);
  });

  it('falls back below 30 fps, ignoring a few slow frames', () => {
    expect(isTooSlow(Array(60).fill(16.7))).toBe(false);
    expect(isTooSlow([...Array(50).fill(16.7), ...Array(10).fill(200)])).toBe(false);
    expect(isTooSlow(Array(40).fill(45))).toBe(true);
  });

  it('does not decide on too few frames', () => {
    expect(isTooSlow([90, 90, 90])).toBe(false);
  });
});

describe('gallery position', () => {
  it('maps scroll progress to one project per step', () => {
    expect(indexFromProgress(-0.2, 4)).toBe(0);
    expect(indexFromProgress(0.1, 4)).toBe(0);
    expect(indexFromProgress(0.3, 4)).toBe(1);
    expect(indexFromProgress(0.6, 4)).toBe(2);
    expect(indexFromProgress(0.99, 4)).toBe(3);
    expect(indexFromProgress(1.4, 4)).toBe(3);
  });

  it('scrolls to the middle of a project step, which maps back to the same project', () => {
    for (let i = 0; i < 4; i++) expect(indexFromProgress(progressForIndex(i, 4), 4)).toBe(i);
  });

  it('wraps Prev and Next around the ends', () => {
    expect(wrap(-1, 4)).toBe(3);
    expect(wrap(4, 4)).toBe(0);
  });
});
