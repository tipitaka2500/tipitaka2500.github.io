import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tipitaka2500.github.io',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Noto Sans',
      cssVariable: '--font-noto-sans',
      weights: [400, 700],
    },
  ],
  integrations: [
    sitemap({
      serialize(item) {
        if (item.url !== 'https://tipitaka2500.github.io/' && !item.url.endsWith('.html')) {
          item.url = `${item.url.replace(/\/$/, '')}.html`;
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [
      {
        name: 'rewrite-tipitaka-html-in-dev',
        configureServer(server) {
          // In Astro 7, devRouteGuard unshifts early to block root files.
          // By returning a post-hook and unshifting to the front of the stack,
          // we rewrite *.html to extensionless before devRouteGuard checks root disk files.
          return () => {
            server.middlewares.stack.unshift({
              route: '',
              handle(req, _res, next) {
                if (req.url) {
                  const [pathname, search] = req.url.split('?');
                  if (pathname.endsWith('.html') && pathname !== '/index.html') {
                    req.url = pathname.slice(0, -5) + (search ? `?${search}` : '');
                  }
                }
                next();
              },
            });
          };
        },
      },
    ],
  },
});
