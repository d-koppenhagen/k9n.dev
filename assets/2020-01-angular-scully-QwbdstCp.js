const s=`---
title: Create powerful fast pre-rendered Angular Apps using Scully static site generator
description: 'You probably heard of the JAMStack. It is a new way of building websites and apps via static site generators that deliver better performance and higher security. With this blog post, I will show you how you can easily create a blogging app by using the power of Angular and the help of Scully static site generator. It will automatically detect all app routes and create static pages out of them that are ready to ship for production.'
published: true
author:
  name: Danny Koppenhagen
  mail: mail@k9n.dev
created: 2020-01-01
updated: 2021-11-01
keywords:
  - Angular
  - Angular CLI
  - Angular Schematics
  - Scully
  - SSR
  - SSG
  - Pre-rendering
  - JAM Stack
linked:
  devTo: https://dev.to/dkoppenhagen/create-powerfull-fast-pre-rendered-angular-apps-using-scully-static-site-generator-31fb
  medium: https://danny-koppenhagen.medium.com/create-powerful-fast-pre-rendered-angular-apps-using-scully-static-site-generator-79832a549787
language: en
thumbnail:
  header: images/blog/scully/scully-header.jpg
  card: images/blog/scully/scully-header-small.jpg
series: scully
---

<h1 id="create-powerful-fast-pre-rendered-angular-apps-using-scully-static-site-generator">Create powerful fast pre-rendered Angular Apps using <em>Scully</em> static site generator</h1>
<p><strong>You probably heard of the JAMStack. It&#39;s a new way of building websites and apps via static site generators that deliver better performance and higher security. There have been tools for many platforms, but surprisingly not yet for Angular. These times are finally over. With this blog post, I want to show you how you can easily create an Angular blogging app by to pre-render your complete app.</strong></p><blockquote>
<p>On <em>Dec 16, 2019</em> the static site generator <em>Scully</em> for Angular <a href="https://www.youtube.com/watch?v=Sh37rIUL-d4">was presented</a>.
<em>Scully</em> automatically detects all app routes and creates static sites out of it that are ready to ship for production.
This blog post is based on versions of Angular and Scully:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span>"@angular/core": "~13.0.0",</span></span>
<span class="line"><span>"@angular/cli": "~13.0.3",</span></span>
<span class="line"><span>"@scullyio/init": "^2.0.5",</span></span>
<span class="line"><span>"@scullyio/ng-lib": "^2.0.0",</span></span>
<span class="line"><span>"@scullyio/scully": "^2.0.0",</span></span>
<span class="line"><span>"@scullyio/scully-plugin-puppeteer": "^2.0.0",</span></span></code></pre>
</blockquote>
<hr>

<h2 id="about-scully">About Scully</h2>
<p>Scully is a static site generator (SSG) for Angular apps.
It analyses a compiled Angular app and detects all the routes of the app.
It will then call every route it found, visit the page in the browser, renders the page and finally put the static rendered page to the file system.
This process is also known as <strong>pre-rendering</strong> – but with a new approach.
The result compiled and pre-rendered app ready for shipping to your web server.</p><blockquote>
<p><strong>Good to know:</strong> <em>Scully</em> does not use <a href="https://angular.io/guide/universal">Angular Universal</a> for the pre-rendering.
It uses a Chromium browser to visit and check all routes it found.</p></blockquote>
<p>All pre-rendered pages contain just plain HTML and CSS.
In fact, when deploying it, a user will be able to instantly access all routes and see the content with almost no delay.
The resulting sites are very small static sites (just a few KBs) so that even the access from a mobile device with a very low bandwidth is pretty fast.
It&#39;s significantly faster compared to the hundreds of KBs that you are downloading when calling a “normal” Angular app on initial load.</p><p>But that’s not all: Once the pre-rendered page is shipped to the user, <em>Scully</em> loads and bootstraps the “real” Angular app  in the background on top of the existing view.
In fact <em>Scully</em> will unite two great things:
The power of pre-rendering and very fast access to sites and the power of a fully functional Single Page Application (SPA) written in Angular.</p><h2 id="get-started">Get started</h2>
<p>The first thing we have to do is to set up our Angular app.
As <em>Scully</em> detects the content from the routes, we need to configure the Angular router as well.
Therefore, we add the appropriate flag <code>--routing</code> (we can also choose this option when the CLI prompts us).</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">npx</span><span style="color:#79B8FF"> -p</span><span style="color:#9ECBFF"> @angular/cli</span><span style="color:#9ECBFF"> ng</span><span style="color:#9ECBFF"> new</span><span style="color:#9ECBFF"> scully-blog</span><span style="color:#79B8FF"> --routing</span><span style="color:#6A737D"> # create an angular workspace</span></span>
<span class="line"><span style="color:#79B8FF">cd</span><span style="color:#9ECBFF"> scully-blog</span><span style="color:#6A737D">  # navigate into the project</span></span></code></pre>
<p>The next step is to set up our static site generator <em>Scully</em>.
Therefore, we are using the provided Angular schematic:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">ng</span><span style="color:#9ECBFF"> add</span><span style="color:#9ECBFF"> @scullyio/init</span><span style="color:#6A737D">  # add Scully to the project</span></span></code></pre>
<p>Et voilà here it is: We now have a very minimalistic Angular app that uses the power of <em>Scully</em> to automatically find all app routes, visit them and generate static pages out of them.
It&#39;s ready for us to preview.
Let&#39;s try it out by building our site and running <em>Scully</em>.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">npm</span><span style="color:#9ECBFF"> run</span><span style="color:#9ECBFF"> build</span><span style="color:#6A737D">     # build our Angular app</span></span>
<span class="line"><span style="color:#B392F0">npx</span><span style="color:#9ECBFF"> scully</span><span style="color:#6A737D">        # let Scully run over our app and build it</span></span>
<span class="line"><span style="color:#B392F0">npx</span><span style="color:#9ECBFF"> scully</span><span style="color:#9ECBFF"> serve</span><span style="color:#6A737D">  # serve the scully results</span></span></code></pre>
<blockquote>
<p><em>Scully</em> will run only once by default. To let <em>Scully</em> run and watch for file changes, just add the <code>--watch</code> option (<code>npx scully --watch</code>).</p></blockquote>
<p>After <em>Scully</em> has checked our app, it will add the generated static assets to our <code>dist/static</code> directory by default.
Let&#39;s quickly compare the result generated from <em>Scully</em> with the result from the initial Angular build (<code>dist/scully-blog</code>):</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span>dist/</span></span>
<span class="line"><span>┣ scully-blog/</span></span>
<span class="line"><span>┃ ┣ assets/</span></span>
<span class="line"><span>┃ ┣ ...</span></span>
<span class="line"><span>┃ ┗ styles.ef46db3751d8e999.css</span></span>
<span class="line"><span>┗ static/</span></span>
<span class="line"><span>  ┣ assets/</span></span>
<span class="line"><span>  ┃ ┗ scully-routes.json</span></span>
<span class="line"><span>  ┣ ...</span></span>
<span class="line"><span>  ┗ styles.ef46db3751d8e999.css</span></span></code></pre>
<p>If we take a look at it, except of the file <code>scully-routes.json</code>, that contains the configured routes used by <em>Scully</em>, we don&#39;t see any differences between the two builds.
This is because currently we only have the root route configured, and no further content was created.</p><p>Nonetheless, when running <code>npx scully serve</code> or <code>npx scully --watch</code> we can check out the result by visiting the following URL: <code>localhost:1668</code>.
This server serves the static generated pages from the <code>dist/static</code> directory like a normal web server (e.g. <em>nginx</em> or <em>apache</em>).</p><h2 id="the-scullylibmodule">The <code>ScullyLibModule</code></h2>
<p>You may have realized, that after running the <em>Scully</em> schematic, the <code>ScullyLibModule</code> has been added to your <code>AppComponent</code>:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D">// ...</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { ScullyLibModule } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@scullyio/ng-lib'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">@</span><span style="color:#B392F0">NgModule</span><span style="color:#E1E4E8">({</span></span>
<span class="line"><span style="color:#6A737D">  // ...</span></span>
<span class="line"><span style="color:#E1E4E8">  imports: [</span></span>
<span class="line"><span style="color:#6A737D">    // ...</span></span>
<span class="line"><span style="color:#E1E4E8">    ScullyLibModule</span></span>
<span class="line"><span style="color:#E1E4E8">  ]</span></span>
<span class="line"><span style="color:#E1E4E8">})</span></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> class</span><span style="color:#B392F0"> AppModule</span><span style="color:#E1E4E8"> { }</span></span></code></pre>
<p>This module is used by <em>Scully</em> to hook into the angular router and to determine once the page <em>Scully</em> tries to enter is fully loaded and ready to be rendered by using the <code>IdleMonitorService</code> from <em>Scully</em> internally.
If we remove the import of the module, <em>Scully</em> will still work, but it takes much longer to render your site as it will use a timeout for accessing the pages.
So in that case even if a page has been fully loaded, <em>Scully</em> would wait until the timer is expired.</p><h2 id="turn-it-into-a-blog">Turn it into a blog</h2>
<p>Let’s go a bit further and turn our site into a simple blog that will render our blog posts from separate Markdown documents.
<em>Scully</em> brings this feature out of the box, and it’s very easy to set it up:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">ng</span><span style="color:#9ECBFF"> g</span><span style="color:#9ECBFF"> @scullyio/init:blog</span><span style="color:#6A737D">                      # setup up the \`BlogModule\` and related sources</span></span>
<span class="line"><span style="color:#B392F0">ng</span><span style="color:#9ECBFF"> g</span><span style="color:#9ECBFF"> @scullyio/init:post</span><span style="color:#79B8FF"> --name=</span><span style="color:#9ECBFF">"First post"</span><span style="color:#6A737D">  # create a new blog post</span></span></code></pre>
<p>After these two steps we can see that <em>Scully</em> has now added the <code>blog</code> directory to our project root.
Here we can find the markdown files for creating the blog posts — one file for each post.
We now have two files there: The initially created example file from <em>Scully</em> and this one we created with <code>ng g @scullyio/init:post</code>.</p><h2 id="lets-go-further">Let&#39;s go further</h2>
<p>Now that we&#39;ve got Scully installed and working, let&#39;s modify our Angular app to look more like an actual blog, and not just like the default Angular app.
Therefore, we want to get rid of the Angular auto generated content in the <code>AppComponent</code> first.
We can simply delete all the content of <code>app.component.html</code> except of the <code>router-outlet</code>:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">router-outlet</span><span style="color:#E1E4E8">>&#x3C;/</span><span style="color:#85E89D">router-outlet</span><span style="color:#E1E4E8">></span></span></code></pre>
<p>Let’s run the build again and have a look at the results.
Scully assumes by default the route configuration hasn&#39;t changed meanwhile, and it can happen that it&#39;s not detecting the new bog entry we just created.
To be sure it will re-scan the routes, we will pass through the parameter <code>--scan</code>:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">npm</span><span style="color:#9ECBFF"> run</span><span style="color:#9ECBFF"> build</span><span style="color:#6A737D">       # Angular build</span></span>
<span class="line"><span style="color:#B392F0">npx</span><span style="color:#9ECBFF"> scully</span><span style="color:#79B8FF"> --scan</span><span style="color:#6A737D">   # generate static build and force checking new routes</span></span>
<span class="line"><span style="color:#B392F0">npx</span><span style="color:#9ECBFF"> scully</span><span style="color:#9ECBFF"> serve</span><span style="color:#6A737D">    # serve the scully results</span></span></code></pre>
<p>When checking out our <code>dist/static</code> directory we can see that there are new subdirectories for the routes of our static blogging sites.
But what&#39;s that: When we will check the directory <code>dist/static/blog/</code>, we see somewhat like this:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span>blog/</span></span>
<span class="line"><span>┣ ___UNPUBLISHED___k9pg4tmo_2DDScsUiieFlld4R2FwvnJHEBJXcgulw</span></span>
<span class="line"><span>  ┗ index.html</span></span></code></pre>
<p>This feels strange, doesn&#39;t it?
But Checking the content of the file <code>index.html</code> inside will tell us it contains actually the content of the just created blog post.
This is by intention: This <em>Scully</em> schematic created the markdown file with a meta flag called <code>published</code> that is by default set to <code>false</code>.
The internally used renderer plugin from <em>Scully</em> will handle this flag, and it creates an unguessable name for the route.
This allows us to create blog post drafts that we can already publish and share by using the link for example to let someone else review the article.
You can also use this route if you don&#39;t care about the route name.
But normally you would just like to change the metadata in the Markdown file to:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#85E89D">published</span><span style="color:#E1E4E8">: </span><span style="color:#79B8FF">true</span></span></code></pre>
<p>After this, run the build process again and the files <code>index.html</code> in <code>dist/static/blog/<post-name>/</code> contain now our static pages ready to be served.
When we are visiting the route path <code>/blog/first-post</code> we can see the content of our markdown source file <code>blog/first-post.md</code> is rendered as HTML.</p><p>If you want to prove that the page is actually really pre-rendered, just disable JavaScript by using your Chrome Developer Tools.
You can reload the page and see that the content is still displayed.
Awesome, isn&#39;t it?</p><p><img src="images/blog/scully/scully-pre-rendered-js-disabled.png" alt="a simple blog created with Scully"></p><blockquote>
<p>When JavaScript is enabled, <em>Scully</em> configures your static sites in that way, that you will see initially the static content.
In the background it will bootstrap your Angular app, and refresh the content with it.
You won&#39;t see anything flickering.</p></blockquote>
<p>Hold on a minute! 😳</p><p>You may have realized: We haven’t written one line of code manually yet, and we have already a fully functional blogging site that’s server site rendered. Isn’t that cool?
Setting up an Angular based blog has never been easier.</p><blockquote>
<p><strong>Good to know:</strong> <em>Scully</em> also detects new routes we are adding manually to our app, and it will create static sites for all those pages.</p></blockquote>
<h2 id="use-the-scullyroutesservice">Use the <code>ScullyRoutesService</code></h2>
<p>We want to take the next step.
Now we want to list an overview of all existing blog posts we have and link to their sites in our <code>AppComponent</code>.
Therefore, we can easily inject the <code>ScullyRoutesService</code>.
It will return us a list of all routes <em>Scully</em> found with the parsed information as a <code>ScullyRoute</code> array within the <code>available$</code> observable.
We can easily inject the service and display the information as a list in our <code>AppComponent</code>.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { Component } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular/core'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { ScullyRoutesService, ScullyRoute } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@scullyio/ng-lib'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { Observable } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> 'rxjs'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">@</span><span style="color:#B392F0">Component</span><span style="color:#E1E4E8">({</span></span>
<span class="line"><span style="color:#E1E4E8">  selector: </span><span style="color:#9ECBFF">'app-root'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">  templateUrl: </span><span style="color:#9ECBFF">'./app.component.html'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">  styleUrls: [</span><span style="color:#9ECBFF">'./app.component.css'</span><span style="color:#E1E4E8">]</span></span>
<span class="line"><span style="color:#E1E4E8">})</span></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> class</span><span style="color:#B392F0"> AppComponent</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#FFAB70">  links$</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Observable</span><span style="color:#E1E4E8">&#x3C;</span><span style="color:#B392F0">ScullyRoute</span><span style="color:#E1E4E8">[]> </span><span style="color:#F97583">=</span><span style="color:#79B8FF"> this</span><span style="color:#E1E4E8">.scully.available$;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">  constructor</span><span style="color:#E1E4E8">(</span><span style="color:#F97583">private</span><span style="color:#FFAB70"> scully</span><span style="color:#F97583">:</span><span style="color:#B392F0"> ScullyRoutesService</span><span style="color:#E1E4E8">) {}</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>To display the results, we can simply use <code>ngFor</code> with the <code>async</code> pipe and list the results.
A <code>ScullyRoute</code> will give us the routing path inside the <code>route</code> key and all other markdown metadata inside their appropriate key names.
So we can extend for example our markdown metadata block with more keys (e.g. <code>thumbnail: assets/thumb.jpg</code>) and we can access them via those (<code>blog.thumbnail</code> in our case).
We can extend <code>app.component.html</code> like this:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">ul</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">li</span><span style="color:#B392F0"> *ngFor</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"let link of links$ | async"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">    &#x3C;</span><span style="color:#85E89D">a</span><span style="color:#B392F0"> [routerLink]</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"link.route"</span><span style="color:#E1E4E8">>{{ link.title }}&#x3C;/</span><span style="color:#85E89D">a</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;/</span><span style="color:#85E89D">li</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;/</span><span style="color:#85E89D">ul</span><span style="color:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">hr</span><span style="color:#E1E4E8"> /></span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">router-outlet</span><span style="color:#E1E4E8">>&#x3C;/</span><span style="color:#85E89D">router-outlet</span><span style="color:#E1E4E8">></span></span></code></pre>
<p>This will give us a fully routed blog page:</p><p><img src="images/blog/scully/scully-blog.gif" alt="a simple blog created with scully"></p><p>The <code>ScullyRoutesService</code> contains all the available routes in your app.
In fact, any route that we add to our Angular app will be detected by <em>Scully</em> and made available via the <code>ScullyRoutesService.available$</code> observable.
To list only blog posts from the <code>blog</code> route and directory we can just filter the result:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D">/* ... */</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { map, Observable } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> 'rxjs'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#6A737D">/* ... */</span></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> class</span><span style="color:#B392F0"> AppComponent</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#FFAB70">  links$</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Observable</span><span style="color:#E1E4E8">&#x3C;</span><span style="color:#B392F0">ScullyRoute</span><span style="color:#E1E4E8">[]> </span><span style="color:#F97583">=</span><span style="color:#79B8FF"> this</span><span style="color:#E1E4E8">.scully.available$.</span><span style="color:#B392F0">pipe</span><span style="color:#E1E4E8">(</span></span>
<span class="line"><span style="color:#B392F0">    map</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">routeList</span><span style="color:#F97583"> =></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">      return</span><span style="color:#E1E4E8"> routeList.</span><span style="color:#B392F0">filter</span><span style="color:#E1E4E8">((</span><span style="color:#FFAB70">route</span><span style="color:#F97583">:</span><span style="color:#B392F0"> ScullyRoute</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span></span>
<span class="line"><span style="color:#E1E4E8">        route.route.</span><span style="color:#B392F0">startsWith</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">\`/blog/\`</span><span style="color:#E1E4E8">),</span></span>
<span class="line"><span style="color:#E1E4E8">      );</span></span>
<span class="line"><span style="color:#E1E4E8">    })</span></span>
<span class="line"><span style="color:#E1E4E8">  );</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">  constructor</span><span style="color:#E1E4E8">(</span><span style="color:#F97583">private</span><span style="color:#FFAB70"> scully</span><span style="color:#F97583">:</span><span style="color:#B392F0"> ScullyRoutesService</span><span style="color:#E1E4E8">) {}</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>Wow! That was easy, wasn’t it?
Now you just need to add a bit of styling and content and your blog is ready for getting visited.</p><h2 id="fetch-dynamic-information-from-an-api">Fetch dynamic information from an API</h2>
<p>As you may have realized: <em>Scully</em> needs a data source to fetch all dynamic routes in an app.
In case of our blog example <em>Scully</em> uses the <code>:slug</code> router parameter as a placeholder.
Scully will fill this placeholder with appropriate content to visit and pre-render the site.
The content for the placeholder comes in our blog example from the files in the <code>/blog</code> directory.
This has been configured from the schematics we ran before in the file <code>scully.scully-blog.config.ts</code>:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { ScullyConfig } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@scullyio/scully'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D">/** this loads the default render plugin, remove when switching to something else. */</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#9ECBFF"> '@scullyio/scully-plugin-puppeteer'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> const</span><span style="color:#79B8FF"> config</span><span style="color:#F97583">:</span><span style="color:#B392F0"> ScullyConfig</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#E1E4E8">  projectRoot: </span><span style="color:#9ECBFF">"./src"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">  projectName: </span><span style="color:#9ECBFF">"scully-blog"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">  outDir: </span><span style="color:#9ECBFF">'./dist/static'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">  routes: {</span></span>
<span class="line"><span style="color:#9ECBFF">    '/blog/:slug'</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#E1E4E8">      type: </span><span style="color:#9ECBFF">'contentFolder'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">      slug: {</span></span>
<span class="line"><span style="color:#E1E4E8">        folder: </span><span style="color:#9ECBFF">"./blog"</span></span>
<span class="line"><span style="color:#E1E4E8">      }</span></span>
<span class="line"><span style="color:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#E1E4E8">  }</span></span>
<span class="line"><span style="color:#E1E4E8">};</span></span></code></pre>
<p>I would like to show a second example.
Imagine we want to display information about books from an external API.
So our app needs another route called <code>/books/:isbn</code>.
To visit this route and pre-render it, we need a way to fill the <code>isbn</code> parameter.
Luckily <em>Scully</em> helps us with this too.
We can configure <a href="https://scully.io/docs/plugins#router-plugin"><em>Router Plugin</em></a> that will call an API, fetch the data from it and pluck the <code>isbn</code> from the array of results to fill it in the router parameter.</p><p>In the following example we will use the public service <a href="https://api3.angular-buch.com">BookMonkey API</a> (we provide this service for the readers of our <a href="https://angular-buch.com/">German Angular book</a>) as an API to fetch a list of books:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D">/* ... */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> const</span><span style="color:#79B8FF"> config</span><span style="color:#F97583">:</span><span style="color:#B392F0"> ScullyConfig</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#6A737D">  /* ... */</span></span>
<span class="line"><span style="color:#E1E4E8">  routes: {</span></span>
<span class="line"><span style="color:#6A737D">    /* ... */</span></span>
<span class="line"><span style="color:#9ECBFF">    '/books/:isbn'</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#9ECBFF">      'type'</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">'json'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#9ECBFF">      'isbn'</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#9ECBFF">        'url'</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">'https://api3.angular-buch.com/books'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#9ECBFF">        'property'</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">'isbn'</span></span>
<span class="line"><span style="color:#E1E4E8">      }</span></span>
<span class="line"><span style="color:#E1E4E8">    }</span></span>
<span class="line"><span style="color:#E1E4E8">  }</span></span>
<span class="line"><span style="color:#E1E4E8">};</span></span></code></pre>
<p>The result from the API will have this shape:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">[</span></span>
<span class="line"><span style="color:#E1E4E8">  {</span></span>
<span class="line"><span style="color:#79B8FF">    "title"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"Angular"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">    "subtitle"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"Grundlagen, fortgeschrittene Themen und Best Practices – mit NativeScript und NgRx"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">    "isbn"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"9783864906466"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6A737D">    // ...</span></span>
<span class="line"><span style="color:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#E1E4E8">  {</span></span>
<span class="line"><span style="color:#79B8FF">    "title"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"Angular"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">    "subtitle"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript - ab Angular 4, inklusive NativeScript und Redux"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">    "isbn"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"9783864903571"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6A737D">    // ...</span></span>
<span class="line"><span style="color:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#6A737D">  // ...</span></span>
<span class="line"><span style="color:#E1E4E8">]</span></span></code></pre>
<p>After <em>Scully</em> plucks the ISBN, it will just iterate over the final array: <code>['9783864906466', '9783864903571']</code>.
In fact, when running <em>Scully</em> using <code>npx scully</code>, it will visit the following routes, <strong>after we have configured the route <code>/books/:isbn</code> in the Angular router</strong> (otherwise non-used routes will be skipped).</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span>/books/9783864906466</span></span>
<span class="line"><span>/books/9783864903571</span></span></code></pre>
<p>We can see the result in the log:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span>enable reload on port 2667</span></span>
<span class="line"><span> ☺   new Angular build imported</span></span>
<span class="line"><span> ☺   Started servers in background</span></span>
<span class="line"><span>--------------------------------------------------</span></span>
<span class="line"><span>Watching blog for change.</span></span>
<span class="line"><span>--------------------------------------------------</span></span>
<span class="line"><span> ☺   new Angular build imported</span></span>
<span class="line"><span>Finding all routes in application.</span></span>
<span class="line"><span>Using stored unhandled routes</span></span>
<span class="line"><span>Pull in data to create additional routes.</span></span>
<span class="line"><span>Finding files in folder "/&#x3C;path>/blog"</span></span>
<span class="line"><span>Route list created in files:</span></span>
<span class="line"><span>  "/&#x3C;path>/src/assets/scully-routes.json",</span></span>
<span class="line"><span>  "/&#x3C;path>/dist/static/assets/scully-routes.json",</span></span>
<span class="line"><span>  "/&#x3C;path>/dist/scully-blog/assets/scully-routes.json"</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Route "/books/9783864903571" rendered into file: "/&#x3C;path>/dist/static/books/9783864903571/index.html"</span></span>
<span class="line"><span>Route "/books/9783864906466" rendered into file: "/&#x3C;path>/dist/static/books/9783864906466/index.html"</span></span>
<span class="line"><span>Route "/blog/12-27-2019-blog" rendered into file: "/&#x3C;path>/dist/static/blog/12-27-2019-blog/index.html"</span></span>
<span class="line"><span>Route "/blog/first-post" rendered into file: "/&#x3C;path>/dist/static/blog/first-post/index.html"</span></span>
<span class="line"><span>Route "/" rendered into file: "/&#x3C;path>/dist/static/index.html"</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Generating took 3.3 seconds for 7 pages:</span></span>
<span class="line"><span>  That is 2.12 pages per second,</span></span>
<span class="line"><span>  or 473 milliseconds for each page.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Finding routes in the angular app took 0 milliseconds</span></span>
<span class="line"><span>  Pulling in route-data took 26 milliseconds</span></span>
<span class="line"><span>  Rendering the pages took 2.58 seconds</span></span></code></pre>
<p>This is great. We have efficiently pre-rendered normal dynamic content!
And that was it for today.
With the shown examples, it&#39;s possible to create a full-fledged website with Scully.</p><blockquote>
<p>Did you know that <strong>this blogpost</strong> and the overall website you are right now reading has also been created using <em>Scully</em>?
Feel free to check out the sources at:
<a href="https://github.com/d-koppenhagen/k9n.dev">github.com/d-koppenhagen/k9n.dev</a></p></blockquote>
<p>If you want to follow all the development steps in detail, check out my provided GitHub repository
<a href="https://github.com/d-koppenhagen/scully-blog-example">scully-blog-example</a>.</p><h2 id="conclusion-1">Conclusion</h2>
<p>Scully is an awesome tool if you need a pre-rendered Angular SPA where all routes can be accessed immediately without loading the whole app at once.
This is a great benefit for users as they don’t need to wait until the bunch of JavaScript has been downloaded to their devices.
Visitors and <strong>search engines</strong> have instantly access to the sites&#39; information.
Furthermore, <em>Scully</em> offers a way to create very easily a blog and renders all posts written in Markdown.
It will handle and pre-render dynamic routes by fetching API data from placeholders and visiting every route filled by this placeholder.</p><p>Compared to &quot;classic&quot; pre-rending by using <a href="https://angular.io/guide/universal">Angular Universal</a>, <em>Scully</em> is much easier to use, and it doesn&#39;t require you to write a specific flavor of Angular.
Also, <em>Scully</em> can easily pre-render hybrid Angular apps or Angular apps with plugins like jQuery in comparison to Angular Universal.
If you want to compare <em>Scully</em> with Angular Universal in detail, check out the blog post from Sam Vloeberghs: <a href="https://samvloeberghs.be/posts/scully-or-angular-universal-what-is-the-difference">Scully or Angular Universal, what is the difference?</a></p><p>If you want to dig a bit deeper into the features <em>Scully</em> offers, check out my <a href="/blog/2020-03-dig-deeper-into-scully-ssg">second article</a>.</p><p><strong>Thank you</strong></p><p>Special thanks go to <a href="https://twitter.com/aaronfrost">Aaron Frost (Frosty ⛄️)</a> from the <em>Scully</em> core team, <a href="https://twitter.com/fmalcher01">Ferdinand Malcher</a> and <a href="https://twitter.com/JohannesHoppe">Johannes Hoppe</a> for revising this article.</p>`;export{s as default};
