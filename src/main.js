import './style.css';

/** Hero — Jesse Major pier scene (original hero photo). */
import heroPhotoLg from './assets/photos/jesse-major-pier-flag-capes.png?w=1920&format=webp&quality=78';
import heroPhotoSm from './assets/photos/jesse-major-pier-flag-capes.png?w=960&format=webp&quality=78';

/** Bottom banner — Port Angeles pier waterfront scene. */
import bannerPhotoLg from './assets/photos/16125918900_12c76e5549_o.jpg?w=1920&format=webp&quality=78';
import bannerPhotoSm from './assets/photos/16125918900_12c76e5549_o.jpg?w=960&format=webp&quality=78';

import drone from './assets/photos/jesse-major-drone-circle.png?w=600;900;1400&format=webp&as=picture';
import parade from './assets/photos/jesse-major-pier-parade.png?w=480;800;1200&format=webp&as=picture';
import megaphone from './assets/photos/jesse-major-megaphone.png?w=480;800;1200&format=webp&as=picture';
import bo from './assets/photos/jesse-major-bo.png?w=480;800;1200&format=webp&as=picture';
import dog from './assets/photos/jesse-major-dog.png?w=480;800;1200&format=webp&as=picture';
import panflute from './assets/photos/jesse-major-panflute.png?w=480;800;1200&format=webp&as=picture';
import red from './assets/photos/jesse-major-red.png?w=480;800;1200&format=webp&as=picture';
import lineup from './assets/photos/2026-pride-of-pa-lineup.jpeg?w=480;800;1200&format=webp&as=picture';
import familyActivities from './assets/photos/2026-pride-of-pa-family-activities.jpeg?w=480;800;1200&format=webp&as=picture';
import beerGarden from './assets/photos/2026-pride-of-pa-family-beer-garden.jpeg?w=480;800;1200&format=webp&as=picture';
import yoga from './assets/photos/2026-pride-of-pa-yoga.jpeg?w=480;800;1200&format=webp&as=picture';

const photoMap = {
  'drone-circle': { pic: drone, sizes: '(max-width: 900px) 100vw, 420px' },
  'pier-parade': { pic: parade, sizes: '(max-width: 900px) 100vw, 340px' },
  megaphone: { pic: megaphone, sizes: '(max-width: 900px) 100vw, 340px' },
  bo: { pic: bo, sizes: '(max-width: 900px) 100vw, 340px' },
  dog: { pic: dog, sizes: '(max-width: 900px) 100vw, 340px' },
  panflute: { pic: panflute, sizes: '(max-width: 900px) 100vw, 340px' },
  red: { pic: red, sizes: '(max-width: 900px) 100vw, 340px' },
  lineup: { pic: lineup, sizes: '(max-width: 720px) 50vw, 25vw' },
  'family-activities': { pic: familyActivities, sizes: '(max-width: 720px) 50vw, 25vw' },
  'beer-garden': { pic: beerGarden, sizes: '(max-width: 720px) 50vw, 25vw' },
  yoga: { pic: yoga, sizes: '(max-width: 720px) 50vw, 25vw' },
};

document.querySelectorAll('img[data-photo]').forEach((img) => {
  const key = img.dataset.photo;
  const entry = photoMap[key];
  if (!entry) return;
  const { pic, sizes } = entry;
  if (pic.sources?.webp) img.srcset = pic.sources.webp;
  img.sizes = sizes;
  img.src = pic.img.src;
  if (pic.img.w) img.width = pic.img.w;
  if (pic.img.h) img.height = pic.img.h;
});

const heroSection = document.querySelector('.hero');
const heroBgEl = document.querySelector('.hero__bg');
const bannerBgEl = document.querySelector('.photo-banner__bg');

