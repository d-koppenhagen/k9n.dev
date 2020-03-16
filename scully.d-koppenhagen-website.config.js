const { TOC } = require('scully-plugin-toc');

const tocOptions = {
  blogAreaSelector: '.blog-content',
  insertSelector: '#toc',
  level: ['h2', 'h3'],
}

exports.config = {
  projectRoot: "./src",
  projectName: "d-koppenhagen-website",
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      postRenderers: [TOC],
      slug: {
        folder: "./blog"
      },
      toc: tocOptions,
    },
  }
};