You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Check and use the "angular-cli" mcp server
- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Angular Style Guide (https://next.angular.dev/style-guide)

### Naming Conventions
- **No type suffixes** in class names: Do NOT use "Component", "Service", "Directive" suffixes.
  - Components: `Navigation`, `ContentCard`, `HomePage` (not `NavigationComponent`)
  - Services: `Content`, `Theme`, `MetaManager` (not `ContentService`)
  - Directives: `SmartLink` (not `SmartLinkDirective`)
- **No type suffixes in filenames**: Use `navigation.ts`, `content.ts`, `smart-link.ts` (not `.component.ts`, `.service.ts`, `.directive.ts`)
- Separate words in file names with hyphens
- Match file names to the TypeScript identifier within (e.g. class `UserProfile` → file `user-profile.ts`)
- Use the same file name for a component's TypeScript, template, and styles (e.g. `navigation.ts`, `navigation.html`, `navigation.css`)
- Test files end with `.spec.ts` (e.g. `navigation.spec.ts`)

### Project Structure
- Group closely related files together in the same directory (one directory per component/service)
- Organize by feature areas, NOT by type (avoid `components/`, `services/` directories for new features)
- One concept per file
- Unit tests live in the same directory as the code-under-test

### File Organization
- Each component gets its own directory with separate files for `.ts`, `.html`, `.css`, and `.spec.ts`
- Use external templates and styles (templateUrl/styleUrl) with paths relative to the component TS file

## Services

- Use the `@Service()` decorator (from `@angular/core`) for singleton services instead of `@Injectable({ providedIn: 'root' })`
- Use `@Injectable()` only when you need constructor-based DI, advanced provider config (`useClass`, `useValue`, etc.), or non-root scopes
- Design services around a single responsibility
- Use the `inject()` function instead of constructor injection

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

## Design & CSS

- **Mobile-First**: Write base styles for mobile and use `min-width` media queries to add desktop styles. Never use `max-width` media queries.
- Always use the CSS design tokens defined in `src/styles.css` (e.g. `var(--color-text-primary)`, `var(--space-md)`, `var(--radius-md)`) instead of hardcoded values.
- Always ensure sufficient color contrast (WCAG AA: 4.5:1 for normal text, 3:1 for large text) when choosing colors.
- Use semantic color tokens (`--color-text-primary`, `--color-background-primary`, etc.) so that dark/light mode works automatically.
- Prefer `clamp()` for fluid typography and spacing.
- Use `var(--transition-fast)` / `var(--transition-base)` for consistent animations.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Use `protected` on class members that are only used by a component's template
- Use `readonly` for properties initialized by Angular (`input`, `output`, `model`, queries)
- Group Angular-specific properties (inputs, outputs, queries, injected deps) before methods
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file
- Name event handlers for what they do, not for the triggering event (e.g. `saveUserData()` not `handleClick()`)

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Use built-in pipes and import pipes when being used in a template

## Dependency Injection

- Prefer the `inject()` function over constructor parameter injection
- Use `@Service()` for new singleton services

## Internationalization (i18n)

- Static UI texts are bilingual (German and English) via Angular's `@angular/localize` with build-time i18n. Each locale produces a separate build bundle.
- All translatable texts in templates use `i18n="meaning|description@@stableId"` with a mandatory fixed ID (`@@`). Translatable attributes use `i18n-attrName` (e.g., `i18n-aria-label`, `i18n-placeholder`, `i18n-title`).
- Translatable texts in TypeScript use `` $localize`:meaning|description@@stableId:text` `` tagged template strings.
- Content under `src/content/blog`, `src/content/talks`, and `src/content/projects` is **not** translated. The content language is managed via the frontmatter `language` field (`de` or `en`).
- The `lang` attribute on `<html>` is set automatically by Angular CLI per locale build — no manual DOM manipulation needed.
- The `lang` attribute MUST be set on content blocks (cards, detail pages) when the content language differs from the active UI locale.
- The URL structure uses locale prefixes: `/de/…` for German, `/en/…` for English.
- When new `i18n` markers are added, run `ng extract-i18n` to regenerate the source message file. Then update `src/locale/messages.en.xlf` with the corresponding English translations.
- `ng serve` supports only one locale at a time. Use `--configuration=development-en` for the English locale during development.
