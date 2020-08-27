---
title: 'My Development Setup'
description: 'In this article I will present you what tools I am using during my day-to-day development. Also I will show you a list of extensions and their purpose that will help me and probably you too being more productive.'
published: false
author: 'Danny Koppenhagen'
mail: mail@d-koppenhagen.de
updated: 2020-08-28T00:00:00.000Z
keywords:
    - Angular
    - Vue.js
    - Console
    - Development
    - Setup
    - VSCode
    - 'Visual Studio Code'
    - 'Google Chrome'
    - Extension
    - macOS
language: en
thumbnail: assets/images/blog/dev-setup/dev-setup-header.jpg
thumbnailSmall: assets/images/blog/dev-setup/dev-setup-header-small.jpg
slugs:
    - ___UNPUBLISHED___kechd4l6_DKLVhTsmvJKjUJ50JqsJs1L28AhWRek2

---
# My Development Setup

In the following article I will present you what tools I am using during my day-to-day development workflow. Also, I will show you a list of extensions and their purpose that will help me and probably you too being more productive.

<hr>

<div id="toc"><h2>Table of contents</h2></div>

<hr>

## Introduction

As a developer I always give my best to be productive, writing good and well documented source code and sharing my knowledge.
For all this I am using great tools and extensions that will help me to get the most of it and being faster and cleaner.
Those Tools and extensions are helping me during my everyday life as a developer for:

- Development of Angular, Vue.js apps.
- Sharing knowledge with recordings, GIFs, Screenshots, Code-Snippets etc.
- Writing good documentation.
- Being more productive in general.

Both at work and in my free time I am working on an Apple MacBook Pro.
But most of the tools and Software listed here is available for Windows, macOS and Linux distributions.

## Software

So let's get started with some basic Software I am using.

### [Terminus](https://eugeny.github.io/terminus) / [iTerm2](https://iterm2.com)

