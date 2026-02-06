const e=`---
title: 'ngx-semantic-version: enhance your git and release workflow'\r
description: 'In this article I will introduce the new tool ngx-semantic-version.\r
This new Angular Schematic allows you to set up all necessary tooling for consistent git commit messages and publishing new versions.\r
It will help you to keep your CHANGELOG.md file up to date and to release new tagged versions. All this is done by leveraging great existing tools like commitizen, commitlint and standard-version.'\r
published: true\r
author:\r
  name: Danny Koppenhagen\r
  mail: mail@k9n.dev\r
created: 2019-11-06\r
updated: 2019-11-06\r
publishedAt:\r
  name: angular.schule.com\r
  url: https://angular.schule/blog/2019-11-ngx-semantic-version\r
  logo: https://angular.schule/assets/img/logo-angular-schule-gradient-600.png\r
keywords:\r
  - Angular\r
  - Angular CLI\r
  - Angular Schematics\r
  - release\r
  - commit\r
  - commitlint\r
  - husky\r
  - commitizen\r
  - standard-version\r
  - semver\r
  - Semantic Version\r
  - Conventional Commits\r
  - Conventional Changelog\r
language: en\r
thumbnail:\r
  header: images/blog/ngx-semantic-version-header.jpg\r
  card: images/blog/ngx-semantic-version-header-small.jpg
---

<p><strong>In this article I will introduce the new tool <code>ngx-semantic-version</code>.
This new Angular Schematic allows you to set up all necessary tooling for consistent git commit messages and publishing new versions.
It will help you to keep your <code>CHANGELOG.md</code> file up to date and to release new tagged versions. All this is done by leveraging great existing tools like <code>commitizen</code>, <code>commitlint</code> and <code>standard-version</code>.</strong></p><hr>

<h2 id="tldr">TL;DR</h2>
<p><em>ngx-semantic-version</em> is an Angular Schematic that will add and configure <em>commitlint</em>, <em>commitizen</em>, <em>husky</em> and <em>standard-version</em> to enforce commit messages in the <em>conventional commit</em> format and to automate your release and Changelog generation by respecting <em>semver</em>.
All you have to do for the setup is to execute this command in your Angular CLI project:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">ng</span><span style="color:#9ECBFF"> add</span><span style="color:#9ECBFF"> ngx-semantic-version</span></span></code></pre>
<h2 id="introduction">Introduction</h2>
<p>Surviving in the stressful day-to-day life of a developer is not easy.
One feature follows the other, bug fixes and breaking changes come in on a regular basis.
With all the hustle and bustle, there&#39;s literally no time to write proper commit messages.</p><p>If we don&#39;t take this job serious, at the end of the day our git history will look like this:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span>* 65f597a (HEAD -> master) adjust readme</span></span>
<span class="line"><span>* f874d16 forgot to bump up version</span></span>
<span class="line"><span>* 3fa9f1e release</span></span>
<span class="line"><span>* d09e4ee now it's fixed!</span></span>
<span class="line"><span>* 70c7a9b this should really fix the build</span></span>
<span class="line"><span>* 5f91dab let the build work (hopefully)</span></span>
<span class="line"><span>* 44c45b7 adds some file</span></span>
<span class="line"><span>* 7ac82d3 lots of stuff</span></span>
<span class="line"><span>* 1e34db6 initial commit</span></span></code></pre>
<p>When you see such a history you know almost nothing: neither what features have been integrated nor if there was a bugfix or a breaking change. There is almost no meaningful context.</p><p>Wouldn&#39;t it be nice to have a cleaner git history that will follow a de facto standard which is commonly used?</p><p>But more than this: having a clean and well-formatted git history can help us releasing new software versions respecting semantic versioning and generating a changelog that includes all the changes we made and references to the commits.</p><p>No more struggle with forgotten version increasements in your <code>package.json</code>. No more manual changes in the <code>CHANGELOG.md</code> and missing references to necessary git commits. Wouldn&#39;t it be nice to automate the release process and generate the changelog and the package version by just checking and building it from a clean git history? And wouldn&#39;t it be nice to add all this stuff with one very simple single line command to your Angular project?</p><p><strong><a href="https://www.npmjs.com/package/ngx-semantic-version"><em>ngx-semantic-version</em></a> will give you all that.</strong></p><h2 id="what-does-it-do-">What does it do? <a name="what"></a></h2>
<p><em>ngx-semantic-version</em> will add and configure the following packages for you.
We will take a look at each tool in this article.</p><ul>
<li><strong><a href="https://commitlint.js.org">commitlint</a>:</strong> check commit messages to follow the conventional commit pattern</li>
<li><strong><a href="https://www.npmjs.com/package/husky">husky</a>:</strong> hook into git events and run code at specific points (e.g. at commit or push)</li>
<li><strong><a href="https://www.npmjs.com/package/commitizen">commitizen</a>:</strong> helper for writing conventional commit messages</li>
<li><strong><a href="https://www.npmjs.com/package/standard-version">standard-version</a>:</strong> generate conventional changelogs from the git history</li>
</ul>
<h3 id="commitlint-enforcing-conventional-commit-messages-">commitlint: Enforcing conventional commit messages <a name="commitlint"></a></h3>
<p><a href="https://commitlint.js.org">Commitlint</a> will give you the ability to check your commit messages for a common pattern. A very prominent project following this pattern is the Angular repository itself. The <a href="https://www.conventionalcommits.org"><em>conventional-commit</em></a> pattern requires us to follow this simple syntax:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span>&#x3C;type>[optional scope]: &#x3C;description></span></span>
<span class="line"><span></span></span>
<span class="line"><span>[optional body]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[optional footer]</span></span></code></pre>
<p>Let&#39;s see what is the meaning of these parameters:</p><ul>
<li><code>type</code> can be one of the following codes:<ul>
<li><code>build</code></li>
<li><code>ci</code></li>
<li><code>chore</code></li>
<li><code>docs</code></li>
<li><code>feat</code></li>
<li><code>fix</code></li>
<li><code>perf</code></li>
<li><code>refactor</code></li>
<li><code>revert</code></li>
<li><code>style</code></li>
<li><code>test</code></li>
</ul>
</li>
<li><code>scope</code> is optional and can be used to reference a specific part of your application, e.g. <code>fix(dashboard): add fallback for older browsers</code></li>
<li>The <code>description</code> is mandatory and describes the commit in a very short form (also called <code>subject</code>)</li>
<li>If necessary, a <code>body</code> and a <code>footer</code> with further information can be added which may contain:<ul>
<li>The keyword <code>BREAKING CHANGES</code> followed by a description of the breaking changes</li>
<li>A reference to a GitHub issue (or any other references, such as JIRA ticket number)</li>
</ul>
</li>
</ul>
<p>An example message could look like that:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span>refactor(footer): move footer widget into separate module</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BREAKING CHANGES</span></span>
<span class="line"><span>The footer widget needs to be imported from \`widgets/FootWidgetModule\` instead of \`common\` now.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>closes #45</span></span></code></pre>
<p>Following this pattern allows us to extract valuable information from the git history later.
We can generate a well-formatted changelog file without any manual effort.
It can easily be determined what version part will be increased and much more.</p><blockquote>
<p>You may think now: &quot;Wow, that style looks complicated and hard to remember.&quot; But don&#39;t worry: you will get used to it soon! In a second you will see how creating these messages can be simplified using <em>commitizen</em>.</p></blockquote>
<p>If you want to try you <em>commitlint</em> separately, you can even try it out using <code>npx</code>:</p><p><img src="images/blog/commitlint.svg" alt="commitlint cli"></p><p><em>ngx-semantic-version</em> will add the configuration file <code>commitlint.config.js</code> which can be adjusted later by your personal needs.</p><h3 id="husky-hook-into-the-git-lifecycle-">husky: Hook into the git lifecycle <a name="husky"></a></h3>
<p><a href="https://www.npmjs.com/package/husky">Husky</a> allows us to hook into the git lifecycle using Node.js.
We can use husky in combination with <em>commitlint</em> to check a commit message right before actually commiting it.
This is what <em>ngx-semantic-version</em> configures in our application.
It will add this part to your <code>package.json</code>:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">...</span></span>
<span class="line"><span style="color:#9ECBFF">"husky"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">  "hooks"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">    "commit-msg"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"commitlint -E HUSKY_GIT_PARAMS"</span></span>
<span class="line"><span style="color:#E1E4E8">  }</span></span>
<span class="line"><span style="color:#E1E4E8">},</span></span></code></pre>
<p>Husky uses the environment variable <code>HUSKY_GIT_PARAMS</code> containing the current git message you entered and it will pass this through <em>commitlint</em> so it can be evaluated.</p><p>Whenever you commit, <em>commitlint</em> will now automatically check your message.</p><h3 id="commitizen-easily-write-conventional-commit-messages-">commitizen: Easily write conventional commit messages <a name="commitizen"></a></h3>
<p>Defining a well-formed message text can be quite hard when you are not used to the <em>conventional-changelog</em> style.
The tool <em>commitizen</em> is there to help beginners and to prevent your own negligence.
It introduces a lots of restrictions for our commit messages so that it&#39;s easier for developers to follow the pattern.
<a href="https://www.npmjs.com/package/commitizen">Commitizen</a> will help you to always define a commit message in the appropriate format using an interactive CLI:</p><p><img src="images/blog/commitizen.svg" alt="commitizen cli"></p><p>When adding <em>ngx-semantic-version</em> it will configure <em>commitizen</em> to use the <em>conventional changelog</em> style as well:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D">// package.json</span></span>
<span class="line"><span style="color:#E1E4E8">...</span></span>
<span class="line"><span style="color:#9ECBFF">"config"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">  "commitizen"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">    "path"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"./node_modules/cz-conventional-changelog"</span></span>
<span class="line"><span style="color:#E1E4E8">  }</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>If you are using Visual Studio Code, you can also use the extension <a href="https://marketplace.visualstudio.com/items?itemName=KnisterPeter.vscode-commitizen">Visual Studio Code Commitizen Support</a> which will let you type the commit message directly in the editor:</p><p><img src="images/blog/commitizen-vscode.gif" alt="commitizen vscode plugin"></p><h3 id="standard-version-generate-changelogs-from-the-git-history-">standard-version: Generate changelogs from the git history <a name="standard-version"></a></h3>
<p><a href="https://www.npmjs.com/package/standard-version">Standard-version</a> is the cherry on the cake and takes advantage of a well-formed git history.
It will extract the commit message information like <code>fix</code>, <code>feature</code> and <code>BREAKING CHANGES</code> and use this information to automatically create a <code>CHANGELOG.md</code> file.
The tool will also determine the next version number for the project, according to the <a href="https://semver.org/">rules of semantic versioning</a>.</p><p><em>ngx-semantic-version</em> will configure a new script in your <code>package.json</code> that can be used for releasing a new version:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">...</span></span>
<span class="line"><span style="color:#9ECBFF">"scripts"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">  "release"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"standard-version"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">},</span></span></code></pre>
<p>Whenever you want to release a version, you should use <em>standard-version</em> to keep your versioning clean and the <code>CHANGELOG.md</code> up-to-date.
Furthermore, it references both commits and closed issues in your <code>CHANGELOG.md</code>, so that it&#39;s easier to understand what is part of in the release.
The tool will also tag the version in the git repo so that all versions will be available as releases via GitHub, Gitlab or whatever you are using.</p><h2 id="how-to-use-ngx-semantic-version-">How to use <em>ngx-semantic-version</em> <a name="how-to"></a></h2>
<p>Are you excited, too? Then let&#39;s get started!
Configuring all mentioned tools manually can be quite tedious.
Here is where <em>ngx-semantic-version</em> enters the game: It is an Angular schematic that will add and configure all the tools for you.</p><p>All we need it to run the following command:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">ng</span><span style="color:#9ECBFF"> add</span><span style="color:#9ECBFF"> ngx-semantic-version</span></span></code></pre>
<p>After installation, your <code>package.json</code> file will be updated.
You will also find a new file <code>commitlint.config.js</code> which includes the basic rule set for conventional commits.
You can <a href="https://commitlint.js.org/#/reference-rules">adjust the configuration</a> to satisfy your needs even more.</p><p>Try it out and make some changes to your project!
Commitlint will now check the commit message and tell you if it is valid or not.
It prevents you from commiting with a &quot;bad&quot; message.
To make things easier, <em>commitizen</em> will support you by building the message in the right format and it even explicitly asks you for issue references and breaking changes.</p><p>If you typically use <code>npm version</code> to cut a new release, now you do this instead:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">npm</span><span style="color:#9ECBFF"> run</span><span style="color:#9ECBFF"> release</span></span></code></pre>
<p>You should also consider using one of the following commands:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">npm</span><span style="color:#9ECBFF"> run</span><span style="color:#9ECBFF"> release</span><span style="color:#79B8FF"> --</span><span style="color:#79B8FF"> --first-release</span><span style="color:#6A737D">  # create the initial release and create the \`CHANGELOG.md\`</span></span>
<span class="line"><span style="color:#B392F0">npm</span><span style="color:#9ECBFF"> run</span><span style="color:#9ECBFF"> release</span><span style="color:#79B8FF"> --</span><span style="color:#79B8FF"> --prerelease</span><span style="color:#6A737D">     # create a pre-release instead of a regular one</span></span></code></pre>
<p><em>standard-version</em> will now do the following:</p><ol>
<li>&quot;Bump&quot; the version in <code>package.json</code></li>
<li>Update the <code>CHANGELOG.md</code> file</li>
<li>Commit the <code>package.json</code> and <code>CHANGELOG.md</code> files</li>
<li>Tag a new release in the git history</li>
</ol>
<p>Check out the <a href="https://www.npmjs.com/package/standard-version#release-as-a-pre-release">official documentation of <em>standard-version</em></a> for further information.</p><h2 id="conclusion">Conclusion</h2>
<p>I hope that <code>ngx-semantic-version</code> will make your daily work easier!
If you have a problem, please feel free to open an <a href="https://github.com/d-koppenhagen/ngx-semantic-version/issues">issue</a>.
And if you have any improvements, I&#39;m particularly happy about a <a href="https://github.com/d-koppenhagen/ngx-semantic-version/pulls">pull request</a>.</p><p><strong>Happy coding, committing and releasing!</strong></p><hr>

<p><strong>Thank you</strong></p><p>Special thanks go to <a href="https://twitter.com/fmalcher01">Ferdinand Malcher</a> and <a href="https://twitter.com/JohannesHoppe">Johannes Hoppe</a> for revising this article and discussing things.</p>`;export{e as default};
