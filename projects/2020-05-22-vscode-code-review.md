---
title: vscode-code-review - Create exportable code reviews in vscode
description: Create exportable code reviews in Visual Studio Code inlcuding automatic file and line references
published: true
author: Danny Koppenhagen
mail: mail@d-koppenhagen.de
updated: 2020-05-22T00:00:00.000Z
keywords:
  - code review
  - vscode
  - Visual Studio Code
language: en
thumbnail: assets/images/projects/code-review.jpg
thumbnailSmall: assets/images/projects/code-review-small.jpg
---

# vscode-code-review

It my job it happens from time to time that customers asking me about doing an expert review by checking their source code.
Sometimes I will get accees to their git repository but mostly with very limited permissions (read access).
But it can happen also that I will just receive a `*.zip` file containing all the source code.

When I was working on a review I had always to copy the file and line references my comments were related to - which can be quite exhausting.
In the end, everything was landing in an good old Excel sheet which isn't leading in a good looking report.

Another way to create a review would be to add code comments and create a pull/merge request at customers site.
But in the end all my comments would be part of the code and probably never cleaned up.

So I was looking for a way to easily create code reviews that can be exported and delivered to the customer without copying file and line references manually.
As I am used to work with [Visual Studio Code](https://code.visualstudio.com), I thought to search for some appropriate extensions but I wasn't successfull.
In the end I decided: let's take the scepter and develop an extension by myself that will satisfy my and probably also your needs.

The result is my extensions [**vscode-code-review**](https://marketplace.visualstudio.com/items?itemName=d-koppenhagen.vscode-code-review).

## Features

You can simply install the extension via the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=d-koppenhagen.vscode-code-review).

Once installed, it will add a new menu option called _'Code Review: Add Note'_ when being on an active file.
When you click this menu, a view opens to the right side with a form where you can enter your notes. The notes will be stored by default in the file `code-review.csv` on the top level of your project.
It includes automatically the relative file path as well as the cursor postion and/or the marked text range(s).

When you finished your review, you can either process the `.csv` file by yourself and import it somewhere or generate an HTML report by using the extension (see GIF below).

![Demo](https://raw.githubusercontent.com/d-koppenhagen/vscode-code-review/master/images/demo.gif)

You are also able to use an adjusted template for report generation.
Check out all the options in my related [Github repository](https://github.com/d-koppenhagen/vscode-code-review).