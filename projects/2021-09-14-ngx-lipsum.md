---
title: ngx-lipsum
description: Easily use lorem ipsum dummy texts in your angular app
published: true
author:
  name: Danny Koppenhagen
  mail: mail@k9n.dev
updated: 2021-09-14
keywords:
  - Angular
  - lorem-ipsum
  - ngx-lipsum
  - directive
  - service
  - component
language: en
thumbnail:
  header: assets/images/projects/ngx-lipsum.svg
  card: assets/images/projects/ngx-lipsum.svg
---

# ngx-lipsum

My Angular package [**ngx-lipsum**](https://www.npmjs.com/package/ngx-lipsum) let's you easily fill your angular app with dummy texts for demo or prototyping purpose.
The name _lipsum_ is a mix of the words [_**l**orem **ipsum**_ which is a common phrase used for placeholder texts](https://en.wikipedia.org/wiki/Lorem_ipsum).

The package provides you three different ways to generate and insert _lorem ipsum_ texts:

1. by adding the `lipsum` directive to HTML elements
2. by inserting the `<ngx-lipsum>` component into your HTML template
3. by using the `LipsumService` to retrieve the text programmatically

Under the hood the package uses the `lorem-ipsum` library which is also [available on NPM](https://www.npmjs.com/package/lorem-ipsum).

Check out how to set it up by reading the docs in the [Github repository](https://github.com/d-koppenhagen/ngx-lipsum).
