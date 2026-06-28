import type { Meta, StoryObj } from '@storybook/angular';
import { MarkdownContent } from './markdown-content';

const sampleHtml = `
<h2 id="introduction">Introduction</h2>
<p>This is a sample blog post rendered as HTML content. It demonstrates how the markdown content component handles various elements.</p>
<h3 id="code-example">Code Example</h3>
<pre><code class="language-typescript">const greeting = 'Hello, Angular!';
console.log(greeting);</code></pre>
<h2 id="features">Features</h2>
<ul>
  <li>Responsive typography</li>
  <li>Code highlighting</li>
  <li>Mermaid diagram support</li>
</ul>
<blockquote><p>Angular is a platform for building mobile and desktop web applications.</p></blockquote>
<h2 id="conclusion">Conclusion</h2>
<p>That's all for this demo content.</p>
`;

const mermaidHtml = `
<h2 id="diagram">Diagram</h2>
<p>Below is a mermaid diagram:</p>
<pre class="mermaid">
graph TD
  A[Start] --> B{Decision}
  B -->|Yes| C[Do something]
  B -->|No| D[Do something else]
  C --> E[End]
  D --> E
</pre>
`;

const meta: Meta<MarkdownContent> = {
  title: 'Components/MarkdownContent',
  component: MarkdownContent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<MarkdownContent>;

export const Default: Story = {
  args: {
    content: sampleHtml,
  },
};

export const WithMermaidDiagram: Story = {
  args: {
    content: mermaidHtml,
  },
};

export const ShortContent: Story = {
  args: {
    content: '<p>A short paragraph of text for a minimal content block.</p>',
  },
};

export const WithImages: Story = {
  args: {
    content: `
<h2 id="gallery">Image Gallery</h2>
<p>Click on any image below to open it in a lightbox.</p>
<p><img src="https://picsum.photos/seed/angular1/800/400" alt="Sample landscape image" /></p>
<p>Some text between images to show mixed content.</p>
<p><img src="https://picsum.photos/seed/angular2/600/600" alt="Sample square image" /></p>
`,
  },
};
