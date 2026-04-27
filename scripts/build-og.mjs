#!/usr/bin/env node
/**
 * Generate OpenGraph images:
 *  - public/og/default.png (site-wide)
 *  - public/og/<slug>.png  (one per case study, with title + accent)
 *
 * Renders SVG templates through @resvg/resvg-js and writes 1200x630 PNGs.
 * Idempotent — re-run after copy edits.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const ogDir = resolve(repoRoot, 'public', 'og');

const accentPalettes = {
  indigo: { from: '#818cf8', to: '#6366f1', deep: '#312e81', label: '#a5b4fc' },
  amber: { from: '#fbbf24', to: '#f59e0b', deep: '#78350f', label: '#fcd34d' },
  emerald: { from: '#34d399', to: '#10b981', deep: '#064e3b', label: '#6ee7b7' },
};

const cases = [
  {
    slug: 'tuxedo-grpc',
    accent: 'indigo',
    eyebrow: 'CASE STUDY 02 \u00B7 PLATFORM ENGINEERING',
    title: 'Tuxedo \u2192 gRPC: a migration framework',
    subtitle: 'for Tier-1 telecom carriers',
    tag: 'Lex/Yacc \u00B7 Protocol Shim \u00B7 HAProxy + Consul + Nomad',
  },
  {
    slug: 'atlas-knowledge-engine',
    accent: 'amber',
    eyebrow: 'CASE STUDY 01 \u00B7 KNOWLEDGE ENGINEERING',
    title: 'Atlas: a knowledge engine for an',
    subtitle: '18M-line legacy backend',
    tag: '5-phase pipeline \u00B7 1,200+ atoms \u00B7 99.6% truth-grounded',
  },
  {
    slug: 'compiler-driven-quality',
    accent: 'emerald',
    eyebrow: 'CASE STUDY 03 \u00B7 PARSER-DRIVEN TOOLING',
    title: 'Compiler-driven',
    subtitle: 'code quality',
    tag: 'Lex/Yacc \u00B7 80% defects at build \u00B7 48hr \u2192 40min',
  },
];

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function defaultSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#05070d"/>
      <stop offset="1" stop-color="#0b0e18"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="0" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#6366f1"/>
      <stop offset="0.5" stop-color="#8b5cf6"/>
      <stop offset="1" stop-color="#ec4899"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.18" cy="0" r="0.75">
      <stop offset="0" stop-color="#8b5cf6" stop-opacity="0.42"/>
      <stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow-corner" cx="0.95" cy="0.05" r="0.65">
      <stop offset="0" stop-color="#ec4899" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#ec4899" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow-bottom" cx="0.5" cy="1" r="0.6">
      <stop offset="0" stop-color="#6366f1" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#6366f1" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="headline-grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#c4b5fd"/>
      <stop offset="0.55" stop-color="#a78bfa"/>
      <stop offset="1" stop-color="#fda4af"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow-corner)"/>
  <rect width="1200" height="630" fill="url(#glow-bottom)"/>
  <rect x="0" y="0" width="6" height="630" fill="url(#accent)"/>

  <g opacity="0.10">
    ${dotPattern(60, 60, 1080, 510)}
  </g>

  <g transform="translate(80,140)">
    <rect x="0" y="0" width="14" height="14" rx="2" fill="#a78bfa"/>
    <text x="26" y="12" font-family="JetBrains Mono, Consolas, monospace" font-size="20" font-weight="500" fill="#a78bfa" letter-spacing="4">
      ASHUTOSH MODI &#183; SOFTWARE DEVELOPER
    </text>
  </g>

  <text x="80" y="270" font-family="Source Serif 4, Georgia, serif" font-size="60" font-weight="600" fill="#f5f5f7" letter-spacing="-1.5">
    I build platform infrastructure
  </text>
  <text x="80" y="345" font-family="Source Serif 4, Georgia, serif" font-size="60" font-weight="600" fill="url(#headline-grad)" letter-spacing="-1.5">
    for Tier-1 telecom carriers.
  </text>

  <line x1="80" y1="410" x2="220" y2="410" stroke="#a78bfa" stroke-width="3"/>

  <text x="80" y="455" font-family="Inter, system-ui, sans-serif" font-size="24" font-weight="400" fill="#c8c8d1">
    Tuxedo &#8594; gRPC framework &#183; AI development platform &#183; parser-driven tooling
  </text>

  <text x="80" y="560" font-family="JetBrains Mono, Consolas, monospace" font-size="18" font-weight="500" fill="#6e6e76" letter-spacing="3">
    AMDOCS &#183; GURGAON &#183; ASHUTOSH94G.GITHUB.IO
  </text>
</svg>`;
}

function dotPattern(x, y, w, h) {
  const stepX = 28;
  const stepY = 28;
  const dots = [];
  for (let dx = 0; dx <= w; dx += stepX) {
    for (let dy = 0; dy <= h; dy += stepY) {
      dots.push(`<circle cx="${x + dx}" cy="${y + dy}" r="1.2" fill="#cbd5e1"/>`);
    }
  }
  return dots.join('');
}

function caseSvg({ accent, eyebrow, title, subtitle, tag }) {
  const palette = accentPalettes[accent] ?? accentPalettes.indigo;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#0b1024"/>
      <stop offset="1" stop-color="${palette.deep}"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="0" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${palette.from}"/>
      <stop offset="1" stop-color="${palette.to}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.18" cy="0" r="0.7">
      <stop offset="0" stop-color="${palette.from}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${palette.from}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow-corner" cx="1" cy="1" r="0.6">
      <stop offset="0" stop-color="${palette.from}" stop-opacity="0.18"/>
      <stop offset="1" stop-color="${palette.from}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow-corner)"/>
  <rect x="0" y="0" width="6" height="630" fill="url(#accent)"/>

  <g opacity="0.16">
    ${dotPattern(80, 60, 1040, 510)}
  </g>

  <g transform="translate(80,90)">
    <rect x="0" y="0" width="14" height="14" rx="2" fill="${palette.from}"/>
    <text x="26" y="12" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="600" fill="${palette.label}" letter-spacing="3">
      ${escapeXml(eyebrow)}
    </text>
  </g>

  <text x="80" y="270" font-family="Source Serif 4, Georgia, serif" font-size="68" font-weight="600" fill="#f8fafc" letter-spacing="-1">
    ${escapeXml(title)}
  </text>
  <text x="80" y="350" font-family="Source Serif 4, Georgia, serif" font-size="68" font-weight="600" fill="#f8fafc" letter-spacing="-1">
    ${escapeXml(subtitle)}
  </text>

  <line x1="80" y1="420" x2="220" y2="420" stroke="${palette.from}" stroke-width="3"/>

  <text x="80" y="465" font-family="Inter, system-ui, sans-serif" font-size="24" font-weight="500" fill="#cbd5e1">
    ${escapeXml(tag)}
  </text>

  <text x="80" y="560" font-family="Inter, system-ui, sans-serif" font-size="20" font-weight="500" fill="#94a3b8" letter-spacing="2">
    ASHUTOSH MODI &#183; ASHUTOSH94G.GITHUB.IO
  </text>
</svg>`;
}

function renderToFile(svg, outPath) {
  mkdirSync(dirname(outPath), { recursive: true });
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    background: '#05070d',
    font: { loadSystemFonts: true },
  });
  const pngData = resvg.render().asPng();
  writeFileSync(outPath, pngData);
  console.log(`[og] Wrote ${outPath} (${(pngData.length / 1024).toFixed(1)} KB)`);
}

function main() {
  renderToFile(defaultSvg(), resolve(ogDir, 'default.png'));
  for (const c of cases) {
    renderToFile(caseSvg(c), resolve(ogDir, `${c.slug}.png`));
  }
}

main();
