---
title: 'Build a dynamic navigation based on route configuration using Vue3 and Vue Router'
description: ''
published: true
author:
  name: 'Danny Koppenhagen'
  mail: mail@k9n.dev
created: 2022-10-07
updated: 2022-10-07
keywords:
  - Vue
  - Vue 3
  - Vue Router
language: en
thumbnail:
  header: assets/images/blog/schematics-helpers/schematics-helpers.jpg
  card: assets/images/blog/schematics-helpers/schematics-helpers-small.jpg
linked:
  devTo: ''
---

# Build a dynamic navigation based on route configuration using Vue3 and Vue Router

Recently I asked myself while working on an app: Isn’t it possible to reduce some code as often the main navigation of an app is somewhat related to the configuration of the routes and it’s routing tree?

This question in my mind I started to work on a very simple but representative example of how to achieve this goal by enriching the route configuration using the meta option.

The following example will allows you to easily wrap big parts of your app into a module that is self contained and only exposes a bit of route configuration that can be imported and included in the main router configuration.

The app will have a simple navigation component that will extract alle available routes provider by the Vue router.
This routes will have all the information needed by a navigation item to build a menu point and define the routing target.

The following picture shows an high level overview of the architecture.

![Planned structure](assets/images/blog/vue-dynamic-menu/nav-structure.drawio.svg)

So let’s start with a bit of the basics we need.
First we need the basic route configuration which represents the routing tree and in the end our menu structure.
The  appearance of an menu item is controlled by providing some meta information:
title: The title that’s shown in the Menu
visible: a flag that can be used to make sites available but not appear in the menu

So far so good: we’ve configured our routes so that in the end we expect to have two main menu items that eventually contain child elements with targeting views.

The next step is to create the navigation component that will extract alle the needed information for the menu items and render it.
Therefore we have to filter for the occurrence of our provided meta data as we only want to display menu items that should be visible and have a title.



