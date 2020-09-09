const DevToJS = require('dev-to-js');
const m2j = require('markdown-to-json');

const API_KEY = 'DEVTO_API_KEY';
const BASE_URL = 'https://d-koppenhagen.de';

const DevToClient = new DevToJS({ apiKey: API_KEY });

const articleMap = new Map([
  [229947, { name: '2020-01-angular-scully', preUpdate: () => {} }],
  [272387, { name: '2020-03-dig-deeper-into-scully-ssg', preUpdate: () => {} }],
  [439481, { name: '2020-08-my-development-setup', preUpdate: () => {} }],
  [450761, { name: 'test-update-devto', preUpdate: () => {} }],
]);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

DevToClient.getMyArticles().then(async (data) => {
  for (const article of data) {
    const localArticleMatch = articleMap.get(article.id);
    if (!localArticleMatch) {
      return;
    }

    // we need to wait, to be sure not running into 429 Too many requests response
    await sleep(1000);

    console.log('After wait');

    const localArticleMetaRaw = m2j.parse(
      [`../blog/${localArticleMatch.name}.md`],
      {
        width: 0,
        content: true,
      },
    );
    const localArticleMeta = JSON.parse(localArticleMetaRaw)[
      localArticleMatch.name
    ];
    const body = localArticleMeta.content
      .replace(/\]\(\//g, `](${BASE_URL}/`)
      .replace(/src="\//g, `src="${BASE_URL}/`);

    const options = {
      body_markdown: body,
      title: localArticleMeta.title,
      published: Boolean(localArticleMeta.published),
      main_image: `${BASE_URL}/${localArticleMeta.thumbnail.header}`,
      canonical_url: `${BASE_URL}/blog/${localArticleMatch.name}`,
      description: localArticleMeta.description,
      // series: string,
      // tags: string[],
      // organization_id?: number
    };
    // console.log(options.body_markdown);
    DevToClient.updateArticle(article.id, options).then(
      (res) => {
        // console.log('RESPONSE', res.header);
      },
      (err) => {
        console.log('ERROR', err);
      },
    );
  }
  console.log('🎉 finished updateing articles on dev.to');
});
