---
title: Dig deeper into static site generation with Scully and use the most out of it
description: 'In this article about Scully, I will introduce some more advanced features.
You will learn how you can setup a custom Markdown module and how you can use AsciiDoc with Scully.
I will guide you through the process of how to handle protected routes using a custom route plugin.'
published: true
author:
  name: Danny Koppenhagen
  mail: mail@d-koppenhagen.de
updated: 2020-07-18
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
  medium: https://medium.com/@danny.koppenhagen/dig-deeper-into-static-site-generation-with-scully-and-use-the-most-out-of-it-ac86f216a6a7
language: en
thumbnail:
  header: assets/images/blog/scully/scully-header2.jpg
  card: assets/images/blog/scully/scully-header2-small.jpg
---

# Dig deeper into static site generation with _Scully_ and use the most out of it

**If you haven't heard about _Scully_ yet, you should first check out my introduction article about it: _[»Create powerful fast pre-rendered Angular Apps using Scully static site generator«](/blog/2020-01-angular-scully)_.**

In my [last blog post](/blog/2020-01-angular-scully) I gave you a short introduction to _Scully_ and how to easily set up a very simple blogging website that is server-side rendered and ready to be shipped for production.
In the following article I will introduce some more advanced things you can do with _Scully_.
You will learn how you can setup a custom Markdown module or even use Asciidoc instead of Markdown.
I will guide you through the process of how to handle protected routes using a custom route plugin.

<hr>

<div id="toc"><h2>Table of contents</h2></div>

<hr>

> This blog post is based on versions:
> ```
> @scullyio/ng-lib: 1.0.0-beta.0
> @scullyio/init: 1.0.0-beta.0
> @scullyio/scully: 1.0.0-beta.0
> ```
> However some of the commands or API calls used here may change in the future.
> It’s my goal to keep this blog post as up-to-date as possible.

<hr>

## Generate a post with a meta data template

As we already created our blogging site using _Scully_, we want to fill it with content now.
We already learned how we can use the `@scullyio/init:post` schematic to easily generate a new blog post.
Often posts do not only need the content, but also some meta information like `thumbnail` or `author`.
This meta information can be processed by the `ScullyRouteService` and it will be converted to JSON.
It can be quite handy to always remember to add such information right after creating a new post.
To make things easier we can specify a YAML template file with the meta information that will always be added when creating a new blog post using the schematic, like the following one:

```yaml
description: <fill in a short description for the overview page>
published: false
author:
  name: Danny Koppenhagen
  mail: mail@d-koppenhagen.de
updated: dd.mm.yyyy
keywords:
  - Angular
language: en
thumbnail: assets/images/default.jpg
```

We can use the template when calling the `@scullyio/init:post` schematic:

```bash
ng g @scullyio/init:post --name="a new post" --meta-data-file=meta.yml
```

When we check our `blog` directory now we will see that the schematic added our YAML template to the meta data section of the newly created post file `a-new-post.md`.

> If you have trouble remembering to add the `meta-data-file` option, just add a script to your `package.json` without the `name` option.
> When you call the script using `npm run <script-name>` you will be prompted to input the file name.

## Generate a custom Markdown module

Let's assume we want to add another module to our blogging website.
We want to have a `projects` section in our site that lists some information about current projects we are working on.
Like for our `blog` section, we want to easily write our content using Markdown.
To do so, we can use the `@scullyio/init:markdown` schematic:

```bash
ng g @scullyio/init:markdown --name=projects --slug=projectId --sourceDir=projects --route=projects
```

Let's have a look at the options we set:

- `name`: This is the base name for the generated Angular module that _Scully_ created for us.
- `slug`: Here we define the placeholder name for the URL that will be filled with the basename of the Markdown files.
- `sourceDir`: That's where we will store our Markdown files whose content is rendered by the _Scully_ Markdown file plugin.
- `route`: This is the name for the route before the `:slug` in the URLs where we can see our rendered content later.

> Good to know: Under the hood the `@scullyio/init:blog` schematic just calls `@scullyio/init:markdown` with default options set. So in fact it's just a shortcut.

The basic things we need for our projects page are now available.
Let's have a look at it and see if it's working:

```bash
npm run build                   # Angular build
npm run scully -- --scanRoutes  # generate static build and force checking new routes
npm run scully serve            # serve the scully results
```

![the initial projects post generated with the Markdown schematic](/assets/images/blog/scully/scully-markdown-projects.png)

