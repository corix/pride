import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

// Workaround for vite-imagetools@10 + Vite 8: the plugin emits
// `Content-Type: image/undefined` in dev, which browsers refuse to render
// in <img> tags. We patch res.setHeader to rewrite it to image/webp
// (the only format we generate) before imagetools' middleware responds.
const fixImagetoolsContentType = () => ({
  name: 'fix-imagetools-content-type',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url && req.url.startsWith('/@imagetools/')) {
        console.log('[ctype-fix] intercepting', req.url);
        const origSetHeader = res.setHeader.bind(res);
        res.setHeader = (name, value) => {
          if (
            typeof name === 'string' &&
            name.toLowerCase() === 'content-type' &&
            typeof value === 'string' &&
            value.includes('undefined')
          ) {
            console.log('[ctype-fix] rewriting', value, '-> image/webp');
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
  plugins: [fixImagetoolsContentType(), imagetools()],
});
