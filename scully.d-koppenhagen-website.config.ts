import { getSitemapPlugin } from '@gammastream/scully-plugin-sitemap';
import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { MinifyHtml } from 'scully-plugin-minify-html';
import { getTocPlugin, TocConfig, TocPluginName } from 'scully-plugin-toc';
import {
  getMermaidPlugin,
  MermaidPluginConfig,
  MermaidPluginName,
} from 'scully-plugin-mermaid';

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
const MermaidPlugin = getMermaidPlugin();
setPluginConfig(MermaidPlugin, mermaidOptions);

/**
 * configuration for the sitemap plugin
 */
const SitemapPlugin = getSitemapPlugin();
setPluginConfig(SitemapPlugin, {
  urlPrefix: 'https://d-koppenhagen.de',
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
const TocPlugin = getTocPlugin();
setPluginConfig(TocPlugin, tocOptions);

/**
 * configure default postRenderers
 */
const defaultPostRenderers = [MinifyHtml];

/**
 * the actual scully configuration
 */
export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'd-koppenhagen-website',
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
