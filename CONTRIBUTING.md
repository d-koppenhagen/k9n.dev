# Contributing

This guide covers local development setup for [k9n.dev](https://k9n.dev), an Angular v22 personal website with SSR/SSG, build-time internationalization, and Markdown-based content.

## Prerequisites

- Node.js (LTS)
- npm (comes with Node.js)
- Angular CLI (`npx ng` or install globally)

## Getting Started

```bash
npm install
npm run build:content   # Generate content manifests from Markdown
ng serve                # Start dev server (German locale)
```

Open `http://localhost:4200/` — the app reloads on file changes.

## Available Scripts

| Script | Description |
|--------|-------------|
| `ng serve` | Dev server (German locale, default) |
| `ng serve --configuration=development-en` | Dev server (English locale) |
| `npm run preview` | Full production build + local preview server (both locales, redirects) |
| `npm run serve:preview` | Serve existing production build without rebuilding |
| `npm run build:content` | Parse Markdown content and generate TypeScript manifests |
| `npm run build:deploy` | Full production build: content → Angular build (both locales) → post-build |
| `ng build` | Production build (both locale bundles) |
| `ng test` | Run unit tests (Vitest) |
| `ng extract-i18n` | Extract translatable messages to `src/locale/messages.xlf` |

## Project Structure

```
src/
├── app/
│   ├── components/     # Shared UI components (navigation, content-card, language-switcher, …)
│   ├── config/         # Site configuration (locales, URLs, author info)
│   ├── content/        # Generated content manifests (auto-generated, do not edit)
│   ├── directives/     # Custom directives
│   ├── layouts/        # Layout components
│   ├── models/         # TypeScript interfaces (BlogPost, Talk, Project, …)
│   ├── pages/          # Route page components (home, blog, talks, projects, …)
│   └── services/       # Services (meta, content-filter, locale utilities, …)
├── content/            # Markdown source files
│   ├── blog/           # Blog posts (.md with frontmatter)
│   ├── talks/          # Talk entries
│   ├── projects/       # Project entries
│   └── pages/          # Static pages (about, imprint, …)
├── locale/             # Translation files
│   ├── messages.xlf    # Extracted source messages (German)
│   └── messages.en.xlf # English translations
└── styles.css          # Global styles with design tokens

scripts/
├── build-content.ts    # Markdown → TypeScript manifest generator
├── frontmatter.ts      # Frontmatter parsing logic
├── generate-seo.ts     # Generates sitemap.xml, robots.txt, llms.txt
├── post-build.ts       # Post-build steps (404 page, redirect page, SEO files)
└── *.spec.ts           # Script unit tests
```

## Internationalization (i18n)

The app uses Angular's build-time i18n (`@angular/localize`). Each locale produces a separate application bundle. Language switching triggers a full page navigation — this is by design.

### Supported Locales

| Locale | URL Prefix | Translation File |
|--------|-----------|-----------------|
| German (default) | `/de/…` | Source language (no separate file) |
| English | `/en/…` | `src/locale/messages.en.xlf` |

### i18n Workflow: Mark → Extract → Translate → Serve

#### 1. Mark text for translation

In templates — use the `i18n` attribute with a fixed ID:

```html
<h1 i18n="page title|Title for the home page@@homePageTitle">Willkommen</h1>
<button i18n-aria-label="@@navMenuToggle" aria-label="Menü öffnen">☰</button>
```

In TypeScript — use `$localize` tagged templates:

```typescript
const message = $localize`:confirmation|Save success message@@saveSuccess:Erfolgreich gespeichert`;
```

Rules:
- Always use `@@stableId` — auto-generated IDs break when source text changes.
- Format: `i18n="meaning|description@@id"` for templates.
- Format: `` $localize`:meaning|description@@id:text` `` for TypeScript.
- Use `i18n-attrName` for translatable attributes (`i18n-aria-label`, `i18n-placeholder`, `i18n-title`).

#### 2. Extract messages

```bash
ng extract-i18n
```

This regenerates `src/locale/messages.xlf` with all marked translation units.

#### 3. Translate

Open `src/locale/messages.en.xlf` and add or update the `<target>` element for each `<trans-unit>`:

```xml
<trans-unit id="homePageTitle" datatype="html">
  <source>Willkommen</source>
  <target>Welcome</target>
</trans-unit>
```

New translation units from the extract step appear without a `<target>` — add the English translation there.

#### 4. Serve locally

```bash
# German (default)
ng serve

# English
ng serve --configuration=development-en
```

`ng serve` supports only one locale at a time. Switch between configurations to test each locale.

#### 5. Preview both locales together (production-like)

```bash
npm run preview
```

Ein Befehl — baut die komplette Produktionsversion und startet einen lokalen Server auf `http://localhost:4200`:
- `/` → JS-basierte Locale-Erkennung → `/de/` oder `/en/`
- `/de/…` → German locale (production bundle)
- `/en/…` → English locale (production bundle)
- `/blog/my-post` → **HTTP 301** → `/de/blog/my-post` (backward compatibility)
- `/de/nonexistent` → 404

Falls du nur den Server ohne erneuten Build starten willst:

```bash
npm run serve:preview
```

#### 6. Build both locales

```bash
ng build
```

Production build (`localize: true`) generates both `/de/` and `/en/` bundles in `dist/k9n-dev/browser/`.

### Content Language vs. UI Language

Static UI texts (navigation, buttons, labels) are translated via the i18n system. Content (blog posts, talks, projects) is **not translated** — it stays in its authored language.

Each content item declares its language via the frontmatter `language` field:

```yaml
---
title: My Talk
language: en
---
```

- If `language` is absent, it defaults to `de`.
- The `lang` attribute is set on content blocks automatically when the content language differs from the active UI locale.

### Adding a New Locale (Future)

1. Add the locale to `SUPPORTED_LOCALES` in `src/app/config/site.config.ts`
2. Add a `locales` entry in `angular.json` → `i18n` section
3. Create the translation file: `src/locale/messages.{locale}.xlf`
4. Add dev and build configurations in `angular.json`
5. Update the language switcher component and redirect logic

## Testing

```bash
# Angular unit tests
ng test

# Script unit tests (frontmatter, SEO generation, redirect page, etc.)
npx vitest run scripts/
```

Tests use Vitest. Angular tests run via the `@angular/build:unit-test` builder. Script tests run directly with Vitest.

## Build & Deploy

The full deployment build pipeline:

```bash
npm run build:deploy
```

This runs:
1. `build:content` — Parse Markdown sources into TypeScript manifests
2. `ng build` — Compile both locale bundles with prerendering
3. `post-build.ts` — Generate 404 page, root redirect, legacy redirect pages, sitemap.xml, robots.txt, llms.txt

Output structure:

```
dist/k9n-dev/browser/
├── de/           # German prerendered pages
├── en/           # English prerendered pages
├── blog/         # Legacy redirect pages (301 → /de/blog/…)
├── talks/        # Legacy redirect pages (301 → /de/talks/…)
├── projects/     # Legacy redirect pages (301 → /de/projects/…)
├── index.html    # Root redirect (detects locale, redirects to /de/ or /en/)
├── 404.html      # Not-found page (with fallback redirect for prefix-less URLs)
├── sitemap.xml   # Multilingual sitemap with hreflang
├── robots.txt
└── llms.txt      # LLM-friendly content listing with language annotations
```

### Backward Compatibility (Legacy URLs)

Old URLs without locale prefix (e.g., `/blog/my-post`, `/projects/my-project`) are preserved via:
1. **Static redirect pages** — `post-build.ts` generates an HTML page at each legacy path with `<meta http-equiv="refresh">` + canonical link pointing to the `/de/`-prefixed version.
2. **404.html fallback** — For any prefix-less path not covered by static pages, the 404.html contains JS that detects the locale and redirects.
3. **`serve-static.ts`** — The local preview server issues real HTTP 301 redirects for prefix-less paths.

This ensures Google and other crawlers don't see broken pages after the i18n migration.

## Code Style

See [AGENTS.md](./AGENTS.md) for comprehensive coding conventions including:
- TypeScript and Angular best practices
- Naming conventions (no type suffixes)
- Component patterns (signals, OnPush, inject())
- Accessibility requirements (AXE, WCAG AA)
- CSS design tokens and mobile-first approach
- i18n marking conventions
