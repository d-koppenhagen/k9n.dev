---
title: ngx-semantic-version — An Angular Schematic to enhance your release workflow
description: Simply add and configure commitlint, husky, commitizen and standard-version for your Angular project by using Angular Schematics
published: true
author:
  name: Danny Koppenhagen
  mail: mail@d-koppenhagen.de
updated: 2020-04-09
keywords:
  - Angular
  - Angular CLI
  - Angular Schematics
  - release
  - commit
  - commitlint
  - husky
  - commitizen
  - standard-version
  - semver
  - Semantic Version
  - Conventional Commits
  - Conventional Changelog
language: en
thumbnail:
  header: assets/images/projects/semver-header.jpg
  card: assets/images/projects/semver-header-small.jpg
---

# ngx-semantic-version

My project **ngx-semantic-version** is an Angular Schematic that will add and configure [commitlint](https://commitlint.js.org), [commitizen](https://www.npmjs.com/package/commitizen), [husky](https://www.npmjs.com/package/husky) and [standard-version](https://www.npmjs.com/package/standard-version) to enforce commit messages in the _conventional commit_ format and to automate your release and Changelog generation by respecting _semver_.
All you have to do for the setup is to execute this command in your Angular CLI project:

```bash
ng add ngx-semantic-version
```

<br/>

![commitizen](/assets/images/projects/ngx-semantic-version.png)

Check out my article [_ngx-semantic-version: enhance your git and release workflow_](/blog/2019-11-ngx-semantic-version) to learn more about it.

The official documentation for _ngx-semantic-version_ can be found on [Github](https://github.com/d-koppenhagen/ngx-semantic-version) or [NPM](https://www.npmjs.com/package/ngx-semantic-version).