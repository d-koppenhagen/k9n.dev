---
title: Create powerful fast pre-rendered Angular Apps using Scully static site generator
description: 'You probably heard of the JAMStack. It is a new way of building websites and apps via static site generators that deliver better performance and higher security. With this blog post, I will show you how you can easily create a blogging app by using the power of Angular and the help of Scully static site generator. It will automatically detect all app routes and create static pages out of them that are ready to ship for production.'
publish: true
author: Danny Koppenhagen
mail: mail@d-koppenhagen.de
updated: 2020-04-14
keywords:
  - Angular
  - Angular CLI
  - Angular Schematics
  - Scully
  - SSR
  - SSG
  - Pre-rendering
  - JAM Stack
devTo: https://dev.to/dkoppenhagen/create-powerfull-fast-pre-rendered-angular-apps-using-scully-static-site-generator-31fb
language: en
thumbnail: assets/images/blog/scully/scully-header.jpg
thumbnailSmall: assets/images/blog/scully/scully-header-small.jpg
---

# Create powerful fast pre-rendered Angular Apps using _Scully_ static site generator

**You probably heard of the JAMStack. It's a new way of building websites and apps via static site generators that deliver better performance and higher security. There have been tools for many platforms, but surprisingly not yet for Angular. These times are finally over. With this blog post, I want to show you how you can easily create an Angular blogging app by to pre-render your complete app.**

<hr>

<div id="toc"><h2>Table of contents</h2></div>

