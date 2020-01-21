exports.config = {
  projectRoot: "./src/app",
  outDir: "./dist/static",
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
  }
};
