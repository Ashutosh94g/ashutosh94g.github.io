/**
 * reveal.ts — single shared IntersectionObserver that flips
 * data-revealed="true" on .reveal elements when they enter the viewport.
 *
 * The CSS in global.css drives the actual transition (opacity + translateY).
 * Respects prefers-reduced-motion via the global media-query override.
 *
 * Re-runs on Astro view transitions via astro:page-load so that
 * dynamically-added elements after navigation are observed too.
 */

const REVEAL_SELECTOR = '.reveal:not([data-revealed="true"])';

let observer: IntersectionObserver | null = null;

function ensureObserver(): IntersectionObserver {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.dataset.revealed = 'true';
        observer!.unobserve(el);
      }
    },
    {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.08,
    },
  );

  return observer;
}

function reveal(): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);

  if (reduced) {
    targets.forEach((el) => {
      el.dataset.revealed = 'true';
    });
    return;
  }

  const obs = ensureObserver();
  targets.forEach((el) => {
    if (!el.dataset.revealObserved) {
      obs.observe(el);
      el.dataset.revealObserved = 'true';
    }
  });
}

reveal();
document.addEventListener('astro:page-load', reveal);
