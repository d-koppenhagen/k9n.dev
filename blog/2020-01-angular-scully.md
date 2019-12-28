---
title: Create powerfull fast pre-rendered Angular Apps using _Scully_ static site generator
description: 'With this blog post, I will show you how you can easily create a blogging app by using the power of Angular and the help of _Scully_ static site generator. It will automatically detect all app routes and create static pages out of them that are ready to ship for production.'
publish: false
author: Danny Koppenhagen
mail: mail@d-koppenhagen.de
published: 2020-01-03
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
thumbnail: assets/images/bg3.jpg
---

# Create powerful fast pre-rendered Angular Apps using _Scully_ static site generator

**On _Dec 16, 2019_ the static site generator _Scully_ for Angular [was presented](https://www.youtube.com/watch?v=Sh37rIUL-d4). _Scully_ automatically detects all app routes and create static sites out of it that are ready to ship for production. With this blog post, I want to show you how you can easily create an Angular blogging app by using _Scully_ for pre-render your complete app.**

<hr>

**Table of contents:**

- [About Scully](/blog/2020-01-angular-scully#about-scully)
- [Get started](/blog/2020-01-angular-scully#get-started)
- [Turn it into a blog](/blog/2020-01-angular-scully#turn-it-into-a-blog)
- [Use the _Scully_ service](/blog/2020-01-angular-scully#use-the-scully-service)
- [Fetch dynamic information from an API](/blog/2020-01-angular-scully#fetch-dynamic-information-from-an-api)
- [Conclusion](/blog/2020-01-angular-scully#conclusion)

> _Scully_ is currently just available within an early version.
> This blog post is based on version _0.0.9_
> However some of the commands or API calls used here may change in the future.
> It’s my intention the keep the blog post as up-to-date as possible.

## About Scully

Scully is a static site generator (SSG) for Angular apps.
Scully analyzes a built Angular app and detect all the routes of the app.
It will then call every route it found, visit the page in the browser, renders the page and finally put the static rendered page on your disk.
This is what we are calling **pre-rendering**.
The result is a structure ready for shipping to your web server.

> _Scully_ does not use [Angular Universal](https://angular.io/guide/universal) for the pre-rendering.
> It uses a Chromium browser to visit and check all routes it found.

All pre-rendered pages contain just plain HTML and CSS.
In fact when deploying it, a user will be able to instantly access all routes and see the content with almost no delay.
The resulting sites are very small static sites in just a few KBs so that even the access from a mobile device with a very low bandwidth is insanely fast.
It's significantly faster compared to the hundreds of KBs that you are downloading when calling a “normal” Angular app.

But that’s not all: Once the pre-rendered page is shipped to the user, _Scully_ loads and bootstraps the “real” Angular app  in the background on top of the existing view.
In fact _Scully_ will unite two great things:
The power of pre-rendering and very fast access to sites and the power of a fully functional SPA written in Angular.

## Get started

The first thing we have to do is to setup our Angular app.
To use _Scully_ later, we have to use an Angular version _9.0.0-rc.0_ or greater.
As _Scully_ detects the content from the routes, we need to configure the Angular router as well.
Therefore we add the appropriate flag `--routing` (we can also choose this option when the CLI prompts us).

```bash
npx -p @angular/cli@^9.0.0-rc ng new scully-blog --routing
cd scully-blog  # navigate into the project
```

The next step is to setup our static site generator _Scully_.
Therefore we are using the provided Angular schematic:

```bash
ng add @scullyio/init  # add _Scully_ to the project
```

Et voilà here it is: We now have a very minimalistic Angular app that uses the power of _Scully_ to automatically find all app routes, visit them and generate static pages out of them.
It's ready for us to preview.
Let's try it out by building our site and running _Scully_.

```bash
npm run build   # build our Angular app
npm run scully  # Let _Scully_ run over our app build
```

After _Scully_ has checked our app, it will add the generated static sources to our `dist/static` directory by default.
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
This is because currently we only have the root route configured and no more further content created.

Nonetheless we can checkout the result of the static pages in the browser by running `npm run scully:serve`. This will start two servers:

- `localhost:1668` : This server serves the static generated pages like a normal webserver (e.g. _nginx_ or _apache_)
- `localhost:1864` : This server start an Angular distribution server

## Turn it into a blog

Let’s go a bit further and turn our site into a simple blog that will render our blog posts from separate markdown documents.
Scully brings this feature out of the box and it’s fascinatingly easy to set it up:

```bash
ng g @scullyio/init:blog                      # setup up the `BlogModule` and related sources
ng g @scullyio/init:post --name="First post"  # create a new blog post
```

After these steps we can see that _Scully_ has now added the `blog` directory to our project root.
Here we can find the markdown files for creating the blog posts — one file for each post.
We now have two files there: The initially created example file from _Scully_ and this one we created with `ng g @scullyio/init:post`.

## Let's Go Further

Now that we've got Scully installed and working, let's modify our Angular app to look more like an actual blog, and not just like the default Angular app.
Therefore we want to get rid of the Angular auto generated content in the `AppComponent` first.
We can simply delete all the content of `app.component.html` except of the `RouterOutlet`.
So in the end the content of our file `app.component.html` should look like this:

```html
<router-outlet></router-outlet>
```

Let’s run the build again and have a look at the results:

```bash
npm run build         # Angular build
npm run scully        # generate static build
npm run scully:serve  # serve static build
```

When checking out our `dist/static` directory we can see that there are new sub-directories for the routes of our static blogging sites.
The files `index.html` in `dist/static/blog/<post-name>/` contain our static pages ready to be served.
When we are visiting the route path `/blog/first-post` we can see the content of our markdown source file `blog/first-post.md` is rendered as HTML.

You may have realized: We haven’t written one line of code manually yet and we have already a fully functional blogging site that’s server site rendered. Isn’t that cool?
Setting up an Angular based blog has never been easier.

> _Scully_ also detects new routes we are adding manually to our app and it will create static sites for all those pages.

## Use the _Scully_ service

We wanna go a little step further and we want to list an overview of all existing blog posts we have and link to their sites in our `AppComponent`.
Therefore we can easily inject the `ScullyRoutesService`.
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

To display the results we can simply use `ngFor` with the `async` pipe and list the results.
A `ScullyRoute` will give us the routing path inside the `route` key and all other markdown meta data inside their appropriate key names.
So we can extend for example our markdown meta data block with more keys (e.g. `thumbnail: assets/thumb.jpg`) and we can access them via those (`blog.thumbnail`) in our case.
Our `app.component.html` can look like this:

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

![a simple blog created with scully](/assets/images/blog/scully-blog.gif)

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

Wow! That was easy wasn’t it? Now you just need to add a bit of styling and content and your blog is ready for getting visited.

## Fetch dynamic information from an API

As you may have realized: _Scully_ needs a data source to fetch all dynamic routes in an app.
In case of our blog example _Scully_ uses the `:slug` router param as a placeholder.
Scully will fill this placeholder with appropriate content to visit and pre-render the site.
The content for the placeholder comes in our blog example from the files in the `/blog` directory.
This has been configured from the schematics we ran before in the file `scully.config.js`:

```js
exports.config = {
  projectRoot: "./src/app",
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

Let’s imagine our app has another route called `/books/:isbn`.
To visit this route and pre-render it, we need a way to fill the `isbn` parameter.
Luckily _Scully_ helps us with this too.
We can configure [_Router Plugin_](https://github.com/scullyio/scully/blob/master/docs/plugins.md#router-plugin) that will call an API, fetch the data from it and pluck the `isbn` from the array of results to fill it in the router parameter.

In the following example we will use [BookMonkey API](https://api3.angular-buch.com) as an API to fetch a list of books:

```js
exports.config = {
  projectRoot: "./src/app",
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

The result from the API call will look like the following:

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
In fact when running _Scully_ using `npm run scully`, it will visit the following routes, **after we have configured the route `/books/:isbn` in the Angular router** (otherwise non used routes will be skipped).

```text
/books/9783864906466
/books/9783864903571
```

We can see the result in the log:

```text
 ☺   new Angular build imported
Background servers already running.
servers available
Finding all routes in application.
Pull in data to create additional routes.
Finding files in folder "<path>/scully-blog/blog"
Route list created in files:
      src/assets/scully-routes.json
      /<path>/scully-blog/dist/static/assets/scully-routes.json
Route "/books/9783864903571" rendered into file: "/<path>/scully-blog/dist/static/books/9783864903571/index.html"
Route "/books/9783864906466" rendered into file: "/<path>/scully-blog/dist/static/books/9783864906466/index.html"
```

If you you wanna follow all the development steps in detail, check out my provided github repository
[scully-blog-example](https://github.com/d-koppenhagen/scully-blog-example/commits).
Each step described here is represented by one commit.

## Conclusion

Scully is awesome if you need a pre-rendered Angular SPA where all routes can be accessed immediately without loading the whole app at once.
This is a great benefit for users as they don’t need to wait until the whole bunch of JavaScript has been downloaded to their devices.
They have instantly access to the sites information.
Furthermore _Scully_ offers a way to create very easily a blog and renders all posts written in markdown.
It will handle and pre-render dynamic routes by fetching API data from placeholders and visiting every route filled by this placeholder.
Compared to pre-rending by using [Angular Universal](https://angular.io/guide/universal), _Scully_ is much easier to use and it doesn't require you to write a specific flavor of Angular.
Also _Scully_ can easily pre-render hybrid Angular apps or Angular apps with plugins like jQuery in comparison to Angular Universal.

Did you know that **this site** has also been created using _Scully_?
Feel free to check out the sources at:

[github.com/d-koppenhagen/d-koppenhagen.de](https://github.com/d-koppenhagen/d-koppenhagen.de)

Any hints, suggestions or corrections? Feel free to [contact me](http://d-koppenhagen.de/#contact) or sending me a [pull request](https://github.com/d-koppenhagen/d-koppenhagen.de/pulls).

## Thank you

Special thanks go to [Aaron Frost (Frosty ⛄️)](https://twitter.com/aaronfrost) from the _Scully_ core team, [Ferdinand Malcher](https://twitter.com/fmalcher01) and [Johannes Hoppe](https://twitter.com/JohannesHoppe) for revising this article.
