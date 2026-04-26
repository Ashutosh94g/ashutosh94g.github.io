#!/usr/bin/env node
/**
 * Generate the favicon set from the master SVG:
 *  - public/favicon-16.png
 *  - public/favicon-32.png
 *  - public/favicon-192.png      (Android home-screen)
 *  - public/apple-touch-icon.png  (180x180, iOS)
 *
 * Idempotent — re-run after editing public/favicon.svg.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const svgPath = resolve(repoRoot, 'public', 'favicon.svg');
const publicDir = resolve(repoRoot, 'public');

const sizes = [
  { name: 'favicon-16.png', size: 16 },
  { name: 'favicon-32.png', size: 32 },
  { name: 'favicon-192.png', size: 192 },
  { name: 'apple-touch-icon.png', size: 180 },
];

function main() {
  mkdirSync(publicDir, { recursive: true });
  const svg = readFileSync(svgPath, 'utf8');
  for (const { name, size } of sizes) {
    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: size },
      background: 'rgba(0,0,0,0)',
    });
    const png = resvg.render().asPng();
    const outPath = resolve(publicDir, name);
    writeFileSync(outPath, png);
    console.log(`[favicon] Wrote ${outPath} (${size}x${size}, ${(png.length / 1024).toFixed(1)} KB)`);
  }
}

main();
