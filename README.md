# k9n.dev

Personal website of Danny Koppenhagen — built with Angular v22, server-side rendering, static site generation, and build-time internationalization.

🌐 **[k9n.dev](https://k9n.dev)**

## Architecture

The application is an Angular v22 standalone-component app using signals, SSR/SSG prerendering, and `@angular/localize` for build-time i18n. Content is authored in Markdown and compiled into TypeScript manifests at build time.

### Key Technologies

- **Angular v22** — Standalone components, signals, `OnPush` change detection
- **SSR / SSG** — `@angular/ssr` with `outputMode: "static"` for full prerendering
- **i18n** — `@angular/localize` with build-time locale bundles (`/de/`, `/en/`)
- **Content** — Markdown with frontmatter, parsed via custom build scripts
- **Testing** — Vitest for unit tests, AXE for accessibility auditing
- **Styling** — CSS design tokens, mobile-first, dark/light mode

### High-Level Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Build Pipeline                         │
├─────────────────────────────────────────────────────────┤
│  Markdown Content  →  build-content.ts  →  TS Manifests │
│  Angular Source    →  ng build (i18n)   →  /de/ + /en/  │
│  Post-Build        →  post-build.ts     →  SEO + 404    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   Runtime (per locale)                    │
├─────────────────────────────────────────────────────────┤
│  Prerendered HTML  ←  Angular SSG                        │
│  Locale Detection  →  Redirect to /de/ or /en/           │
│  Language Switcher →  Full page navigation between builds│
│  Content Filter    →  Search + Tags + Language           │
│  MetaManager       →  SEO, hreflang, og:locale, JSON-LD │
└─────────────────────────────────────────────────────────┘
```

### URL Structure

All routes are locale-prefixed:

| Locale | Base URL | Example |
|--------|----------|---------|
| German (default) | `/de/` | `/de/blog/my-post` |
| English | `/en/` | `/en/blog/my-post` |

Requests without a locale prefix are permanently redirected (HTTP 301) to the default locale. This ensures backward compatibility with previously indexed URLs (e.g., `/blog/my-post` → `/de/blog/my-post`).

### Content Model

Blog posts, talks, and projects are written in Markdown with YAML frontmatter. They are **not translated** — each item has a `language` field indicating its authored language (`de` or `en`). The UI adapts by setting appropriate `lang` attributes on content blocks.

## Quick Start

```bash
npm install
npm run build:content
ng serve
```

## Production Preview (lokal)

```bash
npm run preview
```

Baut die komplette Produktionsversion (beide Locales, SEO-Dateien, Legacy-Redirects) und startet einen lokalen Server auf `http://localhost:4200` — identisch zum Deployment-Verhalten inkl. 301-Redirects für alte URLs ohne Locale-Prefix.

## Contributing

See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for detailed development setup, the i18n workflow (mark → extract → translate → serve), testing, and build instructions.

## Code Conventions

See **[AGENTS.md](./AGENTS.md)** for comprehensive coding standards, Angular patterns, naming conventions, accessibility requirements, and i18n rules.

## License

Private project — all rights reserved.
