const { TOC } = require('./plugins/scully-plugin-toc');
const { Sitemap } = require('@gammastream/scully-plugin-sitemap');

const defaultPostRenderers = [Sitemap];

const sitemapOptions = {
  urlPrefix: 'https://d-koppenhagen.de',
  sitemapFilename: 'sitemap.xml',
  changeFreq: 'monthly',
};

const tocOptions = {
  blogAreaSelector: '.blog-content',
  insertSelector: '#toc',
  level: ['h2', 'h3'],
};

exports.config = {
  projectRoot: './src',
  projectName: 'd-koppenhagen-website',
  outDir: './dist/static',
  sitemapOptions,
  defaultPostRenderers,
  routes: {
    '/projects/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './projects',
      },
    },
    '/blog/:slug': {
      type: 'contentFolder',
      postRenderers: [TOC],
      slug: {
        folder: './blog',
      },
      toc: tocOptions,
    },
  },
};
