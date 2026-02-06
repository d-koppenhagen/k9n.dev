const e=`---
title: 'vscode-code-review — Create exportable code reviews in vscode'
description: 'Create exportable code reviews in Visual Studio Code including automatic file and line references'
published: true
author:
  name: Danny Koppenhagen
  mail: mail@k9n.dev
updated: 2020-05-22T00:00:00.000Z
keywords:
  - code review
  - vscode
  - Visual Studio Code
language: en
thumbnail:
  header: images/projects/code-review.jpg
  card: images/projects/code-review-small.jpg
---

<p>It my job it happens from time to time that customers asking me about doing an expert review by checking their source code.
Sometimes I will get access to their git repository but mostly with very limited permissions (read access).
But it can happen also that I will just receive a <code>*.zip</code> file containing all the source code.</p><p>When I was working on a review I had always to copy the file and line references my comments were related to — which can be quite exhausting.
In the end, everything was landing in a good old Excel sheet which isn&#39;t leading in a good-looking report.</p><p>Another way to create a review would be to add code comments and create a pull/merge request at customers site.
But in the end all my comments would be part of the code and probably never cleaned up.</p><p>So I was looking for a way to easily create code reviews that can be exported and delivered to the customer without copying file and line references manually.
As I am used to work with <a href="https://code.visualstudio.com">Visual Studio Code</a>, I thought to search for some appropriate extensions but I wasn&#39;t successful.
In the end I decided: let&#39;s take the scepter and develop an extension by myself that will satisfy my and probably also your needs.</p><p>The result is my extensions <a href="https://marketplace.visualstudio.com/items?itemName=d-koppenhagen.vscode-code-review"><strong>vscode-code-review</strong></a>.</p><h2 id="features">Features</h2>
<p>You can simply install the extension via the <a href="https://marketplace.visualstudio.com/items?itemName=d-koppenhagen.vscode-code-review">Visual Studio Code Marketplace</a>.</p><p>Once installed, it will add a new menu option called <em>&#39;Code Review: Add Note&#39;</em> when being on an active file.
When you click this menu, a view opens to the right side with a form where you can enter your notes. The notes will be stored by default in the file <code>code-review.csv</code> on the top level of your project.
It includes automatically the relative file path as well as the cursor position and/or the marked text range(s).</p><p>When you finished your review, you can either process the <code>.csv</code> file by yourself and import it somewhere or generate an HTML report by using the extension (see GIF below).</p><p><img src="https://raw.githubusercontent.com/d-koppenhagen/vscode-code-review/master/images/demo.gif" alt="Demo"></p><p>You are also able to use an adjusted template for report generation.
Check out all the options in my related <a href="https://github.com/d-koppenhagen/vscode-code-review">Github repository</a>.</p>`;export{e as default};
