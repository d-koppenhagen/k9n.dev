'use strict';
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
      to[j] = from[i];
    return to;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.config = void 0;
var scully_plugin_sitemap_1 = require('@gammastream/scully-plugin-sitemap');
var scully_1 = require('@scullyio/scully');
var scully_plugin_minify_html_1 = require('scully-plugin-minify-html');
var scully_plugin_toc_1 = require('scully-plugin-toc');
var scully_plugin_mermaid_1 = require('scully-plugin-mermaid');
var scully_plugin_critical_css_1 = require('@scullyio/scully-plugin-critical-css');
/**
 * configuration for the markdown plugin
 */
scully_1.setPluginConfig('md', { enableSyntaxHighlighting: true });
/**
 * configuration for the mermaid plugin
 * All params as defined here are valid:
 * https://mermaid-js.github.io/mermaid/getting-started/Setup.html#mermaidapi-configuration-defaults
 */
var mermaidOptions = {
  config: { theme: 'dark' },
};
var mermaidPlugin = scully_plugin_mermaid_1.getMermaidPlugin();
scully_1.setPluginConfig(mermaidPlugin, mermaidOptions);
/**
 * configuration for the sitemap plugin
 */
var sitemapPlugin = scully_plugin_sitemap_1.getSitemapPlugin();
scully_1.setPluginConfig(sitemapPlugin, {
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
var tocOptions = {
  blogAreaSelector: '.blog-content',
  insertSelector: '#toc',
  level: ['h2', 'h3'],
  trailingSlash: true,
  scrollIntoViewOnClick: true,
};
var tocPlugin = scully_plugin_toc_1.getTocPlugin();
scully_1.setPluginConfig(tocPlugin, tocOptions);
/**
 * configuration for the critical css plugin
 */
var criticalCssOptions = {
  inlineImages: true,
};
scully_1.setPluginConfig(
  scully_plugin_critical_css_1.criticalCSS,
  criticalCssOptions,
);
/**
 * configure default postRenderers
 */
var defaultPostRenderers = [
  'seoHrefOptimise',
  scully_plugin_critical_css_1.criticalCSS,
  scully_plugin_minify_html_1.MinifyHtml,
];
/**
 * the actual scully configuration
 */
exports.config = {
  projectRoot: './src',
  projectName: 'd-koppenhagen-website',
  outDir: './dist/static',
  defaultPostRenderers: [scully_plugin_minify_html_1.MinifyHtml],
  routes: {
    '/projects/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './projects',
      },
      postRenderers: __spreadArray(
        [scully_plugin_mermaid_1.MermaidPluginName],
        defaultPostRenderers,
      ),
    },
    '/blog/:slug': {
      type: 'contentFolder',
      postRenderers: __spreadArray(
        [
          scully_plugin_toc_1.TocPluginName,
          scully_plugin_mermaid_1.MermaidPluginName,
        ],
        defaultPostRenderers,
      ),
      slug: {
        folder: './blog',
      },
    },
  },
};
