/**
 * magnetic.ts — vanilla magnetic-cursor effect for .magnetic / .magnetic-strong.
 *
 * On mousemove, sets --mx / --my custom properties (CSS uses them via
 * translate3d). RAF-throttled, single shared listener pool.
 *
 * Strength: pulls toward the cursor at ~0.35 amplitude relative to element
 * half-size. Resets on mouseleave. Disabled under prefers-reduced-motion.
 */

const STRENGTH = 0.35;
const SELECTOR = '.magnetic, .magnetic-strong';

type Bound = HTMLElement & { __magneticBound?: boolean };

function bind(el: Bound) {
  if (el.__magneticBound) return;
  el.__magneticBound = true;

  let raf = 0;
  let tx = 0;
  let ty = 0;

  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    tx = (e.clientX - cx) * STRENGTH;
    ty = (e.clientY - cy) * STRENGTH;
    if (!raf) {
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', String(tx.toFixed(2)));
        el.style.setProperty('--my', String(ty.toFixed(2)));
        raf = 0;
      });
    }
  };

  const onLeave = () => {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    el.style.setProperty('--mx', '0');
    el.style.setProperty('--my', '0');
  };

  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);
}

function init() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return; // skip on touch

  document.querySelectorAll<Bound>(SELECTOR).forEach(bind);
}

init();
document.addEventListener('astro:page-load', init);

export {};
