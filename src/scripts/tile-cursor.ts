/**
 * tile-cursor.ts — tracks the cursor over .tile elements and sets
 * --cursor-x / --cursor-y custom properties so the radial spotlight in
 * `.tile::after` follows the pointer.
 *
 * RAF-throttled. Disabled when prefers-reduced-motion or pointer is coarse.
 */

type Bound = HTMLElement & { __tileBound?: boolean };

function bind(el: Bound) {
  if (el.__tileBound) return;
  el.__tileBound = true;

  let raf = 0;
  let nx = 50;
  let ny = 50;

  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    nx = ((e.clientX - rect.left) / rect.width) * 100;
    ny = ((e.clientY - rect.top) / rect.height) * 100;
    if (!raf) {
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--cursor-x', `${nx.toFixed(1)}%`);
        el.style.setProperty('--cursor-y', `${ny.toFixed(1)}%`);
        raf = 0;
      });
    }
  };

  const onLeave = () => {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    el.style.setProperty('--cursor-x', '50%');
    el.style.setProperty('--cursor-y', '50%');
  };

  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);
}

function init() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll<Bound>('.tile').forEach(bind);
}

init();
document.addEventListener('astro:page-load', init);

export {};
