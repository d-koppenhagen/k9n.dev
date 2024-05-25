import analog, { PrerenderContentFile } from '@analogjs/platform';
import angular from '@analogjs/vite-plugin-angular';
import { PostAttributes } from 'src/app/types';
/// <reference types="vitest" />
import { defineConfig } from 'vite';

function transFormContentDirRoute(file: PrerenderContentFile, base: string) {
  const attributes = file.attributes as PostAttributes;
  // do not include files marked as draft in frontmatter
  if (attributes.draft) {
    return false;
  }
  // use the slug from frontmatter if defined, otherwise use the files basename
  const slug = attributes.slug || file.name;
  return `/${base}/${slug}`;
}

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
    angular({
      inlineStylesExtension: 'scss',
    }),
    analog({
      prerender: {
        routes: [
          '/api/rss.xml',
          '/',
          '/blog',
          '/contact',
          '/imprint',
          '/projects',
          '/recruitment',
          {
            contentDir: '/src/content/blog',
            transform: (file: PrerenderContentFile) =>
              transFormContentDirRoute(file, 'blog'),
          },
          {
            contentDir: '/src/content/projects',
            transform: (file: PrerenderContentFile) =>
              transFormContentDirRoute(file, 'projects'),
          },
          {
            contentDir: '/src/content/talks',
            transform: (file: PrerenderContentFile) =>
              transFormContentDirRoute(file, 'talks'),
          },
        ],
        postRenderingHooks: [
          async (route) => {
            if (route.route.endsWith('.xml')) {
              return;
            }
            const gTag = `<!-- Google tag (gtag.js) -->
              <script async src="https://www.googletagmanager.com/gtag/js?id=G-HY3CPEEH1Z"></script>
              <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-XXXXXXXXX-1');
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
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
