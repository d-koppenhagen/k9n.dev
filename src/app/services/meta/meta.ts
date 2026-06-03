import { DOCUMENT } from '@angular/common';
import { LOCALE_ID, Service, inject, Renderer2, RendererFactory2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { PageMeta } from '../../models/content.model';
import { JsonLdSchema } from '../../models/json-ld.model';
import { SITE_CONFIG, SUPPORTED_LOCALES, toAbsoluteUrl } from '../../config/site.config';
import { addLocalePrefix, resolveLocale } from '../locale/locale';

@Service()
export class MetaManager {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly renderer: Renderer2;
  private readonly localeConfig = resolveLocale(inject(LOCALE_ID));

  // Track injected elements for cleanup
  private canonicalLink: HTMLLinkElement | null = null;
  private hreflangLinks: HTMLLinkElement[] = [];
  private jsonLdScripts: HTMLScriptElement[] = [];
  private websiteJsonLdScript: HTMLScriptElement | null = null;

  constructor() {
    const rendererFactory = inject(RendererFactory2);
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  updateMeta(config: PageMeta): void {
    this.cleanup();
    this.setTitle(config.title);
    this.setDescription(config.description);
    this.setCanonicalUrl(config);
    this.setHreflangLinks(config);
    this.setRobotsMeta(config);
    this.setAuthorMeta(config);
    this.setKeywordsMeta(config);
    this.setOpenGraphTags(config);
    this.setTwitterCardTags(config);
    this.setLlmMeta(config);
    this.setArticleMeta(config);
  }

  injectJsonLd(schema: JsonLdSchema): void {
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'type', 'application/ld+json');
    const text = this.renderer.createText(JSON.stringify(schema));
    this.renderer.appendChild(script, text);
    this.renderer.appendChild(this.document.head, script);
    this.jsonLdScripts.push(script);
  }

  injectWebsiteJsonLd(): void {
    // Guard against duplicate injection
    if (this.websiteJsonLdScript) {
      return;
    }

    const schema: JsonLdSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.siteName,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl}/blog?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };

    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'type', 'application/ld+json');
    const text = this.renderer.createText(JSON.stringify(schema));
    this.renderer.appendChild(script, text);
    this.renderer.appendChild(this.document.head, script);
    this.websiteJsonLdScript = script;
  }

  private cleanup(): void {
    // Remove page-specific meta tags that may have been set by previous page
    this.meta.removeTag("property='og:title'");
    this.meta.removeTag("property='og:description'");
    this.meta.removeTag("property='og:url'");
    this.meta.removeTag("property='og:type'");
    this.meta.removeTag("property='og:site_name'");
    this.meta.removeTag("property='og:locale'");
    this.meta.removeTag("property='og:image'");
    this.meta.removeTag("property='og:image:alt'");
    this.meta.removeTag("property='og:image:width'");
    this.meta.removeTag("property='og:image:height'");
    this.meta.removeTag("property='article:published_time'");
    this.meta.removeTag("property='article:modified_time'");
    this.meta.removeTag("property='article:author'");
    // Remove all article:tag meta tags (there can be multiple, one per keyword)
    let articleTag = this.meta.getTag("property='article:tag'");
    while (articleTag) {
      this.meta.removeTagElement(articleTag);
      articleTag = this.meta.getTag("property='article:tag'");
    }
    this.meta.removeTag("name='twitter:card'");
    this.meta.removeTag("name='twitter:title'");
    this.meta.removeTag("name='twitter:description'");
    this.meta.removeTag("name='twitter:image'");
    this.meta.removeTag("name='twitter:image:alt'");
    this.meta.removeTag("name='robots'");
    this.meta.removeTag("name='author'");
    this.meta.removeTag("name='keywords'");
    this.meta.removeTag("name='citation_public_url'");
    this.meta.removeTag("name='citation_title'");
    this.meta.removeTag("name='citation_author'");
    this.meta.removeTag("name='dc.title'");
    this.meta.removeTag("name='dc.creator'");
    this.meta.removeTag("name='dc.date'");
    this.meta.removeTag("name='dc.description'");

    // Remove canonical link
    if (this.canonicalLink) {
      this.renderer.removeChild(this.document.head, this.canonicalLink);
      this.canonicalLink = null;
    }

    // Remove hreflang links
    for (const link of this.hreflangLinks) {
      this.renderer.removeChild(this.document.head, link);
    }
    this.hreflangLinks = [];

    // Remove page-specific JSON-LD scripts (preserve WebSite schema)
    this.removePageJsonLd();
  }

  private removePageJsonLd(): void {
    for (const script of this.jsonLdScripts) {
      this.renderer.removeChild(this.document.head, script);
    }
    this.jsonLdScripts = [];
  }

  private setTitle(title: string): void {
    this.title.setTitle(`${title} | k9n.dev`);
  }

  private setDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
  }

  private setCanonicalUrl(config: PageMeta): void {
    const url = config.canonicalUrl ?? config.url;
    const cleanUrl = url.split('?')[0].split('#')[0];
    const canonicalUrl = this.ensureLocalePrefix(cleanUrl);

    if (this.canonicalLink) {
      this.renderer.setAttribute(this.canonicalLink, 'href', canonicalUrl);
    } else {
      this.canonicalLink = this.renderer.createElement('link');
      this.renderer.setAttribute(this.canonicalLink, 'rel', 'canonical');
      this.renderer.setAttribute(this.canonicalLink, 'href', canonicalUrl);
      this.renderer.appendChild(this.document.head, this.canonicalLink);
    }
  }

  private setHreflangLinks(config: PageMeta): void {
    // Extract the path portion from the page URL (without baseUrl)
    const pageUrl = config.url;
    let pagePath = '';
    if (pageUrl.startsWith(SITE_CONFIG.baseUrl)) {
      pagePath = pageUrl.slice(SITE_CONFIG.baseUrl.length);
    } else {
      try {
        pagePath = new URL(pageUrl).pathname;
      } catch {
        pagePath = pageUrl;
      }
    }

    // Strip any existing locale prefix to get the bare path
    let barePath = pagePath;
    for (const locale of SUPPORTED_LOCALES) {
      const prefix = `/${locale.code}`;
      if (barePath === prefix || barePath.startsWith(`${prefix}/`)) {
        barePath = barePath.slice(prefix.length) || '/';
        break;
      }
    }

    // Generate a <link rel="alternate" hreflang="…" href="…"> for each supported locale
    for (const locale of SUPPORTED_LOCALES) {
      const localePath = addLocalePrefix(barePath, locale);
      const href = `${SITE_CONFIG.baseUrl}${localePath}`;

      const link: HTMLLinkElement = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'alternate');
      this.renderer.setAttribute(link, 'hreflang', locale.hreflang);
      this.renderer.setAttribute(link, 'href', href);
      this.renderer.appendChild(this.document.head, link);
      this.hreflangLinks.push(link);
    }
  }

  /**
   * Ensures the URL includes the locale prefix after the base URL.
   * E.g., `https://k9n.dev/blog/post` → `https://k9n.dev/de/blog/post`
   * If the URL already has a locale prefix, it is returned unchanged.
   */
  private ensureLocalePrefix(url: string): string {
    const base = SITE_CONFIG.baseUrl;
    if (!url.startsWith(base)) {
      return url;
    }

    const path = url.slice(base.length); // e.g., "/blog/post" or "/de/blog/post"
    const localeCode = this.localeConfig.code;

    // Check if path already starts with the locale prefix
    if (path === `/${localeCode}` || path.startsWith(`/${localeCode}/`)) {
      return url;
    }

    // Insert locale prefix after base URL
    return `${base}/${localeCode}${path}`;
  }

  private setRobotsMeta(config: PageMeta): void {
    const content = config.draft ? 'noindex, nofollow' : 'index, follow';
    this.meta.updateTag({ name: 'robots', content });
  }

  private setAuthorMeta(config: PageMeta): void {
    const author = config.author ?? SITE_CONFIG.author.name;
    this.meta.updateTag({ name: 'author', content: author });
  }

  private setKeywordsMeta(config: PageMeta): void {
    if (config.keywords?.length) {
      const keywords = config.keywords.slice(0, 10).join(', ');
      this.meta.updateTag({ name: 'keywords', content: keywords });
    } else {
      this.meta.removeTag("name='keywords'");
    }
  }

  private setOpenGraphTags(config: PageMeta): void {
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: config.url });
    this.meta.updateTag({ property: 'og:type', content: config.type ?? 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_CONFIG.siteName });
    this.meta.updateTag({ property: 'og:locale', content: this.localeConfig.ogLocale });

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: toAbsoluteUrl(config.image.url) });
      if (config.imageAlt) {
        this.meta.updateTag({ property: 'og:image:alt', content: config.imageAlt });
      }
      if (config.image.width) {
        this.meta.updateTag({ property: 'og:image:width', content: String(config.image.width) });
      }
      if (config.image.height) {
        this.meta.updateTag({ property: 'og:image:height', content: String(config.image.height) });
      }
    } else {
      this.meta.removeTag("property='og:image'");
      this.meta.removeTag("property='og:image:alt'");
      this.meta.removeTag("property='og:image:width'");
      this.meta.removeTag("property='og:image:height'");
    }
  }

  private setTwitterCardTags(config: PageMeta): void {
    // twitter:card — "summary_large_image" when image present, "summary" otherwise
    const cardType = config.image ? 'summary_large_image' : 'summary';
    this.meta.updateTag({ name: 'twitter:card', content: cardType });

    // twitter:title — truncated to max 70 characters
    this.meta.updateTag({ name: 'twitter:title', content: config.title.slice(0, 70) });

    // twitter:description — truncated to max 200 characters
    this.meta.updateTag({ name: 'twitter:description', content: config.description.slice(0, 200) });

    // twitter:image and twitter:image:alt — only when image is configured
    if (config.image) {
      this.meta.updateTag({ name: 'twitter:image', content: toAbsoluteUrl(config.image.url) });
      if (config.imageAlt) {
        this.meta.updateTag({ name: 'twitter:image:alt', content: config.imageAlt });
      }
    } else {
      this.meta.removeTag("name='twitter:image'");
      this.meta.removeTag("name='twitter:image:alt'");
    }
  }

  private setLlmMeta(config: PageMeta): void {
    // citation_public_url — always set to canonical URL (Req 8.1)
    const canonicalUrl = config.canonicalUrl ?? config.url;
    const cleanUrl = canonicalUrl.split('?')[0].split('#')[0];
    this.meta.updateTag({ name: 'citation_public_url', content: this.ensureLocalePrefix(cleanUrl) });

    // For article-type pages (blog posts), set citation and Dublin Core tags
    if (config.type === 'article') {
      // citation_title (Req 8.6)
      if (config.title) {
        this.meta.updateTag({ name: 'citation_title', content: config.title });
      }

      // citation_author (Req 8.6)
      if (config.author) {
        this.meta.updateTag({ name: 'citation_author', content: config.author });
      }

      // Dublin Core: dc.title (Req 8.2)
      if (config.title) {
        this.meta.updateTag({ name: 'dc.title', content: config.title });
      }

      // Dublin Core: dc.creator (Req 8.2)
      if (config.author) {
        this.meta.updateTag({ name: 'dc.creator', content: config.author });
      }

      // Dublin Core: dc.date — ISO 8601 YYYY-MM-DD (Req 8.2)
      if (config.publishedTime) {
        const dateOnly = config.publishedTime.slice(0, 10);
        this.meta.updateTag({ name: 'dc.date', content: dateOnly });
      }

      // Dublin Core: dc.description (Req 8.2)
      if (config.description) {
        this.meta.updateTag({ name: 'dc.description', content: config.description });
      }
    }
  }

  private setArticleMeta(config: PageMeta): void {
    if (config.type !== 'article') {
      return;
    }

    // Set article:published_time (Req 2.3)
    if (config.publishedTime) {
      this.meta.updateTag({ property: 'article:published_time', content: config.publishedTime });
    }

    // Set article:modified_time (Req 2.3)
    if (config.modifiedTime) {
      this.meta.updateTag({ property: 'article:modified_time', content: config.modifiedTime });
    }

    // Set article:tag for each keyword (Req 2.4)
    if (config.keywords?.length) {
      for (const keyword of config.keywords) {
        this.meta.addTag({ property: 'article:tag', content: keyword });
      }
    }

    // Set article:author (Req 9.4)
    if (config.author) {
      this.meta.updateTag({ property: 'article:author', content: config.author });
    }
  }
}
