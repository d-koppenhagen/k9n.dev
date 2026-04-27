---
title: 'ESLint Plugin Prefer Implicit'
description: An ESLint plugin that enforces implicit HTML semantics over explicit ARIA attributes and roles. It helps reduce redundant ARIA usage, prevent accessibility regressions, and encourage native HTML semantics.
published: true
author:
  name: Danny Koppenhagen
  mail: mail@k9n.dev
updated: 2026-04-26
keywords:
  - ESLint
  - Accessibility
  - ARIA
  - HTML
  - a11y
language: en
thumbnail:
  header: images/projects/eslint-plugin-prefer-implicit.png
  card: images/projects/eslint-plugin-prefer-implicit.png
---

Modern HTML already provides rich, implicit semantics. However, many codebases add redundant or even harmful ARIA attributes and roles.
This ESLint plugin enforces a simple principle: **If the browser already knows it, don't repeat it.**

The plugin ships with six auto-fixable rules:

- **no-redundant-role** — Disallow role attributes that match the element's implicit ARIA role
- **no-destructive-role** — Disallow role attributes that remove native semantics of interactive or structural elements
- **no-conflicting-aria** — Disallow `aria-live` values that conflict with the implicit live region behavior of a declared role
- **no-unsupported-aria** — Disallow ARIA attributes not supported by the element's role
- **no-default-aria** — Disallow ARIA attributes set to their default value or empty string
- **no-hidden-focusable** — Disallow elements that are both focusable and `aria-hidden="true"`

All rules provide safe autofixes for static attribute values.

- **[ESLint Plugin Prefer Implicit — Website](https://k9n-dev.github.io/eslint-plugin-prefer-implicit/)**
- **[ESLint Plugin Prefer Implicit — NPM Package](https://www.npmjs.com/package/@k9n/eslint-plugin-prefer-implicit)**
- **[ESLint Plugin Prefer Implicit — GitHub Repository](https://github.com/k9n-dev/eslint-plugin-prefer-implicit)**
