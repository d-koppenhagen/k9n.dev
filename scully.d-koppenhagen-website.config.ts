import { getSitemapPlugin } from '@gammastream/scully-plugin-sitemap';
import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { GoogleAnalytics } from '@scullyio/scully-plugin-google-analytics';
import { MinifyHtml } from 'scully-plugin-minify-html';
import { getTocPlugin, TocConfig, TocPluginName } from 'scully-plugin-toc';

/**
 * configuration for the markdown plugin
 */
setPluginConfig('md', { enableSyntaxHighlighting: true });

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
};
const TocPlugin = getTocPlugin();
setPluginConfig(TocPlugin, tocOptions);

/**
 * Gtag plugin config
 */
setPluginConfig(GoogleAnalytics, { globalSiteTag: 'UA-XXXXXXXXX-X' });

/**
 * configure defualt postRenderers
 */
const defaultPostRenderers = [GoogleAnalytics, MinifyHtml];

/**
 * configuration for HTML minification plugin
 */

/**
 * the actual scully configuration
 */
export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'd-koppenhagen-website',
  outDir: './dist/static',
  defaultPostRenderers,
  routes: {
    '/projects/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './projects',
      },
      postRenderers: [...defaultPostRenderers],
    },
    '/blog/:slug': {
      type: 'contentFolder',
      postRenderers: [TocPluginName, ...defaultPostRenderers],
      slug: {
        folder: './blog',
      },
    },
  },
};
