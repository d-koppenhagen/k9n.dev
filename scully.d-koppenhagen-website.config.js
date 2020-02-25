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
      }
    },
  }
};