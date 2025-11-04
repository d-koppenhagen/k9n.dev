const e=`---
title: 'My Development Setup'
description: 'In this article I will present you what tools I am using during my day-to-day development. Also I will show you a list of extensions and their purpose that help me (and probably you too!) to be more productive.'
published: true
author:
  name: Danny Koppenhagen
  mail: mail@k9n.dev
created: 2020-08-27
updated: 2022-07-17
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
thumbnail:
  header: images/blog/dev-setup/dev-setup-header.jpg
  card: images/blog/dev-setup/dev-setup-header-small.jpg
linked:
  devTo: https://dev.to/dkoppenhagen/my-development-setup-1ne2
---

<p>In the following article I will present you what tools I am using during my day-to-day development workflow.
Also, I will show you a list of extensions and their purpose that will help me and probably you too being more productive.</p><h2 id="introduction-1">Introduction</h2>
<p>As a developer I always give my best to be productive, to write good and well documented source code and to share my knowledge.
For all this, I use great tools and extensions that will help me to get the most of it and working faster and cleaner.
Those tools and extensions help me during my everyday life as a developer for:</p><ul>
<li>Development of Angular, Vue.js apps,</li>
<li>sharing knowledge with recordings, GIFs, screenshots, code snippets etc.,</li>
<li>writing good documentation, and</li>
<li>being more productive in general.</li>
</ul>
<p>Both at work and in my free time I am working on an Apple MacBook Pro.
But most of the tools and software listed here is available for Windows, macOS and Linux distributions.</p><h2 id="software">Software</h2>
<p>Let&#39;s get started with some basic software that I use.</p><h3 id="iterm2"><a href="https://iterm2.com">iTerm2</a></h3>
<p>The default Terminal app for macOS fulfills its purpose but for being more productive I can recommend the terminal application <strong><a href="https://iterm2.com">iTerm2</a></strong>.</p><p>I am using iTerm2 since a long time and it&#39;s a great tool with lots of configuration options.
You can create tabs, use profiles and customize styles and layouts.</p><p><img src="images/blog/dev-setup/iterm2.png" alt="Screenshot: iTerm2"></p><h3 id="cakebrew--macos-only"><a href="https://www.cakebrew.com">Cakebrew</a> – macOS only</h3>
<p>If you are on a Mac, you probably know <strong><a href="https://brew.sh">Homebrew</a></strong> – the package manager for macOS.
If you don&#39;t know Homebrew: You should definitely check it out.
Personally I prefer to install most of my Software via Homebrew as I can easily manage updates later without having to manually download the packages.
However, since I don&#39;t remember all Homebrew commands all the time and to get an overview of the installed packages, I use a Homebrew GUI called <strong>CakeBrew</strong>.
This lets me easily update and manage my installed Homebrew packages.</p><p><img src="images/blog/dev-setup/cakebrew.png" alt="Screenshot: CakeBrew"></p><h3 id="nvm"><a href="https://github.com/nvm-sh/nvm">NVM</a></h3>
<p>Working on multiple projects requires sometimes different environments.
As a web developer Node.js is essential and should always be up-to-date but sometimes you need to use different versions of Node.js and NPM for different projects.
NVM (Node Version Manager) let&#39;s you easily install and switch between multiple Node.js Versions.
My recommendation is also to check-in the <code>.nvmrc</code> file in every project to help other team members to use the right version of Node.js automatically.</p><h3 id="fork"><a href="https://git-fork.com">Fork</a></h3>
<p>As a developer, version control with <a href="https://git-scm.com">Git</a> is essential for your development workflow.
Personally I do all of the basic operations via the command line, like creating commits, adding files to the staging area, pulling and pushing.
However, there are some things where I prefer to use a GUI for assistance:</p><ul>
<li>graphical overview of commits and branches (history)</li>
<li>interactive rebase</li>
<li>managing multiple remote repositories</li>
</ul>
<p><strong>Fork</strong> is a very nice, clean and powerful Git GUI that helps you to control Git in an easy and interactive way.</p><p><img src="images/blog/dev-setup/fork.png" alt="Screenshot: Fork"></p><h3 id="visual-studio-code"><a href="https://code.visualstudio.com">Visual Studio Code</a></h3>
<p>In the last years, Microsoft has improved its free IDE <strong>Visual Studio Code</strong> a lot, and with every frequent release it gets even more powerful.
One of the things that makes <strong>VSCode</strong> such a great IDE is the wide range of available extensions and plugins.
VSCode is a very universal and adoptable IDE which has great support and tools for lots of programming languages.
So it doesn&#39;t matter if you develop a web application, a mobile app using e.g. Flutter, a C# or a Python app: You can use VSCode for all of that and you don&#39;t need to get start using a new specific IDE for each and every specific language.</p><p><img src="images/blog/dev-setup/vscode.png" alt="Screenshot: VSCode"></p><p>Later in this article, I will present you a list of my favorite extensions for VSCode.</p><h3 id="chrome"><a href="https://google.com/chrome">Chrome</a></h3>
<p>As a web developer, a modern browser like <strong>Google Chrome</strong> is essential.
In my opinion the developer and debugging tools are more mature compared to <a href="https://www.mozilla.org/firefox">Firefox</a>.
Chrome is also very up-to-date in terms of the latest JavaScript features and it has a wide range of extensions you can install that will help you to even be more productive developing web applications.</p><p><img src="images/blog/dev-setup/chrome.png" alt="Screenshot: Google Chrome"></p><p>A list of my favorite extensions for Google Chrome can be found further down in this article.</p><h3 id="insomnia"><a href="https://insomnia.rest">Insomnia</a></h3>
<p>Insomnia is a great and simple tools that&#39;s very easy to use when you want to interact with REST or <a href="https://graphql.org">GraphQL</a> endpoints. It has a very simple UI but it&#39;s powerful nonetheless.
You can call endpoints, check their responses and also create batch requests or save your requests for using them later again.
I personally prefer Insomnia over <a href="https://www.postman.com">Postman</a> which I used before and which is also very powerful.
However, in my opinion the UI of Postman got a bit confusing during the last years by introducing new features.</p><p><img src="images/blog/dev-setup/insomnia.png" alt="Screenshot: Insomnia"></p><h3 id="drawio"><a href="https://draw.io">draw.io</a></h3>
<p>From time to time as a developer you need to illustrate things and flows.
For this, I mostly use <strong>draw.io</strong>. It&#39;s available as a web application but also as an installable desktop version.
Draw.io provides a lot of basic icons and vector graphics for network illustrations, UML, diagrams, engineering icons for circuits and much more.</p><p><img src="images/blog/dev-setup/drawio.png" alt="Screenshot: draw.io"></p><h3 id="recordit"><a href="https://recordit.co">RecordIt</a></h3>
<p>When I develop extensions for VSCode or other tools I always give my best to present users how to use these tools.
The best way to present things is in a visual way as a screenshot or a GIF / video screencast.
This supplements the textual description and thus, can be processed more easily by users.
<strong>RecordIt</strong> lets you record your screen and create small screencasts that can be shared via a simple URL as a video or GIF.</p><p><img src="images/blog/dev-setup/recordit.png" alt="Screenshot: RecordIt"></p><h3 id="keycastr"><a href="https://github.com/keycastr/keycastr">KeyCastr</a></h3>
<p>Recording screencasts can be supplemented by displaying the keys you are pressing during the recording.
This is a great way to present keyboard shortcuts without having to manually explain which keys you&#39;re using.
For that purpose I use the tool <strong>KeyCastr</strong>.</p><p><img src="images/blog/dev-setup/keycastr.png" alt="Screenshot: KeyCastr"></p><h2 id="visual-studio-code-extensions">Visual Studio Code Extensions</h2>
<p>Since <a href="https://code.visualstudio.com/updates/v1_48">Visual Studio Code Version 1.48.0</a> the Feature <strong>Settings Sync</strong> became stable and available for everyone.
This feature allows you to sync your settings between different installations of VSCode using your Microsoft or GitHub account.
When you&#39;ve installed VSCode on multiple machines and you always want to have the instances in sync, you should definitely <a href="https://code.visualstudio.com/docs/editor/settings-sync">set up this feature</a>.</p><p>The next part is all about the VSCode extensions I am using so let&#39;s walk quickly over the plugins I&#39;ve installed on my VSCode instances:</p><h3 id="appearance">Appearance</h3>
<table>
<thead>
<tr>
<th></th>
<th></th>
</tr>
</thead>
<tbody><tr>
<td><del><img src="https://coenraads.gallerycdn.vsassets.io/extensions/coenraads/bracket-pair-colorizer-2/0.2.0/1594062809176/Microsoft.VisualStudio.Services.Icons.Default" alt=""></del></td>
<td><del><strong><a href="https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2">Bracket Pair Colorizer 2</a></strong><br/>This tool will colorize opening and closing brackets in different colors, so you get a better overview in your code.</del> <strong>Note:</strong> Visual Studio Code now  <a href="https://code.visualstudio.com/blogs/2021/09/29/bracket-pair-colorization">includes native support for bracket pair colorization</a> which is way faster than using the extension.</td>
</tr>
<tr>
<td><img src="https://naumovs.gallerycdn.vsassets.io/extensions/naumovs/color-highlight/2.3.0/1499789961213/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight">Color Highlight</a></strong><br/>After installing this extension it will highlight all valid web color values with their appropriate color so that you can directly see the color.</td>
</tr>
<tr>
<td><img src="https://kisstkondoros.gallerycdn.vsassets.io/extensions/kisstkondoros/vscode-gutter-preview/0.26.2/1591049586324/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview">Image Preview</a></strong><br/>After installing this plugin, you will see a little preview image right next to your code line number when a source code line contains a valid image file path.</td>
</tr>
<tr>
<td><img src="https://byi8220.gallerycdn.vsassets.io/extensions/byi8220/indented-block-highlighting/1.0.7/1524962452244/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=byi8220.indented-block-highlighting">Indented Block Highlighting</a></strong><br/>This extensions highlights the intented area that contains the cursor.</td>
</tr>
<tr>
<td><img src="https://oderwat.gallerycdn.vsassets.io/extensions/oderwat/indent-rainbow/7.4.0/1552964364054/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow">Indent Rainbow</a></strong><br/>This plugin colorizes the different indentation levels. This is especially helpful when writing YAML files or Python applications where the indentations play an important role for the code semantics.</td>
</tr>
<tr>
<td><img src="https://emilast.gallerycdn.vsassets.io/extensions/emilast/logfilehighlighter/2.9.0/1594820309342/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=emilast.LogFileHighlighter">Log File Highlighter</a></strong><br/>If you ever have to investigate a bunch of log files you will love this plugin. It highlights log information like the severity or timestamps so it will be easier for you to inspect them.</td>
</tr>
<tr>
<td><img src="https://johnpapa.gallerycdn.vsassets.io/extensions/johnpapa/vscode-peacock/3.8.0/1597093468460/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock">Peacock</a></strong><br/>Peacock is great when you are working with multiple VSCode windows at the same time. You can simply colorize them to quickly find out which project is currently open.</td>
</tr>
<tr>
<td><img src="https://mechatroner.gallerycdn.vsassets.io/extensions/mechatroner/rainbow-csv/1.7.1/1596509943679/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv">Rainbow CSV</a></strong><br/>This extension will colorize each column in a CSV file in a different color, so you can better read the file contents.</td>
</tr>
<tr>
<td><img src="https://wayou.gallerycdn.vsassets.io/extensions/wayou/vscode-todo-highlight/1.0.4/1532254554587/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight">TODO Highlight</a></strong><br/>This extension will highlight <code>TODO</code>, <code>FIXME</code> and some other annotations within comments in your code.</td>
</tr>
</tbody></table>
<!--
|![]()|**[]()**<br/>|
-->

<h3 id="docs">Docs</h3>
<table>
<thead>
<tr>
<th></th>
<th></th>
</tr>
</thead>
<tbody><tr>
<td><img src="https://asciidoctor.gallerycdn.vsassets.io/extensions/asciidoctor/asciidoctor-vscode/2.8.3/1594560690791/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=asciidoctor.asciidoctor-vscode">AsciiDoc</a></strong><br/>The AsciiDoc Plugin gives you syntax highlighting, a preview and snippets for the <a href="https://asciidoc.org">AsciiDoc</a> format.</td>
</tr>
<tr>
<td><img src="https://d-koppenhagen.gallerycdn.vsassets.io/extensions/d-koppenhagen/vscode-code-review/1.11.0/1598341798822/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=d-koppenhagen.vscode-code-review">Code Review</a></strong><br/>This is an extension I wrote by myself. It allows you to create expert reviews / code reviews for a workspace that can be exported as a formatted HTML report or importable CSV/JSON file.<br/>This extension is pretty helpful if you are doing for example one-time code reviews for customers or probably students but you don&#39;t have direct access to a Gitlab or GitHub repository where you can directly add comments in a merge/pull request.</td>
</tr>
<tr>
<td><img src="https://bierner.gallerycdn.vsassets.io/extensions/bierner/emojisense/0.7.0/1588199773410/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=bierner.emojisense">emojisense</a></strong><br/>I personally like using emojis and I use them in <code>README.md</code> files for my open source projects at GitHub. However, one thing I always have to look up are the <a href="https://gist.github.com/rxaviers/7360908">emjoykey</a> for the supported GitHub emojis. With this extension I have an autocompletion and I can search for them.</td>
</tr>
<tr>
<td><img src="https://d-koppenhagen.gallerycdn.vsassets.io/extensions/d-koppenhagen/file-tree-to-text-generator/1.2.1/1568782852679/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=d-koppenhagen.file-tree-to-text-generator">File Tree to Text Generator</a></strong><br/>An extension I created by myself: It lets you generate file / directory trees for Markdown, LaTeX, ASCII or even a custom format right from your VSCode file explorer.</td>
</tr>
<tr>
<td><img src="https://bierner.gallerycdn.vsassets.io/extensions/bierner/markdown-mermaid/1.8.1/1597947461090/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid">Markdown Preview Mermaid support</a></strong><br/>Have you ever visualized things in your <code>README.md</code> file? Thanks to <a href="https://mermaid-js.github.io/mermaid">Mermaid.js</a> you can easily create beautiful flowcharts, sequence diagrams and more. This plugin enables the preview support in VSCode for mermaid diagrams embedded in your markdown files.</td>
</tr>
<tr>
<td><img src="https://yzhang.gallerycdn.vsassets.io/extensions/yzhang/markdown-all-in-one/3.2.0/1595650433498/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one">Markdown All in One</a></strong><br/>This extension enables some great helpful features when writing Markdown files such as table of contents generation, auto-formatting the document and it gives you a great autocompletion feature.</td>
</tr>
</tbody></table>
<!--
|![]()|**[]()**<br/>|
-->

<h3 id="graphics">Graphics</h3>
<table>
<thead>
<tr>
<th></th>
<th></th>
</tr>
</thead>
<tbody><tr>
<td><img src="https://hediet.gallerycdn.vsassets.io/extensions/hediet/vscode-drawio/0.7.2/1593456864928/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio">Draw.io Integration</a></strong><br/>This extension integrates the <a href="https://draw.io">draw.io</a> editor in VSCode. You can directly edit draw.io associated files.</td>
</tr>
<tr>
<td><img src="https://jock.gallerycdn.vsassets.io/extensions/jock/svg/1.3.8/1596248511766/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=jock.svg">SVG</a></strong><br/>This extension will give you SVG code highlight and preview support. You can even export the SVG directly from the preview as a <code>*.png</code> graphic.</td>
</tr>
</tbody></table>
<!--
|![]()|**[]()**<br/>|
-->

<h3 id="javascript--typescript">JavaScript / TypeScript</h3>
<table>
<thead>
<tr>
<th></th>
<th></th>
</tr>
</thead>
<tbody><tr>
<td><img src="https://dbaeumer.gallerycdn.vsassets.io/extensions/dbaeumer/vscode-eslint/2.1.8/1594861497267/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint">ESLint</a></strong><br/>This extensions detects your ESLint configuration for code conventions and displays the violations. Furthermore, it offers you to quick fix detected violations against some rules.</td>
</tr>
<tr>
<td><img src="https://wix.gallerycdn.vsassets.io/extensions/wix/vscode-import-cost/2.12.0/1543514109720/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost">Import Cost</a></strong><br/>With this plugin installed, projects using webpack will be analyzed for their imports and the bundle size they will have. The resulting size is displayed right next to the import. This helps you to identify very big imported libs.</td>
</tr>
<tr>
<td><img src="https://xabikos.gallerycdn.vsassets.io/extensions/xabikos/javascriptsnippets/1.8.0/1587489699375/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets">JavaScript (ES6) code snippets</a></strong><br/>This extension brings some great snippets for JavaScript / TypeScript like a short snippet <code>clg</code> for writing <code>console.log()</code> or <code>imp</code> for <code>import <foo> from '<foo>';</code>.</td>
</tr>
<tr>
<td><img src="https://orta.gallerycdn.vsassets.io/extensions/orta/vscode-jest/3.2.0/1588254430761/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest">Jest</a></strong><br/>The Jest extension gives you auto completion and color indicators for successful / failing Jest tests.</td>
</tr>
<tr>
<td><img src="https://zixuanchen.gallerycdn.vsassets.io/extensions/zixuanchen/vitest-explorer/0.2.20/1656816665060/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer">Vitest</a></strong><br/>A Test Explorer and helper for Tests using Vite and Vitest.</td>
</tr>
<tr>
<td><img src="https://cmstead.gallerycdn.vsassets.io/extensions/cmstead/jsrefactor/2.20.6/1586404799977/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=cmstead.jsrefactor">JS Refactor</a></strong><br/>This extension gives you a lot of JavaScript refactoring utilities like <em>convert to arrow function</em> or <em>rename variable</em>.</td>
</tr>
<tr>
<td><img src="https://cdn.vsassets.io/v/M174_20200820.2/_content/Header/default_icon_128.png" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=ghmcadams.lintlens">LintLens</a></strong><br/>With this extension, metadata and usage information for ESLint rules will be displayed beside each rule.</td>
</tr>
<tr>
<td><img src="https://eg2.gallerycdn.vsassets.io/extensions/eg2/vscode-npm-script/0.3.13/1596482164436/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script">npm</a></strong><br/>This extension let&#39;s you run your NPM scripts right from your <code>package.json</code> file.</td>
</tr>
<tr>
<td><img src="https://richie5um2.gallerycdn.vsassets.io/extensions/richie5um2/vscode-sort-json/1.18.0/1572459185562/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=richie5um2.vscode-sort-json">Sort JSON Objects</a></strong><br/>With this extension you can simply right click on a JSON object and sort the items inside.</td>
</tr>
<tr>
<td><img src="https://visualstudioexptteam.gallerycdn.vsassets.io/extensions/visualstudioexptteam/vscodeintellicode/1.2.10/1597190336810/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode">Visual Studio IntelliCode</a></strong><br/>Installing this extension will give you an even better IntelliSense which is AI-assisted.</td>
</tr>
<tr>
<td><img src="https://pflannery.gallerycdn.vsassets.io/extensions/pflannery/vscode-versionlens/1.0.8/1592083401206/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens">Version Lens</a></strong><br/>With Version Lens you can directly see the currently installed and the latest versions of a package in your <code>package.json</code> file.</td>
</tr>
</tbody></table>
<!--
|![]()|**[]()**<br/>|
-->

<h3 id="htmlhandlebarscsssassscssless">HTML/Handlebars/CSS/SASS/SCSS/LESS</h3>
<table>
<thead>
<tr>
<th></th>
<th></th>
</tr>
</thead>
<tbody><tr>
<td><img src="https://pranaygp.gallerycdn.vsassets.io/extensions/pranaygp/vscode-css-peek/4.0.0/1595892543531/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=pranaygp.vscode-css-peek">CSS Peak</a></strong><br/>With this extension you can see and edit your CSS definitions from a related stylesheet directly from your HTML files.</td>
</tr>
<tr>
<td><img src="https://zignd.gallerycdn.vsassets.io/extensions/zignd/html-css-class-completion/1.19.0/1558208838135/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion">IntelliSense for CSS class names in HTML</a></strong><br/>This plugin gives you auto suggestions for CSS class names in your HTML templates.</td>
</tr>
<tr>
<td><img src="https://maxvanderschee.gallerycdn.vsassets.io/extensions/maxvanderschee/web-accessibility/0.2.82/1584101774211/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=MaxvanderSchee.web-accessibility">Web Accessibility</a></strong><br/>Using this plugin helps you to find accessibility violations in your markup and displays hints for <a href="https://www.w3.org/WAI/standards-guidelines/aria/">WAI-ARIA best practices</a>.</td>
</tr>
<tr>
<td><img src="https://stylelint.gallerycdn.vsassets.io/extensions/stylelint/vscode-stylelint/0.85.0/1597235740165/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint">stylelint</a></strong><br/>Lint CSS/SCSS/SASS/Less Style definitions</td>
</tr>
</tbody></table>
<!--
|![]()|**[]()**<br/>|
-->

<h3 id="angular">Angular</h3>
<table>
<thead>
<tr>
<th></th>
<th></th>
</tr>
</thead>
<tbody><tr>
<td><img src="https://angular.gallerycdn.vsassets.io/extensions/angular/ng-template/0.1000.7/1596155297383/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=obenjiro.arrr">Angular Language Service</a></strong><br/>When you are developing an <a href="https://angular.io">Angular</a> app, this extension is essential: It gives you quick info, autocompletion and diagnostic information.</td>
</tr>
<tr>
<td><img src="https://github.com/SanderLedegen/vscode-angular-follow-selector/raw/master/images/logo.png" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=sanderledegen.angular-follow-selector">Angular Follow Selector</a></strong><br/>This extensions allows you to click on <a href="https://angular.io">Angular</a> selectors in the template  and get redirected to their definition in the component.</td>
</tr>
</tbody></table>
<!--
|![]()|**[]()**<br/>|
-->

<h3 id="vuejs">Vue.js</h3>
<table>
<thead>
<tr>
<th></th>
<th></th>
</tr>
</thead>
<tbody><tr>
<td><img src="https://vue.gallerycdn.vsassets.io/extensions/vue/volar/0.38.8/1658057859813/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=Vue.volar">Volar</a></strong><br/>Volar gives you tooling for <a href="https://vuejs.org/">Vue3</a> development.</td>
</tr>
<tr>
<td><img src="https://octref.gallerycdn.vsassets.io/extensions/octref/vetur/0.26.1/1596770796928/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur">Vetur</a></strong><br/>Vetur gives you tooling for <a href="https://v2.vuejs.org/">Vue2</a> development.</td>
</tr>
<tr>
<td><img src="https://dariofuzinato.gallerycdn.vsassets.io/extensions/dariofuzinato/vue-peek/1.0.2/1503254564126/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=dariofuzinato.vue-peek">Vue Peak</a></strong><br/>This extension gives you <em>Go To Definition</em> and <em>Peek Definition</em> support for <a href="https://vuejs.org/">Vue</a> components.</td>
</tr>
</tbody></table>
<!--
|![]()|**[]()**<br/>|
-->

<h3 id="handlebars">Handlebars</h3>
<table>
<thead>
<tr>
<th></th>
<th></th>
</tr>
</thead>
<tbody><tr>
<td><img src="https://andrejunges.gallerycdn.vsassets.io/extensions/andrejunges/handlebars/0.4.1/1526248443531/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=andrejunges.Handlebars">Handlebars</a></strong><br/>This extension provides you with code snippets for <a href="https://handlebarsjs.com">Handlebars</a> files as well as with syntax highlighting.</td>
</tr>
<tr>
<td><img src="https://greenbyte.gallerycdn.vsassets.io/extensions/greenbyte/handlebars-preview/1.1.2/1597830971683/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=greenbyte.handlebars-preview">Handlebars Preview</a></strong><br/>With the Handlebars Preview extension you can put a JSON file right next to your Handlebars template and the plugin will inject the data into the template to display a preview of how it would look like.</td>
</tr>
</tbody></table>
<!--
|![]()|**[]()**<br/>|
-->


<h3 id="git">Git</h3>
<table>
<thead>
<tr>
<th></th>
<th></th>
</tr>
</thead>
<tbody><tr>
<td><img src="https://bee.gallerycdn.vsassets.io/extensions/bee/git-temporal-vscode/1.0.0/1581641807688/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=bee.git-temporal-vscode">Git Temporal</a></strong><br/>Git Temporal is a great plugin for interactively searching in your git history based on a timeline. You can even mark ranges on a timeline to see all the changes in between the chosen time range.</td>
</tr>
<tr>
<td><img src="https://eamodio.gallerycdn.vsassets.io/extensions/eamodio/gitlens/10.2.2/1591818157905/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens">GitLens</a></strong><br/>Show the authorship of code lines right next to them. This can help you a lot if you may not understand some part of the code: just check out who created it and ask for support.</td>
</tr>
</tbody></table>
<!--
|![]()|**[]()**<br/>|
-->

<h3 id="other">Other</h3>
<table>
<thead>
<tr>
<th></th>
<th></th>
</tr>
</thead>
<tbody><tr>
<td><img src="https://sygene.gallerycdn.vsassets.io/extensions/sygene/auto-correct/0.2.1/1582635101990/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=sygene.auto-correct">Auto Correct</a></strong><br/>You may be like me and there are some words you&#39;ll always spell wrong or you making the same typo all the time. One of my common mistakes is to write <code>seperate</code> instead of <code>separate</code>. With this plugin you can define such words or patterns that will be automatically replaced with the correctly spelled word.</td>
</tr>
<tr>
<td><img src="https://streetsidesoftware.gallerycdn.vsassets.io/extensions/streetsidesoftware/code-spell-checker/1.9.0/1589974448396/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker">Code Spell Checker</a></strong><br/>With this extension your code is checked for common typos and such unknown words will be highlighted as you may know it from Microsoft Word or other text editor software.</td>
</tr>
<tr>
<td><img src="https://mikestead.gallerycdn.vsassets.io/extensions/mikestead/dotenv/1.0.1/1519894859412/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv">DotENV</a></strong><br/>This extensions highlights the configuration in <code>.env</code> files</td>
</tr>
<tr>
<td><img src="https://grapecity.gallerycdn.vsassets.io/extensions/grapecity/gc-excelviewer/3.0.40/1597894261914/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=GrapeCity.gc-excelviewer">Excel Viewer</a></strong><br/>If you open and edit CSV or Excel files from VSCode, you will probably need this extension. This allows you to display the data in a formatted table that you can sort and filter.</td>
</tr>
<tr>
<td><img src="https://msjsdiag.gallerycdn.vsassets.io/extensions/msjsdiag/debugger-for-chrome/4.12.10/1597702740002/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome">Debugger for Chrome</a></strong><br/>This debugger extensions allows you to debug your JavaScript code in the Google Chrome browser from your code editor.</td>
</tr>
<tr>
<td><img src="https://ms-azuretools.gallerycdn.vsassets.io/extensions/ms-azuretools/vscode-docker/1.5.0/1597688601690/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker">Docker</a></strong><br/>The Docker extension easily lets you create, manage, and debug your applications containerized with Docker. It also gives you IntelliSense for your related Docker configuration files.</td>
</tr>
<tr>
<td><img src="https://editorconfig.gallerycdn.vsassets.io/extensions/editorconfig/editorconfig/0.15.1/1590371230963/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig">EditorConfig</a></strong><br/>This plugin will check your workspace for an <a href="https://editorconfig.org">EditorConfig</a> configuration file and applies these settings to your workspace.</td>
</tr>
<tr>
<td><img src="https://ritwickdey.gallerycdn.vsassets.io/extensions/ritwickdey/liveserver/5.6.1/1555497731217/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer">Live Server</a></strong><br/>With the Live Server extension you can open an HTML file in the browser and the server watches for changes and refreshes the Browser preview.</td>
</tr>
<tr>
<td><img src="https://nrwl.gallerycdn.vsassets.io/extensions/nrwl/angular-console/13.0.0/1595622774663/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console">Nx Console</a></strong><br/>This plugin gives you a UI for <a href="https://nx.dev">Nx Monorepos</a> and the Nx CLI.</td>
</tr>
<tr>
<td><img src="https://christian-kohler.gallerycdn.vsassets.io/extensions/christian-kohler/path-intellisense/2.2.1/1591957111022/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense">Path Intellisense</a></strong><br/>This plugin brings you autocompletion for filenames.</td>
</tr>
<tr>
<td><img src="https://pnp.gallerycdn.vsassets.io/extensions/pnp/polacode/0.3.4/1569601471865/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=pnp.polacode">Polacode</a></strong><br/>With Polacode you can mark code lines and create screenshots from the selection. This is great for e.g. presentations or sharing stuff on Twitter.</td>
</tr>
<tr>
<td><img src="https://esbenp.gallerycdn.vsassets.io/extensions/esbenp/prettier-vscode/5.2.1/1598366482789/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode">Prettier</a></strong><br/><a href="https://prettier.io">Prettier</a> is – in my opinion – the best code formatter especially when working with JavaScript / TypeScript. The extension for Prettier will allow you to set up Prettier as default formatter for VSCode or just for specific programming languages.<br><pre><code>{<br>  "editor.defaultFormatter": "esbenp.prettier-vscode",</br>  "[javascript]": {<br/>    "editor.defaultFormatter": "esbenp.prettier-vscode"<br/>  }<br/>}</code></pre></td>
</tr>
<tr>
<td><img src="https://louiswt.gallerycdn.vsassets.io/extensions/louiswt/regexp-preview/0.1.5/1583773383502/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=louiswt.regexp-preview&WT.mc_id=devcloud-00000-cxa">Regexp Explain</a></strong><br/> Running this extension will let you explore regular expressions visually in a realtime preivew editor</td>
</tr>
<tr>
<td><img src="https://knisterpeter.gallerycdn.vsassets.io/extensions/knisterpeter/vscode-commitizen/0.9.3/1595315799607/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=KnisterPeter.vscode-commitizen">Visual Studio Code Commitizen Support</a></strong><br/>This plugin adds a command panel for creating <a href="https://www.conventionalcommits.org">Conventional Commits</a> with support.</td>
</tr>
<tr>
<td><img src="https://henrynguyen5-vsc.gallerycdn.vsassets.io/extensions/henrynguyen5-vsc/vsc-nvm/0.0.3/1549657966675/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=henrynguyen5-vsc.vsc-nvm">vsc-nvm</a></strong><br/>Automatically use the right Node.js version form the NVM.</td>
</tr>
<tr>
<td><img src="https://redhat.gallerycdn.vsassets.io/extensions/redhat/vscode-yaml/0.10.0/1597935539888/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml">YAML</a></strong><br/>This extension gives you a comprehensive YAML language support.</td>
</tr>
<tr>
<td><img src="https://zeplin.gallerycdn.vsassets.io/extensions/zeplin/zeplin/2.1.0/1592227616388/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=zeplin.zeplin">Zeplin</a></strong><br/>If you work with <a href="https://zeplin.io">Zeplin</a>, this official plugin provides you with quick access to your designs.</td>
</tr>
<tr>
<td><img src="https://anweber.gallerycdn.vsassets.io/extensions/anweber/vscode-httpyac/5.5.6/1657738649459/Microsoft.VisualStudio.Services.Icons.Default" alt=""></td>
<td><strong><a href="https://marketplace.visualstudio.com/items?itemName=anweber.vscode-httpyac">httpYac</a></strong><br/>This is a very powerful tool to place directly executable API call snippets next to your code. You can even use environment variables for dynamic replacement of part of URLs, headers oder the body of an HTTP call.</td>
</tr>
</tbody></table>
<!--
|![]()|**[]()**<br/>|
-->

<h2 id="google-chrome-extensions">Google Chrome Extensions</h2>
<p>Google Chrome is great and it already brings a lot of possibilities that help developers to improve their web apps.
However, there are some really great plugins I am using that I can recommend:</p><table>
<thead>
<tr>
<th></th>
<th></th>
</tr>
</thead>
<tbody><tr>
<td><img src="https://lh3.googleusercontent.com/My9ZJOQeBDEqm2Snb3zQCspE4neCdXNuv6dYuZ9z1DN6T2P52Df7jBNLYA2SKxqN4e6M_V33KESTGknFXcYEXWzJ=w128-h128-e365-rj-sc0x00ffffff" alt=""></td>
<td><strong><a href="https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh">Angular DevTools</a></strong><br/>A must have addon for all Angular Developers that will help you profile and debug and optimize your Angular app.</td>
</tr>
<tr>
<td><img src="https://lh3.googleusercontent.com/frsBSB812N3lty03SJsVY6zR1Y6uqYKb4vISAjRJ8LR2pNpYYmY5iHLBUpctVd29tjEEGPcU0_-RhQSUI3Ru2sGb8Q=w128-h128-e365-rj-sc0x00ffffff" alt=""></td>
<td><strong><a href="https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg">Vue.js DevTools</a></strong><br/>This extension helps you to profile, debug and optimize your Vue app.</td>
</tr>
<tr>
<td><img src="https://lh3.googleusercontent.com/nJRS4ToYWi4cJ_cSgT884h1Ixv0bYD4MWYq3aAa85JY8OKgluXgN7zYd_hbLTNKW8zPfonC9Ig=w128-h128-e365" alt=""></td>
<td><strong><a href="https://chrome.google.com/webstore/detail/aqua-buddy/kidoeajcechhpbhmbeligfiakhhlchom">Aqua Buddy</a></strong><br/>Stay hydrated by using Aqua Buddy! It will notify you to drink some water frequently.</td>
</tr>
<tr>
<td><img src="https://lh3.googleusercontent.com/CzEnlG42oD6E_kIGkLujYfQnz43jx8ml2ezY-rFloQgNDPiB0PRJsLWwn6N4LJZsdpEAHlebDQ=w128-h128-e365" alt=""></td>
<td><strong><a href="https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd">Axe</a></strong><br/>Axe helps you to improve the grade of accessibility of your site.</td>
</tr>
<tr>
<td><img src="https://lh3.googleusercontent.com/8BLPoOrRiXqc_lxLjwjsaqwp3LwfW-1XDf1BmWUVDe5DfqgopAbgKVhZqnfz1IVmMIjHy_u1=w128-h128-e365" alt=""></td>
<td><strong><a href="https://chrome.google.com/webstore/detail/chrome-capture-screenshot/ggaabchcecdbomdcnbahdfddfikjmphe?hl=en">Chrome Capture</a></strong><br/>This extension lets you record and share screenshots, videos and GIFs from a website.</td>
</tr>
<tr>
<td><img src="https://lh3.googleusercontent.com/fSH1EIpxkNfV3-37vG0lVuCuDCMIhRRQS88LRVA6NzazUdB5F7447__B8gEuxp3uH0ecKSCAs7fzpDcLNdCO0DlQ=w128-h128-e365-rj-sc0x00ffffff" alt=""></td>
<td><strong><a href="https://chrome.google.com/webstore/detail/chrome-regex-search/bpelaihoicobbkgmhcbikncnpacdbknn">Chrome Regex Search</a></strong><br/>Ever wanted to search on a site for more complex expressions? With this extension you can search a sites content by entering regular expressions.</td>
</tr>
<tr>
<td><img src="https://lh3.googleusercontent.com/xk2lp5Tkh-hN1SNWxb1lsxyitzwrpsmzdruqEcuymQIq-9DOhMlhkNz14MSJoWvu0jNnCfRX_SZEvpBwtIY5k8jNDQ=w128-h128-e365-rj-sc0x00ffffff" alt=""></td>
<td><strong><a href="https://chrome.google.com/webstore/detail/export-selective-bookmark/ahgbiciilcpclcekhegbhofljoolnfei">Export Selective Bookmarks</a></strong><br/>This extensions lets you select specific directories and bookmarks from all your bookmarks to export them. Perfect if you want to help colleagues to onboard in your team or project.</td>
</tr>
<tr>
<td><img src="https://lh3.googleusercontent.com/u_2WHT7oINbcGWWN0MRxogjDHAPYB9Izk_MUdcF0yukvabP9uEeIGJaFpg2Ac9vv5mrm7A5ZVw=w128-h128-e365" alt=""></td>
<td><strong><a href="https://chrome.google.com/webstore/detail/json-viewer-awesome/iemadiahhbebdklepanmkjenfdebfpfe">JSON Viewer Awesome</a></strong><br/>This extension will automatically detect and format JSON files once you open them by calling the URL.</td>
</tr>
<tr>
<td><img src="https://lh3.googleusercontent.com/_6Y4tjYdppsZJlWOnAzFy2A8JjGwJpQOvoKocTYMfl66bTJg20mJ6pojdQaUGtvXa9HYurDChQ=w128-h128-e365" alt=""></td>
<td><strong><a href="https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk">Lighthouse</a></strong><br/>Lighthouse analyzes your site for performance, accessibility and other common things and gives you a site score as well as some useful information how to improve your site.</td>
</tr>
<tr>
<td><img src="https://lh3.googleusercontent.com/JsB6yUqV6WbFREmfjpdIY6ctrf3IKZfdhWa1BbHiD0MwHvilHzJJdM5TGycosq8_rEdf3FFYXA=w128-h128-e365" alt=""></td>
<td><strong><a href="https://chrome.google.com/webstore/detail/pesticide-for-chrome/bblbgcheenepgnnajgfpiicnbbdmmooh">Pesticide</a></strong><br/>Activating these extension lets you outline all elements on a site so that you can easier analyze paddings, margins and borders.</td>
</tr>
<tr>
<td><img src="https://lh3.googleusercontent.com/ZccCYQft-IxBg8e8B2FsZTPXyu9kYaTKGX4vxVoTVztguJVsrhTlJo_qVd1H1tesz03BxwMdYg=w128-h128-e365" alt=""></td>
<td><strong><a href="https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm">Web Developer</a></strong><br/>With this extension you will get a toolbox for website manipulation and testing tools. You can e.g. easily disable JavaScript or styles to see how your site behaves.</td>
</tr>
</tbody></table>
<!--
|![]()|**[]()**<br/>|
-->


<h2 id="scripts-and-other-tools">Scripts and other tools</h2>
<h3 id="dotfiles">Dotfiles</h3>
<p>Personally, I like to keep my Mac up-to-date and therefore I will install most of my software via the <a href="https://brew.sh">Homebrew</a> package manager.
Also, to be more efficient I use the <a href="https://github.com/ohmyzsh/ohmyzsh"><code>oh-my-zsh</code></a> framework for managing my shell configuration.
Most of my configurations is also published in my GitHub repository called <a href="https://github.com/d-koppenhagen/.dotfiles"><code>.dotfiles</code></a>.</p><h3 id="exclude-all-node_modules-from-timemachine-backups-macos-only">Exclude all <code>node_modules</code> from TimeMachine backups (macOS only)</h3>
<p>One thing I learned during my career is: <strong>backup, backup, backup</strong>.
It&#39;s better to have one more backup than data loss.
Fortunately, on a macOS system it&#39;s possible to set up Apple&#39;s TimeMachine for creating continuous system backups.
However, backing up everything takes a lot of time and there are things you don&#39;t need to back up like directories syncing with a cloud provider like Dropbox, Sharepoint, etc.
Those directories can easily be <a href="https://osxdaily.com/2012/01/27/exclude-folders-from-time-machine-backups/">excluded from the TimeMachine backup by configuration</a>.
This will keep the backups smaller and also in case of a restore, the system ready to use after a much shorter time.
But what about <code>node_modules</code> directories?
For sure: You can exclude them in the same way, but this is very sophisticated and you always need to remember this step once you create a new project.
Therefore, I am using a simple script.
It looks for all <code>node_modules</code> directories in my development directory (<code>~/dev</code> in my case) and excludes them from the backup:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D">#!/bin/bash</span></span>
<span class="line"><span style="color:#6A737D"># exclude all \`node_modules\` folders within the dev directory</span></span>
<span class="line"><span style="color:#B392F0">find</span><span style="color:#9ECBFF"> "</span><span style="color:#E1E4E8">$HOME</span><span style="color:#9ECBFF">/dev"</span><span style="color:#79B8FF"> -name</span><span style="color:#9ECBFF"> 'node_modules'</span><span style="color:#79B8FF"> -prune</span><span style="color:#79B8FF"> -type</span><span style="color:#9ECBFF"> d</span><span style="color:#79B8FF"> -exec</span><span style="color:#9ECBFF"> tmutil</span><span style="color:#9ECBFF"> addexclusion</span><span style="color:#9ECBFF"> {}</span><span style="color:#79B8FF"> \\;</span><span style="color:#79B8FF"> -exec</span><span style="color:#9ECBFF"> tmutil</span><span style="color:#9ECBFF"> isexcluded</span><span style="color:#9ECBFF"> {}</span><span style="color:#79B8FF"> \\;</span></span>
<span class="line"><span style="color:#79B8FF">echo</span><span style="color:#9ECBFF"> "Done. The excluded files won't be part of a time machine backup anymore."</span></span></code></pre>
<p>To be sure the script updates the list of excluded directories frequently, I added a cronjob:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">crontab</span><span style="color:#79B8FF"> -e</span></span></code></pre>
<p>The actual cronjob config is the following:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">0</span><span style="color:#79B8FF"> 12</span><span style="color:#79B8FF"> *</span><span style="color:#79B8FF"> *</span><span style="color:#79B8FF"> *</span><span style="color:#9ECBFF">  cd</span><span style="color:#E1E4E8"> $HOME</span><span style="color:#9ECBFF">/dev/.dotfiles</span><span style="color:#E1E4E8"> &#x26;&#x26; </span><span style="color:#B392F0">./time-machine-excludes.sh</span><span style="color:#6A737D"> # every day at 12:00</span></span></code></pre>
<h2 id="feedback">Feedback</h2>
<p>Now as you know my dev setup, it&#39;s your turn! Is there any great tool or plugin you can recommend?
Then just contact me via <a href="mailto:mail@k9n.dev">E-Mail</a> or <a href="https://bsky.app/profile/k9n.dev">Bluesky</a> and let me know!</p><p><strong>Thank you</strong></p><p>Special thanks goes to <a href="https://twitter.com/fmalcher01">Ferdinand Malcher</a> for revising this article.</p><hr>

<p><span>Photo by <a href="https://unsplash.com/@toddquackenbush">Todd Quackenbush</a> on <a href="https://unsplash.com/">Unsplash</a></span></p>`;export{e as default};