The default Terminal app for macOS fulfills its purpose but for being more productive I can recommend the terminal applications **[Terminus](https://eugeny.github.io/terminus)** and **[iTerm2](https://iterm2.com)**.

I used iTerm2 a long time and it's a great tool with lots of configuration options.
You can create Tabs, use profiles and customize the style and layout.

![Screenshot: iTerm2](/assets/images/blog/dev-setup/iterm2.png)

However, since a few weeks I switched from iTerm2 to Terminus.
Terminus is a quite new Terminal app that's developed Open Source.
Behind the scenes it's an [Electron App](https://www.electronjs.org/) using [Angular](https://angular.io).
You can also customize it and in addition to iTerm2 you can define SSH and Serial Port profiles that you can later simply activate so that you can access an SSH remote host or a serial port without entering something manually in the terminal.

![Screenshot: Terminus](/assets/images/blog/dev-setup/terminus.png)

### [Cakebrew](https://www.cakebrew.com) - macOS only

If you are on a mac, you probably know **[Homebrew](https://brew.sh)** - a package manager for macOS.
If you don't know Homebrew: You should definitely check it out.
Personally I prefer to install the most of my Software via Homebrew as I can easily manage updates later.
But as I don't remember all Homebrew commands all the time and to get an overview of the installed packages, I am using a Homebrew GUI called **CakeBrew**.
This lets me easily update and manage my installed Homebrew packages.

![Screenshot: CakeBrew](/assets/images/blog/dev-setup/cakebrew.png)

### [Fork](https://git-fork.com)

As a developer, version control with [Git](https://git-scm.com) is indispensable.
Personally I will do the most basic operations like creating commit messages, adding files to the staging area, pulling and pushing via the command line.
But there are some things where I prefer to use a GUI for using Git:

- Overview of commits and branches (history)
- Interactive rebase
- managing multiple remote repositories

**Fork* is a very nice clean but powerful open source Git GUI that helps you to control Git in an easy and interactive way.

![Screenshot: Fork](/assets/images/blog/dev-setup/fork.png)

### [Visual Studio Code](https://code.visualstudio.com)

In the last years, Microsoft improved its free IDE **Visual Studio Code** a lot and with every frequent release it gets even more powerful.
One of the things that makes **VSCode** such a great IDE are the wide range of available plugins for it.
VSCode is a very universal and adoptable IDE which has great support and tools for lots of programming languages.
So it doesn't matter if you are developing a web application, a mobile app using e.g. Flutter, a C# or a python app: You can use for all of that and more VSCode and you don't need to get warm with a new specific IDE for a specific language.

![Screenshot: VSCode](/assets/images/blog/dev-setup/vscode.png)

I will present you a list of my favorite extensions for VSCode I am using later in this article.

### [Chrome](https://google.com/chrome)

As a Web Developer, **Google Chrome** is essential.
In my opinion the developer and debugging tools are more mature compared to [Firefox](https://www.mozilla.org/firefox).
Chrome is also very up-to-date in terms of the latest JavaScript features and it has a wide range of extensions you can install that will help you to even be more productive developing web applications.

![Screenshot: Google Chrome](/assets/images/blog/dev-setup/chrome.png)

I will present you a list of my favorite extensions for Google Chrome I am using later in this article.

### [Insomnia](https://insomnia.rest)

Insomnia is a great and simple tools that's very easy to use when you want to interact with REST or [GraphQL](https://graphql.org) Endpoints. It has a very simple UI but it's powerful nonetheless.
You can call Endpoints checking their responses and create also batch-requests or save your requests for using them later again.
I personally prefer it over [Postman](https://www.postman.com) which I used before and which is also very powerful.
But in my opinion the UI of Postman got a bit confusing during the last years by introducing new features.

![Screenshot: Insomnia](/assets/images/blog/dev-setup/insomnia.png)

### [draw.io](https://draw.io)

From time to time as a developer you need to illustrate things and flows.
Therefore, I am using mostly **draw.io**. It's available as a web application but also as an installable version.
Draw.io contains a lot of basic icons and vector graphics for network illustrations, UML, Diagrams, engineering icons for circuits and much more.

![Screenshot: draw.io](/assets/images/blog/dev-setup/drawio.png)

### [RecordIt](https://recordit.co)

When I develop extensions for VSCode or other tools I always give my best to present users how to use the tools.
The best way presenting things is in a visual way as a screenshot or a GIF / Video supplements the textual description and it can be processed more easily by users.
**RecordIt** lets you record your screen and create small screencasts that can be shared via a simple URL as a video or GIF.

![Screenshot: RecordIt](/assets/images/blog/dev-setup/recordit.png)

### [KeyCastr](https://github.com/keycastr/keycastr)

Recording screencasts can be supplemented by displaying the keys you are pressing currently.
This is great to show users for example a shortcut they can use on their keyboard to achieve some goal.
For that purpose I am using the tool **KeyCastr**.

![Screenshot: KeyCastr](/assets/images/blog/dev-setup/keycastr.png)

## Visual Studio Code Extensions

Since [Visual Studio Code Version 1.48.0](https://code.visualstudio.com/updates/v1_48) the Feature **Settings Sync** became stable and available for all.
The feature allows you to sync your settings using your Microsoft or GitHub account.
When you've installed VSCode on multiple machines and you always want to have the instances in sync, you should definitely [set up this feature](https://code.visualstudio.com/docs/editor/settings-sync).

The next part is all about the VSCode extensions I am using so let's walk quickly over the plugins I've installed on my VSCode instances:

|                                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![](https://obenjiro.gallerycdn.vsassets.io/extensions/obenjiro/arrr/0.1.0/1598284087751/Microsoft.VisualStudio.Services.Icons.Default)                                       | **[Arrr](https://marketplace.visualstudio.com/items?itemName=obenjiro.arrr)**<br/>Arrr is a great extension for the Angular Framework. It lets you easily refactor code and for example mark some lines in the template and move it into a child component.                                                                                                                                                                                                                                                                                                       |
| ![](https://angular.gallerycdn.vsassets.io/extensions/angular/ng-template/0.1000.7/1596155297383/Microsoft.VisualStudio.Services.Icons.Default)                               | **[Angular Language Service](https://marketplace.visualstudio.com/items?itemName=obenjiro.arrr)**<br/>When you are developing an [Angular](https://angular.io) app, this extension is essential: It gives you quick info, autocompletion and diagnostic information.                                                                                                                                                                                                                                                                                              |
| ![](https://github.com/SanderLedegen/vscode-angular-follow-selector/raw/master/images/logo.png)                                                                               | **[Angular Follow Selector](https://marketplace.visualstudio.com/items?itemName=sanderledegen.angular-follow-selector)**<br/>This extensions allows you to click on [Angular](https://angular.io) selectors and get redirected to their definition in the component.                                                                                                                                                                                                                                                                                              |
| ![](https://asciidoctor.gallerycdn.vsassets.io/extensions/asciidoctor/asciidoctor-vscode/2.8.3/1594560690791/Microsoft.VisualStudio.Services.Icons.Default)                   | **[AsciiDoc](https://marketplace.visualstudio.com/items?itemName=asciidoctor.asciidoctor-vscode)**<br/>The AsciiDoc Plugin gives you syntax highlighting, a preview and snippets for the [AsciiDoc](https://asciidoc.org) format.                                                                                                                                                                                                                                                                                                                                 |
| ![](https://sygene.gallerycdn.vsassets.io/extensions/sygene/auto-correct/0.2.1/1582635101990/Microsoft.VisualStudio.Services.Icons.Default)                                   | **[Auto Correct](https://marketplace.visualstudio.com/items?itemName=sygene.auto-correct)**<br/>You may like me and there are some words you'll always spell wrong or you're making the same typo all the time. A common mistake I always do is to write `seperate` instead of `separate`. With this plugin you can define such words or patterns that will be automatically replaced with the correct spelled word.                                                                                                                                              |
| ![](https://coenraads.gallerycdn.vsassets.io/extensions/coenraads/bracket-pair-colorizer-2/0.2.0/1594062809176/Microsoft.VisualStudio.Services.Icons.Default)                 | **[Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)**<br/>This tool will colorize opening and closing brackets in different colors so you get a better overview in your code.                                                                                                                                                                                                                                                                                                                    |
| ![](https://d-koppenhagen.gallerycdn.vsassets.io/extensions/d-koppenhagen/vscode-code-review/1.11.0/1598341798822/Microsoft.VisualStudio.Services.Icons.Default)              | **[Code Review](https://marketplace.visualstudio.com/items?itemName=d-koppenhagen.vscode-code-review)**<br/>This is an extension I wrote by myself. It allows you to create expert reviews / code reviews for a workspace that can be exported as a formatted HTML report or importable CSV/JSON file.<br/>This extension is pretty helpful if you are doing for example one-time code reviews for customers or probably students but you don't have direct access to a Gitlab or Github repository where you can directly add comments in a pull/merge requests. |
| ![](https://streetsidesoftware.gallerycdn.vsassets.io/extensions/streetsidesoftware/code-spell-checker/1.9.0/1589974448396/Microsoft.VisualStudio.Services.Icons.Default)     | **[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)**<br/>With this extension your code is checked for common typos and such unknown words will be highlighted as you may know it from Microsoft Word or other Software.                                                                                                                                                                                                                                                                            |
| ![](https://naumovs.gallerycdn.vsassets.io/extensions/naumovs/color-highlight/2.3.0/1499789961213/Microsoft.VisualStudio.Services.Icons.Default)                              | **[Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)**<br/>After installing this extension it will highlight all valid web color values with their appropriate color so that you can directly see the color.                                                                                                                                                                                                                                                                                                          |
| ![](https://pranaygp.gallerycdn.vsassets.io/extensions/pranaygp/vscode-css-peek/4.0.0/1595892543531/Microsoft.VisualStudio.Services.Icons.Default)                            | **[CSS Peak](https://marketplace.visualstudio.com/items?itemName=pranaygp.vscode-css-peek)**<br/>With this extension you can see and edit your CSS definitions from a related stylesheet directly from your HTML files.                                                                                                                                                                                                                                                                                                                                           |
| ![](https://grapecity.gallerycdn.vsassets.io/extensions/grapecity/gc-excelviewer/3.0.40/1597894261914/Microsoft.VisualStudio.Services.Icons.Default)                          | **[Excel Viewer](https://marketplace.visualstudio.com/items?itemName=GrapeCity.gc-excelviewer)**<br/>If you open and edit CSV or Excel files from you VSCode, you will probably need this extension. This allows you to display the data in a formatted table that you can sort and filter.                                                                                                                                                                                                                                                                       |
| ![](https://msjsdiag.gallerycdn.vsassets.io/extensions/msjsdiag/debugger-for-chrome/4.12.10/1597702740002/Microsoft.VisualStudio.Services.Icons.Default)                      | **[Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)**<br/>This debugger extensions allows you to debug your JavaScript code in the Google Chrome browser from your code editor.                                                                                                                                                                                                                                                                                                                             |
| ![](https://ms-azuretools.gallerycdn.vsassets.io/extensions/ms-azuretools/vscode-docker/1.5.0/1597688601690/Microsoft.VisualStudio.Services.Icons.Default)                    | **[Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)**<br/>The Docker extension easily lets you create, manage, and debug your applications containerized with docker. It gives you also IntelliSense for your related Docker configuration files.                                                                                                                                                                                                                                                                         |
| ![](https://editorconfig.gallerycdn.vsassets.io/extensions/editorconfig/editorconfig/0.15.1/1590371230963/Microsoft.VisualStudio.Services.Icons.Default)                      | **[EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)**<br/>This plugin will check you workspace for a [EditorConfig](https://editorconfig.org) configuration file and applies its settings to your workspace.                                                                                                                                                                                                                                                                                                          |
| ![](https://bierner.gallerycdn.vsassets.io/extensions/bierner/emojisense/0.7.0/1588199773410/Microsoft.VisualStudio.Services.Icons.Default)                                   | **[emojisense](https://marketplace.visualstudio.com/items?itemName=bierner.emojisense)**<br/>I personally like using emojis and I use them in `README.md` files for my open source projects at Github. But one thing I always have to look up are the [emjoykey](https://gist.github.com/rxaviers/7360908) for the supported Github emojis. With this extension I have an autocompletion and I can search for them.                                                                                                                                               |
| ![](https://dbaeumer.gallerycdn.vsassets.io/extensions/dbaeumer/vscode-eslint/2.1.8/1594861497267/Microsoft.VisualStudio.Services.Icons.Default)                              | **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)**<br/>This extensions detects your ESLint configuration for code conventions and displays you the violations. Furthermore, it offers you to quick fix detected violations against some rules.                                                                                                                                                                                                                                                                              |
| ![](https://d-koppenhagen.gallerycdn.vsassets.io/extensions/d-koppenhagen/file-tree-to-text-generator/1.2.1/1568782852679/Microsoft.VisualStudio.Services.Icons.Default)      | **[File Tree to Text Generator](https://marketplace.visualstudio.com/items?itemName=d-koppenhagen.file-tree-to-text-generator)**<br/>Another extension I created: It lets you generate file / directory trees for Markdown, LaTeX, ASCII or even a custom format right from your VSCode file explorer.                                                                                                                                                                                                                                                            |
| ![](https://bee.gallerycdn.vsassets.io/extensions/bee/git-temporal-vscode/1.0.0/1581641807688/Microsoft.VisualStudio.Services.Icons.Default)                                  | **[Git Temporal](https://marketplace.visualstudio.com/items?itemName=bee.git-temporal-vscode)**<br/>Git Temporal is a great plugin for interactively searching in your git history based on a timeline. You can even mark ranges on a timeline to see all the changes in between the chosen time range.                                                                                                                                                                                                                                                           |
| ![](https://eamodio.gallerycdn.vsassets.io/extensions/eamodio/gitlens/10.2.2/1591818157905/Microsoft.VisualStudio.Services.Icons.Default)                                     | **[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)**<br/>Show the authorship of code lines right next to them. This can help you a lot if you may not understand some part of the code: just check out who created it and ask for support.                                                                                                                                                                                                                                                                                          |
| ![](https://andrejunges.gallerycdn.vsassets.io/extensions/andrejunges/handlebars/0.4.1/1526248443531/Microsoft.VisualStudio.Services.Icons.Default)                           | **[Handlebars](https://marketplace.visualstudio.com/items?itemName=andrejunges.Handlebars)**<br/>This extension provides you with code snippets for [Handlebars](https://handlebarsjs.com) files as well as with syntax highlighting.                                                                                                                                                                                                                                                                                                                             |
| ![](https://greenbyte.gallerycdn.vsassets.io/extensions/greenbyte/handlebars-preview/1.1.2/1597830971683/Microsoft.VisualStudio.Services.Icons.Default)                       | **[Handlebars Preview](https://marketplace.visualstudio.com/items?itemName=greenbyte.handlebars-preview)**<br/>With the Handlebars Preview extension you can put a JSON file right next to your Handlebars template and the plugin will inject the data into the template to display you a preview of how it would look like.                                                                                                                                                                                                                                     |
| ![](https://kisstkondoros.gallerycdn.vsassets.io/extensions/kisstkondoros/vscode-gutter-preview/0.26.2/1591049586324/Microsoft.VisualStudio.Services.Icons.Default)           | **[Image Preview](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview)**<br/>After installing this plugin, you will see a little preview image right next to your code line number when a source code line contains a valid image file path.                                                                                                                                                                                                                                                                                  |
| ![](https://wix.gallerycdn.vsassets.io/extensions/wix/vscode-import-cost/2.12.0/1543514109720/Microsoft.VisualStudio.Services.Icons.Default)                                  | **[Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)**<br/>With this plugin installed, projects using webpack will be analyzed for their imports and the bundle size they will have. The resulting size is displayed right next to the import. This helps you to identify very big imported libs.                                                                                                                                                                                                                          |
| ![](https://oderwat.gallerycdn.vsassets.io/extensions/oderwat/indent-rainbow/7.4.0/1552964364054/Microsoft.VisualStudio.Services.Icons.Default)                               | **[Indent Rainbow](https://marketplace.visualstudio.com/search?term=Indent%20Rainbow&target=VSCode&category=All%20categories&sortBy=Relevance)**<br/>This plugin colorizes the different indentation levels. This is especially helpful when writing YAML files or Python applications where the indentations play an important role.                                                                                                                                                                                                                             |
| ![](https://zignd.gallerycdn.vsassets.io/extensions/zignd/html-css-class-completion/1.19.0/1558208838135/Microsoft.VisualStudio.Services.Icons.Default)                       | **[IntelliSense for CSS class names in HTML](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)**<br/>This plugin gives you auto suggestions for CSS class names in your HTML templates.                                                                                                                                                                                                                                                                                                                                        |
| ![](https://orta.gallerycdn.vsassets.io/extensions/orta/vscode-jest/3.2.0/1588254430761/Microsoft.VisualStudio.Services.Icons.Default)                                        | **[Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)**<br/>The Jest extension gives you auto completion and color indicators for successfully / failing Jest tests.                                                                                                                                                                                                                                                                                                                                                                     |
| ![](https://cmstead.gallerycdn.vsassets.io/extensions/cmstead/jsrefactor/2.20.6/1586404799977/Microsoft.VisualStudio.Services.Icons.Default)                                  | **[JS Refactor](https://marketplace.visualstudio.com/items?itemName=cmstead.jsrefactor)**<br/>This extension gives you a lot of JavaScript refactoring utilities like _convert to arrow function_ or _rename variable_.                                                                                                                                                                                                                                                                                                                                           |
| ![](https://cdn.vsassets.io/v/M174_20200820.2/_content/Header/default_icon_128.png)                                                                                           | **[LintLens](https://marketplace.visualstudio.com/items?itemName=ghmcadams.lintlens)**<br/>With this extension, metadata and usage information for ESLint rules will be displayed beside each rule.                                                                                                                                                                                                                                                                                                                                                               |
| ![](https://ritwickdey.gallerycdn.vsassets.io/extensions/ritwickdey/liveserver/5.6.1/1555497731217/Microsoft.VisualStudio.Services.Icons.Default)                             | **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)**<br/>With the Live Server extension you can open an HTML file in the browser and the server watches for changes and refreshes the Browser preview.                                                                                                                                                                                                                                                                                                                    |
| ![](https://emilast.gallerycdn.vsassets.io/extensions/emilast/logfilehighlighter/2.9.0/1594820309342/Microsoft.VisualStudio.Services.Icons.Default)                           | **[Log File Highlighter](https://marketplace.visualstudio.com/items?itemName=emilast.LogFileHighlighter)**<br/>If you ever have to investigate a bunch of log files you will love this plugin. It highlights log information like the severity or timestamps so it will be easier for you to inspect them.                                                                                                                                                                                                                                                        |
| ![](https://bierner.gallerycdn.vsassets.io/extensions/bierner/markdown-mermaid/1.8.1/1597947461090/Microsoft.VisualStudio.Services.Icons.Default)                             | **[Markdown Preview Mermaid support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid)**<br/>Have you ever visualized things in your `README.md` file? Thanks to [Mermaid.js](https://mermaid-js.github.io/mermaid) you can create easily beautiful flowcharts, sequence diagrams and more. This plugin enables the preview support in VSCode for mermaid diagrams embedded in your markdown files.                                                                                                                                   |
| ![](https://yzhang.gallerycdn.vsassets.io/extensions/yzhang/markdown-all-in-one/3.2.0/1595650433498/Microsoft.VisualStudio.Services.Icons.Default)                            | **[Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)**<br/>This extension enables some great helpful features when writing Markdown files such as table of contents generation, auto-formatting the document and it gives you a great autocompletion feature.                                                                                                                                                                                                                                                  |
| ![](https://eg2.gallerycdn.vsassets.io/extensions/eg2/vscode-npm-script/0.3.13/1596482164436/Microsoft.VisualStudio.Services.Icons.Default)                                   | **[npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)**<br/>With this extension you can run your NPM scripts right from your `package.json` file.                                                                                                                                                                                                                                                                                                                                                                                    |
| ![](https://nrwl.gallerycdn.vsassets.io/extensions/nrwl/angular-console/13.0.0/1595622774663/Microsoft.VisualStudio.Services.Icons.Default)                                   | **[Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)**<br/>This plugin gives you a UI for [Nx Monorepos](https://nx.dev) and the Nx CLI.                                                                                                                                                                                                                                                                                                                                                                                      |
| ![](https://christian-kohler.gallerycdn.vsassets.io/extensions/christian-kohler/path-intellisense/2.2.1/1591957111022/Microsoft.VisualStudio.Services.Icons.Default)          | **[Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)**<br/>This plugin give you an autocompletion for filenames                                                                                                                                                                                                                                                                                                                                                                                          |
| ![](https://johnpapa.gallerycdn.vsassets.io/extensions/johnpapa/vscode-peacock/3.8.0/1597093468460/Microsoft.VisualStudio.Services.Icons.Default)                             | **[Peacock](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock)**<br/>Peacock is great when you are working with multiple VSCode windows at the same time. You can simply colorize them to know fast which project is currently open.                                                                                                                                                                                                                                                                                                    |
| ![](https://pnp.gallerycdn.vsassets.io/extensions/pnp/polacode/0.3.4/1569601471865/Microsoft.VisualStudio.Services.Icons.Default)                                             | **[Polacode](https://marketplace.visualstudio.com/items?itemName=pnp.polacode)**<br/>With Polacode you can mark code lines and create screenshots from the selection. This is great for e.g. presentations or sharing stuff on Twitter.                                                                                                                                                                                                                                                                                                                           |
| ![](https://esbenp.gallerycdn.vsassets.io/extensions/esbenp/prettier-vscode/5.2.1/1598366482789/Microsoft.VisualStudio.Services.Icons.Default)                                | **[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)**<br/>[Prettier](https://prettier.io) is in my option the best code formatter especially when working with JavaScript /TypeScript. The Extension for Prettier will allow you to set up Prettier as defualt formatter for VSCode or just for specific programming languages.<br><pre><code>{<br>  "editor.defaultFormatter": "esbenp.prettier-vscode",</br>  "[javascript]": {<br/>    "editor.defaultFormatter": "esbenp.prettier-vscode"<br/>  }<br/>}</code></pre>     |
| ![](https://mechatroner.gallerycdn.vsassets.io/extensions/mechatroner/rainbow-csv/1.7.1/1596509943679/Microsoft.VisualStudio.Services.Icons.Default)                          | **[Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv)**<br/>This extension will colorize each column in a CSV file in a different color, so you can better read the file content.                                                                                                                                                                                                                                                                                                                                          |
| ![](https://richie5um2.gallerycdn.vsassets.io/extensions/richie5um2/vscode-sort-json/1.18.0/1572459185562/Microsoft.VisualStudio.Services.Icons.Default)                      | **[Sort JSON Objects](https://marketplace.visualstudio.com/items?itemName=richie5um2.vscode-sort-json)**<br/>With this extension you can simply right click on a JSON object and sort the items inside.                                                                                                                                                                                                                                                                                                                                                           |
| ![](https://stylelint.gallerycdn.vsassets.io/extensions/stylelint/vscode-stylelint/0.85.0/1597235740165/Microsoft.VisualStudio.Services.Icons.Default)                        | **[stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)**<br/>Lint CSS/SCSS/SASS/Less Style definitions.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ![](https://wayou.gallerycdn.vsassets.io/extensions/wayou/vscode-todo-highlight/1.0.4/1532254554587/Microsoft.VisualStudio.Services.Icons.Default)                            | **[TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)**<br/>This extension will highlight `TODO`, `FIXME` and some other annotations within comments in your code.                                                                                                                                                                                                                                                                                                                                                  |
| ![](https://ms-vscode.gallerycdn.vsassets.io/extensions/ms-vscode/vscode-typescript-tslint-plugin/1.2.3/1573518112983/Microsoft.VisualStudio.Services.Icons.Default)          | **[TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)**<br/>This extension enable TSLint support linting TypeScript files in VSCode.                                                                                                                                                                                                                                                                                                                                                                          |
| ![](https://visualstudioexptteam.gallerycdn.vsassets.io/extensions/visualstudioexptteam/vscodeintellicode/1.2.10/1597190336810/Microsoft.VisualStudio.Services.Icons.Default) | **[Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)**<br/>Installing this extension will give you an even better IntelliSense which is AI-assisted.                                                                                                                                                                                                                                                                                                                                         |
| ![](https://pflannery.gallerycdn.vsassets.io/extensions/pflannery/vscode-versionlens/1.0.8/1592083401206/Microsoft.VisualStudio.Services.Icons.Default)                       | **[Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens)**<br/>With Version Lens you can see directly the currently installed and the latest versions of a package in your `package.json` file.                                                                                                                                                                                                                                                                                                                         |
| ![](https://octref.gallerycdn.vsassets.io/extensions/octref/vetur/0.26.1/1596770796928/Microsoft.VisualStudio.Services.Icons.Default)                                         | **[Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)**<br/>Vetur gives you tooling for [Vue.js](https://vuejs.org/) development.                                                                                                                                                                                                                                                                                                                                                                                                           |
| ![](https://dariofuzinato.gallerycdn.vsassets.io/extensions/dariofuzinato/vue-peek/1.0.2/1503254564126/Microsoft.VisualStudio.Services.Icons.Default)                         | **[Vue Peak](https://marketplace.visualstudio.com/items?itemName=dariofuzinato.vue-peek)**<br/>This extension gives you _Go To Definition_ and _Peek Definition_ support for [Vue](https://vuejs.org/) components.                                                                                                                                                                                                                                                                                                                                                |
| ![](https://knisterpeter.gallerycdn.vsassets.io/extensions/knisterpeter/vscode-commitizen/0.9.3/1595315799607/Microsoft.VisualStudio.Services.Icons.Default)                  | **[Visual Studio Code Commitizen Support](https://marketplace.visualstudio.com/items?itemName=KnisterPeter.vscode-commitizen)**<br/>This plugin adds a command panel for entering [Conventional Commits](https://www.conventionalcommits.org) with support.                                                                                                                                                                                                                                                                                                       |
| ![](https://maxvanderschee.gallerycdn.vsassets.io/extensions/maxvanderschee/web-accessibility/0.2.82/1584101774211/Microsoft.VisualStudio.Services.Icons.Default)             | **[Web Accessibility](https://marketplace.visualstudio.com/items?itemName=MaxvanderSchee.web-accessibility)**<br/>Using this plugin helps you by finding accessibility violations in your markup and displays you hints for [WAI-ARIA best practices](https://www.w3.org/WAI/standards-guidelines/aria/).                                                                                                                                                                                                                                                         |
| ![](https://redhat.gallerycdn.vsassets.io/extensions/redhat/vscode-yaml/0.10.0/1597935539888/Microsoft.VisualStudio.Services.Icons.Default)                                   | **[YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)**<br/>This extension gives you a comprehensive YAML language support.                                                                                                                                                                                                                                                                                                                                                                                                            |
| ![](https://zeplin.gallerycdn.vsassets.io/extensions/zeplin/zeplin/2.1.0/1592227616388/Microsoft.VisualStudio.Services.Icons.Default)                                         | **[Zeplin](https://marketplace.visualstudio.com/items?itemName=zeplin.zeplin)**<br/>If you work with [Zeplin](https://zeplin.io), this official plugin provides you with quick access to your designs.                                                                                                                                                                                                                                                                                                                                                            |
<!--
|![]()|**[]()**<br/>|
-->

## Google Chrome Extensions

Google Chrome is great and it brings already a lot of possibilities that help developers to improve their web apps.
However there are some really great plugins I am using and I can recommend:

|                                                                                                                                  |                                                                                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![](https://lh3.googleusercontent.com/u_2WHT7oINbcGWWN0MRxogjDHAPYB9Izk_MUdcF0yukvabP9uEeIGJaFpg2Ac9vv5mrm7A5ZVw=w128-h128-e365) | **[JSON Viewer Awesome](https://chrome.google.com/webstore/detail/json-viewer-awesome/iemadiahhbebdklepanmkjenfdebfpfe)**<br/>This extension will automatically detect and format JSON files once you open them by calling the URL.                                                         |
| ![](https://lh3.googleusercontent.com/CzEnlG42oD6E_kIGkLujYfQnz43jx8ml2ezY-rFloQgNDPiB0PRJsLWwn6N4LJZsdpEAHlebDQ=w128-h128-e365) | **[Axe](https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd)**<br/>Axe helps you by improving the grade of accessibility of your site.                                                                                                     |
| ![](https://lh3.googleusercontent.com/ZccCYQft-IxBg8e8B2FsZTPXyu9kYaTKGX4vxVoTVztguJVsrhTlJo_qVd1H1tesz03BxwMdYg=w128-h128-e365) | **[Web Developer]([)](https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm)**<br/>With this extension you will get a toolbox for website manipulation and testing tools. You can e.g. easily disable JavaScript or styles to see how your site behaves. |
| ![](https://lh3.googleusercontent.com/_6Y4tjYdppsZJlWOnAzFy2A8JjGwJpQOvoKocTYMfl66bTJg20mJ6pojdQaUGtvXa9HYurDChQ=w128-h128-e365) | **[Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)**<br/>Lighthouse analyzes your site for performance, accessibility and other common things and give you a site score as well as some useful information how to improve your site.     |
| ![](https://lh3.googleusercontent.com/JsB6yUqV6WbFREmfjpdIY6ctrf3IKZfdhWa1BbHiD0MwHvilHzJJdM5TGycosq8_rEdf3FFYXA=w128-h128-e365) | **[Pesticide](https://chrome.google.com/webstore/detail/pesticide-for-chrome/bblbgcheenepgnnajgfpiicnbbdmmooh)**<br/>Activating these extensions lets you outline all elements on a site so that you can easier analyze paddings, margins and borders.                                      |
| ![](https://lh3.googleusercontent.com/8BLPoOrRiXqc_lxLjwjsaqwp3LwfW-1XDf1BmWUVDe5DfqgopAbgKVhZqnfz1IVmMIjHy_u1=w128-h128-e365)   | **[Chrome Capture](https://chrome.google.com/webstore/detail/chrome-capture-screenshot/ggaabchcecdbomdcnbahdfddfikjmphe?hl=en)**<br/>This extension lets you record and share Screenshots, Videos and GIFs from a website.                                                                  |
<!--
|![]()|**[]()**<br/>|
-->


## Scripts and other tools

### Dotfiles

Personally I like to keep my mac up-to-date and therefore I will install most of my software via the package manager [Homebrew](https://brew.sh).
Also, to be more efficient I am using the [`oh-my-zsh`](https://github.com/ohmyzsh/ohmyzsh) framework for managing my shell configuration.
The most of my configurations I will provide in my Github repository called [`.dotfiles`](https://github.com/d-koppenhagen/.dotfiles).

### Exclude all `node_modules` from the TimeMachine (macOS only)

One thing I learned during my career: **Backup, Backup, Backup**.
It's better to have one backup too much than data loss.
Fortunately on a macOS system it's possible to set up Apple's TimeMachine for doing continuous system backup.
However, backing up everything takes a lot of time and there are things you don't need to back up like directories syncing with a cloud provider like Dropbox, Sharepoint, etc.
Those directories you can easily [exclude from the TimeMachine backup by configuration](https://osxdaily.com/2012/01/27/exclude-folders-from-time-machine-backups/).
This will keep the backups smaller and also in case of restore, the system is much faster ready-to-use.
But what about `node_modules` directories?
For sure: you can exclude them in the same way but this is very sophisticated and you always need to remember this step once you create a new project.
Therefore, I am using a simple script, which searches in my development directory (`~/dev` in my case) for all `node_modules` directories and excludes them from the backup:

```sh
#!/bin/bash
# exclude all `node_modules` folders within the dev directory
find "$HOME/dev" -name 'node_modules' -prune -type d -exec tmutil addexclusion {} \; -exec tmutil isexcluded {} \;
echo "Done. The excluded files won't be part of a time machine backup anymore."
```

To be sure the script updates the list of excluded directories frequently, I added a cronjob:

```bash
crontab -e
```

The actual cronjob config is the following:

```bash
0 12 * * *  cd $HOME/dev/.dotfiles && ./time-machine-excludes.sh # every day at 12:00
```

## Feedback

Now as you know my dev-setup, it's your turn? Is there a great tool or plugin you can recommend?
Then just contact me via [E-Mail](mailto:mail@d-koppenhagen.de) or [Twitter](https://twitter.com/d_koppenhagen).

<hr>

<span>Photo by <a href="https://unsplash.com/@toddquackenbush?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Todd Quackenbush</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>