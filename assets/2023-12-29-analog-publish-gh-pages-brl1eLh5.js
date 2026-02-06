const e=`---
title: 'Analog Publish GitHub Pages'
description: When I migrated my personal website/blog to use AnalogJS, I created a GitHub Action which simplifies the deployment at GitHub Pages.
published: true
author:
  name: Danny Koppenhagen
  mail: mail@k9n.dev
updated: 2023-12-29
keywords:
  - AnalogJS
  - GitHub Pages
  - Angular
  - SSG
  - SSR
language: en
thumbnail:
  header: images/projects/analog-publish-gh-pages.png
  card: images/projects/analog-publish-gh-pages-small.png
---

<p>When I migrated my personal website/blog (this site) to use <a href="https://analogjs.org/">AnalogJS</a> in December 2023, I created a GitHub Action which simplifies the deployment at GitHub Pages.</p><p>Analog is a meta-framework on top of <a href="https://angular.dev">Angular</a> which includes a static site generator, file based routing and other opinionated features.
I decided to switch from <a href="https://scully.io">Scully</a> to Analog since Scullys evolvement <a href="https://github.com/scullyio/scully/issues/1660#issuecomment-1872673347">seems currently to stuck</a> and it was hard to update my site to newer major Angular versions (16/17).
I like to have an almost evergreen environment and since I followed the development from Analog by <a href="https://twitter.com/brandontroberts">Brandon Roberts</a>, wanted to try it out.
Since then, I really love to use AnalogJS: it&#39;s modern, opinionated and comes with all the features I need for my site and blog.</p><p>The action encapsulates the issues I ran into when I deployed my site the first time
(e. g. resources that couldn&#39;t be found because of a missing <code>.nojekyll</code> file which caused a side effect that files starting with an underscore (<code>_</code>) are being ignored).
I made this action quite simple, so it will install the dependencies, build the static site and deploy it by copying over the static site artifacts into the <code>gh-pages</code> branch.</p><ul>
<li><strong><a href="https://github.com/marketplace/actions/analog-publish-github-pages">Analog Publish GitHub Pages — Marketplace/Actions</a></strong></li>
<li><strong><a href="https://github.com/MelihAltintas/vue3-openlayers">Analog Publish GitHub Pages — Repository</a></strong></li>
</ul>
`;export{e as default};
