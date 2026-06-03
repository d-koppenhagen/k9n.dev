import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Dummy HTML content for visual verification during prototype phase.
 * Covers all markdown elements: headings, paragraphs, lists, code blocks,
 * blockquotes, images, links, tables, and horizontal rules.
 */
export const DUMMY_MARKDOWN_HTML = `
<h1 id="main-heading">Main Heading (h1)</h1>
<p>This is an introductory paragraph with <strong>bold text</strong>, <em>italic text</em>, and <a href="https://example.com" target="_blank" rel="noopener noreferrer">an external link</a>. Here is also an <a href="/blog/some-post">internal link</a> for comparison.</p>

<h2 id="getting-started">Getting Started</h2>
<p>Angular is a platform for building mobile and desktop web applications. It provides a comprehensive set of tools and libraries for building modern, performant applications.</p>

<h3 id="prerequisites">Prerequisites</h3>
<p>Before you begin, make sure you have the following installed:</p>
<ul>
  <li>Node.js (version 18 or later)</li>
  <li>npm (comes with Node.js)</li>
  <li>A code editor like <strong>VS Code</strong></li>
  <li>Basic knowledge of TypeScript and HTML</li>
</ul>

<h3 id="installation">Installation</h3>
<ol>
  <li>Install the Angular CLI globally</li>
  <li>Create a new project with <code>ng new my-app</code></li>
  <li>Navigate into the project directory</li>
  <li>Run <code>ng serve</code> to start the development server</li>
</ol>

<h2 id="code-examples">Code Examples</h2>
<p>Here is an example of a standalone Angular component:</p>

<pre><code class="language-typescript">import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: \`
    &lt;button (click)="increment()"&gt;
      Count: {{ count() }}
    &lt;/button&gt;
  \`,
})
export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update(c =&gt; c + 1);
  }
}</code></pre>

<p>You can also use inline code like <code>const x = 42;</code> within paragraphs.</p>

<h2 id="blockquotes">Blockquotes</h2>
<blockquote>
  <p>The best way to predict the future is to invent it.</p>
  <p>— Alan Kay</p>
</blockquote>

<h2 id="images">Images</h2>
<p>Below is an example image that should be constrained to the content width:</p>
<img src="https://picsum.photos/1200/600" alt="A sample landscape photograph demonstrating image constraints" />

<h2 id="tables">Tables</h2>
<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Status</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Signals</td>
      <td>Stable</td>
      <td>Recommended for new projects</td>
    </tr>
    <tr>
      <td>Standalone Components</td>
      <td>Stable</td>
      <td>Default in Angular 20+</td>
    </tr>
    <tr>
      <td>Zoneless</td>
      <td>Experimental</td>
      <td>Opt-in via provider</td>
    </tr>
  </tbody>
</table>

<h2 id="horizontal-rules">Horizontal Rules</h2>
<p>Content above the rule.</p>
<hr />
<p>Content below the rule.</p>

<h2 id="nested-lists">Nested Lists</h2>
<ul>
  <li>First level item
    <ul>
      <li>Second level item</li>
      <li>Another second level item
        <ul>
          <li>Third level item</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>Another first level item</li>
</ul>

<h4 id="smaller-heading">Smaller Heading (h4)</h4>
<p>This demonstrates h4 styling within rendered markdown content.</p>

<h5 id="even-smaller">Even Smaller (h5)</h5>
<p>And h5 for deeply nested sections.</p>

<h6 id="smallest-heading">Smallest Heading (h6)</h6>
<p>Finally, h6 for the deepest level of heading hierarchy.</p>
`;

@Component({
  selector: 'app-markdown-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './markdown-content.html',
  styleUrl: './markdown-content.css',
})
export class MarkdownContent {
  readonly content = input.required<string>();
}
