import './style.css';

import heroBg from './assets/photos/need-perm-jesse-major-credit-pier-flag-capes.png?w=1800&format=webp';
import heroBgSmall from './assets/photos/need-perm-jesse-major-credit-pier-flag-capes.png?w=900&format=webp';

import drone from './assets/photos/need-perm-jesse-major-credit-drone-circle.png?w=600;900;1400&format=webp&as=picture';
import parade from './assets/photos/need-perm-jesse-major-credit-pier-parade.png?w=480;800;1200&format=webp&as=picture';
import megaphone from './assets/photos/need-perm-jesse-major-credit-megaphone.png?w=480;800;1200&format=webp&as=picture';
import drag from './assets/photos/need-perm-blake-mccabe-credit-drag-performance-2024.jpg?w=480;800;1200&format=webp&as=picture';
import bo from './assets/photos/need-perm-jesse-major-credit-bo.png?w=480;800;1200&format=webp&as=picture';
import dog from './assets/photos/need-perm-jesse-major-credit-dog.png?w=480;800;1200&format=webp&as=picture';
import panflute from './assets/photos/need-perm-jesse-major-credit-panflute.png?w=480;800;1200&format=webp&as=picture';
import red from './assets/photos/need-perm-jesse-major-credit-red.png?w=480;800;1200&format=webp&as=picture';
import cityPier from './assets/photos/need-perm-visitpaweb-credit-city-pier-port-angeles-wa.jpg?w=600;1000;1600&format=webp&as=picture';

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const heroBgEl = document.querySelector('[data-bg="hero"]');
if (heroBgEl) {
  heroBgEl.style.backgroundImage =
    `image-set(url(${heroBg}) 1x, url(${heroBg}) 2x)`;
  if (!CSS.supports('background-image', 'image-set(url("x") 1x)')) {
    heroBgEl.style.backgroundImage = `url(${heroBg})`;
  }
  const prefersSmallData = matchMedia('(prefers-reduced-data: reduce)').matches;
  if (prefersSmallData) {
    heroBgEl.style.backgroundImage = `url(${heroBgSmall})`;
  }
}

const photoMap = {
  'drone-circle': { pic: drone, sizes: '(max-width: 900px) 100vw, 420px' },
  'pier-parade': { pic: parade, sizes: '(max-width: 900px) 100vw, 340px' },
  megaphone: { pic: megaphone, sizes: '(max-width: 900px) 100vw, 340px' },
  'drag-performance': { pic: drag, sizes: '(max-width: 900px) 100vw, 340px' },
  bo: { pic: bo, sizes: '(max-width: 900px) 100vw, 340px' },
  dog: { pic: dog, sizes: '(max-width: 900px) 100vw, 340px' },
  panflute: { pic: panflute, sizes: '(max-width: 900px) 100vw, 340px' },
  red: { pic: red, sizes: '(max-width: 900px) 100vw, 340px' },
  'city-pier': { pic: cityPier, sizes: '(max-width: 900px) 100vw, 700px' },
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
