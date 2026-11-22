// Build-time images drawn from the same data as the page: the share image (og.png) and the home-screen icon.
// Rendered with resvg, so they never go out of date. Fonts: src/assets/fonts (SIL Open Font Licence).
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { profile } from '../data/profile';
import { stackSvgInner } from './stackSvg';

// Resolved from the project root: this file is bundled before it runs, so import.meta.url is not its source path.
const font = (name: string) => join(process.cwd(), 'src/assets/fonts', name);
const fontFiles = [font('CormorantGaramond.ttf'), font('CormorantGaramond-Italic.ttf'), font('Inter.ttf')];

const render = (svg: string, width: number) =>
  new Resvg(svg, { fitTo: { mode: 'width', value: width }, font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Inter' } }).render().asPng();

const background = `
  <defs><radialGradient id="bg" cx="72%" cy="30%" r="90%"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#f3f3f1"/><stop offset="1" stop-color="#e6e6e3"/></radialGradient></defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>`;

export function shareImage(): Buffer {
  const diagram = stackSvgInner({ width: 600, height: 520, scale: 110, fontFamily: 'Inter', fontSize: 14 });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    ${background}
    <text x="72" y="118" font-family="Inter" font-weight="500" font-size="17" letter-spacing="3.5" fill="#765b35">${profile.role.toUpperCase().replace(/&/g, '&amp;')}</text>
    <text x="64" y="262" font-family="Cormorant Garamond" font-weight="300" font-size="122" fill="#121212">${profile.firstName}</text>
    <text x="128" y="376" font-family="Cormorant Garamond" font-style="italic" font-weight="300" font-size="122" fill="#8a6d43">${profile.lastName}</text>
    <rect x="72" y="430" width="110" height="2" fill="#8a6d43"/>
    <text x="72" y="490" font-family="Inter" font-size="24" fill="#434343">.NET · React · Azure · agentic AI (experimental)</text>
    <text x="72" y="566" font-family="Inter" font-weight="500" font-size="20" letter-spacing="3" fill="#5e5e5e">SHASHINTHA.DEV</text>
    <g transform="translate(610 70) scale(0.92)">${diagram}</g>
  </svg>`;
  return render(svg, 1200);
}

export function touchIcon(): Buffer {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
    ${background}
    <text x="90" y="112" text-anchor="middle" font-family="Cormorant Garamond" font-weight="300" font-size="64" letter-spacing="6" fill="#765b35">S·E</text>
  </svg>`;
  return render(svg, 180);
}
