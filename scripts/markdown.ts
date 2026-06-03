/**
 * Markdown rendering pipeline for the build-time content processing.
 *
 * Configures `marked` with:
 * - `marked-shiki` for syntax highlighting (language detection from fenced code blocks)
 * - `marked-gfm-heading-id` for URL-safe heading ID generation with deduplication
 * - Custom plugin for external link attributes (rel="noopener noreferrer" target="_blank")
 *
 * Extracts h2/h3 headings for TOC data during rendering.
 * Unparseable segments render as plain text rather than failing.
 */

import { Marked, type MarkedExtension, type Tokens } from 'marked';
import { gfmHeadingId, getHeadingList, resetHeadings } from 'marked-gfm-heading-id';
import markedShiki from 'marked-shiki';
import { createHighlighter, type Highlighter } from 'shiki';

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface RenderResult {
  html: string;
  headings: Heading[];
}

const SITE_HOSTNAME = 'k9n.dev';

let highlighterInstance: Highlighter | null = null;

/**
 * Creates or returns the cached shiki highlighter instance.
 */
async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      themes: ['github-dark-dimmed'],
      langs: ['typescript', 'javascript', 'html', 'css', 'json', 'bash', 'markdown', 'yaml', 'shell', 'xml', 'scss', 'diff'],
    });
  }
  return highlighterInstance;
}

/**
 * Custom marked extension that adds rel="noopener noreferrer" target="_blank"
 * to external links (URLs starting with http:// or https:// that don't match k9n.dev).
 */
function externalLinksExtension(): MarkedExtension {
  return {
    renderer: {
      link({ href, title, tokens }: Tokens.Link): string {
        const text = this.parser.parseInline(tokens);
        const titleAttr = title ? ` title="${title}"` : '';

        const isExternal =
          href != null &&
          (href.startsWith('http://') || href.startsWith('https://')) &&
          !isInternalUrl(href);

        if (isExternal) {
          return `<a href="${href}"${titleAttr} rel="noopener noreferrer" target="_blank">${text}</a>`;
        }

        return `<a href="${href}"${titleAttr}>${text}</a>`;
      },
    },
  };
}

/**
 * Checks if a URL belongs to the site's own hostname.
 */
function isInternalUrl(href: string): boolean {
  try {
    const url = new URL(href);
    return url.hostname === SITE_HOSTNAME || url.hostname.endsWith(`.${SITE_HOSTNAME}`);
  } catch {
    return false;
  }
}

/**
 * Renders a markdown string to HTML with syntax highlighting, heading IDs,
 * external link attributes, and TOC heading extraction.
 *
 * @param markdownBody - The markdown content to render (without frontmatter)
 * @returns The rendered HTML and extracted h2/h3 headings for TOC
 */
export async function renderMarkdown(markdownBody: string): Promise<RenderResult> {
  const highlighter = await getHighlighter();

  // Reset heading list for each render call (marked-gfm-heading-id uses global state)
  resetHeadings();

  const marked = new Marked();

  marked.use(
    gfmHeadingId(),
    markedShiki({
      highlight(code, lang) {
        // If no language specified or language not loaded, render as plain preformatted text
        if (!lang) {
          return `<pre><code>${escapeHtml(code)}</code></pre>`;
        }

        try {
          const loadedLangs = highlighter.getLoadedLanguages();
          if (!loadedLangs.includes(lang as never)) {
            // Language not supported — render as plain preformatted text
            return `<pre><code class="language-${escapeHtml(lang)}">${escapeHtml(code)}</code></pre>`;
          }

          return highlighter.codeToHtml(code, {
            lang,
            theme: 'github-dark-dimmed',
          });
        } catch {
          // Fallback: render as plain preformatted text on any error
          return `<pre><code>${escapeHtml(code)}</code></pre>`;
        }
      },
    }),
    externalLinksExtension(),
  );

  let html: string;
  try {
    html = await marked.parse(markdownBody);
  } catch {
    // If parsing fails entirely, render as plain text
    html = `<p>${escapeHtml(markdownBody)}</p>`;
  }

  // Extract h2 and h3 headings from the heading list
  const allHeadings = getHeadingList();
  const headings: Heading[] = allHeadings
    .filter((h) => h.level === 2 || h.level === 3)
    .map((h) => ({
      id: h.id,
      text: h.text,
      level: h.level as 2 | 3,
    }));

  return { html, headings };
}

/**
 * Escapes HTML special characters to prevent XSS in plain text rendering.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Disposes the cached highlighter instance.
 * Call this when the build process is complete to free resources.
 */
export async function disposeHighlighter(): Promise<void> {
  if (highlighterInstance) {
    highlighterInstance.dispose();
    highlighterInstance = null;
  }
}
