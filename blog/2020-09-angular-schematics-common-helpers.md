---
title: 'Speed up your Angular Schematics development with useful helper functions'
description: 'Angular CLI Schematics offer us a way to add, scaffold and update app-related files and modules. In this article I will guide you through some common but currently undocumented helper functions you can use to achieve your goal.'
published: true
author:
  name: 'Danny Koppenhagen'
  mail: mail@d-koppenhagen.de
created: 2020-09-14
updated: 2020-09-14
keywords:
  - Angular
  - 'Angular CLI'
  - Schematics
language: en
thumbnail:
  header: assets/images/blog/schematics-helpers/schematics-helpers.jpg
  card: assets/images/blog/schematics-helpers/schematics-helpers-small.jpg
linked:
  devTo: https://dev.to/dkoppenhagen/speed-up-your-angular-schematics-development-with-useful-helper-functions-1kb2
---

# Speed up your Angular Schematics development with useful helper functions

Angular CLI Schematics offer us a way to add, scaffold and update app-related files and modules. However, there are some common things we will probably want integrate in our Schematics: updating your `package.json` file, adding or removing an Angular module or updating component imports.

Currently, the way of authoring an Angular Schematic is documented [on angular.io](https://angular.io/guide/schematics-authoring).
However, there is one big thing missing there: the way of integrating typical and repeating tasks.
The Angular CLI itself uses Schematics for e.g. generating modules and components, adding imports or modifying the `package.json` file.
Under the hood each of the Schematics uses some very common utils which are not yet documented but available for all developers anyway.
In the past, I've seen some Angular CLI Schematic projects where people were trying to implement almost the same common util methods on their own.
However, since some of these are already implemented in the Angular CLI, I want to show you some of those typical helpers that you can use for you Angular CLI Schematic project to prevent any pitfalls.

<hr>

<div id="toc"><strong>Table of contents</strong></div>

## ⚠️ Attention: not officially supported

The helper functions I present you in this article are neither documented nor officially supported, and they may change in the future.
[Alan Agius](https://twitter.com/AlanAgius4), member of the Angular CLI core team replied in a [related issue (#15335)](https://github.com/angular/angular-cli/issues/15335#issuecomment-660609283) for creating a public Schematics API reference:

> \[...\] those utils are not considered as part of the public API and might break without warning in any release.

So, there are plans to provide some utilities via a public API but this is still in the planning stage.
While things evolve, it's my intention to keep this article as up-to-date as possible.

> The following Angular CLI Schematics util functions are based on the Angular CLI version `10.1.1`.

If you use these functions and they will break in the future, you can check out the [source code changes](https://github.com/angular/angular-cli/tree/master/packages/schematics/angular/utility) for the utility functions and adjust your code.

## 🕹 Examples and playground on GitHub

To follow and try out the examples I present you in this article, I [prepared a playground repository on GitHub](https://github.com/d-koppenhagen/schematics-helpers-playground).
Clone this repo and check out the `README.md` inside to get started with the playground. 🚀

## Create an Angular Schematics example project

First things first: We need a project where we can try things out.
You can either use an existing Schematics project or simply create a new blank one:

```bash
npx @angular-devkit/schematics-cli blank --name=playground
```

> If you are not familar with the basics of authoring Schematics, I recommend you to read the [Angular Docs](https://angular.io/guide/schematics-authoring) and the [blog post _"Total Guide To Custom Angular Schematics"_ by Tomas Trajan](https://medium.com/@tomastrajan/total-guide-to-custom-angular-schematics-5c50cf90cdb4) first.

After setting up the new blank project we should have this file available: `src/playground/index.ts`.

```ts
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function playground(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    console.log('schematic works');
    return tree;
  };
}
```

This is the base for the following examples and explanations.
Please make sure that you can execute the blank schematic by calling it on the console:

```bash
npx @angular-devkit/schematics-cli .:playground
```

or if you installed the Schematics CLI globally via `npm i @angular-devkit/schematics-cli`:

```bash
schematics .:playground
```

The `.` refers to the current directory where our Schematics project lives.

[Check out the basic example in the playground repository on GitHub](https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/playground)

### Basic types

In case you are not familiar with the structure of Schematics, I will just explain some very basic things shortly:

- A **`Tree`** is the structured virtual representation of every file in the workspace which we apply the schematic to.
- A **`Rule`** is called with a `Tree` and a `SchematicContext`. The `Rule` is supposed to make changes on the `Tree` and returns the adjusted `Tree`.
- The **`SchematicContext`** contains information necessary for the Schematics to execute some rules.

### Install the helpers from `@schematics/angular`

A second thing we need to do is to install the package `@schematics/angular` which contains all the utils we need for the next steps.
This package contains all the Schematics the Angular CLI uses by itself when running commands like `ng generate` or `ng new` etc.

```bash
npm i --save @schematics/angular
```

## Changing the `package.json`: Get, Add and Remove (dev-, peer-) dependencies

A very common thing when authoring a schematic is adding a dependency to the `package.json` file.
Of course, we can implement a function that parses and writes to/from our JSON file.
But why should we solve a problem that's already solved?

For this, we can use the functions provided by `@schematics/angular/utility/dependencies` to handle dependency operations.
The function `addPackageJsonDependency()` allows us to add a dependency object of type `NodeDependency` to the `package.json` file.
The property `type` must contain a value of the `NodeDependencyType` enum.
Its values represent the different sections of a `package.json` file:

- `dependencies`,
- `devDependencies`,
- `peerDependencies` and
- `optionalDependencies`.

The first parameter to this util function is the `Tree` with all its files.
The function will not just append the dependency to the appropriate section, it will also insert the dependency at the right position, so that the dependencies list is ordered ascending by its keys.

We can use the `getPackageJsonDependency()` function to request the dependency configuration as a `NodeDependency` object.
The good thing here is: We don't need to know in which of the sections a dependency is located. It will look up the dependency in sections of the `package.json` file: `dependencies`, `devDependencies`, `peerDependencies` and `optionalDependencies`.

The third function I want to show is `removePackageJsonDependency()`.
Just like `getPackageJsonDependency()`, it can be called with a `Tree` and the package name and it will remove this dependency from the `package.json` file.

By default, all these functions will use the `package.json` file in the root of the tree, but we can pass a third parameter containing a specific path to another `package.json` file.

Last but not least we don't want our users to manually run `npm install` on the console after adding dependencies.
Therefore, we can add a new `NodePackageInstallTask` via the `addTask` method on our `context`.

```ts
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  NodeDependency,
  NodeDependencyType,
  getPackageJsonDependency,
  addPackageJsonDependency,
  removePackageJsonDependency,
} from '@schematics/angular/utility/dependencies';

export function playground(_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const dep: NodeDependency = {
      type: NodeDependencyType.Dev,
      name: 'moment',
      version: '~2.27.0',
      overwrite: true,
    };

    addPackageJsonDependency(tree, dep);
    console.log(getPackageJsonDependency(tree, 'moment'))
    // { type: 'devDependencies', name: 'moment', version: '~2.27.0' }

    removePackageJsonDependency(tree, 'protractor');
    console.log(getPackageJsonDependency(tree, 'protractor'))
    // null

    context.addTask(new NodePackageInstallTask(), []);

    return tree;
  };
}
```

To really check that the `NodePackageInstallTask` is properly executed, you need to disable the Schematics debug mode that's enabled by default during development and local execution:

```bash
schematics .:playground --debug=false
```


- [Check out the implementation of the dependency operations in detail.](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/dependencies.ts)
- [Check out the examples in the playground repository on GitHub](https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/dependencies)

## Add content on a specific position

Sometimes we need to change some contents of a file.
Independently of the type of a file, we can use the `InsertChange` class.
This class returns a change object which contains the content to be added and the position where the change is being inserted.

In the following example we will create a new file called `my-file.extension` with the content `const a = 'foo';` inside the virtual tree.
First, we will instantiate a new `InsertChange` with the file path, the position where we want to add the change and finally the content we want to add.
The next step for us is to start the update process for the file using the `beginUpdate()` method on our tree.
This method returns an object of type `UpdateRecorder`.
We can now use the `insertLeft()` method and hand over the position and the content (`toAdd`) from the `InsertChange`.
The change is now marked but not proceeded yet.
To really update the file's content we need to call the `commitUpdate()` method on our tree with the `exportRecorder`.
When we now call `tree.get(filePath)` we can log the file's content and see that the change has been proceeded.
To delete a file inside the virtual tree, we can use the `delete()` method with the file path on the tree.

Let's have a look at an implementation example:

```ts
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics/';
import { InsertChange } from '@schematics/angular/utility/change';

export function playground(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const filePath = 'my-file.extension';
    tree.create(filePath, `const a = 'foo';`);

    // insert a new change
    const insertChange = new InsertChange(filePath, 16, '\nconst b = \'bar\';');
    const exportRecorder = tree.beginUpdate(filePath);
    exportRecorder.insertLeft(insertChange.pos, insertChange.toAdd);
    tree.commitUpdate(exportRecorder);
    console.log(tree.get(filePath)?.content.toString())
    // const a = 'foo';
    // const b = 'bar';

    tree.delete(filePath); // cleanup (if not running schematic in debug mode)
    return tree;
  };
}
```

- [Check out the implementation for `InsertChange` in detail.](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/change.ts)
- [Check out the example in the playground repository on GitHub](https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/insert)

## Determine relative path to the project root

You might want to determine the relative path to your project root e.g. for using it in a template you want to apply in some location of your application.
To determine the correct relative import path string for the target, you can use the helper function `relativePathToWorkspaceRoot()`.

```ts
import {
  Rule,
  SchematicContext,
  Tree,
  url,
  apply,
  template,
  mergeWith
} from '@angular-devkit/schematics/';
import { relativePathToWorkspaceRoot } from '@schematics/angular/utility/paths';

export function playground(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const nonRootPathDefinition = 'foo/bar/'; // "./foo/bar" | "foo/bar/" work also
    const rootPathDefinition = ''; // "." | "./" work also
    console.log(relativePathToWorkspaceRoot(nonRootPathDefinition));
    // "../.."
    console.log(relativePathToWorkspaceRoot(rootPathDefinition));
    // "."

    const sourceTemplates = url('./files');
    return mergeWith(
      apply(
        sourceTemplates, [
          template({
            relativePathToWorkspaceRoot: relativePathToWorkspaceRoot(nonRootPathDefinition),
          }),
        ]
      )
    );
  };
}
```

If you have e.g. a JSON file template in the directory `files` and you want to insert the path, you can use the helper function in the template as follows:

```json
{
  "foo": "<%= relativePathToWorkspaceRoot %>/my-file-ref.json"
}
```

For more details about how to use and apply templates in your own Schematics, check out the [blog post by Tomas Trajan: _'Total Guide To Custom Angular Schematics'_](https://medium.com/@tomastrajan/total-guide-to-custom-angular-schematics-5c50cf90cdb4).

- [Check out the implementation for `relativePathToWorkspaceRoot()` in detail.](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/paths.ts)
- [Check out the example in the playground repository on GitHub](https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/relative-path)

## Add TypeScript imports

In the previous section we learned how to add content to some file.
However, this way for changing a file isn't the best and only works well when we know the exact position where to add some content.
Now imagine a user changes the format of the file before: This would lead to problems with finding the correct file position.

In many cases we want to modify TypeScript files and insert code into them.
And indeed there are also lots of utils that will help us to manage such operations.

Imagine you want the schematic to import the class `Bar` in a specific file from the file `bar.ts`;
You could simply add the whole import line but there are edge cases:
What if the target file already contains an import or even a default import from `bar.ts`.
In that case we would have multiple import lines for `bar.ts` which causes problems.

Luckily there is another great helper that takes care of adding imports or updating existing ones.
The function `insertImport()` needs the source file to update and the path to the file followed by the import name and the file path for the import to be added.
The last parameter is optional – if set to `true`, the import will be added as a default import.

```ts
import * as ts from 'typescript';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics/';
import { insertImport } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';

export function playground(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const filePath = 'some-file.ts';
    const fileContent = `import { Foo } from 'foo';
const bar = 'bar;
`;
    tree.create(filePath, fileContent);
    const source = ts.createSourceFile(
      filePath,
      fileContent,
      ts.ScriptTarget.Latest,
      true
    );
    const updateRecorder = tree.beginUpdate(filePath);
    const change = insertImport(source, filePath, 'Bar', './bar', true);
    if (change instanceof InsertChange) {
      updateRecorder.insertRight(change.pos, change.toAdd);
    }
    tree.commitUpdate(updateRecorder);
    console.log(tree.get(filePath)?.content.toString())
    return tree;
  };
}
```

The example above will add the content `import Bar from './bar';` right before the constant.
As we marked it as default import, the import name is not put in curly braces (`{ }`).

- [Check out the implementation for `insertImport()` in detail.](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/change.ts)
- [Check out the example in the playground repository on GitHub](https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/import)

## Update `NgModule`

Now we know how we can modify TypeScript imports using the util functions.
However, just importing something isn't enough in most cases.
There are common things like importing a component and adding it to the `NgModule` in the `declarations` array or inserting a module in the `imports` section.
Luckily, there are some helpers provided for these operations.
These function also based on the `insertImport()` function, so that they will handle existing file imports and just update the import lists accordingly.

### Add a declaration to a module

The first thing I want to show you is how you can add a component to the `declarations` of an `NgModule`.
For this, let's assume you create a schematic that adds a new `DashboardComponent` to your project.
You don't need to add the import manually and then determine the right place to insert the component to the `declarations` of the `NgModule`.
Instead, you can use the `addDeclarationToModule()` function exported from `@schematics/angular/utility/ast-utils`.

In the following example we will create an `AppModule` from the `moduleContent` using `ts.createSourceFile()` first.
Then we will register the `updateRecorder` as learned in the examples before.
Now we call the `addDeclarationToModule()` function with the source file and the module path followed by the name of the component we want to import and the relative path to the module where we can find the component.
As a result it returns us an array of `Change` objects that contain the positions and the contents for the change.
Finally, we can handle these changes one-by-one by iterating over the array.
For all changes of type `InsertChange` we can now call the method `updateRecorder.insertleft()` with the position of the change and the content to be added.

```ts
import * as ts from 'typescript';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics/';
import { addDeclarationToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';

export function playground(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const modulePath = 'app.module.ts';
    const moduleContent = `import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
`;
    tree.create(modulePath, moduleContent);

    const source = ts.createSourceFile(
      modulePath,
      moduleContent,
      ts.ScriptTarget.Latest,
      true
    );
    const updateRecorder = tree.beginUpdate(modulePath);
    const changes = addDeclarationToModule(
      source,
      modulePath,
      'DashboardComponent',
      './dashboard.component'
    ) as InsertChange[];
    for (const change of changes) {
      if (change instanceof InsertChange) {
        updateRecorder.insertLeft(change.pos, change.toAdd);
      }
    }
    tree.commitUpdate(updateRecorder);
    console.log(tree.get(modulePath)?.content.toString())

    return tree;
  };
}
```

When we execute this schematic now, we can see in the log that the following import line has been added to the file:

```ts
/* ... */
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  /* ... */
})
export class AppModule { }
```

### `NgModule`: add `imports`, `exports`, `providers`, and `bootstrap`

Similar to the previous example we can re-export something we imported by using the `addExportToModule()` function and adding an import to the `NgModule` by using `addImportToModule()`.
We can also modify the `providers`, and `bootstrap` arrays by using  `addProviderToModule()` and  `addBootstrapToModule()`.
Again, it will take care of all the things necessary such as extending and creating imports, checking for existing entries in the `NgModule` metadata and much more.

```ts
/* ... */
import {
  addImportToModule,
  addExportToModule,
  addProviderToModule,
  addBootstrapToModule
} from '@schematics/angular/utility/ast-utils';
/* ... */

export function playground(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    /* ... */
    const exportChanges = addExportToModule(
      source,
      modulePath,
      'FooModule',
      './foo.module'
    ) as InsertChange[];
    const importChanges = addImportToModule(
      source,
      modulePath,
      'BarModule',
      './bar.module'
    ) as InsertChange[];
    const providerChanges = addProviderToModule(
      source,
      modulePath,
      'MyProvider',
      './my-provider.ts'
    ) as InsertChange[];
    const bootstrapChanges = addBootstrapToModule(
      source,
      modulePath,
      'MyComponent',
      './my.component.ts'
    ) as  InsertChange[];
    /* ... */
    console.log(tree.get(modulePath)?.content.toString())
    return tree;
  };
}
```

Our result will now look like this:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FooModule } from './foo.module';
import { BarModule } from './bar.module';
import { MyProvider } from './my-provider.ts';
import { MyComponent } from './my.component.ts';
import { BazComponent } from './baz.component.ts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BarModule
  ],
  providers: [MyProvider],
  bootstrap: [MyComponent],
  exports: [FooModule]
})
export class AppModule { }
```

### Add route declarations

Let's have a look at another common scenario: We want our schematic to insert a route definition to a module that calls `RouterModule.forRoot()` or `.forChild()` with a route definition array.
For this, we can use the helper function `addRouteDeclarationToModule()` which returns a `Change` object which we need to handle as an `InsertChange`.

```ts
import * as ts from 'typescript';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics/';
import { addRouteDeclarationToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';

export function playground(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const modulePath = 'my-routing.module.ts';
    const moduleContent = `import { NgModule } from '@angular/core';

    const myRoutes = [
      { path: 'foo', component: FooComponent }
    ];

    @NgModule({
      imports: [
        RouterModule.forChild(myRoutes)
      ],
    })
    export class MyRoutingModule { }
`;
    tree.create(modulePath, moduleContent);

    const source = ts.createSourceFile(
      modulePath,
      moduleContent,
      ts.ScriptTarget.Latest,
      true
    );
    const updateRecorder = tree.beginUpdate(modulePath);
    const change = addRouteDeclarationToModule(
      source,
      './src/app',
      `{ path: 'bar', component: BarComponent }`
    ) as InsertChange;
    updateRecorder.insertLeft(change.pos, change.toAdd);
    tree.commitUpdate(updateRecorder);
    console.log(tree.get(modulePath)?.content.toString())

    return tree;
  };
}
```

The example above will insert the route definition object `{ path: 'bar', component: BarComponent }` into the `myRoutes` array by finding the variable associated in `forRoot()` or `forChild()`.

- [Check out the implementation for ast-utils in detail.](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/ast-utils.ts)
- [Check out the examples for module operations in the playground repository on GitHub](https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/module)

## Retrieve the Angular workspace configuration

Each Angular app lives in an Angular workspace containing an `angular.json` configuration file.
If we want to get either the path to the workspace configuration file or the configuration from the file itself, we can use the `getWorkspacePath()` and `getWorkspace()` functions by passing in the current `Tree` object.

```ts
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspacePath, getWorkspace } from '@schematics/angular/utility/config';

export function playground(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // returns the path to the Angular configuration file
    // ('/angular.json' or probably `.angular.json` for older Angular projects)
    console.log(getWorkspacePath(tree));

    // returns the whole configuration object from the 'angular.json' file
    console.log(JSON.stringify(getWorkspace(tree), null, 2));
  };
}
```

To try out things locally, we need to execute the Schematics from an Angular app root path on our system.
To do so, navigate into an existing Angular app or create a new one for testing purposes.
Then, execute the schematic from there by using the relative path to the `src/collection.json` file and adding the schematic name after the colon (`:`).

```bash
ng new some-test-project --routing  # create a new test project
cd some-test-project      # be sure to be in the root of the angular project
# assume the Schematics project itself is located relatively to the angular project in '../playground'
schematics ../playground/src/collection.json:playground # execute the 'playground' schematic
```

- [Check out the implementation in detail.](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/config.ts)
- [Check out the example in the playground repository on GitHub](https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/config)

## Get default path for an app inside the workspace

An Angular workspace can contain multiple applications or libraries.
To find their appropriate main paths, you can use the helper function `createDefaultPath()`.
We need to pass in the `Tree` object and the name of the app or library we want to get the path for.

```ts
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { createDefaultPath } from '@schematics/angular/utility/workspace';

