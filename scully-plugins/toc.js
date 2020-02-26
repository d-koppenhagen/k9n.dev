const { registerPlugin } = require('@scullyio/scully');
const { logWarn, logError, yellow } = require('@scullyio/scully/utils/log');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const headingLevel = (tag) => Number(tag[1]);

const tocPlugin = async (html, route) => {
  try {
    const dom = new JSDOM(html);
    const { window } = dom;
    
    /**
     * define insert point
     */
    let tocInsertPointSelector = '#toc';
    if (!route.config.toc.insertSelector) {
      logWarn(`No "insertSelector" for "toc" provided, using default: "#id".`);
    } else {
      if (typeof route.config.toc.insertSelector === 'string') {
        tocInsertPointSelector = route.config.toc.insertSelector;
      } else {
        logError(`Option "insertSelector" for "toc" must be a string (e.g. "#toc").`);
      }
    }

    /**
     * search for insert point
     */
    const insertPoint = window.document.querySelector(tocInsertPointSelector);
    // in case <div id="toc"></div> is not on the site
    if (!insertPoint) {
      logWarn(`Insert point with selector ${tocInsertPointSelector} not found. Skipping toc generation for route ${route.route}.`);
      return html;
    }

    /**
     * get headings for toc generation
     */
    let levels = ['h2', 'h3'];
    if (!route.config.toc.level) {
      logWarn(`Option "level" for "toc" not set, using default: "['h2', 'h3']".`);
    } else {
      if (Array.isArray(route.config.toc.level)) {
        levels = route.config.toc.level;
      } else {
        logError(`Option "level" for "toc" must be an array containing headings to list (e.g.: "['h2', 'h3']".`);
      }
    }
    const possibleValues = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    let selector = '';
    levels.forEach(level => {
      const lowerCased = level.toLowerCase();
      if (possibleValues.indexOf(lowerCased) === -1) {
        logWarn(`Level ${level} is not valid. It should be one of ${JSON.stringify(possibleValues)}.`);
      } else {
        selector += `${route.config.toc.blogAreaSelector}>${lowerCased},`
      }
    });
    // remove leading and trailing comma
    selector = selector.replace(/(^,)|(,$)/g, "");
    const headers = window.document.querySelectorAll(selector);

    /**
     * build nested ul, li list
     */
    let previousTag = null;
    let toc = '';
    headers.forEach(c => {
      const level = headingLevel(c.tagName);
      const baseLiEl = `<li><a href="${route.route}#${c.id}">${c.textContent}</a></li>`;
      if (previousTag && level > previousTag) {
        toc += '<ul style="margin-bottom: 0px">';
      }
      if (previousTag && level < previousTag) {
        toc += '</ul>';
      }
      toc += baseLiEl;
      previousTag = level;
    });
    
    /**
     * append toc title as child
     */
    let tocTitle = '';
    if (route.config.toc.heading.title && typeof route.config.toc.heading.title === 'string') {
      tocTitle = route.config.toc.heading.title;
    } else {
      try {
        tocTitle = route.config.toc.heading.title[route.data.language.toLowerCase()]
      } catch (error) {
        tocTitle = route.config.toc.heading.title[route.config.toc.heading.defaultLang] || '';
      }
      const tocHeading = window.document.createElement(route.config.toc.heading.tag || 'h2');
      tocHeading.innerHTML = tocTitle;
      insertPoint.appendChild(tocHeading)
    }

    /**
     * append toc itself as child
     */
    const list = window.document.createElement('ul');
    list.innerHTML = toc;
    insertPoint.appendChild(list)

    /**
     * return new serialized HTML
     */
    return dom.serialize();
  } catch (e) {
    logWarn(`error in tocPlugin, didn't parse for route '${yellow(route.route)}'`);
  }
  // in case of failure return unchanged HTML to keep flow going
  return html;
};

const validator = async config => [];
registerPlugin('render', 'toc', tocPlugin, validator);