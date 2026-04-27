/**
 * nav-scroll.ts — toggles data-scrolled="true" on .nav-shell once the page
 * has scrolled past a small threshold. Pure CSS handles the glass blur.
 */

const THRESHOLD = 12;

let raf = 0;
let isListening = false;

function update() {
  const shell = document.querySelector<HTMLElement>('.nav-shell');
  if (!shell) {
    raf = 0;
    return;
  }

  const scrolled = window.scrollY > THRESHOLD;
  if ((shell.dataset.scrolled === 'true') !== scrolled) {
    shell.dataset.scrolled = scrolled ? 'true' : 'false';
  }
  raf = 0;
}

function onScroll() {
  if (!raf) raf = requestAnimationFrame(update);
}

function attachMobileMenu() {
  document.querySelectorAll<HTMLDetailsElement>('.nav-mobile-menu').forEach((menu) => {
    if (menu.dataset.navReady === 'true') return;

    menu.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest('.nav-link')) {
        menu.open = false;
      }
    });

    menu.dataset.navReady = 'true';
  });
}

function attach() {
  update();
  attachMobileMenu();
  if (isListening) return;

  window.addEventListener('scroll', onScroll, { passive: true });
  isListening = true;
}

attach();
document.addEventListener('astro:page-load', attach);
