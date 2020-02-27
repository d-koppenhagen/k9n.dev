require('scully-plugin-toc');

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
      }
    },
  }
};