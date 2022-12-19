import { getSitemapPlugin } from '@gammastream/scully-plugin-sitemap';
import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { MinifyHtml } from 'scully-plugin-minify-html';
import '@k9n/scully-plugin-toc';
import { TocConfig, TocPluginName } from '@k9n/scully-plugin-toc';
import '@k9n/scully-plugin-mermaid';
import {
  MermaidPluginConfig,
  MermaidPluginName,
} from '@k9n/scully-plugin-mermaid';
import {
  criticalCSS,
  CriticalCSSSettings,
} from '@scullyio/scully-plugin-critical-css';
import '@scullyio/scully-plugin-puppeteer';

/**
 * configuration for the markdown plugin
 */
setPluginConfig('md', { enableSyntaxHighlighting: true });

/**
 * configuration for the mermaid plugin
 * All params as defined here are valid:
 * https://mermaid-js.github.io/mermaid/getting-started/Setup.html#mermaidapi-configuration-defaults
 */
const mermaidOptions: MermaidPluginConfig = {
  config: { theme: 'dark' },
};
setPluginConfig(MermaidPluginName, mermaidOptions);

/**
 * configuration for the sitemap plugin
 */
const sitemapPlugin = getSitemapPlugin();
setPluginConfig(sitemapPlugin, {
  urlPrefix: 'https://k9n.dev',
  sitemapFilename: 'sitemap.xml',
  changeFreq: 'monthly',
  priority: [
    '1.0',
    '0.9',
    '0.8',
    '0.7',
    '0.6',
    '0.5',
    '0.4',
    '0.3',
    '0.2',
    '0.1',
    '0.0',
  ],
  ignoredRoutes: [
    /*'/404'*/
  ],
  routes: {
    '/': {
      changeFreq: 'weekly',
      priority: '1.0',
      sitemapFilename: 'sitemap.xml',
    },
    '/blog/:slug': {
      changeFreq: 'weekly',
      priority: '0.9',
      sitemapFilename: 'sitemap-blog.xml',
    },
    '/projects/:slug': {
      changeFreq: 'weekly',
      priority: '0.8',
      sitemapFilename: 'sitemap-blog.xml',
    },
  },
});

/**
 * configuration for the TOC plugin
 */
const tocOptions: TocConfig = {
  blogAreaSelector: '.blog-content',
  insertSelector: '#toc',
  level: ['h2', 'h3'],
  trailingSlash: true,
  scrollIntoViewOnClick: true,
};
setPluginConfig(TocPluginName, tocOptions);

/**
 * configuration for the critical css plugin
 */
const criticalCssOptions: CriticalCSSSettings = {
  inlineImages: true,
};
setPluginConfig(criticalCSS, criticalCssOptions);

/**
 * configure default postRenderers
 */
const defaultPostRenderers = ['seoHrefOptimise', criticalCSS, MinifyHtml];

/**
 * the actual scully configuration
 */
export const config: ScullyConfig = {
  projectRoot: './src/app',
  projectName: 'k9n-dev',
  outDir: './dist/static',
  defaultPostRenderers: [MinifyHtml],
  routes: {
    '/projects/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './projects',
      },
      postRenderers: [MermaidPluginName, ...defaultPostRenderers],
    },
    '/blog/:slug': {
      type: 'contentFolder',
      postRenderers: [
        TocPluginName,
        MermaidPluginName,
        ...defaultPostRenderers,
      ],
      slug: {
        folder: './blog',
      },
    },
  },
};
