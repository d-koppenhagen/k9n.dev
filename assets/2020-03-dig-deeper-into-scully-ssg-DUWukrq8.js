const e=`---
title: Dig deeper into static site generation with Scully and use the most out of it
description: 'In this article about Scully, I will introduce some more advanced features.
You will learn how you can setup a custom Markdown module and how you can use AsciiDoc with Scully.
I will guide you through the process of how to handle protected routes using a custom route plugin.'
published: true
author:
  name: Danny Koppenhagen
  mail: mail@k9n.dev
created: 2020-03-02
updated: 2021-05-18
keywords:
  - Angular
  - Angular CLI
  - Angular Schematics
  - Scully
  - SSR
  - SSG
  - Server-Side Rendering
  - Static Site Generator
  - Pre-rendering
  - JAM Stack
linked:
  devTo: https://dev.to/dkoppenhagen/dig-deeper-into-static-site-generation-with-scully-and-use-the-most-out-of-it-4cn5
  medium: https://danny-koppenhagen.medium.com/dig-deeper-into-static-site-generation-with-scully-and-use-the-most-out-of-it-ac86f216a6a7
language: en
thumbnail:
  header: images/blog/scully/scully-header2.jpg
  card: images/blog/scully/scully-header2-small.jpg
series: scully
---

<h1 id="dig-deeper-into-static-site-generation-with-scully-and-use-the-most-out-of-it">Dig deeper into static site generation with <em>Scully</em> and use the most out of it</h1>
<p><strong>If you haven&#39;t heard about <em>Scully</em> yet, you should first check out my introduction article about it: <em><a href="/blog/2020-01-angular-scully">»Create powerful fast pre-rendered Angular Apps using Scully static site generator«</a></em>.</strong></p><p>In my <a href="/blog/2020-01-angular-scully">last blog post</a> I gave you a short introduction to <em>Scully</em> and how to easily set up a very simple blogging website that is server-side rendered and ready to be shipped for production.
In the following article I will introduce some more advanced things you can do with <em>Scully</em>.
You will learn how you can setup a custom Markdown module or even use Asciidoc instead of Markdown.
I will guide you through the process of how to handle protected routes using a custom route plugin.</p><blockquote>
<p>This blog post is based on versions:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span>@scullyio/ng-lib: 1.1.1</span></span>
<span class="line"><span>@scullyio/init: 1.1.4</span></span>
<span class="line"><span>@scullyio/scully: 1.1.1</span></span></code></pre>
</blockquote>
<hr>

<h2 id="generate-a-post-with-a-meta-data-template">Generate a post with a meta data template</h2>
<p>As we already created our blogging site using <em>Scully</em>, we want to fill it with content now.
We already learned how we can use the <code>@scullyio/init:post</code> schematic to easily generate a new blog post.
Often posts do not only need the content, but also some meta information like <code>thumbnail</code> or <code>author</code>.
This meta information can be processed by the <code>ScullyRouteService</code> and it will be converted to JSON.
It can be quite handy to always remember to add such information right after creating a new post.
To make things easier we can specify a YAML template file with the meta information that will always be added when creating a new blog post using the schematic, like the following one:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#85E89D">description</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">&#x3C;fill in a short description for the overview page></span></span>
<span class="line"><span style="color:#85E89D">published</span><span style="color:#E1E4E8">: </span><span style="color:#79B8FF">false</span></span>
<span class="line"><span style="color:#85E89D">author</span><span style="color:#E1E4E8">:</span></span>
<span class="line"><span style="color:#85E89D">  name</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">Danny Koppenhagen</span></span>
<span class="line"><span style="color:#85E89D">  mail</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">mail@k9n.dev</span></span>
<span class="line"><span style="color:#85E89D">updated</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">dd.mm.yyyy</span></span>
<span class="line"><span style="color:#85E89D">keywords</span><span style="color:#E1E4E8">:</span></span>
<span class="line"><span style="color:#E1E4E8">  - </span><span style="color:#9ECBFF">Angular</span></span>
<span class="line"><span style="color:#85E89D">language</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">en</span></span>
<span class="line"><span style="color:#85E89D">thumbnail</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">images/default.jpg</span></span></code></pre>
<p>We can use the template when calling the <code>@scullyio/init:post</code> schematic:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">ng</span><span style="color:#9ECBFF"> g</span><span style="color:#9ECBFF"> @scullyio/init:post</span><span style="color:#79B8FF"> --name=</span><span style="color:#9ECBFF">"a new post"</span><span style="color:#79B8FF"> --meta-data-file=meta.yml</span></span></code></pre>
<p>When we check our <code>blog</code> directory now we will see that the schematic added our YAML template to the meta data section of the newly created post file <code>a-new-post.md</code>.</p><blockquote>
<p>If you have trouble remembering to add the <code>meta-data-file</code> option, just add a script to your <code>package.json</code> without the <code>name</code> option.
When you call the script using <code>npm run <script-name></code> you will be prompted to input the file name.</p></blockquote>
<h2 id="generate-a-custom-markdown-module">Generate a custom Markdown module</h2>
<p>Let&#39;s assume we want to add another module to our blogging website.
We want to have a <code>projects</code> section in our site that lists some information about current projects we are working on.
Like for our <code>blog</code> section, we want to easily write our content using Markdown.
To do so, we can use the <code>@scullyio/init:markdown</code> schematic:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">ng</span><span style="color:#9ECBFF"> g</span><span style="color:#9ECBFF"> @scullyio/init:markdown</span><span style="color:#79B8FF"> --name=projects</span><span style="color:#79B8FF"> --slug=projectId</span><span style="color:#79B8FF"> --sourceDir=projects</span><span style="color:#79B8FF"> --route=projects</span></span></code></pre>
<p>Let&#39;s have a look at the options we set:</p><ul>
<li><code>name</code>: This is the base name for the generated Angular module that <em>Scully</em> created for us.</li>
<li><code>slug</code>: Here we define the placeholder name for the URL that will be filled with the basename of the Markdown files.</li>
<li><code>sourceDir</code>: That&#39;s where we will store our Markdown files whose content is rendered by the <em>Scully</em> Markdown file plugin.</li>
<li><code>route</code>: This is the name for the route before the <code>:slug</code> in the URLs where we can see our rendered content later.</li>
</ul>
<blockquote>
<p>Good to know: Under the hood the <code>@scullyio/init:blog</code> schematic just calls <code>@scullyio/init:markdown</code> with default options set. So in fact it&#39;s just a shortcut.</p></blockquote>
<p>The basic things we need for our projects page are now available.
Let&#39;s have a look at it and see if it&#39;s working:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">npm</span><span style="color:#9ECBFF"> run</span><span style="color:#9ECBFF"> build</span><span style="color:#6A737D">                   # Angular build</span></span>
<span class="line"><span style="color:#B392F0">npm</span><span style="color:#9ECBFF"> run</span><span style="color:#9ECBFF"> scully</span><span style="color:#79B8FF"> --</span><span style="color:#79B8FF"> --scanRoutes</span><span style="color:#6A737D">  # generate static build and force checking new routes</span></span>
<span class="line"><span style="color:#B392F0">npm</span><span style="color:#9ECBFF"> run</span><span style="color:#9ECBFF"> scully</span><span style="color:#9ECBFF"> serve</span><span style="color:#6A737D">            # serve the scully results</span></span></code></pre>
<p><img src="images/blog/scully/scully-markdown-projects.png" alt="the initial projects post generated with the Markdown schematic"></p><h2 id="the-asciidoc-file-handler-plugin">The <code>AsciiDoc</code> File Handler Plugin</h2>
<p><em>Scully</em> provides another <em>File Handler Plugin</em> out-of-the-box: The <em>AsciiDoc</em> plugin.
When you want to put the generated post files in a specific directory (not <code>blog</code>), you can define this via the <code>target</code> option.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">ng</span><span style="color:#9ECBFF"> g</span><span style="color:#9ECBFF"> @scullyio/init:post</span><span style="color:#79B8FF"> --name=</span><span style="color:#9ECBFF">"asciidoc example"</span><span style="color:#79B8FF"> --target=projects</span></span></code></pre>
<p>The generated file will be a Markdown file initially.
Let&#39;s change the file extension, rename it to <code>*.adoc</code> and add a bit of content after it has been generated:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">:</span><span style="color:#79B8FF">title</span><span style="color:#E1E4E8">:</span><span style="color:#9ECBFF"> 2020-01-21-projects</span></span>
<span class="line"><span style="color:#E1E4E8">:</span><span style="color:#79B8FF">description</span><span style="color:#E1E4E8">:</span><span style="color:#9ECBFF"> blog description</span></span>
<span class="line"><span style="color:#E1E4E8">:</span><span style="color:#79B8FF">published</span><span style="color:#E1E4E8">:</span><span style="color:#9ECBFF"> false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;font-weight:bold">= 2020-01-21-projects</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">Let's show some source code!</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">.</span><span style="color:#79B8FF;font-weight:bold">index.html</span></span>
<span class="line"><span style="color:#79B8FF;font-weight:bold">[#src-listing]</span></span>
<span class="line"><span style="color:#79B8FF;font-weight:bold">[source,html]</span></span>
<span class="line"><span style="color:#E1E4E8">----</span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">div</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">span</span><span style="color:#E1E4E8">>Hello World!&#x3C;/</span><span style="color:#85E89D">span</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;/</span><span style="color:#85E89D">div</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">----</span></span></code></pre>
<p>And finally we build our project again and see if it works:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">npm</span><span style="color:#9ECBFF"> run</span><span style="color:#9ECBFF"> build</span><span style="color:#6A737D">                   # Angular build</span></span>
<span class="line"><span style="color:#B392F0">npm</span><span style="color:#9ECBFF"> run</span><span style="color:#9ECBFF"> scully</span><span style="color:#79B8FF"> --</span><span style="color:#79B8FF"> --scanRoutes</span><span style="color:#6A737D">  # generate static build and force checking new routes</span></span>
<span class="line"><span style="color:#B392F0">npm</span><span style="color:#9ECBFF"> run</span><span style="color:#9ECBFF"> scully</span><span style="color:#9ECBFF"> serve</span><span style="color:#6A737D">            # serve the scully results</span></span></code></pre>
<p>Great, as we can see: AsciiDoc files will be rendered as well out-of-the-box.</p><p><img src="images/blog/scully/scully-asciidoc-projects.png" alt="a scully rendered asciidoc file"></p><p>You can also define your own File Handler Plugin for other content formats.
Check out the <a href="https://scully.io/docs/plugins#file-plugin">official docs</a> for it to see how it works.</p><h2 id="protect-your-routes-with-a-custom-plugin">Protect your routes with a custom plugin</h2>
<p>Let&#39;s assume we have a protected section at our site that should only be visible for specific users.
For sure we can secure this space using an <a href="https://angular.io/guide/router#milestone-5-route-guards">Angular Route Guard</a> that checks if we have the correct permissions to see the pages.</p><p><em>Scully</em> will by default try to identify all available app routes.
In fact it will also try to visit the protected pages and pre-render the result.
When <em>Scully</em> tries to do this, the Angular route guard kicks in and redirects us to an error or login page.
The page shown after the redirect is the page <em>Scully</em> will see and render.
This default behaviour is pretty okay, as <em>Scully</em> won&#39;t expose any protected information by creating static content from the protected data.
However, on the other hand, we don&#39;t want to pre-render such pages at all, so we need a way to tell <em>Scully</em> what pages to exclude from the rendering.
Another scenario you can imagine is when a page displays a prompt or a confirm dialog.
When <em>Scully</em> tries to render such pages it runs into a timeout and cannot render the page:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span>...</span></span>
<span class="line"><span>Puppeteer error while rendering "/secure" TimeoutError: Navigation timeout of 30000 ms exceeded</span></span></code></pre>
<p>To prevent <em>Scully</em> from rendering specific pages we can simply create a custom plugin that will skip some routes.</p><p>To do so, we will create a new directory <code>extraPlugin</code> with the file <code>skip.js</code> inside:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">const</span><span style="color:#E1E4E8"> { </span><span style="color:#79B8FF">registerPlugin</span><span style="color:#E1E4E8">, </span><span style="color:#79B8FF">log</span><span style="color:#E1E4E8">, </span><span style="color:#79B8FF">yellow</span><span style="color:#E1E4E8"> } </span><span style="color:#F97583">=</span><span style="color:#B392F0"> require</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">'@scullyio/scully'</span><span style="color:#E1E4E8">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">function</span><span style="color:#B392F0"> skipPlugin</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">route</span><span style="color:#E1E4E8">, </span><span style="color:#FFAB70">config</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> {}) {</span></span>
<span class="line"><span style="color:#B392F0">  log</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">\`Skip Route "\${</span><span style="color:#B392F0">yellow</span><span style="color:#9ECBFF">(</span><span style="color:#E1E4E8">route</span><span style="color:#9ECBFF">)</span><span style="color:#9ECBFF">}"\`</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#F97583">  return</span><span style="color:#79B8FF"> Promise</span><span style="color:#E1E4E8">.</span><span style="color:#B392F0">resolve</span><span style="color:#E1E4E8">([]);</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">const</span><span style="color:#B392F0"> validator</span><span style="color:#F97583"> =</span><span style="color:#F97583"> async</span><span style="color:#FFAB70"> conf</span><span style="color:#F97583"> =></span><span style="color:#E1E4E8"> [];</span></span>
<span class="line"><span style="color:#B392F0">registerPlugin</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">'router'</span><span style="color:#E1E4E8">, </span><span style="color:#9ECBFF">'skip'</span><span style="color:#E1E4E8">, skipPlugin, validator);</span></span>
<span class="line"><span style="color:#79B8FF">module</span><span style="color:#E1E4E8">.</span><span style="color:#79B8FF">exports</span><span style="color:#E1E4E8">.skipPlugin </span><span style="color:#F97583">=</span><span style="color:#E1E4E8"> skipPlugin;</span></span></code></pre>
<p>We will import the function <code>registerPlugin()</code> which will register a new router plugin called <code>skip</code>.
The last parameter is the plugin function <code>skipPlugin()</code> that will return a promise resolving the routes.
It receives the route and options for the route that should be handled.
We will simply return an empty array as we won&#39;t proceed routes handled by the plugin.
We can use the exported <code>log()</code> function from <em>Scully</em> to log the action in a nice way.</p><p>Last but not least we will use the <code>skip</code> plugin in our <code>scully.scully-blog.config.ts</code> configuration file and tell the plugin which routes to handle:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { ScullyConfig } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@scullyio/scully'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0">require</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">'./extraPlugin/skip'</span><span style="color:#E1E4E8">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> const</span><span style="color:#79B8FF"> config</span><span style="color:#F97583">:</span><span style="color:#B392F0"> ScullyConfig</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#6A737D">  // ...</span></span>
<span class="line"><span style="color:#E1E4E8">  routes: {</span></span>
<span class="line"><span style="color:#6A737D">    // ...</span></span>
<span class="line"><span style="color:#9ECBFF">    '/secure'</span><span style="color:#E1E4E8">: { type: </span><span style="color:#9ECBFF">'skip'</span><span style="color:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#E1E4E8">  }</span></span>
<span class="line"><span style="color:#E1E4E8">};</span></span></code></pre>
<p>Checking the plugin by running <code>npm run scully</code> will output us the following result:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span> ☺   new Angular build imported</span></span>
<span class="line"><span> ☺   Started servers in background</span></span>
<span class="line"><span>Finding all routes in application.</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>Skip Route "/secure"</span></span>
<span class="line"><span>...</span></span></code></pre>
<p>Perfect! As you can see the route is ignored by <em>Scully</em> now.</p><p>You can have a look at a more detailed example in my <a href="https://github.com/d-koppenhagen/scully-blog-example">scully-blog-example</a> repository.</p><h2 id="conclusion-2">Conclusion</h2>
<p>In this follow-up article you learned how to add a custom Markdown module to <em>Scully</em> and how you can use the AsciiDoc plugin for rendering <code>adoc</code> files.
What is more, you can now handle protected routes by using a custom <em>Scully</em> route plugin.</p><p><strong>Thank you</strong></p><p>Special thanks go to <a href="https://twitter.com/jorgeucano">Jorge Cano</a> from the <em>Scully</em> core team and <a href="https://twitter.com/fmalcher01">Ferdinand Malcher</a> for revising this article.</p>`;export{e as default};
