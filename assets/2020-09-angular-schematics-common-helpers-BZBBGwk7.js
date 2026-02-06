const s=`---
title: 'Speed up your Angular schematics development with useful helper functions'
description: 'Angular CLI schematics offer us a way to add, scaffold and update app-related files and modules. In this article I will guide you through some common but currently undocumented helper functions you can use to achieve your goal.'
published: true
author:
  name: 'Danny Koppenhagen'
  mail: mail@k9n.dev
created: 2020-09-14
updated: 2021-05-19
publishedAt:
  name: inDepth.dev
  url: https://indepth.dev/speed-up-your-angular-schematics-development-with-useful-helper-functions
  logo: images/InDepthdev-white.svg
keywords:
  - Angular
  - 'Angular CLI'
  - Schematics
language: en
thumbnail:
  header: images/blog/schematics-helpers/schematics-helpers.jpg
  card: images/blog/schematics-helpers/schematics-helpers-small.jpg
linked:
  devTo: https://dev.to/dkoppenhagen/speed-up-your-angular-schematics-development-with-useful-helper-functions-1kb2
---

<p>Angular CLI schematics offer us a way to add, scaffold and update app-related files and modules. However, there are some common things we will probably want integrate in our schematics: updating your <code>package.json</code> file, adding or removing an Angular module or updating component imports.</p><p>Currently, the way of authoring an Angular Schematic is documented <a href="https://angular.io/guide/schematics-authoring">on angular.io</a>.
However, there is one big thing missing there: the way of integrating typical and repeating tasks.
The Angular CLI itself uses schematics for e.g. generating modules and components, adding imports or modifying the <code>package.json</code> file.
Under the hood each of the schematics uses some very common utils which are not yet documented but available for all developers anyway.
In the past, I&#39;ve seen some Angular CLI Schematic projects where people were trying to implement almost the same common util methods on their own.
However, since some of these are already implemented in the Angular CLI, I want to show you some of those typical helpers that you can use for you Angular CLI Schematic project to prevent any pitfalls.</p><h2 id="️-attention-not-officially-supported">⚠️ Attention: not officially supported</h2>
<p>The helper functions I present you in this article are neither documented nor officially supported, and they may change in the future.
<a href="https://twitter.com/AlanAgius4">Alan Agius</a>, member of the Angular CLI core team replied in a <a href="https://github.com/angular/angular-cli/issues/15335#issuecomment-660609283">related issue (#15335)</a> for creating a public schematics API reference:</p><blockquote>
<p>[...] those utils are not considered as part of the public API and might break without warning in any release.</p></blockquote>
<p>So, there are plans to provide some utilities via a public API but this is still in the planning stage.
While things evolve, it&#39;s my intention to keep this article as up-to-date as possible.</p><blockquote>
<p>The following Angular CLI schematics util functions are based on the Angular CLI version <code>12.0.0</code>.</p></blockquote>
<p>If you use these functions and they will break in the future, you can check out the <a href="https://github.com/angular/angular-cli/tree/master/packages/schematics/angular/utility">source code changes</a> for the utility functions and adjust your code.</p><h2 id="-examples-and-playground-on-github">🕹 Examples and playground on GitHub</h2>
<p>To follow and try out the examples I present you in this article, I <a href="https://github.com/d-koppenhagen/schematics-helpers-playground">prepared a playground repository on GitHub</a>.
Clone this repo and check out the <code>README.md</code> inside to get started with the playground. 🚀</p><h2 id="create-an-angular-schematics-example-project">Create an Angular schematics example project</h2>
<p>First things first: We need a project where we can try things out.
You can either use an existing schematics project or simply create a new blank one:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">npx</span><span style="color:#9ECBFF"> @angular-devkit/schematics-cli</span><span style="color:#9ECBFF"> blank</span><span style="color:#79B8FF"> --name=playground</span></span></code></pre>
<blockquote>
<p>If you are not familar with the basics of authoring schematics, I recommend you to read the <a href="https://angular.io/guide/schematics-authoring">Angular Docs</a> and the <a href="https://medium.com/@tomastrajan/total-guide-to-custom-angular-schematics-5c50cf90cdb4">blog post <em>&quot;Total Guide To Custom Angular schematics&quot;</em> by Tomas Trajan</a> first as well as the <a href="https://indepth.dev/angular-schematics-from-0-to-publishing-your-own-library-i">article series &quot;Angular Schematics from 0 to publishing your own library&quot; by Natalia Venditto</a> first.</p></blockquote>
<p>After setting up the new blank project we should have this file available: <code>src/playground/index.ts</code>.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { Rule, SchematicContext, Tree } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular-devkit/schematics'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> function</span><span style="color:#B392F0"> playground</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">_options</span><span style="color:#F97583">:</span><span style="color:#79B8FF"> any</span><span style="color:#E1E4E8">)</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Rule</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">  return</span><span style="color:#E1E4E8"> (</span><span style="color:#FFAB70">tree</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Tree</span><span style="color:#E1E4E8">, </span><span style="color:#FFAB70">_context</span><span style="color:#F97583">:</span><span style="color:#B392F0"> SchematicContext</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#E1E4E8">    console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">'schematic works'</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#F97583">    return</span><span style="color:#E1E4E8"> tree;</span></span>
<span class="line"><span style="color:#E1E4E8">  };</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>This is the base for the following examples and explanations.
Please make sure that you can execute the blank schematic by calling it on the console:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">npx</span><span style="color:#9ECBFF"> @angular-devkit/schematics-cli</span><span style="color:#9ECBFF"> .:playground</span></span></code></pre>
<p>or if you installed the schematics CLI globally via <code>npm i @angular-devkit/schematics-cli</code>:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">schematics</span><span style="color:#9ECBFF"> .:playground</span></span></code></pre>
<p>The <code>.</code> refers to the current directory where our schematics project lives.</p><p><a href="https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/playground">Check out the basic example in the playground repository on GitHub</a></p><h3 id="basic-types">Basic types</h3>
<p>In case you are not familiar with the structure of schematics, I will just explain some very basic things shortly:</p><ul>
<li>A <strong><code>Tree</code></strong> is the structured virtual representation of every file in the workspace which we apply the schematic to.</li>
<li>A <strong><code>Rule</code></strong> is called with a <code>Tree</code> and a <code>SchematicContext</code>. The <code>Rule</code> is supposed to make changes on the <code>Tree</code> and returns the adjusted <code>Tree</code>.</li>
<li>The <strong><code>SchematicContext</code></strong> contains information necessary for the schematics to execute some rules.</li>
</ul>
<h3 id="install-the-helpers-from-schematicsangular">Install the helpers from <code>@schematics/angular</code></h3>
<p>A second thing we need to do is to install the package <code>@schematics/angular</code> which contains all the utils we need for the next steps.
This package contains all the schematics the Angular CLI uses by itself when running commands like <code>ng generate</code> or <code>ng new</code> etc.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">npm</span><span style="color:#9ECBFF"> i</span><span style="color:#79B8FF"> --save</span><span style="color:#9ECBFF"> @schematics/angular</span></span></code></pre>
<h2 id="changing-the-packagejson-get-add-and-remove-dev--peer--dependencies">Changing the <code>package.json</code>: Get, Add and Remove (dev-, peer-) dependencies</h2>
<p>A very common thing when authoring a schematic is adding a dependency to the <code>package.json</code> file.
Of course, we can implement a function that parses and writes to/from our JSON file.
But why should we solve a problem that&#39;s already solved?</p><p>For this, we can use the functions provided by <code>@schematics/angular/utility/dependencies</code> to handle dependency operations.
The function <code>addPackageJsonDependency()</code> allows us to add a dependency object of type <code>NodeDependency</code> to the <code>package.json</code> file.
The property <code>type</code> must contain a value of the <code>NodeDependencyType</code> enum.
Its values represent the different sections of a <code>package.json</code> file:</p><ul>
<li><code>dependencies</code>,</li>
<li><code>devDependencies</code>,</li>
<li><code>peerDependencies</code> and</li>
<li><code>optionalDependencies</code>.</li>
</ul>
<p>The first parameter to this util function is the <code>Tree</code> with all its files.
The function will not just append the dependency to the appropriate section, it will also insert the dependency at the right position, so that the dependencies list is ordered ascending by its keys.</p><p>We can use the <code>getPackageJsonDependency()</code> function to request the dependency configuration as a <code>NodeDependency</code> object.
The good thing here is: We don&#39;t need to know in which of the sections a dependency is located. It will look up the dependency in sections of the <code>package.json</code> file: <code>dependencies</code>, <code>devDependencies</code>, <code>peerDependencies</code> and <code>optionalDependencies</code>.</p><p>The third function I want to show is <code>removePackageJsonDependency()</code>.
Just like <code>getPackageJsonDependency()</code>, it can be called with a <code>Tree</code> and the package name and it will remove this dependency from the <code>package.json</code> file.</p><p>By default, all these functions will use the <code>package.json</code> file in the root of the tree, but we can pass a third parameter containing a specific path to another <code>package.json</code> file.</p><p>Last but not least we don&#39;t want our users to manually run <code>npm install</code> on the console after adding dependencies.
Therefore, we can add a new <code>NodePackageInstallTask</code> via the <code>addTask</code> method on our <code>context</code>.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { Rule, SchematicContext, Tree } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular-devkit/schematics'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { NodePackageInstallTask } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular-devkit/schematics/tasks'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#E1E4E8">  NodeDependency,</span></span>
<span class="line"><span style="color:#E1E4E8">  NodeDependencyType,</span></span>
<span class="line"><span style="color:#E1E4E8">  getPackageJsonDependency,</span></span>
<span class="line"><span style="color:#E1E4E8">  addPackageJsonDependency,</span></span>
<span class="line"><span style="color:#E1E4E8">  removePackageJsonDependency,</span></span>
<span class="line"><span style="color:#E1E4E8">} </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@schematics/angular/utility/dependencies'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> function</span><span style="color:#B392F0"> playground</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">_options</span><span style="color:#F97583">:</span><span style="color:#79B8FF"> any</span><span style="color:#E1E4E8">)</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Rule</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">  return</span><span style="color:#E1E4E8"> (</span><span style="color:#FFAB70">tree</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Tree</span><span style="color:#E1E4E8">, </span><span style="color:#FFAB70">context</span><span style="color:#F97583">:</span><span style="color:#B392F0"> SchematicContext</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> dep</span><span style="color:#F97583">:</span><span style="color:#B392F0"> NodeDependency</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#E1E4E8">      type: NodeDependencyType.Dev,</span></span>
<span class="line"><span style="color:#E1E4E8">      name: </span><span style="color:#9ECBFF">'moment'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">      version: </span><span style="color:#9ECBFF">'~2.27.0'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">      overwrite: </span><span style="color:#79B8FF">true</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0">    addPackageJsonDependency</span><span style="color:#E1E4E8">(tree, dep);</span></span>
<span class="line"><span style="color:#E1E4E8">    console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(</span><span style="color:#B392F0">getPackageJsonDependency</span><span style="color:#E1E4E8">(tree, </span><span style="color:#9ECBFF">'moment'</span><span style="color:#E1E4E8">))</span></span>
<span class="line"><span style="color:#6A737D">    // { type: 'devDependencies', name: 'moment', version: '~2.27.0' }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0">    removePackageJsonDependency</span><span style="color:#E1E4E8">(tree, </span><span style="color:#9ECBFF">'protractor'</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#E1E4E8">    console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(</span><span style="color:#B392F0">getPackageJsonDependency</span><span style="color:#E1E4E8">(tree, </span><span style="color:#9ECBFF">'protractor'</span><span style="color:#E1E4E8">))</span></span>
<span class="line"><span style="color:#6A737D">    // null</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">    context.</span><span style="color:#B392F0">addTask</span><span style="color:#E1E4E8">(</span><span style="color:#F97583">new</span><span style="color:#B392F0"> NodePackageInstallTask</span><span style="color:#E1E4E8">(), []);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">    return</span><span style="color:#E1E4E8"> tree;</span></span>
<span class="line"><span style="color:#E1E4E8">  };</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>To really check that the <code>NodePackageInstallTask</code> is properly executed, you need to disable the schematics debug mode that&#39;s enabled by default during development and local execution:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">schematics</span><span style="color:#9ECBFF"> .:playground</span><span style="color:#79B8FF"> --debug=false</span></span></code></pre>
<ul>
<li><a href="https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/dependencies.ts">Check out the implementation of the dependency operations in detail.</a></li>
<li><a href="https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/dependencies">Check out the examples in the playground repository on GitHub</a></li>
</ul>
<h2 id="add-content-on-a-specific-position">Add content on a specific position</h2>
<p>Sometimes we need to change some contents of a file.
Independently of the type of a file, we can use the <code>InsertChange</code> class.
This class returns a change object which contains the content to be added and the position where the change is being inserted.</p><p>In the following example we will create a new file called <code>my-file.extension</code> with the content <code>const a = 'foo';</code> inside the virtual tree.
First, we will instantiate a new <code>InsertChange</code> with the file path, the position where we want to add the change and finally the content we want to add.
The next step for us is to start the update process for the file using the <code>beginUpdate()</code> method on our tree.
This method returns an object of type <code>UpdateRecorder</code>.
We can now use the <code>insertLeft()</code> method and hand over the position and the content (<code>toAdd</code>) from the <code>InsertChange</code>.
The change is now marked but not proceeded yet.
To really update the file&#39;s content we need to call the <code>commitUpdate()</code> method on our tree with the <code>exportRecorder</code>.
When we now call <code>tree.get(filePath)</code> we can log the file&#39;s content and see that the change has been proceeded.
To delete a file inside the virtual tree, we can use the <code>delete()</code> method with the file path on the tree.</p><p>Let&#39;s have a look at an implementation example:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { Rule, SchematicContext, Tree } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular-devkit/schematics/'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { InsertChange } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@schematics/angular/utility/change'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> function</span><span style="color:#B392F0"> playground</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">_options</span><span style="color:#F97583">:</span><span style="color:#79B8FF"> any</span><span style="color:#E1E4E8">)</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Rule</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">  return</span><span style="color:#E1E4E8"> (</span><span style="color:#FFAB70">tree</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Tree</span><span style="color:#E1E4E8">, </span><span style="color:#FFAB70">_context</span><span style="color:#F97583">:</span><span style="color:#B392F0"> SchematicContext</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> filePath</span><span style="color:#F97583"> =</span><span style="color:#9ECBFF"> 'my-file.extension'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#E1E4E8">    tree.</span><span style="color:#B392F0">create</span><span style="color:#E1E4E8">(filePath, </span><span style="color:#9ECBFF">\`const a = 'foo';\`</span><span style="color:#E1E4E8">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D">    // insert a new change</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> insertChange</span><span style="color:#F97583"> =</span><span style="color:#F97583"> new</span><span style="color:#B392F0"> InsertChange</span><span style="color:#E1E4E8">(filePath, </span><span style="color:#79B8FF">16</span><span style="color:#E1E4E8">, </span><span style="color:#9ECBFF">'</span><span style="color:#79B8FF">\\n</span><span style="color:#9ECBFF">const b = </span><span style="color:#79B8FF">\\'</span><span style="color:#9ECBFF">bar</span><span style="color:#79B8FF">\\'</span><span style="color:#9ECBFF">;'</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> exportRecorder</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> tree.</span><span style="color:#B392F0">beginUpdate</span><span style="color:#E1E4E8">(filePath);</span></span>
<span class="line"><span style="color:#E1E4E8">    exportRecorder.</span><span style="color:#B392F0">insertLeft</span><span style="color:#E1E4E8">(insertChange.pos, insertChange.toAdd);</span></span>
<span class="line"><span style="color:#E1E4E8">    tree.</span><span style="color:#B392F0">commitUpdate</span><span style="color:#E1E4E8">(exportRecorder);</span></span>
<span class="line"><span style="color:#E1E4E8">    console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(tree.</span><span style="color:#B392F0">get</span><span style="color:#E1E4E8">(filePath)?.content.</span><span style="color:#B392F0">toString</span><span style="color:#E1E4E8">())</span></span>
<span class="line"><span style="color:#6A737D">    // const a = 'foo';</span></span>
<span class="line"><span style="color:#6A737D">    // const b = 'bar';</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">    tree.</span><span style="color:#B392F0">delete</span><span style="color:#E1E4E8">(filePath); </span><span style="color:#6A737D">// cleanup (if not running schematic in debug mode)</span></span>
<span class="line"><span style="color:#F97583">    return</span><span style="color:#E1E4E8"> tree;</span></span>
<span class="line"><span style="color:#E1E4E8">  };</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<ul>
<li><a href="https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/change.ts">Check out the implementation for <code>InsertChange</code> in detail.</a></li>
<li><a href="https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/insert">Check out the example in the playground repository on GitHub</a></li>
</ul>
<h2 id="determine-relative-path-to-the-project-root">Determine relative path to the project root</h2>
<p>You might want to determine the relative path to your project root e.g. for using it in a template you want to apply in some location of your application.
To determine the correct relative import path string for the target, you can use the helper function <code>relativePathToWorkspaceRoot()</code>.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#E1E4E8">  Rule,</span></span>
<span class="line"><span style="color:#E1E4E8">  SchematicContext,</span></span>
<span class="line"><span style="color:#E1E4E8">  Tree,</span></span>
<span class="line"><span style="color:#E1E4E8">  url,</span></span>
<span class="line"><span style="color:#E1E4E8">  apply,</span></span>
<span class="line"><span style="color:#E1E4E8">  template,</span></span>
<span class="line"><span style="color:#E1E4E8">  mergeWith</span></span>
<span class="line"><span style="color:#E1E4E8">} </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular-devkit/schematics/'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { relativePathToWorkspaceRoot } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@schematics/angular/utility/paths'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> function</span><span style="color:#B392F0"> playground</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">_options</span><span style="color:#F97583">:</span><span style="color:#79B8FF"> any</span><span style="color:#E1E4E8">)</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Rule</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">  return</span><span style="color:#E1E4E8"> (</span><span style="color:#FFAB70">_tree</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Tree</span><span style="color:#E1E4E8">, </span><span style="color:#FFAB70">_context</span><span style="color:#F97583">:</span><span style="color:#B392F0"> SchematicContext</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> nonRootPathDefinition</span><span style="color:#F97583"> =</span><span style="color:#9ECBFF"> 'foo/bar/'</span><span style="color:#E1E4E8">; </span><span style="color:#6A737D">// "./foo/bar" | "foo/bar/" work also</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> rootPathDefinition</span><span style="color:#F97583"> =</span><span style="color:#9ECBFF"> ''</span><span style="color:#E1E4E8">; </span><span style="color:#6A737D">// "." | "./" work also</span></span>
<span class="line"><span style="color:#E1E4E8">    console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(</span><span style="color:#B392F0">relativePathToWorkspaceRoot</span><span style="color:#E1E4E8">(nonRootPathDefinition));</span></span>
<span class="line"><span style="color:#6A737D">    // "../.."</span></span>
<span class="line"><span style="color:#E1E4E8">    console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(</span><span style="color:#B392F0">relativePathToWorkspaceRoot</span><span style="color:#E1E4E8">(rootPathDefinition));</span></span>
<span class="line"><span style="color:#6A737D">    // "."</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> sourceTemplates</span><span style="color:#F97583"> =</span><span style="color:#B392F0"> url</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">'./files'</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#F97583">    return</span><span style="color:#B392F0"> mergeWith</span><span style="color:#E1E4E8">(</span></span>
<span class="line"><span style="color:#B392F0">      apply</span><span style="color:#E1E4E8">(</span></span>
<span class="line"><span style="color:#E1E4E8">        sourceTemplates, [</span></span>
<span class="line"><span style="color:#B392F0">          template</span><span style="color:#E1E4E8">({</span></span>
<span class="line"><span style="color:#E1E4E8">            relativePathToWorkspaceRoot: </span><span style="color:#B392F0">relativePathToWorkspaceRoot</span><span style="color:#E1E4E8">(nonRootPathDefinition),</span></span>
<span class="line"><span style="color:#E1E4E8">          }),</span></span>
<span class="line"><span style="color:#E1E4E8">        ]</span></span>
<span class="line"><span style="color:#E1E4E8">      )</span></span>
<span class="line"><span style="color:#E1E4E8">    );</span></span>
<span class="line"><span style="color:#E1E4E8">  };</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>If you have e.g. a JSON file template in the directory <code>files</code> and you want to insert the path, you can use the helper function in the template as follows:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">{</span></span>
<span class="line"><span style="color:#79B8FF">  "foo"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"&#x3C;%= relativePathToWorkspaceRoot %>/my-file-ref.json"</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>For more details about how to use and apply templates in your own schematics, check out the <a href="https://medium.com/@tomastrajan/total-guide-to-custom-angular-schematics-5c50cf90cdb4">blog post by Tomas Trajan: <em>&quot;Total Guide To Custom Angular schematics&quot;</em></a> and the <a href="https://indepth.dev/angular-schematics-from-0-to-publishing-your-own-library-i">article series <em>&quot;Angular Schematics from 0 to publishing your own library&quot;</em> by Natalia Venditto</a>.</p><ul>
<li><a href="https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/paths.ts">Check out the implementation for <code>relativePathToWorkspaceRoot()</code> in detail.</a></li>
<li><a href="https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/relative-path">Check out the example in the playground repository on GitHub</a></li>
</ul>
<h2 id="add-typescript-imports">Add TypeScript imports</h2>
<p>In the previous section we learned how to add content to some file.
However, this way for changing a file isn&#39;t the best and only works well when we know the exact position where to add some content.
Now imagine a user changes the format of the file before: This would lead to problems with finding the correct file position.</p><p>In many cases we want to modify TypeScript files and insert code into them.
And indeed there are also lots of utils that will help us to manage such operations.</p><p>Imagine you want the schematic to import the class <code>Bar</code> in a specific file from the file <code>bar.ts</code>;
You could simply add the whole import line but there are edge cases:
What if the target file already contains an import or even a default import from <code>bar.ts</code>.
In that case we would have multiple import lines for <code>bar.ts</code> which causes problems.</p><p>Luckily there is another great helper that takes care of adding imports or updating existing ones.
The function <code>insertImport()</code> needs the source file to update and the path to the file followed by the import name and the file path for the import to be added.
The last parameter is optional – if set to <code>true</code>, the import will be added as a default import.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#79B8FF"> *</span><span style="color:#F97583"> as</span><span style="color:#E1E4E8"> ts </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> 'typescript'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { Rule, SchematicContext, Tree } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular-devkit/schematics/'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { insertImport } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@schematics/angular/utility/ast-utils'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { InsertChange } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@schematics/angular/utility/change'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> function</span><span style="color:#B392F0"> playground</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">_options</span><span style="color:#F97583">:</span><span style="color:#79B8FF"> any</span><span style="color:#E1E4E8">)</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Rule</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">  return</span><span style="color:#E1E4E8"> (</span><span style="color:#FFAB70">tree</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Tree</span><span style="color:#E1E4E8">, </span><span style="color:#FFAB70">_context</span><span style="color:#F97583">:</span><span style="color:#B392F0"> SchematicContext</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> filePath</span><span style="color:#F97583"> =</span><span style="color:#9ECBFF"> 'some-file.ts'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> fileContent</span><span style="color:#F97583"> =</span><span style="color:#9ECBFF"> \`import { Foo } from 'foo';</span></span>
<span class="line"><span style="color:#9ECBFF">const bar = 'bar;</span></span>
<span class="line"><span style="color:#9ECBFF">\`</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#E1E4E8">    tree.</span><span style="color:#B392F0">create</span><span style="color:#E1E4E8">(filePath, fileContent);</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> source</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> ts.</span><span style="color:#B392F0">createSourceFile</span><span style="color:#E1E4E8">(</span></span>
<span class="line"><span style="color:#E1E4E8">      filePath,</span></span>
<span class="line"><span style="color:#E1E4E8">      fileContent,</span></span>
<span class="line"><span style="color:#E1E4E8">      ts.ScriptTarget.Latest,</span></span>
<span class="line"><span style="color:#79B8FF">      true</span></span>
<span class="line"><span style="color:#E1E4E8">    );</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> updateRecorder</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> tree.</span><span style="color:#B392F0">beginUpdate</span><span style="color:#E1E4E8">(filePath);</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> change</span><span style="color:#F97583"> =</span><span style="color:#B392F0"> insertImport</span><span style="color:#E1E4E8">(source, filePath, </span><span style="color:#9ECBFF">'Bar'</span><span style="color:#E1E4E8">, </span><span style="color:#9ECBFF">'./bar'</span><span style="color:#E1E4E8">, </span><span style="color:#79B8FF">true</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#F97583">    if</span><span style="color:#E1E4E8"> (change </span><span style="color:#F97583">instanceof</span><span style="color:#B392F0"> InsertChange</span><span style="color:#E1E4E8">) {</span></span>
<span class="line"><span style="color:#E1E4E8">      updateRecorder.</span><span style="color:#B392F0">insertRight</span><span style="color:#E1E4E8">(change.pos, change.toAdd);</span></span>
<span class="line"><span style="color:#E1E4E8">    }</span></span>
<span class="line"><span style="color:#E1E4E8">    tree.</span><span style="color:#B392F0">commitUpdate</span><span style="color:#E1E4E8">(updateRecorder);</span></span>
<span class="line"><span style="color:#E1E4E8">    console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(tree.</span><span style="color:#B392F0">get</span><span style="color:#E1E4E8">(filePath)?.content.</span><span style="color:#B392F0">toString</span><span style="color:#E1E4E8">())</span></span>
<span class="line"><span style="color:#F97583">    return</span><span style="color:#E1E4E8"> tree;</span></span>
<span class="line"><span style="color:#E1E4E8">  };</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>The example above will add the content <code>import Bar from './bar';</code> right before the constant.
As we marked it as default import, the import name is not put in curly braces (<code>{ }</code>).</p><ul>
<li><a href="https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/change.ts">Check out the implementation for <code>insertImport()</code> in detail.</a></li>
<li><a href="https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/import">Check out the example in the playground repository on GitHub</a></li>
</ul>
<h2 id="update-ngmodule">Update <code>NgModule</code></h2>
<p>Now we know how we can modify TypeScript imports using the util functions.
However, just importing something isn&#39;t enough in most cases.
There are common things like importing a component and adding it to the <code>NgModule</code> in the <code>declarations</code> array or inserting a module in the <code>imports</code> section.
Luckily, there are some helpers provided for these operations.
These function also based on the <code>insertImport()</code> function, so that they will handle existing file imports and just update the import lists accordingly.</p><h3 id="add-a-declaration-to-a-module">Add a declaration to a module</h3>
<p>The first thing I want to show you is how you can add a component to the <code>declarations</code> of an <code>NgModule</code>.
For this, let&#39;s assume you create a schematic that adds a new <code>DashboardComponent</code> to your project.
You don&#39;t need to add the import manually and then determine the right place to insert the component to the <code>declarations</code> of the <code>NgModule</code>.
Instead, you can use the <code>addDeclarationToModule()</code> function exported from <code>@schematics/angular/utility/ast-utils</code>.</p><p>In the following example we will create an <code>AppModule</code> from the <code>moduleContent</code> using <code>ts.createSourceFile()</code> first.
Then we will register the <code>updateRecorder</code> as learned in the examples before.
Now we call the <code>addDeclarationToModule()</code> function with the source file and the module path followed by the name of the component we want to import and the relative path to the module where we can find the component.
As a result it returns us an array of <code>Change</code> objects that contain the positions and the contents for the change.
Finally, we can handle these changes one-by-one by iterating over the array.
For all changes of type <code>InsertChange</code> we can now call the method <code>updateRecorder.insertleft()</code> with the position of the change and the content to be added.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#79B8FF"> *</span><span style="color:#F97583"> as</span><span style="color:#E1E4E8"> ts </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> 'typescript'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { Rule, SchematicContext, Tree } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular-devkit/schematics/'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { addDeclarationToModule } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@schematics/angular/utility/ast-utils'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { InsertChange } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@schematics/angular/utility/change'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> function</span><span style="color:#B392F0"> playground</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">_options</span><span style="color:#F97583">:</span><span style="color:#79B8FF"> any</span><span style="color:#E1E4E8">)</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Rule</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">  return</span><span style="color:#E1E4E8"> (</span><span style="color:#FFAB70">tree</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Tree</span><span style="color:#E1E4E8">, </span><span style="color:#FFAB70">_context</span><span style="color:#F97583">:</span><span style="color:#B392F0"> SchematicContext</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> modulePath</span><span style="color:#F97583"> =</span><span style="color:#9ECBFF"> 'app.module.ts'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> moduleContent</span><span style="color:#F97583"> =</span><span style="color:#9ECBFF"> \`import { BrowserModule } from '@angular/platform-browser';</span></span>
<span class="line"><span style="color:#9ECBFF">import { NgModule } from '@angular/core';</span></span>
<span class="line"><span style="color:#9ECBFF">import { AppComponent } from './app.component';</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF">@NgModule({</span></span>
<span class="line"><span style="color:#9ECBFF">  declarations: [</span></span>
<span class="line"><span style="color:#9ECBFF">    AppComponent</span></span>
<span class="line"><span style="color:#9ECBFF">  ],</span></span>
<span class="line"><span style="color:#9ECBFF">  imports: [</span></span>
<span class="line"><span style="color:#9ECBFF">    BrowserModule</span></span>
<span class="line"><span style="color:#9ECBFF">  ],</span></span>
<span class="line"><span style="color:#9ECBFF">  providers: [],</span></span>
<span class="line"><span style="color:#9ECBFF">  bootstrap: [AppComponent]</span></span>
<span class="line"><span style="color:#9ECBFF">})</span></span>
<span class="line"><span style="color:#9ECBFF">export class AppModule { }</span></span>
<span class="line"><span style="color:#9ECBFF">\`</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#E1E4E8">    tree.</span><span style="color:#B392F0">create</span><span style="color:#E1E4E8">(modulePath, moduleContent);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> source</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> ts.</span><span style="color:#B392F0">createSourceFile</span><span style="color:#E1E4E8">(</span></span>
<span class="line"><span style="color:#E1E4E8">      modulePath,</span></span>
<span class="line"><span style="color:#E1E4E8">      moduleContent,</span></span>
<span class="line"><span style="color:#E1E4E8">      ts.ScriptTarget.Latest,</span></span>
<span class="line"><span style="color:#79B8FF">      true</span></span>
<span class="line"><span style="color:#E1E4E8">    );</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> updateRecorder</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> tree.</span><span style="color:#B392F0">beginUpdate</span><span style="color:#E1E4E8">(modulePath);</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> changes</span><span style="color:#F97583"> =</span><span style="color:#B392F0"> addDeclarationToModule</span><span style="color:#E1E4E8">(</span></span>
<span class="line"><span style="color:#E1E4E8">      source,</span></span>
<span class="line"><span style="color:#E1E4E8">      modulePath,</span></span>
<span class="line"><span style="color:#9ECBFF">      'DashboardComponent'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#9ECBFF">      './dashboard.component'</span></span>
<span class="line"><span style="color:#E1E4E8">    ) </span><span style="color:#F97583">as</span><span style="color:#B392F0"> InsertChange</span><span style="color:#E1E4E8">[];</span></span>
<span class="line"><span style="color:#F97583">    for</span><span style="color:#E1E4E8"> (</span><span style="color:#F97583">const</span><span style="color:#79B8FF"> change</span><span style="color:#F97583"> of</span><span style="color:#E1E4E8"> changes) {</span></span>
<span class="line"><span style="color:#F97583">      if</span><span style="color:#E1E4E8"> (change </span><span style="color:#F97583">instanceof</span><span style="color:#B392F0"> InsertChange</span><span style="color:#E1E4E8">) {</span></span>
<span class="line"><span style="color:#E1E4E8">        updateRecorder.</span><span style="color:#B392F0">insertLeft</span><span style="color:#E1E4E8">(change.pos, change.toAdd);</span></span>
<span class="line"><span style="color:#E1E4E8">      }</span></span>
<span class="line"><span style="color:#E1E4E8">    }</span></span>
<span class="line"><span style="color:#E1E4E8">    tree.</span><span style="color:#B392F0">commitUpdate</span><span style="color:#E1E4E8">(updateRecorder);</span></span>
<span class="line"><span style="color:#E1E4E8">    console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(tree.</span><span style="color:#B392F0">get</span><span style="color:#E1E4E8">(modulePath)?.content.</span><span style="color:#B392F0">toString</span><span style="color:#E1E4E8">())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">    return</span><span style="color:#E1E4E8"> tree;</span></span>
<span class="line"><span style="color:#E1E4E8">  };</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>When we execute this schematic now, we can see in the log that the following import line has been added to the file:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D">/* ... */</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { DashboardComponent } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './dashboard.component'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">@</span><span style="color:#B392F0">NgModule</span><span style="color:#E1E4E8">({</span></span>
<span class="line"><span style="color:#E1E4E8">  declarations: [</span></span>
<span class="line"><span style="color:#E1E4E8">    AppComponent,</span></span>
<span class="line"><span style="color:#E1E4E8">    DashboardComponent</span></span>
<span class="line"><span style="color:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#6A737D">  /* ... */</span></span>
<span class="line"><span style="color:#E1E4E8">})</span></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> class</span><span style="color:#B392F0"> AppModule</span><span style="color:#E1E4E8"> { }</span></span></code></pre>
<h3 id="ngmodule-add-imports-exports-providers-and-bootstrap"><code>NgModule</code>: add <code>imports</code>, <code>exports</code>, <code>providers</code>, and <code>bootstrap</code></h3>
<p>Similar to the previous example we can re-export something we imported by using the <code>addExportToModule()</code> function and adding an import to the <code>NgModule</code> by using <code>addImportToModule()</code>.
We can also modify the <code>providers</code>, and <code>bootstrap</code> arrays by using  <code>addProviderToModule()</code> and  <code>addBootstrapToModule()</code>.
Again, it will take care of all the things necessary such as extending and creating imports, checking for existing entries in the <code>NgModule</code> metadata and much more.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D">/* ... */</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#E1E4E8">  addImportToModule,</span></span>
<span class="line"><span style="color:#E1E4E8">  addExportToModule,</span></span>
<span class="line"><span style="color:#E1E4E8">  addProviderToModule,</span></span>
<span class="line"><span style="color:#E1E4E8">  addBootstrapToModule</span></span>
<span class="line"><span style="color:#E1E4E8">} </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@schematics/angular/utility/ast-utils'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#6A737D">/* ... */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> function</span><span style="color:#B392F0"> playground</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">_options</span><span style="color:#F97583">:</span><span style="color:#79B8FF"> any</span><span style="color:#E1E4E8">)</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Rule</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">  return</span><span style="color:#E1E4E8"> (</span><span style="color:#FFAB70">tree</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Tree</span><span style="color:#E1E4E8">, </span><span style="color:#FFAB70">_context</span><span style="color:#F97583">:</span><span style="color:#B392F0"> SchematicContext</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#6A737D">    /* ... */</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> exportChanges</span><span style="color:#F97583"> =</span><span style="color:#B392F0"> addExportToModule</span><span style="color:#E1E4E8">(</span></span>
<span class="line"><span style="color:#E1E4E8">      source,</span></span>
<span class="line"><span style="color:#E1E4E8">      modulePath,</span></span>
<span class="line"><span style="color:#9ECBFF">      'FooModule'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#9ECBFF">      './foo.module'</span></span>
<span class="line"><span style="color:#E1E4E8">    ) </span><span style="color:#F97583">as</span><span style="color:#B392F0"> InsertChange</span><span style="color:#E1E4E8">[];</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> importChanges</span><span style="color:#F97583"> =</span><span style="color:#B392F0"> addImportToModule</span><span style="color:#E1E4E8">(</span></span>
<span class="line"><span style="color:#E1E4E8">      source,</span></span>
<span class="line"><span style="color:#E1E4E8">      modulePath,</span></span>
<span class="line"><span style="color:#9ECBFF">      'BarModule'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#9ECBFF">      './bar.module'</span></span>
<span class="line"><span style="color:#E1E4E8">    ) </span><span style="color:#F97583">as</span><span style="color:#B392F0"> InsertChange</span><span style="color:#E1E4E8">[];</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> providerChanges</span><span style="color:#F97583"> =</span><span style="color:#B392F0"> addProviderToModule</span><span style="color:#E1E4E8">(</span></span>
<span class="line"><span style="color:#E1E4E8">      source,</span></span>
<span class="line"><span style="color:#E1E4E8">      modulePath,</span></span>
<span class="line"><span style="color:#9ECBFF">      'MyProvider'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#9ECBFF">      './my-provider.ts'</span></span>
<span class="line"><span style="color:#E1E4E8">    ) </span><span style="color:#F97583">as</span><span style="color:#B392F0"> InsertChange</span><span style="color:#E1E4E8">[];</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> bootstrapChanges</span><span style="color:#F97583"> =</span><span style="color:#B392F0"> addBootstrapToModule</span><span style="color:#E1E4E8">(</span></span>
<span class="line"><span style="color:#E1E4E8">      source,</span></span>
<span class="line"><span style="color:#E1E4E8">      modulePath,</span></span>
<span class="line"><span style="color:#9ECBFF">      'MyComponent'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#9ECBFF">      './my.component.ts'</span></span>
<span class="line"><span style="color:#E1E4E8">    ) </span><span style="color:#F97583">as</span><span style="color:#B392F0">  InsertChange</span><span style="color:#E1E4E8">[];</span></span>
<span class="line"><span style="color:#6A737D">    /* ... */</span></span>
<span class="line"><span style="color:#E1E4E8">    console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(tree.</span><span style="color:#B392F0">get</span><span style="color:#E1E4E8">(modulePath)?.content.</span><span style="color:#B392F0">toString</span><span style="color:#E1E4E8">())</span></span>
<span class="line"><span style="color:#F97583">    return</span><span style="color:#E1E4E8"> tree;</span></span>
<span class="line"><span style="color:#E1E4E8">  };</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>Our result will now look like this:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { BrowserModule } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular/platform-browser'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { NgModule } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular/core'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { AppComponent } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './app.component'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { FooModule } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './foo.module'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { BarModule } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './bar.module'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { MyProvider } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './my-provider.ts'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { MyComponent } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './my.component.ts'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { BazComponent } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './baz.component.ts'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">@</span><span style="color:#B392F0">NgModule</span><span style="color:#E1E4E8">({</span></span>
<span class="line"><span style="color:#E1E4E8">  declarations: [</span></span>
<span class="line"><span style="color:#E1E4E8">    AppComponent</span></span>
<span class="line"><span style="color:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#E1E4E8">  imports: [</span></span>
<span class="line"><span style="color:#E1E4E8">    BrowserModule,</span></span>
<span class="line"><span style="color:#E1E4E8">    BarModule</span></span>
<span class="line"><span style="color:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#E1E4E8">  providers: [MyProvider],</span></span>
<span class="line"><span style="color:#E1E4E8">  bootstrap: [MyComponent],</span></span>
<span class="line"><span style="color:#E1E4E8">  exports: [FooModule]</span></span>
<span class="line"><span style="color:#E1E4E8">})</span></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> class</span><span style="color:#B392F0"> AppModule</span><span style="color:#E1E4E8"> { }</span></span></code></pre>
<h3 id="add-route-declarations">Add route declarations</h3>
<p>Let&#39;s have a look at another common scenario: We want our schematic to insert a route definition to a module that calls <code>RouterModule.forRoot()</code> or <code>.forChild()</code> with a route definition array.
For this, we can use the helper function <code>addRouteDeclarationToModule()</code> which returns a <code>Change</code> object which we need to handle as an <code>InsertChange</code>.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#79B8FF"> *</span><span style="color:#F97583"> as</span><span style="color:#E1E4E8"> ts </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> 'typescript'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { Rule, SchematicContext, Tree } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular-devkit/schematics/'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { addRouteDeclarationToModule } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@schematics/angular/utility/ast-utils'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { InsertChange } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@schematics/angular/utility/change'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> function</span><span style="color:#B392F0"> playground</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">_options</span><span style="color:#F97583">:</span><span style="color:#79B8FF"> any</span><span style="color:#E1E4E8">)</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Rule</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">  return</span><span style="color:#E1E4E8"> (</span><span style="color:#FFAB70">tree</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Tree</span><span style="color:#E1E4E8">, </span><span style="color:#FFAB70">_context</span><span style="color:#F97583">:</span><span style="color:#B392F0"> SchematicContext</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> modulePath</span><span style="color:#F97583"> =</span><span style="color:#9ECBFF"> 'my-routing.module.ts'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> moduleContent</span><span style="color:#F97583"> =</span><span style="color:#9ECBFF"> \`import { NgModule } from '@angular/core';</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF">    const myRoutes = [</span></span>
<span class="line"><span style="color:#9ECBFF">      { path: 'foo', component: FooComponent }</span></span>
<span class="line"><span style="color:#9ECBFF">    ];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF">    @NgModule({</span></span>
<span class="line"><span style="color:#9ECBFF">      imports: [</span></span>
<span class="line"><span style="color:#9ECBFF">        RouterModule.forChild(myRoutes)</span></span>
<span class="line"><span style="color:#9ECBFF">      ],</span></span>
<span class="line"><span style="color:#9ECBFF">    })</span></span>
<span class="line"><span style="color:#9ECBFF">    export class MyRoutingModule { }</span></span>
<span class="line"><span style="color:#9ECBFF">\`</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#E1E4E8">    tree.</span><span style="color:#B392F0">create</span><span style="color:#E1E4E8">(modulePath, moduleContent);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> source</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> ts.</span><span style="color:#B392F0">createSourceFile</span><span style="color:#E1E4E8">(</span></span>
<span class="line"><span style="color:#E1E4E8">      modulePath,</span></span>
<span class="line"><span style="color:#E1E4E8">      moduleContent,</span></span>
<span class="line"><span style="color:#E1E4E8">      ts.ScriptTarget.Latest,</span></span>
<span class="line"><span style="color:#79B8FF">      true</span></span>
<span class="line"><span style="color:#E1E4E8">    );</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> updateRecorder</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> tree.</span><span style="color:#B392F0">beginUpdate</span><span style="color:#E1E4E8">(modulePath);</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> change</span><span style="color:#F97583"> =</span><span style="color:#B392F0"> addRouteDeclarationToModule</span><span style="color:#E1E4E8">(</span></span>
<span class="line"><span style="color:#E1E4E8">      source,</span></span>
<span class="line"><span style="color:#9ECBFF">      './src/app'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#9ECBFF">      \`{ path: 'bar', component: BarComponent }\`</span></span>
<span class="line"><span style="color:#E1E4E8">    ) </span><span style="color:#F97583">as</span><span style="color:#B392F0"> InsertChange</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#E1E4E8">    updateRecorder.</span><span style="color:#B392F0">insertLeft</span><span style="color:#E1E4E8">(change.pos, change.toAdd);</span></span>
<span class="line"><span style="color:#E1E4E8">    tree.</span><span style="color:#B392F0">commitUpdate</span><span style="color:#E1E4E8">(updateRecorder);</span></span>
<span class="line"><span style="color:#E1E4E8">    console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(tree.</span><span style="color:#B392F0">get</span><span style="color:#E1E4E8">(modulePath)?.content.</span><span style="color:#B392F0">toString</span><span style="color:#E1E4E8">())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">    return</span><span style="color:#E1E4E8"> tree;</span></span>
<span class="line"><span style="color:#E1E4E8">  };</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>The example above will insert the route definition object <code>{ path: 'bar', component: BarComponent }</code> into the <code>myRoutes</code> array by finding the variable associated in <code>forRoot()</code> or <code>forChild()</code>.</p><ul>
<li><a href="https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/ast-utils.ts">Check out the implementation for ast-utils in detail.</a></li>
<li><a href="https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/module">Check out the examples for module operations in the playground repository on GitHub</a></li>
</ul>
<h2 id="retrieve-the-angular-workspace-configuration">Retrieve the Angular workspace configuration</h2>
<p>Each Angular app lives in an Angular workspace containing an <code>angular.json</code> configuration file.
If we want to get either the path to the workspace configuration file or the configuration from the file itself, we can use the <code>getWorkspacePath()</code> and <code>getWorkspace()</code> functions by passing in the current <code>Tree</code> object.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { Rule, SchematicContext, Tree } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular-devkit/schematics'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { getWorkspacePath, getWorkspace } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@schematics/angular/utility/config'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> function</span><span style="color:#B392F0"> playground</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">_options</span><span style="color:#F97583">:</span><span style="color:#79B8FF"> any</span><span style="color:#E1E4E8">)</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Rule</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">  return</span><span style="color:#E1E4E8"> (</span><span style="color:#FFAB70">tree</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Tree</span><span style="color:#E1E4E8">, </span><span style="color:#FFAB70">_context</span><span style="color:#F97583">:</span><span style="color:#B392F0"> SchematicContext</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#6A737D">    // returns the path to the Angular configuration file</span></span>
<span class="line"><span style="color:#6A737D">    // ('/angular.json' or probably \`.angular.json\` for older Angular projects)</span></span>
<span class="line"><span style="color:#E1E4E8">    console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(</span><span style="color:#B392F0">getWorkspacePath</span><span style="color:#E1E4E8">(tree));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D">    // returns the whole configuration object from the 'angular.json' file</span></span>
<span class="line"><span style="color:#E1E4E8">    console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(</span><span style="color:#79B8FF">JSON</span><span style="color:#E1E4E8">.</span><span style="color:#B392F0">stringify</span><span style="color:#E1E4E8">(</span><span style="color:#B392F0">getWorkspace</span><span style="color:#E1E4E8">(tree), </span><span style="color:#79B8FF">null</span><span style="color:#E1E4E8">, </span><span style="color:#79B8FF">2</span><span style="color:#E1E4E8">));</span></span>
<span class="line"><span style="color:#E1E4E8">  };</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>To try out things locally, we need to execute the schematics from an Angular app root path on our system.
To do so, navigate into an existing Angular app or create a new one for testing purposes.
Then, execute the schematic from there by using the relative path to the <code>src/collection.json</code> file and adding the schematic name after the colon (<code>:</code>).</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">ng</span><span style="color:#9ECBFF"> new</span><span style="color:#9ECBFF"> some-test-project</span><span style="color:#79B8FF"> --routing</span><span style="color:#6A737D">  # create a new test project</span></span>
<span class="line"><span style="color:#79B8FF">cd</span><span style="color:#9ECBFF"> some-test-project</span><span style="color:#6A737D">      # be sure to be in the root of the angular project</span></span>
<span class="line"><span style="color:#6A737D"># assume the schematics project itself is located relatively to the angular project in '../playground'</span></span>
<span class="line"><span style="color:#B392F0">schematics</span><span style="color:#9ECBFF"> ../playground/src/collection.json:playground</span><span style="color:#6A737D"> # execute the 'playground' schematic</span></span></code></pre>
<ul>
<li><a href="https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/config.ts">Check out the implementation in detail.</a></li>
<li><a href="https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/config">Check out the example in the playground repository on GitHub</a></li>
</ul>
<h2 id="get-default-path-for-an-app-inside-the-workspace">Get default path for an app inside the workspace</h2>
<p>An Angular workspace can contain multiple applications or libraries.
To find their appropriate main paths, you can use the helper function <code>createDefaultPath()</code>.
We need to pass in the <code>Tree</code> object and the name of the app or library we want to get the path for.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { Rule, SchematicContext, Tree } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular-devkit/schematics'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { createDefaultPath } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@schematics/angular/utility/workspace'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> function</span><span style="color:#B392F0"> playground</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">_options</span><span style="color:#F97583">:</span><span style="color:#79B8FF"> any</span><span style="color:#E1E4E8">)</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Rule</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">  return</span><span style="color:#F97583"> async</span><span style="color:#E1E4E8"> (</span><span style="color:#FFAB70">tree</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Tree</span><span style="color:#E1E4E8">, </span><span style="color:#FFAB70">_context</span><span style="color:#F97583">:</span><span style="color:#B392F0"> SchematicContext</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> defaultPath</span><span style="color:#F97583"> =</span><span style="color:#F97583"> await</span><span style="color:#B392F0"> createDefaultPath</span><span style="color:#E1E4E8">(tree, </span><span style="color:#9ECBFF">'my-lib'</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#E1E4E8">    console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(defaultPath); </span><span style="color:#6A737D">// '/projects/my-lib/src/lib'</span></span>
<span class="line"><span style="color:#E1E4E8">  };</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>Let&#39;s create a new library inside our testing Angular app called <code>my-lib</code>, to try it out:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">ng</span><span style="color:#9ECBFF"> g</span><span style="color:#9ECBFF"> lib</span><span style="color:#9ECBFF"> my-lib</span><span style="color:#6A737D">  # create a new library inside the Angular workspace</span></span>
<span class="line"><span style="color:#6A737D"># assume the schematics project itself is located relatively to the angular project in '../playground'</span></span>
<span class="line"><span style="color:#B392F0">schematics</span><span style="color:#9ECBFF"> ../playground/src/collection.json:playground</span><span style="color:#6A737D"> # execute the 'playground' schematic</span></span></code></pre>
<ul>
<li><a href="https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/workspace.ts">Check out the implementation for <code>createDefaultPath()</code> in detail.</a></li>
<li><a href="https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/worksapce">Check out the example in the playground repository on GitHub</a></li>
</ul>
<h2 id="call-schematics-from-schematics">Call schematics from schematics</h2>
<p>If you run a schematic, you may come to the point where one schematic should execute another one.
For example: You create schematics for generating a specific component.
You also develop a <code>ng add</code> or <code>ng new</code> schematic to set up things for you and create an example component by default.
In such cases you may want to combine multiple schematics.</p><h3 id="run-local-schematics-using-the-runschematictask">Run local schematics using the <code>RunSchematicTask</code></h3>
<p>First we want to use the <code>RunSchematicTask</code> class to achieve our goal.
Let&#39;s say we have a collection file like the following:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">{</span></span>
<span class="line"><span style="color:#79B8FF">  "$schema"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"../node_modules/@angular-devkit/schematics/collection-schema.json"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">  "schematics"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">    "ng-add"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">      "description"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"Demo that calls the 'playground' schematic inside"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">      "factory"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"./ng-add/index#ngAdd"</span></span>
<span class="line"><span style="color:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#79B8FF">    "playground"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">      "description"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"An example schematic."</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">      "factory"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"./playground/index#playground"</span></span>
<span class="line"><span style="color:#E1E4E8">    }</span></span>
<span class="line"><span style="color:#E1E4E8">  }</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>The factory for <code>ng-add</code> is located in <code>src/ng-add/index.ts</code>.
Then inside this schematic we can call a new <code>RunSchematicTask</code> with the name of the schematic we want to execute and the project name from the Angular workspace.
To really execute the operation we need to pass the task to the <code>context</code>.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { Rule, SchematicContext, Tree } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular-devkit/schematics'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { RunSchematicTask } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular-devkit/schematics/tasks'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> function</span><span style="color:#B392F0"> ngAdd</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">_options</span><span style="color:#F97583">:</span><span style="color:#79B8FF"> any</span><span style="color:#E1E4E8">)</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Rule</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">  return</span><span style="color:#E1E4E8"> (</span><span style="color:#FFAB70">tree</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Tree</span><span style="color:#E1E4E8">, </span><span style="color:#FFAB70">_context</span><span style="color:#F97583">:</span><span style="color:#B392F0"> SchematicContext</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#E1E4E8">    context.</span><span style="color:#B392F0">addTask</span><span style="color:#E1E4E8">(</span></span>
<span class="line"><span style="color:#F97583">      new</span><span style="color:#B392F0"> RunSchematicTask</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">'playground'</span><span style="color:#E1E4E8">, { project: </span><span style="color:#9ECBFF">'test-workspace'</span><span style="color:#E1E4E8"> })</span></span>
<span class="line"><span style="color:#E1E4E8">    );</span></span>
<span class="line"><span style="color:#F97583">    return</span><span style="color:#E1E4E8"> tree;</span></span>
<span class="line"><span style="color:#E1E4E8">  };</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>To check if it works we can fill our playground (<code>src/playground/index.ts</code>) schematic as follows and log the call:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { Rule, SchematicContext, Tree } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular-devkit/schematics'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> function</span><span style="color:#B392F0"> playground</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">_options</span><span style="color:#F97583">:</span><span style="color:#79B8FF"> any</span><span style="color:#E1E4E8">)</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Rule</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">  return</span><span style="color:#E1E4E8"> (</span><span style="color:#FFAB70">tree</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Tree</span><span style="color:#E1E4E8">, </span><span style="color:#FFAB70">_context</span><span style="color:#F97583">:</span><span style="color:#B392F0"> SchematicContext</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#E1E4E8">    console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">'schematic </span><span style="color:#79B8FF">\\'</span><span style="color:#9ECBFF">playground</span><span style="color:#79B8FF">\\'</span><span style="color:#9ECBFF"> called'</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#F97583">    return</span><span style="color:#E1E4E8"> tree;</span></span>
<span class="line"><span style="color:#E1E4E8">  };</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>If we now run <code>schematics ../playground/src/collection.json:ng-add --debug=false</code> from our example Angular project, we can see that the <code>ng-add</code> schematic has called the <code>playground</code> schematic.</p><p>With this knowledge you can define small atomic schematics that can be executed &quot;standalone&quot; or from another Schematic that combines multiple standalone schematics and calls them with specific parameters.</p><ul>
<li><a href="https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/ng-add">Check out the example in the playground repository on GitHub</a></li>
</ul>
<h3 id="run-schematics-by-using-the-schematic-and-externalschematic-function">Run schematics by using the <code>schematic()</code> and <code>externalSchematic()</code> function</h3>
<p>Perfect, we can now execute and combine our schematics.
But what if we want to combine external schematics developed by others and integrate them in our own schematics?
Users are lazy, so we don&#39;t want to leave it up to them to manually execute some other things before running our schematics.</p><p>Imagine you are working in a big company with multiple different Angular projects.
This company already has its own standardized UI library, but all the applications are very different and ran by different teams (so not really a use case for a Monorepo).
However, there are also things they all have in common like a Single Sign-On.
Also, the basic design always looks similar – at least the header and the footer of all the apps.</p><p>I&#39;ve often seen companies building a reference implementation for such apps that&#39;s then cloned / copied and adjusted by all developers.
However, there are some problems with this kind of workflow:</p><ul>
<li>You always have to keep the reference project up-to-date.</li>
<li>You have to clean up your copy of the project from stuff you don&#39;t need.</li>
<li>You need to tell all teams to copy this reference to keep track of changes and to adjust their copies frequently.</li>
</ul>
<p>Thus, a better solution in my opinion is to use schematics for the whole integration and upgrade workflow.
You can create an <code>ng new</code> schematic that will scaffold the whole project code for you.
But you don&#39;t want to start from scratch, so you probably want to combine things like these:</p><ul>
<li><code>ng add</code>: Add your schematics to an existing project<ul>
<li>Corporate UI library (always)</li>
<li>Single Sign-On (optional)</li>
<li>Header Component (optional)</li>
<li>Footer Component (optional)</li>
</ul>
</li>
<li><code>ng new</code>: Create a new project with your company defaults<ul>
<li>Create the basic application generated by the Angular CLI (<strong><code>externalSchematic</code></strong>)</li>
<li>Run the <code>ng add</code> Schematic</li>
</ul>
</li>
</ul>
<p>Alright, we already know how we can achieve most of these things.
However, there&#39;s one thing we haven&#39;t learned yet: How to run other (external) schematics?
We can use the <code>externalSchematic</code> function for this.</p><p>But first things first, let&#39;s check if our collection file is ready to start:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">{</span></span>
<span class="line"><span style="color:#79B8FF">  "$schema"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"../node_modules/@angular-devkit/schematics/collection-schema.json"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">  "schematics"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">    "ng-add"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">      "description"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"Call other schematics from the same or other packages"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">      "factory"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"./ng-add/index#playground"</span></span>
<span class="line"><span style="color:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#79B8FF">    "ng-new"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">      "description"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"Execute \`ng new\` with predefined options and run other stuff"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">      "factory"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"./ng-new/index#playground"</span></span>
<span class="line"><span style="color:#E1E4E8">    }</span></span>
<span class="line"><span style="color:#E1E4E8">  }</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<blockquote>
<p>Using the special Schematic names <code>ng-add</code> and <code>ng-new</code> let&#39;s you later use the schematic by just executing <code>ng add</code>/<code>ng new</code> (instead of other schematics called with <code>ng generate</code>).
There is also a special Schematic named <code>ng-update</code> which will be called in the end with the <code>ng update</code> Angular CLI command.</p></blockquote>
<p>After we defined the schema, we can now start to implement our schematics.
To execute an external Schematic, it must be available in the scope of the project..
However, since we want to create a completely new project with the <code>ng new</code> Schematic, we don&#39;t have any <code>node_modules</code> installed in the target directory where we want to initialize the Angular workspace.
To run an external command we can use the <a href="https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options"><code>spawn</code> method from <code>child_process</code></a> (available globally for Node.js).
This creates a new process that executes a command (in our case: <code>npm install @schematics/angular</code>).
To make things look synchronous we wrap the method call into a Promise and <code>await</code> for the Promise to be resolved.
Now we listen to the <code>close</code> event from <code>spawn</code> and check that there was no error during install (code equals <code>0</code>).
If everything worked fine, we will resolve the Promise, otherwise we can throw an error.
The last step is to <code>chain</code> all of our <code>Rule</code>s:
We first use the <code>externalSchematic()</code> function to run the <code>ng new</code> Schematic from Angular itself and set up the basic app.
We will hand over some default options here such a using <code>SCSS</code>, support legacy browsers, strict mode, etc.
Angulars <code>ng new</code> schematic requires also, that we define the specific version for their schematic to be used.
In our case we want to use the <code>ng new</code> schematic from the Angular CLI version <code>12.0.0</code>.
The second call is our <code>ng add</code> Schematic that adds our company specific components, UI libs and so on to the project.</p><blockquote>
<p>We&#39;ve already learned how to run a local Schematic by using the <code>RunSchematicTask</code> class that we need to add to our <code>context</code> object.
In this example we are using the <code>schematic()</code> function to achieve the same goal.
Why are there two ways? To be honest: I actually don&#39;t know.
I found both implementations in the source code of Angular CLI.</p></blockquote>
<pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#E1E4E8">  Rule,</span></span>
<span class="line"><span style="color:#E1E4E8">  SchematicContext,</span></span>
<span class="line"><span style="color:#E1E4E8">  Tree,</span></span>
<span class="line"><span style="color:#E1E4E8">  externalSchematic,</span></span>
<span class="line"><span style="color:#E1E4E8">  schematic,</span></span>
<span class="line"><span style="color:#E1E4E8">  chain</span></span>
<span class="line"><span style="color:#E1E4E8">} </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular-devkit/schematics'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#E1E4E8">  Schema </span><span style="color:#F97583">as</span><span style="color:#E1E4E8"> AngularNgNewSchema,</span></span>
<span class="line"><span style="color:#E1E4E8">  PackageManager,</span></span>
<span class="line"><span style="color:#E1E4E8">  Style</span></span>
<span class="line"><span style="color:#E1E4E8">} </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@schematics/angular/ng-new/schema'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { spawn } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> 'child_process'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> function</span><span style="color:#B392F0"> playground</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">options</span><span style="color:#F97583">:</span><span style="color:#B392F0"> AngularNgNewSchema</span><span style="color:#E1E4E8">)</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Rule</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">  return</span><span style="color:#F97583"> async</span><span style="color:#E1E4E8"> (</span><span style="color:#FFAB70">_tree</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Tree</span><span style="color:#E1E4E8">, </span><span style="color:#FFAB70">_context</span><span style="color:#F97583">:</span><span style="color:#B392F0"> SchematicContext</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> angularSchematicsPackage</span><span style="color:#F97583"> =</span><span style="color:#9ECBFF"> '@schematics/angular'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">    const</span><span style="color:#79B8FF"> ngNewOptions</span><span style="color:#F97583">:</span><span style="color:#B392F0"> AngularNgNewSchema</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#E1E4E8">      version: </span><span style="color:#9ECBFF">'12.0.0'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">      name: options.name,</span></span>
<span class="line"><span style="color:#E1E4E8">      routing: </span><span style="color:#79B8FF">true</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">      strict: </span><span style="color:#79B8FF">true</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">      legacyBrowsers: </span><span style="color:#79B8FF">true</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">      style: Style.Scss,</span></span>
<span class="line"><span style="color:#E1E4E8">      packageManager: PackageManager.Npm</span></span>
<span class="line"><span style="color:#E1E4E8">    }</span></span>
<span class="line"><span style="color:#F97583">    await</span><span style="color:#F97583"> new</span><span style="color:#79B8FF"> Promise</span><span style="color:#E1E4E8">&#x3C;</span><span style="color:#79B8FF">boolean</span><span style="color:#E1E4E8">>((</span><span style="color:#FFAB70">resolve</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#E1E4E8">      console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">'📦 Installing packages...'</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#B392F0">      spawn</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">'npm'</span><span style="color:#E1E4E8">, [</span><span style="color:#9ECBFF">'install'</span><span style="color:#E1E4E8">, angularSchematicsPackage])</span></span>
<span class="line"><span style="color:#E1E4E8">        .</span><span style="color:#B392F0">on</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">'close'</span><span style="color:#E1E4E8">, (</span><span style="color:#FFAB70">code</span><span style="color:#F97583">:</span><span style="color:#79B8FF"> number</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">          if</span><span style="color:#E1E4E8"> (code </span><span style="color:#F97583">===</span><span style="color:#79B8FF"> 0</span><span style="color:#E1E4E8">) {</span></span>
<span class="line"><span style="color:#E1E4E8">            console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">'📦 Packages installed successfully ✅'</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#B392F0">            resolve</span><span style="color:#E1E4E8">(</span><span style="color:#79B8FF">true</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#E1E4E8">          } </span><span style="color:#F97583">else</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">            throw</span><span style="color:#F97583"> new</span><span style="color:#B392F0"> Error</span><span style="color:#E1E4E8">(</span></span>
<span class="line"><span style="color:#9ECBFF">              \`❌ install Angular schematics from '\${</span><span style="color:#E1E4E8">angularSchematicsPackage</span><span style="color:#9ECBFF">}' failed\`</span></span>
<span class="line"><span style="color:#E1E4E8">            );</span></span>
<span class="line"><span style="color:#E1E4E8">          }</span></span>
<span class="line"><span style="color:#E1E4E8">        });</span></span>
<span class="line"><span style="color:#E1E4E8">    });</span></span>
<span class="line"><span style="color:#F97583">    return</span><span style="color:#B392F0"> chain</span><span style="color:#E1E4E8">([</span></span>
<span class="line"><span style="color:#B392F0">      externalSchematic</span><span style="color:#E1E4E8">(angularSchematicsPackage, </span><span style="color:#9ECBFF">'ng-new'</span><span style="color:#E1E4E8">, ngNewOptions),</span></span>
<span class="line"><span style="color:#B392F0">      schematic</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">'ng-add'</span><span style="color:#E1E4E8">, {})</span></span>
<span class="line"><span style="color:#E1E4E8">    ]);</span></span>
<span class="line"><span style="color:#E1E4E8">  };</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>When we now run the <code>ng new</code> Schematic from somewhere outside an Angular workspace, we can see that first of all the Angular <code>ng new</code> Schematic is executed with our predefined settings.
After this, the <code>ng add</code> schematics is called.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">schematics</span><span style="color:#9ECBFF"> ./playground/src/collection.json:ng-new</span><span style="color:#79B8FF"> --debug=false</span></span>
<span class="line"><span style="color:#B392F0">📦</span><span style="color:#9ECBFF"> Installing</span><span style="color:#9ECBFF"> packages...</span></span>
<span class="line"><span style="color:#B392F0">📦</span><span style="color:#9ECBFF"> Packages</span><span style="color:#9ECBFF"> installed</span><span style="color:#9ECBFF"> successfully</span><span style="color:#9ECBFF"> ✅</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> What name would you like to use </span><span style="color:#F97583">for</span><span style="color:#E1E4E8"> the new workspace and initial project</span><span style="color:#F97583">?</span><span style="color:#E1E4E8"> my-project</span></span>
<span class="line"><span style="color:#B392F0">CREATE</span><span style="color:#9ECBFF"> my-project/README.md</span><span style="color:#E1E4E8"> (1027 </span><span style="color:#9ECBFF">bytes</span><span style="color:#E1E4E8">)</span></span>
<span class="line"><span style="color:#B392F0">CREATE</span><span style="color:#9ECBFF"> my-project/.editorconfig</span><span style="color:#E1E4E8"> (274 </span><span style="color:#9ECBFF">bytes</span><span style="color:#E1E4E8">)</span></span>
<span class="line"><span style="color:#B392F0">CREATE</span><span style="color:#9ECBFF"> my-project/.gitignore</span><span style="color:#E1E4E8"> (631 </span><span style="color:#9ECBFF">bytes</span><span style="color:#E1E4E8">)</span></span>
<span class="line"><span style="color:#B392F0">CREATE</span><span style="color:#9ECBFF"> my-project/angular.json</span><span style="color:#E1E4E8"> (3812 </span><span style="color:#9ECBFF">bytes</span><span style="color:#E1E4E8">)</span></span>
<span class="line"><span style="color:#79B8FF">...</span></span>
<span class="line"><span style="color:#B392F0">CREATE</span><span style="color:#9ECBFF"> my-project/src/app/app.component.scss</span><span style="color:#E1E4E8"> (0 </span><span style="color:#9ECBFF">bytes</span><span style="color:#E1E4E8">)</span></span>
<span class="line"><span style="color:#B392F0">CREATE</span><span style="color:#9ECBFF"> my-project/src/app/app.component.html</span><span style="color:#E1E4E8"> (25757 </span><span style="color:#9ECBFF">bytes</span><span style="color:#E1E4E8">)</span></span>
<span class="line"><span style="color:#B392F0">CREATE</span><span style="color:#9ECBFF"> my-project/src/app/app.component.spec.ts</span><span style="color:#E1E4E8"> (1069 </span><span style="color:#9ECBFF">bytes</span><span style="color:#E1E4E8">)</span></span>
<span class="line"><span style="color:#B392F0">CREATE</span><span style="color:#9ECBFF"> my-project/src/app/app.component.ts</span><span style="color:#E1E4E8"> (215 </span><span style="color:#9ECBFF">bytes</span><span style="color:#E1E4E8">)</span></span>
<span class="line"><span style="color:#B392F0">CREATE</span><span style="color:#9ECBFF"> my-project/src/app/package.json</span><span style="color:#E1E4E8"> (816 </span><span style="color:#9ECBFF">bytes</span><span style="color:#E1E4E8">)</span></span>
<span class="line"><span style="color:#B392F0">CREATE</span><span style="color:#9ECBFF"> my-project/e2e/protractor.conf.js</span><span style="color:#E1E4E8"> (869 </span><span style="color:#9ECBFF">bytes</span><span style="color:#E1E4E8">)</span></span>
<span class="line"><span style="color:#B392F0">CREATE</span><span style="color:#9ECBFF"> my-project/e2e/tsconfig.json</span><span style="color:#E1E4E8"> (294 </span><span style="color:#9ECBFF">bytes</span><span style="color:#E1E4E8">)</span></span>
<span class="line"><span style="color:#B392F0">CREATE</span><span style="color:#9ECBFF"> my-project/e2e/src/app.e2e-spec.ts</span><span style="color:#E1E4E8"> (643 </span><span style="color:#9ECBFF">bytes</span><span style="color:#E1E4E8">)</span></span>
<span class="line"><span style="color:#B392F0">CREATE</span><span style="color:#9ECBFF"> my-project/e2e/src/app.po.ts</span><span style="color:#E1E4E8"> (301 </span><span style="color:#9ECBFF">bytes</span><span style="color:#E1E4E8">)</span></span>
<span class="line"><span style="color:#B392F0">⠏</span><span style="color:#9ECBFF"> Installing</span><span style="color:#9ECBFF"> packages...</span></span>
<span class="line"><span style="color:#B392F0">✔</span><span style="color:#9ECBFF"> Packages</span><span style="color:#9ECBFF"> installed</span><span style="color:#9ECBFF"> successfully.</span></span>
<span class="line"><span style="color:#B392F0">schematic</span><span style="color:#9ECBFF"> works</span></span></code></pre>
<p>After you have deployed the Schematic, you can now execute it by running:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">npm</span><span style="color:#9ECBFF"> i</span><span style="color:#79B8FF"> -g</span><span style="color:#9ECBFF"> my-schematic-package-name</span><span style="color:#6A737D"> # install the Schematic so it's available globally</span></span>
<span class="line"><span style="color:#B392F0">ng</span><span style="color:#9ECBFF"> new</span><span style="color:#9ECBFF"> my-app</span><span style="color:#79B8FF"> --collection=my-schematic-package-name</span><span style="color:#6A737D"> # Run the Angular CLI's \`ng new\` Schematic with the defined collection</span></span></code></pre>
<p>Similar to this example you can call the <code>ng add</code> Schematic from the collection if you are in an existing Angular workspace:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">ng</span><span style="color:#9ECBFF"> add</span><span style="color:#9ECBFF"> my-schematic-package-name</span></span></code></pre>
<ul>
<li><a href="https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/ng-new">Check out the example in the playground repository on GitHub</a></li>
</ul>
<h2 id="conclusion-3">Conclusion</h2>
<p>The presented util functions are great and comfortable helpers you can use to create your own Angular CLI schematics.
However, as they aren&#39;t officially published until now, you should keep track of any changes by keeping an eye on the <a href="https://github.com/angular/angular-cli/issues/15335">documentation issue (#15335)</a> and <a href="https://github.com/angular/angular-cli/tree/master/packages/schematics/angular/utility">changes on the related code</a>.</p><h2 id="summary">Summary</h2>
<table>
<thead>
<tr>
<th>Function</th>
<th>Description</th>
</tr>
</thead>
<tbody><tr>
<td><code>getPackageJsonDependency()</code></td>
<td>Get a package configuration from the <code>package.json</code> (dev-, peer-, optional-) dependencies config.</td>
</tr>
<tr>
<td><code>addPackageJsonDependency()</code></td>
<td>Add a NPM package to the <code>package.json</code> as (dev-, peer-, optional-) dependency.</td>
</tr>
<tr>
<td><code>removePackageJsonDependency()</code></td>
<td>Remove a NPM package from the <code>package.json</code> (dev-, peer-, optional-) dependencies.</td>
</tr>
<tr>
<td><code>relativePathToWorkspaceRoot()</code></td>
<td>Get the relative import path to the root of the workspace for a given file inside the workspace.</td>
</tr>
<tr>
<td><code>insertImport()</code></td>
<td>Insert an import statement for a file to an existing TypeScript file.</td>
</tr>
<tr>
<td><code>addDeclarationToModule()</code></td>
<td>Import a declaration (e.g. Component or Directive) and add it to the <code>declarations</code> array of an Angular module.</td>
</tr>
<tr>
<td><code>addImportToModule()</code></td>
<td>Import an Angular Module and add it to the <code>imports</code> array of another Angular module.</td>
</tr>
<tr>
<td><code>addExportToModule()</code></td>
<td>Import an Angular Module and add it to the <code>exports</code> array of another Angular module.</td>
</tr>
<tr>
<td><code>addProviderToModule()</code></td>
<td>Import a service / provider and add it to the <code>providers</code> array of an Angular module.</td>
</tr>
<tr>
<td><code>addBootstrapToModule()</code></td>
<td>Import a Component and add it to the <code>bootstrap</code> array of an Angular module.</td>
</tr>
<tr>
<td><code>addRouteDeclarationToModule()</code></td>
<td>Add a route definition to the router configuration in an Angular routing module.</td>
</tr>
<tr>
<td><code>getWorkspacePath()</code></td>
<td>Retrieve the path to the Angular workspace configuration file (<code>angular.json</code>).</td>
</tr>
<tr>
<td><code>getWorkspace()</code></td>
<td>Get the configuration object from the Angular workspace configuration file (<code>angular.json</code>)</td>
</tr>
<tr>
<td><code>createDefaultPath()</code></td>
<td>Get the default application / library path for a project inside an Angular workspace.</td>
</tr>
</tbody></table>
<table>
<thead>
<tr>
<th>Class</th>
<th>Description</th>
</tr>
</thead>
<tbody><tr>
<td><code>InsertChange</code></td>
<td>This class returns a change object with the content to be added and the position where a change is being inserted.</td>
</tr>
<tr>
<td><code>NodePackageInstallTask</code></td>
<td>A task instance that will perform a <code>npm install</code> once instantiated and added to the <code>context</code> via <code>addTask()</code>.</td>
</tr>
<tr>
<td><code>RunSchematicTask</code></td>
<td>A task that runs another schematic after instantiation and adding it to the <code>context</code> via <code>addTask()</code>.</td>
</tr>
</tbody></table>
<p><strong>Thank you</strong></p><p>Special thanks goes to <a href="https://twitter.com/mgechev">Minko Gechev</a>, <a href="https://twitter.com/tomastrajan">Tomas Trajan</a> and <a href="https://twitter.com/fmalcher01">Ferdinand Malcher</a> for the feedback and revising this article.</p><hr>
`;export{s as default};