export function playground(_options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    const defaultPath = await createDefaultPath(tree, 'my-lib');
    console.log(defaultPath); // '/projects/my-lib/src/lib'
  };
}
```

Let's create a new library inside our testing Angular app called `my-lib`, to try it out:

```bash
ng g lib my-lib  # create a new library inside the Angular workspace
# assume the Schematics project itself is located relatively to the angular project in '../playground'
schematics ../playground/src/collection.json:playground # execute the 'playground' schematic
```

- [Check out the implementation for `createDefaultPath()` in detail.](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/workspace.ts)
- [Check out the example in the playground repository on GitHub](https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/worksapce)

## Call Schematics from Schematics

If you run a schematic, you may come to the point where one schematic should execute another one.
For example: You create Schematics for generating a specific component.
You also develop a `ng add` schematic to set up things for you and create an example component by default.
In such cases you may want to combine multiple Schematics.

Let's say we have a collection file like the following:

```json
{
  "$schema": "../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "ng-add": {
      "description": "Demo that calls the 'playground' schematic inside",
      "factory": "./ng-add/index#ngAdd"
    },
    "playground": {
      "description": "An example schematic.",
      "factory": "./playground/index#playground"
    }
  }
}
```

The factory for `ng add` is located in `src/ng-add/index.ts`.
Then inside this schematic we can call a new `RunSchematicTask` with the name of the schematic we want to execute and the project name from the Angular workspace.
To really execute the operation we need to pass the task to the `context`.

```ts
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';

