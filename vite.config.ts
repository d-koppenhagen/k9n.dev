import analog, { PrerenderContentFile } from '@analogjs/platform';
import { PostAttributes } from 'src/app/types';
/// <reference types="vitest" />

import { defineConfig } from 'vite';

function transFormContentDirRoute(file: PrerenderContentFile, base: string) {
  console.log('transFormContentDirRoute', base, file)
  const attributes = file.attributes as PostAttributes
  console.log('transFormContentDirRoute attributes', attributes)
  // do not include files marked as draft in frontmatter
  if (attributes.draft) {
    return false;
  }
  // use the slug from frontmatter if defined, otherwise use the files basename
  const slug = attributes.slug || file.name;
  console.log('transFormContentDirRoute slug', slug)
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
    analog({
      prerender: {
        routes: [
          '/api/rss.xml',
          '/',
          '/blog',
          '/contact',
          '/imprint',
          '/projects',
          {
            contentDir: './src/content/blog',
            transform: (file: PrerenderContentFile) => transFormContentDirRoute(file, 'blog'),
          },
          {
            contentDir: './src/content/projects',
            transform: (file: PrerenderContentFile) => transFormContentDirRoute(file, 'projects'),
          },
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
