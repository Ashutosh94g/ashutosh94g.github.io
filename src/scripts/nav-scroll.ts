/**
 * nav-scroll.ts — toggles data-scrolled="true" on .nav-shell once the page
 * has scrolled past a small threshold. Pure CSS handles the glass blur.
 */

const THRESHOLD = 12;

function attach() {
  const shell = document.querySelector<HTMLElement>('.nav-shell');
  if (!shell) return;

  let raf = 0;

  const update = () => {
    const scrolled = window.scrollY > THRESHOLD;
    if ((shell.dataset.scrolled === 'true') !== scrolled) {
      shell.dataset.scrolled = scrolled ? 'true' : 'false';
    }
    raf = 0;
  };

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
}

attach();
document.addEventListener('astro:page-load', attach);
