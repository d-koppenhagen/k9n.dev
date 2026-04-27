const e=`---
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

<p>Modern HTML already provides rich, implicit semantics. However, many codebases add redundant or even harmful ARIA attributes and roles.
This ESLint plugin enforces a simple principle: <strong>If the browser already knows it, don&#39;t repeat it.</strong></p><p>The plugin ships with six auto-fixable rules:</p><ul>
<li><strong>no-redundant-role</strong> — Disallow role attributes that match the element&#39;s implicit ARIA role</li>
<li><strong>no-destructive-role</strong> — Disallow role attributes that remove native semantics of interactive or structural elements</li>
<li><strong>no-conflicting-aria</strong> — Disallow <code>aria-live</code> values that conflict with the implicit live region behavior of a declared role</li>
<li><strong>no-unsupported-aria</strong> — Disallow ARIA attributes not supported by the element&#39;s role</li>
<li><strong>no-default-aria</strong> — Disallow ARIA attributes set to their default value or empty string</li>
<li><strong>no-hidden-focusable</strong> — Disallow elements that are both focusable and <code>aria-hidden="true"</code></li>
</ul>
<p>All rules provide safe autofixes for static attribute values.</p><ul>
<li><strong><a href="https://k9n-dev.github.io/eslint-plugin-prefer-implicit/">ESLint Plugin Prefer Implicit — Website</a></strong></li>
<li><strong><a href="https://www.npmjs.com/package/@k9n/eslint-plugin-prefer-implicit">ESLint Plugin Prefer Implicit — NPM Package</a></strong></li>
<li><strong><a href="https://github.com/k9n-dev/eslint-plugin-prefer-implicit">ESLint Plugin Prefer Implicit — GitHub Repository</a></strong></li>
</ul>
`;export{e as default};