## The `AsciiDoc` File Handler Plugin

_Scully_ provides another _File Handler Plugin_ out-of-the-box: The _AsciiDoc_ plugin.
When you want to put the generated post files in a specific directory (not `blog`), you can define this via the `target` option.

```bash
ng g @scullyio/init:post --name="asciidoc example" --target=projects
```

The generated file will be a Markdown file initially.
Let's change the file extension, rename it to `*.adoc` and add a bit of content after it has been generated:

```asciidoc
:title: 2020-01-21-projects
:description: blog description
:published: false

= 2020-01-21-projects

Let's show some source code!

.index.html
[#src-listing]
[source,html]
----
<div>
  <span>Hello World!</span>
</div>
----
```

And finally we build our project again and see if it works:

```bash
npm run build                   # Angular build
npm run scully -- --scanRoutes  # generate static build and force checking new routes
npm run scully serve            # serve the scully results
```

Great, as we can see: AsciiDoc files will be rendered as well out-of-the-box.

![a scully rendered asciidoc file](/assets/images/blog/scully/scully-asciidoc-projects.png)

You can also define your own File Handler Plugin for other content formats.
Check out the [official docs](https://scully.io/docs/plugins#file-plugin) for it to see how it works.

## Protect your routes with a custom plugin

Let's assume we have a protected section at our site that should only be visible for specific users.
For sure we can secure this space using an [Angular Route Guard](https://angular.io/guide/router#milestone-5-route-guards) that checks if we have the correct permissions to see the pages.

_Scully_ will by default try to identify all available app routes.
In fact it will also try to visit the protected pages and pre-render the result.
When _Scully_ tries to do this, the Angular route guard kicks in and redirects us to an error or login page.
The page shown after the redirect is the page _Scully_ will see and render.
This default behaviour is pretty okay, as _Scully_ won't expose any protected information by creating static content from the protected data.
However, on the other hand, we don't want to pre-render such pages at all, so we need a way to tell _Scully_ what pages to exclude from the rendering.
Another scenario you can imagine is when a page displays a prompt or a confirm dialog.
When _Scully_ tries to render such pages it runs into a timeout and cannot render the page:

```
...
Puppeteer error while rendering "/secure" TimeoutError: Navigation timeout of 30000 ms exceeded
```

To prevent _Scully_ from rendering specific pages we can simply create a custom plugin that will skip some routes.

To do so, we will create a new directory `extraPlugin` with the file `skip.js` inside:

```js
const { registerPlugin, log, yellow } = require('@scullyio/scully');

function skipPlugin(route, config = {}) {
  log(`Skip Route "${yellow(route)}"`);
  return Promise.resolve([]);
}

const validator = async conf => [];
registerPlugin('router', 'skip', skipPlugin, validator);
module.exports.skipPlugin = skipPlugin;
```

We will import the function `registerPlugin()` which will register a new router plugin called `skip`.
The last parameter is the plugin function `skipPlugin()` that will return a promise resolving the routes.
It receives the route and options for the route that should be handled.
We will simply return an empty array as we won't proceed routes handled by the plugin.
We can use the exported `log()` function from _Scully_ to log the action in a nice way.

Last but not least we will use the `skip` plugin in our `scully.scully-blog.config.ts` configuration file and tell the plugin which routes to handle:

```ts
import { ScullyConfig } from '@scullyio/scully';

require('./extraPlugin/skip');

export const config: ScullyConfig = {
  // ...
  routes: {
    // ...
    '/secure': { type: 'skip' },
  }
};
```

Checking the plugin by running `npm run scully` will output us the following result:

```
 ☺   new Angular build imported
 ☺   Started servers in background
Finding all routes in application.
...
Skip Route "/secure"
...
```

Perfect! As you can see the route is ignored by _Scully_ now.

You can have a look at a more detailed example in my [scully-blog-example](https://github.com/d-koppenhagen/scully-blog-example) repository.

## Conclusion

In this follow-up article you learned how to add a custom Markdown module to _Scully_ and how you can use the AsciiDoc plugin for rendering `adoc` files.
What is more, you can now handle protected routes by using a custom _Scully_ route plugin.

**Thank you**

Special thanks go to [Jorge Cano](https://twitter.com/jorgeucano) from the _Scully_ core team and [Ferdinand Malcher](https://twitter.com/fmalcher01) for revising this article.
