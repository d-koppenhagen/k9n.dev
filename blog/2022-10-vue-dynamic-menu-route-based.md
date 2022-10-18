---
title: 'Route based navigation menus in Vue'
description: 'Learn how to build a dynamic navigation menu based on the route configuration using Vue3 and Vue Router'
published: true
author:
  name: 'Danny Koppenhagen'
  mail: mail@k9n.dev
created: 2022-10-15
updated: 2022-10-15
keywords:
  - Vue
  - Vue 3
  - Vue Router
language: en
thumbnail:
  header: assets/images/blog/vue-route-menu.jpg
  card: assets/images/blog/vue-route-menu-small.jpg
linked:
  devTo: ''
---


# Build a dynamic navigation based on route configuration using Vue3 and Vue Router

Recently I asked myself while working on a [Vue](https://vuejs.org/) app: Isn’t the main navigation menu somewhat related to the configuration of the routes and it’s routing tree? Can't it build dynamically from the router configuration?

This question in my mind I started to work on a very simple but representative example of how to achieve this goal by enriching the route configuration using the `meta` option.

The following example allows you to easily wrap big parts of your app into a module that is self contained and only exposes a bit of route configuration that can be imported and included in the main router configuration.

The app has a simple navigation component that extracts all available routes provided by the [Vue Router](https://router.vuejs.org/).
This routes have all the information needed by a navigation item to build a menu point and define the routing target.

The following picture shows an high level overview of the architecture.

![Planned structure](assets/images/blog/vue-route-menu/nav-structure.drawio.svg)

## TL;DR

You can check out the complete working example with the source code in the following Stackblitz project:

https://stackblitz.com/edit/vue3-dynamic-menu

## basic app setup

Let's create a simple Vue project using Vue3 and Vue-Router.

```bash
npm init vue@latest
npm i vue-router@4
```

## Setup the router

First we need the basic route configuration which represents the routing tree and in the end our menu structure.

We want to focus on the basic menu configuration and the initial page we are loading.
Therefore we will create the `MainPage` component which we can place in the `src/components` directory.
The component should simply display it's name for demonstartion purpose:

```html
<script setup lang="ts"></script>

<template>
  <div>MainPage.vue</div>
</template>
```

The next thing we want to do is to setup the route for this component.
Therefore we are creating the `router.ts` file within the `src` directory.
We are importing the `MainPage` component and using it for the route `main`.
Furthermore we are adding a redirect to "`/main`" when the root-route "`/`" is opened.
To be able to get the displayble menu label later, we add the `meta` object to the route configuration containing the `label`.

```ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import MainPage from './components/MainPage.vue';

export const routes: RouteRecordRaw[] = [
  //default route redirection
  { path: '/', redirect: { name: 'main' } },
  // common app routes
  {
    path: '/main',
    name: 'main',
    component: MainPage,
    meta: {
      label: 'Main Page',
    },
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, ...pluginRoutes.flat()],
});
```

The exported router must now be used in the `main.ts` file:

```ts
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { getRouter } from './router';
import { routes } from './app-section-1/routes';

const app = createApp(App);

app.use(getRouter(routes));

app.mount('#app');
```

Now we have to add the `<router-view />` to our `App.vue` file to be able to render the correct component routed by the Vue Router.

```html
<script setup lang="ts"></script>

<template>
  <router-view />
</template>
```

## Build the menu items based on route `meta`

So far so good: we’ve configured our first route so that in the end we expect to be able to build a single menu item by using the route configuration.

The next step is to create the navigation component (`AppNav`) that extracts the `meta` information from the route for the menu item and render it. Therefore we have to filter for the occurrence of our provided meta data as we only want to display menu items that have a `label` configured in the `meta` information.

The result is an array of all relevant routes.
We iterate over the items with `v-for` and pass each element to a new component `NavItem` that takes a route configuration object for rendering a single navigation menu item.

```html
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

import NavItem from './NavItem.vue';

const router = useRouter();
const filteredRoutes = router.options.routes.filter((r) => r.meta?.label);
</script>

<template>
  <nav>
    <ul>
      <NavItem
        v-for="(routeConfig, index) in filteredRoutes"
        :key="index"
        :route-config="routeConfig"
      />
    </ul>
  </nav>
</template>
```

Before we will forget it, we add the `AppNav` component to our `App` component above the `<router-view />`:

```html
<script setup lang="ts">
import AppNav from './components/AppNav.vue';
</script>

<template>
  <AppNav />
  <hr />
  <router-view />
</template>
```

Next, we are creating the `NavItem` component.
We are defineing a single prop which gets passed by the parent component called `routeConfig` that contains a whole route configuration record.
Now we can focus on the template.
We are adding a `<router-link>` and we will pass the route target by using the unique `name`.
As the label of the link we can now us the `label` from our `meta` information object we provided in the router configuration.

```html
<script setup lang="ts">
import { computed } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

const props = defineProps<{
  routeConfig: RouteRecordRaw;
}>();
</script>

<template>
  <li class="nav-item">
    <router-link :to="{ name: routeConfig.name }" aria-current-value="page">
      {{ routeConfig.meta.label }}
    </router-link>
  </li>
</template>
```

Great! The hardest part is finished now (wasn't that tricky right?) and probably this solution already fit's for a majority.
But two things I want to describe in advance as they may be relevant for you:

1. How to make the navigation easily extensible
2. How to implement child menu items

### Make the navigation extensible

Let's assume we have an extensible app where we will outsource some whole pages and it's child route configurations and make them incluable in our app.
This could be for example relevent when adding complete menus and pages just for specific users with approriate permissions.

Therefore we want to make our route configuration extensible, so that we can pass additional routes and child routes linked with their components to our router.

To do so, we simply wrap the exported route into a function that accepts a list of route configurations as a Rest parameter.

```ts
/* ... */
export function getConfiguredRouter(...pluginRoutes: RouteRecordRaw[][]) {
  return createRouter({
    history: createWebHistory(),
    routes: [...routes, ...pluginRoutes.flat()],
  });
}
```

Next we need to adjust our `main.ts` file.
We pass the result receive from `getConfiguredRouter()` which takes the additional routes we are configuring right after.

```ts
/* ... */
import { getConfiguredRouter } from './router';
import { routes } from './app-section-1/routes';
/* ... */
app.use(getConfiguredRouter(routes));
/* ... */
```

Let's create a new folder `app-section-1` simulating kind of an app plugin or modules containing the extensible part for our app.
Here we create another `routes.ts` file that holds the route configuration for this app part.

The configuration defines a base route that represents the main navigation item and redirects to it's first child route `page-1`.
We are configuring two child routes linked to their corresponding components we are creating in the next step.

```ts
import type { RouteRecordRaw } from 'vue-router';

import Page1 from './components/Page1.vue';
import Page2 from './components/Page2.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/app-section-1',
    name: 'appSection1',
    redirect: { name: 'appSection1Page1' },
    meta: { label: 'App Section 1' },
    children: [
      {
        path: 'page-1',
        name: 'appSection1Page1',
        component: Page1,
        meta: { label: 'Page 1' },
      },
      {
        path: 'page-2',
        name: 'appSection1Page2',
        component: Page2,
        meta: { label: 'Page 2' },
      },
    ],
  },
];
```

We are creating the components `Page1` and `Page2` wihtin the `/src/app-section-1/components` directory.

Their implementation follows the one of the `MainPage` component: They simly displaying their component names in the template for demo purpose.

## Render child menu items

With the current state, we will already see both main navigation menu entries.
But as we configured child elements with `label`s too, we want to display them in the menu as well.
Therefore we simply add the appropriate template in the `NavItem` component, as we already have all the rest we need by receiving the route configuration of the parent which contains all the information to render the childs.

```html
<!-- ... -->
<template>
  <li class="nav-item">
    <router-link :to="{ name: routeConfig.name }">
      {{ routeConfig.meta.label }}
    </router-link>
    <ul v-if="routeConfig.children">
      <li
        class="child-item"
        v-for="(r, index) in routeConfig.children"
        :key="index"
      >
        <router-link :to="{ name: r.name }" aria-current-value="page">
          {{ r.meta.label }}
        </router-link>
      </li>
    </ul>
  </li>
</template>
```

## Styling active links 

To highlight the active menu items, we can now use the two automatically create CSS classes `router-link-active` and `router-link-exact-active`.

- `router-link-active`: Matches when a part of the URL matches the target route path of the `<router-link>`
- `router-link-exact-active`: Matches when the whole route in the URL matches exactly the target route path of the `<router-link>`

```css
a.router-link-active {
  background-color: lightblue;
}
a.router-link-exact-active {
  background-color: #f3aff8;
}
```

## Conclusion

Passing meta information like `label` to the vue router configuration let's us easily building dynamic generated menus.
We no longer have to manually adjust our main navigation when adding new sites to our page as the menu is automatically extended by accessing the routes `meta` information.
This approach can reduce some template boilerplate.

You can use this approach to loosely couple whole parts of your app by adding them as separate modules without the need to add internals like the navigation titles to the main app part.

The whole working example can be seen in the following Stackblitz project:

https://stackblitz.com/edit/vue3-dynamic-menu

> Thanks for ??? for reviewing this article.