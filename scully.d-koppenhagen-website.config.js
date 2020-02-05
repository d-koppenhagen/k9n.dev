exports.config = {
  projectRoot: "./src",
  projectName: "d-koppenhagen-website",
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
  }
};