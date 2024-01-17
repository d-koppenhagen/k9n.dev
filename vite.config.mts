import analog from '@analogjs/platform';
import * as fs from 'fs';
/// <reference types="vitest" />

import { defineConfig } from 'vite';

const contentRoutesRaw = fs.readFileSync('./content-routes.json', 'utf-8');
const contentRoutes: string[] = JSON.parse(contentRoutesRaw);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      prerender: {
        routes: async () => [
          '/api/rss.xml',
          '/',
          '/blog',
          '/contact',
          '/imprint',
          '/projects',
          ...contentRoutes,
        ],
        postRenderingHooks: [
          async (route) => {
            if (route.route.endsWith('.xml')) {
              return;
            }
            const gTag = `<script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
              ga('create', 'UA-XXXXXXXXX-1', 'auto');
              ga('send', 'pageview');
            </script>`;
            route.contents = route.contents?.concat(gTag);
          },
        ],
        sitemap: {
          host: 'https://k9n.dev/',
        },
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['**/*.spec.ts'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