export function ngAdd(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    context.addTask(
      new RunSchematicTask('playground', { project: 'test-workspace' })
    );
    return tree;
  };
}
```

To check if it works we can fill our playground (`src/playground/index.ts`) schematic as follows and log the call:

```ts
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function playground(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    console.log('schematic \'playground\' called');
    return tree;
  };
}
```

If we now run `schematics ../playground/src/collection.json:ng-add --debug=false` from our example Angular project, we can see that the `ng add` schematic has called the `playground` schematic.

With this knowledge you can define small atomic Schematics that can be executed "standalone" or from another schematic that combines multiple standalone Schematics and calls them with specific parameters.

- [Check out the example in the playground repository on GitHub](https://github.com/d-koppenhagen/schematics-helpers-playground/tree/master/playground/src/schematic-task)

## Conclusion

The presented util functions are great and comfortable helpers you can use to create your own Angular CLI Schematics.
However, as they aren't officially published until now, you should keep track of any changes by keeping an eye on the [documentation issue (#15335)](https://github.com/angular/angular-cli/issues/15335) and [changes on the related code](https://github.com/angular/angular-cli/tree/master/packages/schematics/angular/utility).

## Summary

| Function                        | Description                                                                                                     |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `getPackageJsonDependency()`    | Get a package configuration from the `package.json` (dev-, peer-, optional-) dependencies config.               |
| `addPackageJsonDependency()`    | Add a NPM package to the `package.json` as (dev-, peer-, optional-) dependency.                                 |
| `removePackageJsonDependency()` | Remove a NPM package from the `package.json` (dev-, peer-, optional-) dependencies.                             |
| `relativePathToWorkspaceRoot()` | Get the relative import path to the root of the workspace for a given file inside the workspace.                |
| `insertImport()`                | Insert an import statement for a file to an existing TypeScript file.                                           |
| `addDeclarationToModule()`      | Import a declaration (e.g. Component or Directive) and add it to the `declarations` array of an Angular module. |
| `addImportToModule()`           | Import an Angular Module and add it to the `imports` array of another Angular module.                           |
| `addExportToModule()`           | Import an Angular Module and add it to the `exports` array of another Angular module.                           |
| `addProviderToModule()`         | Import a service / provider and add it to the `providers` array of an Angular module.                           |
| `addBootstrapToModule()`        | Import a Component and add it to the `bootstrap` array of an Angular module.                                    |
| `addRouteDeclarationToModule()` | Add a route definition to the router configuration in an Angular routing module.                                |
| `getWorkspacePath()`            | Retrieve the path to the Angular workspace configuration file (`angular.json`).                                 |
| `getWorkspace()`                | Get the configuration object from the Angular workspace configuration file (`angular.json`)                     |
| `createDefaultPath()`           | Get the default application / library path for a project inside an Angular workspace.                           |

| Class                    | Description                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `InsertChange`           | This class returns a change object with the content to be added and the position where a change is being inserted. |
| `NodePackageInstallTask` | A task instance that will perform a `npm install` once instantiated and added to the `context` via `addTask()`.    |
| `RunSchematicTask`       | A task that runs another schematic after instantiation and adding it to the `context` via `addTask()`.             |

**Thank you**

Special thanks goes to [Minko Gechev](https://twitter.com/mgechev), [Tomas Trajan](https://twitter.com/tomastrajan) and [Ferdinand Malcher](https://twitter.com/fmalcher01) for the feedback and revising this article.

<hr>
