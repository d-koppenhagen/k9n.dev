const e=`---
title: 'scully-plugin-mermaid — A PostRenderer Plugin for Mermaid'
description: 'Add a Scully.io PostRenderer plugin for Mermaid.js graphs, charts and diagrams embedded in Markdown files.'
published: true
author:
  name: 'Danny Koppenhagen'
  mail: mail@k9n.dev
updated: 2021-12-20
keywords:
  - Angular
  - Scully
  - SSR
  - SSG
  - JAM Stack
  - Mermaid
language: en
thumbnail:
  header: images/projects/mermaid.jpg
  card: images/projects/mermaid-small.jpg
---

<p>My <a href="https://scully.io">Scully.io</a> plugin <a href="https://www.npmjs.com/package/@k9n/scully-plugin-mermaid"><code>scully-plugin-mermaid</code></a> will provide a PostRenderer for <a href="https://mermaid-js.github.io/">Mermaid.js</a> graphs, charts and diagrams embedded in Markdown files.</p><p>With this PostRenderer you can write Mermaid.js syntax inside code snippets in your Markdown files that will be rendered by Scully and post-rendered by Mermaid.js.
So in fact descriptions like the following in your Markdown files will be converted into SVG graphics:</p><pre class="language-text"><code class="language-text">\`\`\`mermaid
sequenceDiagram
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
    Note right of John: Some note.

    Bob-->Alice: Checking with John...
    Alice->John: Yes... John, how are you?
\`\`\`</code></pre>

<p>The above example will result in a graphic like this one:</p><pre class="mermaid">%%{
  init: {
    'theme': 'base',
    'themeVariables': {
      'primaryColor': '#2d2d2d',
      'primaryTextColor': '#fff',
      'primaryBorderColor': '#ffffff',
      'lineColor': '#F8B229',
      'secondaryColor': '#006100',
      'tertiaryColor': '#ffffff'
    }
  }
}%%
sequenceDiagram
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
    Note right of John: Some note.

    Bob-->Alice: Checking with John...
    Alice->John: Yes... John, how are you?</pre>
<p>Check out how to set it up by reading the docs in the <a href="https://github.com/k9n-dev/scully-plugins/tree/main/scully/plugins/scully-plugin-mermaid">Github repository</a>.</p><blockquote>
<p>You haven&#39;t heard about <em>Scully</em> yet? <a href="/blog/2020-01-angular-scully">Check out my article series about the static site generator <em>Scully</em></a>.</p></blockquote>
`;export{e as default};