> On _Dec 16, 2019_ the static site generator _Scully_ for Angular [was presented](https://www.youtube.com/watch?v=Sh37rIUL-d4).
> _Scully_ automatically detects all app routes and creates static sites out of it that are ready to ship for production. _Scully_ is currently just available within an early version.
> This blog post is based on versions:
> ```
> @scullyio/ng-lib: 0.0.22
> @scullyio/init: 0.0.25
> @scullyio/scully: 0.0.86
> ```
> However some of the commands or API calls used here may change in the future.
> It’s my goal to keep this blog post as up-to-date as possible.

## About Scully

Scully is a static site generator (SSG) for Angular apps.
It analyses a compiled Angular app and detects all the routes of the app.
It will then call every route it found, visit the page in the browser, renders the page and finally put the static rendered page to the file system.
This process is also known as **pre-rendering** – but with a new approach.
The result compiled and pre-rendered app ready for shipping to your web server.

> **Good to know:** _Scully_ does not use [Angular Universal](https://angular.io/guide/universal) for the pre-rendering.
> It uses a Chromium browser to visit and check all routes it found.

All pre-rendered pages contain just plain HTML and CSS.
In fact, when deploying it, a user will be able to instantly access all routes and see the content with almost no delay.
The resulting sites are very small static sites (just a few KBs) so that even the access from a mobile device with a very low bandwidth is pretty fast.
It's significantly faster compared to the hundreds of KBs that you are downloading when calling a “normal” Angular app on initial load.

But that’s not all: Once the pre-rendered page is shipped to the user, _Scully_ loads and bootstraps the “real” Angular app  in the background on top of the existing view.
In fact _Scully_ will unite two great things:
The power of pre-rendering and very fast access to sites and the power of a fully functional Single Page Application (SPA) written in Angular.

## Get started

The first thing we have to do is to setup our Angular app.
As _Scully_ detects the content from the routes, we need to configure the Angular router as well.
Therefore, we add the appropriate flag `--routing` (we can also choose this option when the CLI prompts us).

```bash
npx -p @angular/cli ng new scully-blog --routing
cd scully-blog  # navigate into the project
```

The next step is to setup our static site generator _Scully_.
Therefore, we are using the provided Angular schematic:

```bash
ng add @scullyio/init  # add _Scully_ to the project
```

Et voilà here it is: We now have a very minimalistic Angular app that uses the power of _Scully_ to automatically find all app routes, visit them and generate static pages out of them.
It's ready for us to preview.
Let's try it out by building our site and running _Scully_.

```bash
npm run build   # build our Angular app
npm run scully  # let Scully run over our app and build it
npm run scully serve # serve the scully results
```

> _Scully_ will run only once by default. To let _Scully_ run and watch for file changes, just add the `--watch` option (`npm run scully -- --watch`).

After _Scully_ has checked our app, it will add the generated static assets to our `dist/static` directory by default.
Let's quickly compare the result generated from _Scully_ with the result from the initial Angular build (`dist/scully-blog`):

```text
dist/
┣ scully-blog/
┃ ┣ favicon.ico
┃ ┣ ...
┃ ┗ vendor-es5.js.map
┗ static/
  ┣ assets/
  ┃ ┗ scully-routes.json
  ┣ favicon.ico
  ┣ ...
  ┗ vendor-es5.js.map
```

If we take a look at it, except of the file `scully-routes.json`, that contains just an empty array, we don't see any differences between the two builds.
This is because currently we only have the root route configured and no more further content was created.

Nonetheless we can checkout the result by visiting the following URL: `localhost:1668`.
This server serves the static generated pages from the `dist/static` directory like a normal webserver (e.g. _nginx_ or _apache_).

## The `ScullyLibModule`

You may have realized, that after running the _Scully_ schematic, the `ScullyLibModule` has been added to your `AppComponent`:

```ts
// ...
import { ScullyLibModule } from '@scullyio/ng-lib';

@NgModule({
  // ...
  imports: [
    // ...
    ScullyLibModule
  ]
})
export class AppModule { }
```

This module is used by _Scully_ to hook into the angular router and to determine once the page _Scully_ tries to enter is fully loaded and ready to be rendered by using the `IdleMonitorService` from _Scully_ internally.
If we will remove the import of the module, _Scully_ will still work but it takes much longer to render your site as it will use a timeout for accessing the pages. So in that case even if the a page has been fully loaded, _Scully_ would wait until the timer is expired.

## Turn it into a blog

Let’s go a bit further and turn our site into a simple blog that will render our blog posts from separate markdown documents.
Scully brings this feature out of the box and it’s very easy to set it up:

```bash
ng g @scullyio/init:blog                      # setup up the `BlogModule` and related sources
ng g @scullyio/init:post --name="First post"  # create a new blog post
```

After these two steps we can see that _Scully_ has now added the `blog` directory to our project root.
Here we can find the markdown files for creating the blog posts — one file for each post.
We now have two files there: The initially created example file from _Scully_ and this one we created with `ng g @scullyio/init:post`.

## Let's go further

Now that we've got Scully installed and working, let's modify our Angular app to look more like an actual blog, and not just like the default Angular app.
Therefore, we want to get rid of the Angular auto generated content in the `AppComponent` first.
We can simply delete all the content of `app.component.html` except of the `RouterOutlet`.
So in the end the content of our file `app.component.html` should look like this:

```html
<router-outlet></router-outlet>
```

Let’s run the build again and have a look at the results:

```bash
npm run build   # Angular build
npm run scully  # generate static build and serve the app
```

When checking out our `dist/static` directory we can see that there are new sub-directories for the routes of our static blogging sites.
The files `index.html` in `dist/static/blog/<post-name>/` contain our static pages ready to be served.
When we are visiting the route path `/blog/first-post` we can see the content of our markdown source file `blog/first-post.md` is rendered as HTML.

If you want to prove that the page is actually really pre-rendered, just disable JavaScript by using your Chrome Developer Tools.
You can reload the page and see that the content is still displayed.
Awesome isn't it?

![a simple blog created with scully](/assets/images/blog/scully/scully-pre-rendered-js-disabled.png)

> When JavaScript is enabled, _Scully_ configures your static sites in that way, that you will see initially the static content.
> In the background it will bootstrap your Angular app, and refresh the content with it.
> You won't see anything flickering.

Hold on a minute! 😳

You may have realized: We haven’t written one line of code manually yet and we have already a fully functional blogging site that’s server site rendered. Isn’t that cool?
Setting up an Angular based blog has never been easier.

> **Good to know:** _Scully_ also detects new routes we are adding manually to our app and it will create static sites for all those pages.

## Use the `ScullyRoutesService`

We want to take the next step.
Now we want to list an overview of all existing blog posts we have and link to their sites in our `AppComponent`.
Therefore, we can easily inject the `ScullyRoutesService`.
It will return us a list of all routes _Scully_ found with the parsed information as a `ScullyRoute` array within the `available$` observable.
We can easily inject the service and display the information as a list in our `AppComponent`.

```ts
import { Component, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts$: Observable<ScullyRoute[]>;

  constructor(private srs: ScullyRoutesService) {}

  ngOnInit() {
    this.posts$ = this.srs.available$;
  }
}
```

If you like, you can write this even a little shorter:

```ts
export class AppComponent implements OnInit {
  posts$ = this.srs.available$;
  constructor(private srs: ScullyRoutesService) {}
}
```

To display the results, we can simply use `ngFor` with the `async` pipe and list the results.
A `ScullyRoute` will give us the routing path inside the `route` key and all other markdown meta data inside their appropriate key names.
So we can extend for example our markdown metadata block with more keys (e.g. `thumbnail: assets/thumb.jpg`) and we can access them via those (`blog.thumbnail` in our case).
We can extend `app.component.html` like this:

```html
<ul>
  <li *ngFor="let post of posts$ | async">
    <a [routerLink]="post.route">{{ post.title }}</a>
  </li>
</ul>

<hr />

<router-outlet></router-outlet>
```

This will give us a fully routed blog page:

![a simple blog created with scully](/assets/images/blog/scully/scully-blog.gif)

The `ScullyRoutesService` contains all of the available routes in your app.
In fact, any route that we add to our Angular app will be detected by _Scully_ and made available via the `ScullyRoutesService.available$` observable.
To list only blog posts from the `blog` route and directory we can just filter the result:

```ts
/* ... */
import { map } from 'rxjs/operators';
/* ... */
export class AppComponent implements OnInit {
  /* ... */
  ngOnInit() {
    this.posts$ = this.srs.available$.pipe(
      map(routeList => {
        return routeList.filter((route: ScullyRoute) =>
          route.route.startsWith(`/blog/`),
        );
      })
    );
  }
}
```

Wow! That was easy, wasn’t it? Now you just need to add a bit of styling and content and your blog is ready for getting visited.

## Fetch dynamic information from an API

As you may have realized: _Scully_ needs a data source to fetch all dynamic routes in an app.
In case of our blog example _Scully_ uses the `:slug` router param as a placeholder.
Scully will fill this placeholder with appropriate content to visit and pre-render the site.
The content for the placeholder comes in our blog example from the files in the `/blog` directory.
This has been configured from the schematics we ran before in the file `scully.scully-blog.config.js`:

```js
exports.config = {
  projectRoot: "./src/app",
  projectName: "scully-blog",
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
  }
};
```

I would like to show a second example.
Imagine we want to display information about books from an external API.
So our app needs another route called `/books/:isbn`.
To visit this route and pre-render it, we need a way to fill the `isbn` parameter.
Luckily _Scully_ helps us with this too.
We can configure [_Router Plugin_](https://github.com/scullyio/scully/blob/master/docs/plugins.md#router-plugin) that will call an API, fetch the data from it and pluck the `isbn` from the array of results to fill it in the router parameter.

In the following example we will use the public service [BookMonkey API](https://api3.angular-buch.com) (we provide this service for the readers of our [German Angular book](https://angular-buch.com/)) as an API to fetch a list of books:

```js
exports.config = {
  projectRoot: "./src/app",
  projectName: "scully-blog",
  routes: {
    ...
    '/books/:isbn': {
      'type': 'json',
      'isbn': {
        'url': 'https://api3.angular-buch.com/books',
        'property': 'isbn'
      }
    }
  }
};
```

The result from the API will have this shape:

```json
[
  {
    "title": "Angular",
    "subtitle": "Grundlagen, fortgeschrittene Themen und Best Practices – mit NativeScript und NgRx",
    "isbn": "9783864906466",
    ...
  },
  {
    "title": "Angular",
    "subtitle": "Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript - ab Angular 4, inklusive NativeScript und Redux",
    "isbn": "9783864903571",
    ...
  },
  ...
]
```

After _Scully_ plucks the ISBN, it will just iterate over the final array: `['9783864906466', '9783864903571']`.
In fact, when running _Scully_ using `npm run scully`, it will visit the following routes, **after we have configured the route `/books/:isbn` in the Angular router** (otherwise non used routes will be skipped).

```text
/books/9783864906466
/books/9783864903571
```

We can see the result in the log:

```text
enable reload on port 2667
 ☺   new Angular build imported
 ☺   Started servers in background
--------------------------------------------------
Watching blog for change.
--------------------------------------------------
 ☺   new Angular build imported
Finding all routes in application.
Using stored unhandled routes
Pull in data to create additional routes.
Finding files in folder "/<path>/blog"
Route list created in files:
  "/<path>/src/assets/scully-routes.json",
  "/<path>/dist/static/assets/scully-routes.json",
  "/<path>/dist/scully-blog/assets/scully-routes.json"

Route "/books/9783864903571" rendered into file: "/<path>/dist/static/books/9783864903571/index.html"
Route "/books/9783864906466" rendered into file: "/<path>/dist/static/books/9783864906466/index.html"
Route "/blog/12-27-2019-blog" rendered into file: "/<path>/dist/static/blog/12-27-2019-blog/index.html"
Route "/blog/first-post" rendered into file: "/<path>/dist/static/blog/first-post/index.html"
Route "/" rendered into file: "/<path>/dist/static/index.html"

Generating took 3.3 seconds for 7 pages:
  That is 2.12 pages per second,
  or 473 milliseconds for each page.
  
  Finding routes in the angular app took 0 milliseconds
  Pulling in route-data took 26 milliseconds
  Rendering the pages took 2.58 seconds

The server is available on "http://localhost:1668/"
------------------------------------------------------------
Press r for re-run Scully, or q for close the servers.
------------------------------------------------------------
```

This is great. We have efficiently pre-rendered normal dynamic content!
And that was it for today.
With the shown examples, it's possible create a full-fledged website with Scully.

> Did you know that **this blogpost** and the overall website your are right now reading has also been created using _Scully_?
> Feel free to check out the sources at:
> [github.com/d-koppenhagen/d-koppenhagen.de](https://github.com/d-koppenhagen/d-koppenhagen.de)

If you you want to follow all the development steps in detail, check out my provided github repository
[scully-blog-example](https://github.com/d-koppenhagen/scully-blog-example/commits).
Each step described here is represented by one commit.

## Conclusion

Scully is an awesome tool if you need a pre-rendered Angular SPA where all routes can be accessed immediately without loading the whole app at once.
This is a great benefit for users as they don’t need to wait until the whole bunch of JavaScript has been downloaded to their devices.
Visitors and **search engines** have instantly access to the sites information.
Furthermore, _Scully_ offers a way to create very easily a blog and renders all posts written in markdown.
It will handle and pre-render dynamic routes by fetching API data from placeholders and visiting every route filled by this placeholder.

Compared to "classic" pre-rending by using [Angular Universal](https://angular.io/guide/universal), _Scully_ is much easier to use and it doesn't require you to write a specific flavor of Angular.
Also _Scully_ can easily pre-render hybrid Angular apps or Angular apps with plugins like jQuery in comparison to Angular Universal.

If you want to dig a bit deeper into the features _Scully_ offers, check out my [second article](/blog/2020-03-dig-deeper-into-scully-ssg).

Any hints, suggestions or corrections? Feel free to [contact me](http://d-koppenhagen.de/#contact) or sending me a [pull request](https://github.com/d-koppenhagen/d-koppenhagen.de/pulls).

**Thank you**

Special thanks go to [Aaron Frost (Frosty ⛄️)](https://twitter.com/aaronfrost) from the _Scully_ core team, [Ferdinand Malcher](https://twitter.com/fmalcher01) and [Johannes Hoppe](https://twitter.com/JohannesHoppe) for revising this article.
