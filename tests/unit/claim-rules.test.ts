// The claim rules (docs/portfolio-spec.md §2), checked against every string the site shows,
// including the 3D labels and the share image text. Fails the build when a copy change breaks a rule.
import { describe, expect, it } from 'vitest';
import * as profileData from '../../src/data/profile';
import * as experienceData from '../../src/data/experience';
import * as projectData from '../../src/data/projects';
import * as educationData from '../../src/data/education';
import * as stackData from '../../src/data/stack';

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => strings(v, out));
  return out;
}

const all = strings([profileData, experienceData, projectData, educationData, stackData]);
// Links are addresses, not claims.
const text = all.filter((s) => !/^(https?:|mailto:|\/|#)/.test(s));
const strip = (s: string) => s.replace(/https?:\/\/\S+/g, '');

const AI = /\b(AI|agentic|OpenAI|AI Foundry|LLM)\b/i;
const OVERCLAIM = /\b(led|lead|leading|delivered|in production|production-ready|deployed)\b/i;

describe('claim rules', () => {
  it('describes the AI work as experimental only', () => {
    const bad = text.filter((s) => AI.test(s) && OVERCLAIM.test(s));
    expect(bad).toEqual([]);
  });

  it('never mentions MCP', () => {
    expect(text.filter((s) => /\bMCP\b/.test(s))).toEqual([]);
  });

  it('allows no numbers except dates, the visa date, the F1-score of 0.82 and product names', () => {
    const allowed = [
      /\b20(1\d|2\d)\b/g, // years, including the visa date (Nov 2028)
      /\b0\.82\b/g, // the dissertation's F1-score: the only metric
      /\bF1\b/g, // F1-score
      /\bD1\b/g, // Cloudflare D1, a product name
      /\b3D\b/g, // a description, not a metric
    ];
    const bad = text.filter((s) => {
      let t = strip(s);
      for (const re of allowed) t = t.replace(re, '');
      return /\d/.test(t);
    });
    expect(bad).toEqual([]);
  });

  it('never shows a phone number', () => {
    expect(all.filter((s) => /(\+44|\b07\d{3})[\d\s-]{6,}|tel:/i.test(s))).toEqual([]);
  });

  it('never claims Azure or Docker deployment for AXD-Fraud until he confirms where that version lives', () => {
    const axd = strings(projectData.featured.find((p) => p.id === 'axd-fraud'));
    expect(axd.filter((s) => /\b(Azure|Docker)\b/.test(s))).toEqual([]);
  });

  it('links no Market Price Forecasting code until it is found', () => {
    const lines = educationData.education.flatMap((d) => d.lines).filter((l) => /Market Price Forecasting/.test(l.text));
    expect(lines.every((l) => !l.linkTo)).toBe(true);
  });

  it('calls the Kivorana chat a scripted demo', () => {
    const kiv = strings(projectData.featured.find((p) => p.id === 'kivorana')).join(' ');
    expect(kiv).toMatch(/scripted demo/);
  });
});
