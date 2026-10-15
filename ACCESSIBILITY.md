# Accessibility

Accessibility is a core concern for [k9n.dev](https://k9n.dev), the personal website of Danny Koppenhagen. Everyone should be able to read the content, move through the pages, and use every feature — whether they navigate with a keyboard, a screen reader, a touch screen, or any other assistive technology, and whether they prefer the German or the English version of the site.

This page explains what we aim for, how contributions keep accessibility intact, and how to tell us when something gets in your way. If you landed here after running into a barrier, the fastest path to help is the [Reporting accessibility issues](#reporting-accessibility-issues) section below.

## Priorities

We want the site to work well for the way you actually use it. In practice that means we focus on:

- **Keyboard access** — every interactive element can be reached and operated without a mouse, with a visible focus indicator and a sensible tab order.
- **Screen reader support** — meaningful structure, headings, labels, and ARIA attributes so the page makes sense when it is read aloud rather than seen.
- **Readable content** — sufficient color contrast in both light and dark themes, text that reflows on small screens, and layouts that do not depend on color alone.
- **Language support** — the interface is available in German and English, and individual pieces of content carry the correct language marker so assistive technology pronounces them correctly even when the content language differs from the interface language.

We treat **WCAG 2 Level AA** as our aspirational target and build toward it in our day-to-day work. This is a goal, not a verified conformance claim: we have not published a formal conformance evaluation, so we do not claim the site conforms to any WCAG level. If we complete such an evaluation, we will state the scope, date, method, and evaluator here.

## Contributor expectations

User-facing changes are expected to keep the site accessible. Guardrails we rely on:

- **Automated audits in CI** — an end-to-end accessibility suite (`e2e/accessibility.spec.ts`) runs [axe](https://github.com/dequelabs/axe-core) via `@axe-core/playwright` against the main pages (home, about, contact, imprint, blog, talks, projects, book, and representative detail pages) in both light and dark themes. New axe violations fail the build. Run it locally with `pnpm run e2e`.
- **Component-level checks** — Storybook is set up with `@storybook/addon-a11y` so components can be audited in isolation during development.
- **Coding standards** — [AGENTS.md](./AGENTS.md) documents the accessibility rules the codebase follows, including semantic markup, focus management, color-contrast expectations, ARIA usage, and the i18n rules that keep `lang` attributes correct on mixed-language content.

When you submit a user-facing change, please include evidence that it stays accessible: confirm the accessibility e2e suite passes, note any manual keyboard or screen-reader check you performed, and if you add a page or interactive component, extend the audit coverage where it makes sense. If a change knowingly introduces a limitation, document it in the pull request and in [Known limitations](#known-limitations).

## Reporting accessibility issues

If something blocks you, please tell us. You can:

- Open an issue in the project's [issue tracker](https://github.com/d-koppenhagen/k9n.dev/issues), or
- Email [mail@k9n.dev](mailto:mail@k9n.dev) if you would rather not file a public issue.

Anything you can share helps us reproduce and fix the problem faster:

- what you were trying to do and the page URL where it happened,
- what you expected versus what actually happened,
- your browser and operating system,
- any assistive technology you were using (for example a screen reader) and its version.

Screenshots or screen recordings are welcome but entirely optional. You never need to disclose a disability or any personal medical information to report a barrier.

### Severity

When we triage a report we assign a severity based on how much the barrier affects your ability to complete a task. Reporters do not need to set this — we will during triage.

- **Critical** — a task cannot be completed at all with the affected setup (for example, a form that cannot be submitted with a keyboard, or a page a screen reader cannot navigate).
- **Serious** — a task can be completed only with significant difficulty or an unreliable workaround (for example, focus that is lost after an action, or content that is very hard to read because of insufficient contrast).
- **Moderate** — the task is possible but the experience is degraded (for example, an unclear label or a missing landmark).
- **Minor** — a small inconvenience that does not meaningfully block the task (for example, a non-ideal reading order in a non-essential region).

### How we respond

As a personally maintained project, responses are best effort, but you can expect that we will:

- acknowledge your report, typically within a few business days,
- confirm whether we can reproduce it and ask follow-up questions if needed,
- share a severity and, where possible, a workaround while a fix is in progress,
- keep the issue updated as work proceeds and let you know when a fix ships,
- invite you to verify the fix once it is live.

Critical and serious barriers are prioritized over smaller issues.

## Ownership and maintenance

Danny Koppenhagen is the maintainer responsible for the accessibility of this project. That includes keeping the automated audits in place and passing, reviewing user-facing changes for accessibility, responding to reports, and keeping this page accurate.

This page is reviewed at least once a year and whenever a significant change to the site's structure, navigation, or tooling lands. If maintainership of the project changes, responsibility for accessibility transfers with it and this section is updated to name the new owner.

## Supported environments

We develop and test against current versions of the following, on both desktop and mobile:

- **Browsers:** Chromium/Chrome, Firefox, and WebKit/Safari (desktop), plus Chrome on Android and Safari on iOS (mobile), exercised through the Playwright device profiles in `playwright.config.ts`.
- **Input methods:** keyboard, mouse/pointer, and touch.
- **Themes:** light and dark color schemes.
- **Locales:** German (`/de/`) and English (`/en/`).

Automated accessibility audits currently run in Chromium. We aim to support current assistive technologies on these platforms, but we have not formally tested every assistive-technology-and-browser combination. If you use a setup not listed here and hit a barrier, please report it — we would like to hear about it rather than imply support we have not verified.

## Known limitations

- **Embedded third-party slide decks** — some talk pages embed external slide decks (for example [Slidev](https://sli.dev/) presentations) inside an `<iframe>`. We cannot change the contents of those third-party pages, so their internal accessibility is outside our control and is excluded from our automated audit. The `<iframe>` itself still carries an accessible title, and the surrounding page remains navigable. Where a talk links to the original slides, you can open them directly in a new tab as an equivalent.

Beyond this, our automated audits run clean across the pages and themes listed above at the time of the last review. This reflects what we have tested rather than a guarantee that no barriers exist. If you find one, please report it using the process above and we will document and track it here.

## Feedback and improvements

Suggestions for improving this statement or the project's accessibility practices are very welcome — open an issue in the [issue tracker](https://github.com/d-koppenhagen/k9n.dev/issues) or email [mail@k9n.dev](mailto:mail@k9n.dev). For an active barrier that is getting in your way right now, please use the [Reporting accessibility issues](#reporting-accessibility-issues) process above so it is tracked and prioritized.