/** Wire a CSS background photo with fade-in once loaded. */
function wirePhotoBackground(bgEl, photoLg, photoSm) {
  if (!(bgEl instanceof HTMLElement)) return;
  const prefersSmallData = matchMedia('(prefers-reduced-data: reduce)').matches;
  const photoUrl = prefersSmallData ? photoSm : photoLg;
  bgEl.style.setProperty('--photo-bg', `url("${photoUrl}")`);

  const img = new Image();
  img.decoding = 'async';
  img.src = photoUrl;
  const reveal = () => bgEl.classList.add('photo-bg--ready');
  if (img.complete) {
    requestAnimationFrame(reveal);
  } else {
    img.addEventListener('load', reveal, { once: true });
    img.addEventListener('error', () => {}, { once: true });
  }
}

wirePhotoBackground(heroBgEl, heroPhotoLg, heroPhotoSm);
wirePhotoBackground(bannerBgEl, bannerPhotoLg, bannerPhotoSm);

/** Subtle scroll parallax on hero photo (::after); disabled when reduced motion. */
const reduceMotionMq = matchMedia('(prefers-reduced-motion: reduce)');
if (heroBgEl instanceof HTMLElement && heroSection instanceof HTMLElement) {
  const parallaxStrength = 0.09;
  const syncHeroParallax = () => {
    if (reduceMotionMq.matches) {
      heroBgEl.style.removeProperty('--photo-parallax-y');
      return;
    }
    const { top } = heroSection.getBoundingClientRect();
    heroBgEl.style.setProperty('--photo-parallax-y', `${-top * parallaxStrength}px`);
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

/** Volunteer page: show “open in new tab” only if Tally embed never gains height (blocked / failed). */
const volunteerExternal = document.querySelector('.volunteer-form__external');
const tallyIframe = document.querySelector('.tally-embed__iframe');
const tallyEmbedWrap = tallyIframe?.closest('.tally-embed');

if (volunteerExternal instanceof HTMLElement && tallyIframe instanceof HTMLIFrameElement) {
  const MIN_HEIGHT = 320;
  /** If the iframe never grows by this point, treat embed as failed (UX vs slow networks). */
  const FAIL_AFTER_MS = 1200;
  const POLL_MS = 400;

  volunteerExternal.setAttribute('aria-hidden', 'true');
  if (tallyEmbedWrap instanceof HTMLElement) {
    tallyEmbedWrap.setAttribute('aria-hidden', 'true');
  }

  const hideTallyEmbed = () => {
    if (tallyEmbedWrap instanceof HTMLElement) {
      tallyEmbedWrap.classList.add('volunteer-form__embed--hidden');
      tallyEmbedWrap.setAttribute('aria-hidden', 'true');
    }
  };

  const showTallyEmbed = () => {
    if (tallyEmbedWrap instanceof HTMLElement) {
      tallyEmbedWrap.classList.remove('volunteer-form__embed--hidden');
      tallyEmbedWrap.removeAttribute('aria-hidden');
    }
  };

  const showFallback = () => {
    volunteerExternal.classList.add('volunteer-form__external--show');
    volunteerExternal.removeAttribute('aria-hidden');
    hideTallyEmbed();
  };

  const hideFallback = () => {
    volunteerExternal.classList.remove('volunteer-form__external--show');
    volunteerExternal.setAttribute('aria-hidden', 'true');
    showTallyEmbed();
  };

  const healthy = () => tallyIframe.getBoundingClientRect().height >= MIN_HEIGHT;

  let failTimer = window.setTimeout(() => {
    if (!healthy()) showFallback();
  }, FAIL_AFTER_MS);

  /** Stop timers / observers once the embed clearly loaded. */
  const stopMonitoring = () => {
    window.clearTimeout(failTimer);
    if (pollId) window.clearInterval(pollId);
    ro?.disconnect();
  };

  const onMaybeHealthy = () => {
    if (!healthy()) return;
    if (tallyEmbedWrap instanceof HTMLElement) {
      tallyEmbedWrap.classList.remove('tally-embed--reveal-pending');
      tallyEmbedWrap.removeAttribute('aria-hidden');
    }
    hideFallback();
    stopMonitoring();
  };

  let pollId = 0;
  let ro;
  if (typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(onMaybeHealthy);
    ro.observe(tallyIframe);
  } else {
    pollId = window.setInterval(onMaybeHealthy, POLL_MS);
  }
}
