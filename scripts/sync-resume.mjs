#!/usr/bin/env node
/**
 * Sync the latest resume PDF into public/resume.pdf so the static site
 * always serves the current build.
 *
 * Source location is controlled by the RESUME_SRC env var, with a sensible
 * default for the local Windows checkout. Runs are idempotent and never fail
 * the build if the source is missing — that lets CI builds proceed against
 * whatever resume.pdf was last committed into the repo.
 */
import { existsSync, copyFileSync, statSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

const DEFAULT_SRC =
  process.platform === 'win32'
    ? 'C:\\Users\\modia\\Resume\\resume.pdf'
    : `${process.env.HOME ?? ''}/Resume/resume.pdf`;

const src = process.env.RESUME_SRC ?? DEFAULT_SRC;
const dest = join(repoRoot, 'public', 'resume.pdf');

function fmtKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function main() {
  if (!existsSync(src)) {
    console.warn(`[resume-sync] Source not found: ${src}`);
    if (existsSync(dest)) {
      console.warn(
        `[resume-sync] Keeping existing ${dest} (${fmtKb(statSync(dest).size)})`,
      );
    } else {
      console.warn(
        `[resume-sync] No resume committed yet; the live site will 404 on /resume.pdf until one is added.`,
      );
    }
    return;
  }

  mkdirSync(dirname(dest), { recursive: true });

  const srcStat = statSync(src);
  const before = existsSync(dest) ? statSync(dest) : null;

  copyFileSync(src, dest);

  const after = statSync(dest);

  if (before && before.size === after.size && before.mtimeMs >= srcStat.mtimeMs) {
    console.log(`[resume-sync] Already up to date (${fmtKb(after.size)})`);
  } else if (before) {
    console.log(
      `[resume-sync] Updated ${dest}: ${fmtKb(before.size)} -> ${fmtKb(after.size)}`,
    );
  } else {
    console.log(`[resume-sync] Created ${dest} (${fmtKb(after.size)})`);
  }
}

try {
  main();
} catch (err) {
  console.error('[resume-sync] Unexpected error:', err);
  // exit 0 anyway — keep CI green
  process.exit(0);
}
