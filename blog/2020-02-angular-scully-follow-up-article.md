---
title: angular-scully-follow-up-article
description: Add some description for the blog overview page here
publish: false
author: Danny Koppenhagen
mail: mail@d-koppenhagen.de
updated: 2020-02-25
keywords:
  - Angular
  - Angular CLI
  - Angular Schematics
  - Scully
  - SSR
  - SSG
  - Pre-rendering
  - JAM Stack
language: en
thumbnail: assets/images/blog/scully-header.jpg
thumbnailSmall: assets/images/blog/scully-header-small.jpg
---

# Dig deeper into _Scully_ and use the most out of it

**If you haven't heard about _Scully_, you should at first check out my introduction article about it ['Create powerful fast pre-rendered Angular Apps using _Scully_ static site generator'](/blog/2020-01-angular-scully).**

<hr>

**Table of contents:**

- [Introduction](/blog/2020-02-angular-scully-follow-up-article#introduction)
- [Generate a post with a meta data template](/blog/2020-02-angular-scully-follow-up-article#generate-a-post-with-a-meta-data-template)
- [Generate a custom Markdown module](/blog/2020-02-angular-scully-follow-up-article#generate-a-custom-markdown-module)
- [Switch to AsciiDoc](/blog/2020-02-angular-scully-follow-up-article#switch-to-ascii-doc)
- [Handle protected routes](/blog/2020-02-angular-scully-follow-up-article#handle-protected-routes)
- [Conclusion](/blog/2020-02-angular-scully-follow-up-article#conclusion)

## Introduction

In my [last](/blog/2020-01-angular-scully) blog post I gave you a short introduction to _Scully_ and how to easily set up a very simple blogging website that is server side rendered and ready to be shipped for production.
In the following article I will introduce some more advanced things you can do with _Scully_.
You will learn how you can setup a cutom markdown module or even use asciidoc instead of markdown.
I will guide you through the process of how to handle protected routes using _Scully_ and learn about the _Scully_ TransferState.

## Generate a post with a meta data template

As we already created our blogging site using _Scully_, we want to fill it with content.
We have already learned how we can use the schematic `@scullyio/init:post` to easily generate a new blog posts.
Often posts need not only the content but some meta information (e.g. `thumbnail`, `author`, etc.).
This meta information can for example be processed by the `ScullyRouteService` and it will be converted to JSON.
It can be quite handy to remember to add such informnation always after creating a new post.
To make things easier we can specify a YAML template file with the meta information that will always be added when creating a new blog post using the schematic:

```yaml
description: <fill in a short description for the overview page>
publish: false
author: Danny Koppenhagen
mail: mail@d-koppenhagen.de
updated: dd.mm.yyyy
keywords:
  - Angular
language: en
thumbnail: assets/images/default.jpg
```

We can use the template when calling the `@scullyio/init:post` schematic:

```bash
ng g @scullyio/init:post --name="a new post" --meta-data-file="meta.yml"
```

When we are checking our `blog` directory now we will see that the schematic added our YAML template to the meta data section of the newly created post file `a-new-post.md`.

> I you have trouble remember adding the `meta-data-file` option, just add a script to your `package.json` without the `name` option.
> When you will calling the script using `npm run <script-name>` you will be prompted to input the file name.

## Generate a custom Markdown module

Let's assume we want to add another module to our blogging website.
We want to have a `projects` section at our site that will list some information about current projects we are working on.
Like for our `blog` section, we want to easily write our content using `markdown`.
Therefor we can use the schematic `@scullyio/init:markdown`:

```bash
ng g @scullyio/init:markdown --name="projects" --slug="projectId" --sourceDir="projects" --route="projects"
```

let's have a look at the options we set:

- `name`: This is the base name for the generated angular module scully created for us.
- `slug`: Here we define the placeholder name for the URL that will be filled with the basename of the markdown files.
- `sourceDir`: That's where we will store our markdown files that's content is rendered by the scully markdown file plugin.
- `route`: This is the name for the route before the `:slug` in the URLs where we can see our rendered content later.

> Good to know: Under the hood the schematic `@scullyio/init:blog` is just calling `@scullyio/init:markdown` with default options set. So in fact it's just a shortcut.

The basic things we need for our projects page are now available.
Let's have a look at it and see if it's working:

```bash
npm run build         # Angular build
npm run scully        # generate static build
npm run scully:serve  # serve static build
```

![the initial projects post generated with the markdown schematic](/assets/images/blog/scully-markdown-projects.png)

## Switch to AsciiDoc

Scully provides another _File Handler plugin_ out-of-the-box: The _AsciiDoc_ plugin.
You can easily change the file extension of a generated post file by using the `extension` option.
When you want to put the generated post files in a specific directory (not `blog`), you can choose this via the `target` option.

```bash
ng g @scullyio/init:post --name="asciidoc example" --target="projects" --extension="adoc"
```

Let's add a bit of content after it has been generated:

```adoc
:title: 2020-01-21-projects
:description: blog description
:publish: false

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
npm run build         # Angular build
npm run scully        # generate static build
npm run scully:serve  # serve static build
```

Great, as we can see: AsciiDoc files will be rendered as well out-of-the-box.

![a scully rendered asciidoc file](/assets/images/blog/scully-asciidoc-projects.png)

You can also define your own File Handler Plugin for other content formats.
Check out the [official docs](https://github.com/scullyio/scully/blob/master/docs/plugins.md#file-plugin) for it to see how it works.

## Handle protected routes

Let's assume we have a protected space at our site that should only be visible for specific users.
For sure we can secure this space using an Angular Route Guard that checks if we have the correct permissions to see the space.

_Scully_ will by default try to identify all app routes available.
In fact it will try to visit also the protected space and pre-render the result.
When _Scully_ is trying this, the Angular route guard kicks in and redirect us to an error or login page.
The page show after redirect is the page _Scully_ will see and render.
This default behaviour is pretty okay, as _Scully_ won't expose any protected information by creating static content from the protected data.
But on the other hand, we don't want to pre-render such pages at all, so we need a way to tell _Scully_ what pages / space to exclude from the rendering.
Another scenario you can imagine is when a Page displays a prompt or a confirm dialog.
When _Scully_ tries to render such pages it runs into a timeout:

```
...
Puppeteer error while rendering "/secure" TimeoutError: Navigation timeout of 30000 ms exceeded
```

To prevent _Scully_ from rendering such kind of pages we can simply create a custom pliugin that will skip such routes.

Therefore we will create a new directory `extraPlugin` with the file `skip.js` inside:

```js
const { configValidator, registerPlugin } = require('@scullyio/scully');
const { log, yellow } = require('@scullyio/scully/utils/log');

const skipPlugin = async (route, options) => {
  log(`Skip Route "${yellow(route)}"`);
  return [];
};

voidPlugin[configValidator] = async conf => [];
registerPlugin('router', 'skip', skipPlugin);
```

We will import the function `registerPlugin` which will register a new router plugin called `skip`.
The last parameter is the plugin function `skipPlugin` that will return a promise resolving the routes to resolve.
It receives the route and options for the route that should be handled.
We will simply return an empty array as we won't proceed routes handled by the plugin.
We can your the exportet log function from scully to log the action in a nice way.

Last but not least we will use the `skip` plugin in our `scully.config.js` configuration file and tell the plugin which routes to handle:

```js
require('./extraPlugin/skip');

exports.config = {
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

## Conclusion
