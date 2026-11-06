import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tipitaka2500.github.io',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  vite: {
    plugins: [
      {
        name: 'rewrite-tipitaka-html-in-dev',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            if (req.url) {
              const [pathname, search] = req.url.split('?');
              if (pathname.endsWith('.html') && pathname !== '/index.html') {
                req.url = pathname.slice(0, -5) + (search ? `?${search}` : '');
              }
            }
            next();
          });
        },
      },
    ],
  },
});
