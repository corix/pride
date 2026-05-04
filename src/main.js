import './style.css';

/** Hero pier scene — WebP via imagetools at build/dev (source: 16125918900_12c76e5549_o.jpg). */
import heroPhotoLg from './assets/photos/16125918900_12c76e5549_o.jpg?w=1920&format=webp&quality=78';
import heroPhotoSm from './assets/photos/16125918900_12c76e5549_o.jpg?w=960&format=webp&quality=78';

const heroSection = document.querySelector('.hero');
const heroBgEl = document.querySelector('.hero__bg');
if (heroBgEl) {
  const prefersSmallData = matchMedia('(prefers-reduced-data: reduce)').matches;
  const heroUrl = prefersSmallData ? heroPhotoSm : heroPhotoLg;
  heroBgEl.style.setProperty('--hero-photo', `url("${heroUrl}")`);
}

/** Subtle scroll parallax on hero photo (::before); disabled when reduced motion. */
const reduceMotionMq = matchMedia('(prefers-reduced-motion: reduce)');
if (heroBgEl instanceof HTMLElement && heroSection instanceof HTMLElement) {
  const parallaxStrength = 0.09;
  const syncHeroParallax = () => {
    if (reduceMotionMq.matches) {
      heroBgEl.style.removeProperty('--hero-parallax-y');
      return;
    }
    const { top } = heroSection.getBoundingClientRect();
    heroBgEl.style.setProperty('--hero-parallax-y', `${-top * parallaxStrength}px`);
  };
  let parallaxRaf = 0;
  const onScrollOrResize = () => {
    if (parallaxRaf) return;
    parallaxRaf = requestAnimationFrame(() => {
      parallaxRaf = 0;
      syncHeroParallax();
    });
  };
  syncHeroParallax();
  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize);
  reduceMotionMq.addEventListener('change', syncHeroParallax);
}

const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');

if (toggle && nav) {
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('is-open');
    setOpen(!isOpen);
  });

  nav.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      setOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
}
