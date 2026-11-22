// Small pure helpers behind the 3D, kept apart so they can be unit-tested.

/** Median of a list of numbers (frame times in ms). */
export function median(values: number[]): number {
  if (!values.length) return 0;
  const s = [...values].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** The 3D falls back when the median frame time over the first 2 s means fewer than `minFps` frames a second. */
export function isTooSlow(frameTimesMs: number[], minFps = 30): boolean {
  if (frameTimesMs.length < 10) return false;
  return median(frameTimesMs) > 1000 / minFps;
}

/** Which Featured project is in front, for scroll progress 0..1 through the pinned Gallery section. */
export function indexFromProgress(progress: number, count: number): number {
  if (progress <= 0) return 0;
  if (progress >= 1) return count - 1;
  return Math.min(count - 1, Math.floor(progress * count));
}

/** The scroll progress (0..1) that puts project `index` in front: the middle of its step. */
export function progressForIndex(index: number, count: number): number {
  const i = ((index % count) + count) % count;
  return (i + 0.5) / count;
}

/** Wrap an index into 0..count-1. */
export const wrap = (index: number, count: number) => ((index % count) + count) % count;
