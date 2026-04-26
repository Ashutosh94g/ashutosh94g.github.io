#!/usr/bin/env node
/**
 * Generate the default OpenGraph image at public/og/default.png.
 *
 * Renders an SVG template through @resvg/resvg-js and writes a 1200x630 PNG.
 * Idempotent — re-run after copy edits.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const outPath = resolve(repoRoot, 'public', 'og', 'default.png');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#0f172a"/>
      <stop offset="1" stop-color="#1e1b4b"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="0" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#818cf8"/>
      <stop offset="1" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="6" height="630" fill="url(#accent)"/>

  <text x="80" y="160" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="500" fill="#a5b4fc" letter-spacing="3">
    ASHUTOSH MODI &#183; ASHUTOSH94G.GITHUB.IO
  </text>

  <text x="80" y="280" font-family="Source Serif 4, Georgia, serif" font-size="64" font-weight="600" fill="#f8fafc" letter-spacing="-1">
    I build platform infrastructure
  </text>
  <text x="80" y="360" font-family="Source Serif 4, Georgia, serif" font-size="64" font-weight="600" fill="#f8fafc" letter-spacing="-1">
    for Tier-1 telecom carriers.
  </text>

  <text x="80" y="450" font-family="Inter, system-ui, sans-serif" font-size="26" font-weight="400" fill="#cbd5e1">
    Distributed systems &#183; Parser-driven tooling &#183; Internal AI platforms
  </text>

  <text x="80" y="560" font-family="Inter, system-ui, sans-serif" font-size="20" font-weight="500" fill="#94a3b8" letter-spacing="2">
    SOFTWARE DEVELOPER &#183; AMDOCS &#183; GURGAON, INDIA
  </text>
</svg>
`;

function main() {
  mkdirSync(dirname(outPath), { recursive: true });
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    background: '#0f172a',
    font: { loadSystemFonts: true },
  });
  const pngData = resvg.render().asPng();
  writeFileSync(outPath, pngData);
  console.log(`[og] Wrote ${outPath} (${(pngData.length / 1024).toFixed(1)} KB)`);
}

main();
