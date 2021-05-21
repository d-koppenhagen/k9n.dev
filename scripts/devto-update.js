const DevToJS = require('dev-to-js');
const m2j = require('markdown-to-json');

/**
 * The dev.to API_KEY for the user
 */
const API_KEY = 'DEVTO_API_KEY';

/**
 * This URL is used before deploying on dev.to to point to the absolute paths
 */
const BASE_URL = 'https://d-koppenhagen.de';

/**
 * This param defines the time between updateing each post
 */
const TIME_BETWEEN_UPDATES = 5000;

/**
 * This function hook is executed before posting the data to dev.to for each article
 * @param {Object<any>} articleData The JSON representation of the articles meta data + '.content' for the markdown content
 */
const preUpdateAll = (articleData) => {
  const newData = { ...articleData };
  newData.content = articleData.content
    .replace(/\]\(\//g, `](${BASE_URL}/`) // replace src URLs in MD images
    .replace(/src="\//g, `src="${BASE_URL}/`) // replace <img> tag src URL
    .replace(/<div id="toc".*<\/div>/g, ''); // remove TOC placeholder
  return newData;
};

const articleMap = new Map([
  [
    229947,
    {
      name: '2020-01-angular-scully',
      /**
       * preUpdate: (articleData) => {
       *   return articleData;
       * }
       */
    },
  ],
  [272387, { name: '2020-03-dig-deeper-into-scully-ssg' }],
  [439481, { name: '2020-08-my-development-setup' }],
  [454808, { name: '2020-09-angular-schematics-common-helpers' }],
]);

/**
 * add a delay
 * @param {number} ms the time to wait
 */
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * create the client for the user with the given `apiKey`
 */
const DevToClient = new DevToJS({ apiKey: API_KEY });

/**
 * fetch all articles for the user
 */
DevToClient.getMyArticles().then(async (data) => {
  errors = false;
  /**
   * iterate through the articles
   * for-of-loop is needed instead of forEach, so run the loop synchronously
   */
  for (const article of data) {
    // find corresponding articles that should be updated
    const localArticleMatch = articleMap.get(article.id);
    if (!localArticleMatch) {
      console.warn(`found article without any match (ID: ${article.id})`);
      return;
    }

    // wait, to be sure to not run into '429: Too many requests' response
    await sleep(TIME_BETWEEN_UPDATES);

    // parse yaml from markdown file and the content into JSON string
    const localArticleDataRaw = m2j.parse(
      [`../blog/${localArticleMatch.name}.md`],
      {
        width: 0,
        content: true,
      },
    );

    // parse JSON string and store the data
    const localArticleData =
      JSON.parse(localArticleDataRaw)[localArticleMatch.name];

    // execute 'preUpdateAll()' function for each post
    let revisedLocalArticleData = preUpdateAll(localArticleData);

    // if 'preUpdate' function for modifying a specific post is defined, run it over the data
    if (localArticleMatch.preUpdate) {
      revisedLocalArticleData = localArticleMatch.preUpdate(
        revisedLocalArticleData,
      );
    }

    // build the POST object
    const options = {
      body_markdown: revisedLocalArticleData.content,
      title: revisedLocalArticleData.title,
      published: Boolean(revisedLocalArticleData.published),
      main_image: `${BASE_URL}/${revisedLocalArticleData.thumbnail.header}`,
      canonical_url: `${BASE_URL}/blog/${localArticleMatch.name}`,
      description: revisedLocalArticleData.description,
      // series?: string,
      // tags?: string[],
      // organization_id?: number
    };

    console.log('⚙️ processing article...');
    console.log(
      JSON.stringify(
        {
          ...options,
          body_markdown: options.body_markdown.substring(0, 20) + '...',
        },
        null,
        2,
      ),
    );

    // finally update the article
    DevToClient.updateArticle(article.id, options).then(
      () => {
        console.log(`✅ Updated article: ${options.title}, id: ${article.id}`);
      },
      (err) => {
        console.error(
          `❌ Error while trying to update article: ${options.title}, id: ${article.id}`,
          err,
        );
        errors = true;
      },
    );
  }

  errors
    ? console.warn('😓 finished with errors')
    : console.log('🎉 finished without errors');
});
