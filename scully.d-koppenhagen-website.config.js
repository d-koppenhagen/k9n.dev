require('./scully-plugins/toc');

exports.config = {
  projectRoot: "./src",
  projectName: "d-koppenhagen-website",
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      postRenderers: ['toc'],
      slug: {
        folder: "./blog"
      },
      toc: {
        blogAreaSelector: '.blog-content',
        insertSelector: '#toc',
        level: ['h2', 'h3'],
        heading: {
          tag: 'h2',
          defaultLang: 'de',
          title: {
            en: 'Table of contents',
            de: 'Inhalt',
          }
        }
      }
    },
  }
};