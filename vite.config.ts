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

function injectGtagScript(html: string) {
  // Define the position to inject the script
  const headEndTag = '</head>';
  const insertPosition = html.indexOf(headEndTag);

  // If </head> tag is found, insert the script right after it
  if (insertPosition !== -1) {
    return (
      html.slice(0, insertPosition + headEndTag.length) +
      `<script async src="https://www.googletagmanager.com/gtag/js?id=G-HY3CPEEH1Z"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-XXXXXXXXX-1');
      </script>` +
      html.slice(insertPosition + headEndTag.length)
    );
  } else {
    // If </head> tag is not found, return the original HTML
    return html;
  }
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
      content: {
        highlighter: 'shiki',
        shikiOptions: {
          highlight: {
            theme: 'github-dark',
          },
          highlighter: {
            langs: [
              'json',
              'ts',
              'tsx',
              'js',
              'jsx',
              'html',
              'css',
              'angular-html',
              'angular-ts',
              'bash',
              'yaml',
              'asciidoc',
              'mermaid',
            ],
            themes: ['github-dark', 'github-light'],
          },
        },
      },
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
            if (route.contents) {
              route.contents = injectGtagScript(route.contents);
            }
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
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
