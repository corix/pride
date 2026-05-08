import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Dev: /volunteer → /volunteer/ so MPA resolves volunteer/index.html (same as trailing slash). */
const mpaVolunteerNoTrailingSlash = () => ({
  name: 'mpa-volunteer-no-trailing-slash',
  enforce: 'pre',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url;
      if (!url) return next();
      const pathOnly = url.split('?')[0];
      if (pathOnly === '/volunteer') {
        req.url = '/volunteer/' + url.slice('/volunteer'.length);
      }
      next();
    });
  },
});

// Workaround for vite-imagetools@10 + Vite 8: the plugin emits
// `Content-Type: image/undefined` in dev, which browsers refuse to render
// in <img> tags. We patch res.setHeader to rewrite it to image/webp
// (the only format we generate) before imagetools' middleware responds.
const fixImagetoolsContentType = () => ({
  name: 'fix-imagetools-content-type',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url && req.url.startsWith('/@imagetools/')) {
        const origSetHeader = res.setHeader.bind(res);
        res.setHeader = (name, value) => {
          if (
            typeof name === 'string' &&
            name.toLowerCase() === 'content-type' &&
            typeof value === 'string' &&
            value.includes('undefined')
          ) {
            value = 'image/webp';
          }
          return origSetHeader(name, value);
        };
      }
      next();
    });
  },
});

export default defineConfig({
  // Multi-page app: avoids SPA fallback so /volunteer serves volunteer/index.html in dev.
  appType: 'mpa',
  plugins: [mpaVolunteerNoTrailingSlash(), fixImagetoolsContentType(), imagetools()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        volunteer: resolve(__dirname, 'volunteer/index.html'),
      },
    },
  },
});
