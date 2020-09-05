---
title: 'Author Angular Schematics by using common helpers'
description: 'Authoring an Angular CLI Schematic offers us a way to add, scaffold and update app related modules and files. In this article I will guide you through some common but currently undocumented helper functions you can use to achieve your goal.'
published: false
author:
  name: Danny Koppenhagen
  mail: mail@d-koppenhagen.de
created: 2020-09-11
updated: 2020-09-11
keywords:
  - Angular
  - 'Angular CLI'
  - Schematics
language: en
thumbnail:
  header: assets/images/blog/schematics-helpers/schematics-helpers.jpg
  card: assets/images/blog/schematics-helpers/schematics-helpers-small.jpg
slugs:
  - ___UNPUBLISHED___kepw8ihb_clayHamVsY3FJOTrgMAekr0QFSRFKSiS
---

Authoring an Angular CLI Schematic offers us a way to add, scaffold and update app related modules and files. However, there are some common things such as updating your `package.json` file, adding or removing an Angular module or updating component imports we will probably integrate in our schematics.

Currently, the way of authoring an Angular Schematic is documented at [angular.io](https://angular.io/guide/schematics-authoring).
But there is one big thing missing in the documentation: The way of integrating typical tasks.
The Angular CLI itself uses the schematics for e.g. generating modules and components, adding imports or modifying the `package.json`.
Under the hood each of the schematics uses some very common utils that are not documented by now but still available for all developers.
As I've seen some Angular CLI schematic projects where people trying to implement almost the same common util methods by their own as already implemented in the Angular CLI, I want to show you in this blog post some very typical helpers that you can use for you Angular CLI Schematic project to prevent any pitfalls.

<hr>

<div id="toc"><h2>Table of contents</h2></div>

<hr>

## Attention: not officially supported

As the following helper functions I present you in this article are not documented and officially supported, they may change in the future.
[Alan Agius](https://twitter.com/AlanAgius4), member of the Angular/Angular CLI core team replyed in a [realted issue (#15335)](https://github.com/angular/angular-cli/issues/15335#issuecomment-660609283) for creating a public schematics API reference:

> [...] those utils are not considered as part of the public API and might break without warning in any release.

So, there are plans to provide some utilities via public API but this is still in planning stages.
However, until this point of time, it's my intention, to keep this article as up-to-date as possible.

> The following Angular CLI schematics util functions I will present are based on the Angular CLI version `10.1.1`.

If you are using this functions, and they will break in the future, you can check out the [source code changes](https://github.com/angular/angular-cli/tree/master/packages/schematics/angular/utility) for the utility functions and adjust your code.

## Create an Angular Schematics example project

First things first: We need some project where we try out things.
You can either use an existing schematics project or simply create a new blank one:

```bash
npx @angular-devkit/schematics-cli blank --name=playground
```

> If you are not familar with the basics of authoring schematics, I would recommend you to read the [Angular Docs](https://angular.io/guide/schematics-authoring) and the [blog post _"Total Guide To Custom Angular Schematics"_ from Tomas Trajan](https://medium.com/@tomastrajan/total-guide-to-custom-angular-schematics-5c50cf90cdb4) first.

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

This will be our base for the following examples and explanations.
You should be sure you can execute the blank schematic by calling it on the console:

```bash
npx @angular-devkit/schematics-cli .:playground
```

or if you installed the schematics globally via `npm i @angular-devkit/schematics-cli`:

```bash
schematics .:playground
```

### Basic types

In case you are not familiar with the schematics, I will just explain some very basic things in short:

- A **`Tree`** is the structured virtual representation of every file in the workspace.
- A **`Rule`** is called with a `Tree` and a `SchematicContext`. The Rule is supposed to make changes on the `Tree` and returns the adjusted `Tree`.
- The **`SchematicContext`** contains information necessary for Schematics to execute some rules.

### Install the helpers from `@schematics/angular`

A second thing we need to do is to install the package `@schematics/angular` which contains all the utils we need for the further steps.
This package contains all the schematics the Angular CLI uses by itself when running command like `ng generate` or `ng new` etc.

```bash
npm i --save @schematics/angular
```

## Get, Add and Remove (dev-, peer-) dependencies of/in the `package.json` file

A very common thing when authoring a schematic is adding a dependency to the `package.json` file.
Of course, we can implement a function that parses and writes to/from our JSON file.
But why should we solve a problem that's already solved?

We can simply use the functions from `@schematics/angular/utility/dependencies` to handle such dependency operations.
The function `addPackageJsonDependency()` allows us to add a dependency object of type `NodeDependency` to the `package.json` file.
The property `type` must contain a value of the `NodeDependencyType` enum.
Behind it's values we will find the different section names a `package.json` file can contain:

- `dependencies`,
- `devDependencies`,
- `peerDependencies` and
- `optionalDependencies`.

As first parameter it needs the `Tree` with all it's files.
This util function will not just append the dependency to the appropriate section, it will insert the dependency also at the right place, so that the dependencies list is ordered ascending by their keys.

We can use the `getPackageJsonDependency()` function to request the dependency configuration as a `NodeDependency` object.
The good thing here: We don't need to know if we will request d dependency form the `dependencies`, `devDependencies`, `peerDependencies` or `optionalDependencies` section of the `package.json` file.

The third function I want to show you is `removePackageJsonDependency()`.
Like `getPackageJsonDependency()`, it needs also just the `Tree` and the package name and it will remove this dependency from the correct section in the `package.json` file.

By default, all this functions will use the `package.json` file in the root of the tree, but we can pass a third parameter containing a specific path to the `package.json` file.

Last but not least we don't want our users later to run manually a `npm install` on the console.
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

To really check that the `NodePackageInstallTask` is executed, you need to disable the schematics debug mode that's enabled by default during development and local execution:

```bash
schematics .:playground --debug=false
```


> [Checkout the implementation dependency operations in detail](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/dependencies.ts)

## Add a content to a specific position

Sometimes we need to change some contents of a file.
Independently of the type of a file, we can use the `InsertChange` class that'll return a change object containing the content to be added and the position where the change is inserted.
In the following example we will create a new file called `my-file.extension` with the content '`const a = 'foo';`' inside the virtual tree.
Now we will instantiate a new `InsertChange` with the file path, the position where we want to add the change and finally the content we want to add.
The next step for us is to start the update process for the file using the `beginUpdate` method on our tree.
This method returns an `UpdateRecorder`.
We use the `insertLeft()` method, and we will hand over the position and the content (`toAdd`) from the `InsertChange`.
The change is now marked but not proceeded.
To really update the files content, we need to call the `commitUpdate()` method on our tree with the `exportRecorder`.
When we will now call `tree.get(filePath)`, we can log the files content and see that the change has been proceeded.
To delete a file inside the virtual tree, we can use the `delete()` method with the file path on the tree.

```ts
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics/';
import { InsertChange } from '@schematics/angular/utility/change';

export function playground(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const filePath = 'my-file.fileextension';
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

> [Checkout the implementation for `InsertChange` in detail](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/change.ts)

## Determine relative path to project root

You might want to determine the relative path to your project root e.g. for using it in a template you want to apply in some location of your application.
To determine the correct relative import path string for the target, you can use the helper function `relativePathToWorkspaceRoot`.

```ts
import {
  Rule,
  SchematicContext,
  Tree,
  url,
  apply,
  applyTemplates,
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
          applyTemplates({
            relativePathToWorkspaceRoot: relativePathToWorkspaceRoot(nonRootPathDefinition),
          }),
        ]
      )
    );
  };
}
```

If you have for example a JSON file template in the directory `files` and you want to insert the path, you can use the helper function in the template as follows:

```json
{
  "foo": "<%= relativePathToWorkspaceRoot %>/my-file-ref.json",
}
```

For more details about how to use and apply templates in your own schematics, check out the [blog post from Tomas Trajan: _'Total Guide To Custom Angular Schematics'_](https://medium.com/@tomastrajan/total-guide-to-custom-angular-schematics-5c50cf90cdb4)

> [Checkout the implementations for `relativePathToWorkspaceRoot` in detail](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/paths.ts)


## Add TypeScript imports

In the last section we learned how to add content to some file.
However, this way for changing a file isn't the best and only works good when we do know the exact position where to add some content.
Image a user changes the format of the file before: This would lead into problems with finding the correct file position.

In many cases we want to modify TypeScript files and insert code into them.
And indeed there are also lot's of utils that will help us to manage such operations.

Imagine you want the schematic to import the class `Bar` in a specific file from the file `bar.ts`;
You could simply add the whole import line but there are edge cases:
What if the target file already contains an import or even a default import from `bar.ts`.
In that case we would have multiple import lines for `bar.ts` which causes problems.

Luckily there is another great helper that takes care of adding imports or updating existing ones.
The function `insertImport()` needs the source file to update and the path to the file followed by the import name and the file path for the import to be added.
The last parameter is optional — if set to `true`, the import will be added as a default import.

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
As we marked it as default import, the import it not added between the curly braces (`{ }`).

> [Checkout the implementation for `insertImport` in detail](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/change.ts)

## Update `NgModule`

Now we know how we can modify TypeScript imports using the util functions.
But importing something isn't enough in most cases.
There are common things like import a component and add it to the `NgModule` in the `declaration` array or inserting a module in the `exports` section.
For such operations we can use the helpers too.
These helpers are also based on the `insertImport` function, so that they will handle already existing file imports and just updating the import lists.

### Add a declaration to a module

The first thing I want to show you is how you can add a component to a `NgModule`'s `declarations`.
Imagine you will create a schematic that adds a `DashboardComponent` to your project.
You don't need to add the import manually and then find the right place where to insert the component to the `declarations` of the `NgModule`.
You can simply use the `addDeclarationToModule` function exported from `@schematics/angular/utility/ast-utils`.

In the following example we will create an `AppModule` from the `moduleContent` using `ts.createSourceFile()` first.
Then we will register the `updateRecorder` as learned in the examples before.
Now we call the `addDeclarationToModule()` function with the source file and the module path followed by the name of the component we want to import and the relative path to the module where we can find the component.
As a result it returns us an array of `Change`s that contains the positions and the contents for the change.
Now we can handle this changes one-by-one by iterating over the array.
For all changes of type `InsertChange` we can now call our `updateRecorder`s function `insertLeft` with the position of the change and the content to be added.

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
    ) as  InsertChange[];
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

When we execute the schematic now, we can see in the log, that the line `import { DashboardComponent } from './dashboard.component';` has been added to the file.

> [Checkout the implementations for ast-utils in detail](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/ast-utils.ts)

### Add imports, exports, providers, `bootstrap` and `entryComponents`

Similar to the previous example we can re-export something we imported by using the `addExportToModule` function and adding an import to the `NgModule` by using the `addImportToModule`.
We can also modify the providers and the `bootstrap` and `entryComponents` arrays by using the helpers `addProviderToModule()`, `addBootstrapToModule()` and `addEntryComponentToModule()`.
Again it will take care of all things we need to take care of such as already existing imports, if the properties `exports` / `imports` in the `NgModule` decorator are already present and need just to be updated or if it should be added and so on.

```ts
/* ... */
import {
  addImportToModule,
  addExportToModule,
  addProviderToModule,
  addBootstrapToModule,
  addEntryComponentToModule
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
    ) as  InsertChange[];
    const importChanges = addImportToModule(
      source,
      modulePath,
      'BarModule',
      './bar.module'
    ) as  InsertChange[];
    const providerChange = addProviderToModule(
      source,
      modulePath,
      'MyProvider',
      './my-provider.ts'
    ) as  InsertChange[];
    const bootstrapChange = addBootstrapToModule(
      source,
      modulePath,
      'MyComponent',
      './my.component.ts'
    ) as  InsertChange[];
    const entryComponentsChange = addEntryComponentToModule(
      source,
      modulePath,
      'BazComponent',
      './baz.component.ts'
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
  exports: [FooModule],
  entryComponents: [BazComponent]
})
export class AppModule { }
```

> [Checkout the implementations for ast-utils in detail](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/ast-utils.ts)

### Add route declarations

Let's have a look at another common scenario: We want that our schematic inserts a route definition to module that calls `RouterModule.forRoot()` or `.forChild()` with a route definition array.
Therefore, we can simply use the helper function `addRouteDeclarationToModule()` that returns us a `Change` object which we need to handle as an `InsertChange`.

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

> [Checkout the implementations for ast-utils in detail](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/ast-utils.ts)

## Retrieve the Angular workspace configuration

Each Angular app lives in an Angular workspace containing the `angular.json` configuration file.
If we want to get either the path to the workspace configuration file or the configuration from the file itself, we can use the `getWorkspacePath()` and `getWorkspace()` functions by passing the current `Tree` object over.

```ts
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspacePath, getWorkspace } from '@schematics/angular/utility/config';

export function playground(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // returns the path to the Angular configuration file
    // ('/angular.json' or probably `.angular.json` for older Angular projects)
    console.log(getWorkspacePath(tree));

    // returns the whole configuration object from the 'angular.json' file
    console.log(getWorkspace(tree));
  };
}
```

To try out things locally, we need to execute the schematics from an angular app root path on our system.
So simply navigate into an existing Angular app on your system or just create a new one fur testing purposes and execute the schematic from there by using the relative path to the `src/collection.json` file and adding the schematic name after the colon (`:`).

```bash
ng new some-test-project  # create a new test project
cd some-test-project      # be sure to be in the root of the angular project
# assume the schematics project itself is located relatively to the angular project in '../playground'
schematics ../playground/src/collection.json:playground # execute the 'playground' schematic
```

> [Checkout the implementations in detail](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/config.ts)

## Get default path for an app inside the workspace

An Angular workspace can contain multiple applications or libraries.
To find their appropriate main paths, you can use the helper function `createDefaultPath()`.
We need to pass over the `Tree` object and the string of the app or library we want to get the path for.

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
ng g lib my-lib  # create a new library inside the angular workspace
# assume the schematics project itself is located relatively to the angular project in '../playground'
schematics ../playground/src/collection.json:playground # execute the 'playground' schematic
```

> [Checkout the implementation for `createDefaultPath` in detail](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/workspace.ts)


## schematics calling schematics

If you run a schematic, you may come to the point where one schematic should execute another one.
For example: Imagine you will create schematics for generating a specific component on the one hand and on the other a `ng add` schematic that set up things for you and that creates an example component by default.
In such case you may want to combine multiple schematics.

Let's say we have collection file like the following:

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

And our factory for `ng add` is located in `src/ng-add/index.ts`.
Then inside this schematic we can call a new `RunSchematicTask` with the name of the schematic we want to execute and the project name from the Angular workspace.
To really execute the operation we need to pass the task to the `context`.

```ts
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';

export function ngAdd(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    context.addTask(
      new RunSchematicTask('playground', { project: 'schematics-test-project' })
    );
    return tree;
  };
}
```

To check if it works we can simply fill our playground (`src/playground/index.ts`) schematic as follows and log the call:

```ts
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function playground(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    console.log('schematic \'playground\' called');
    return tree;
  };
}
```

If we now run `schematics ../playground/src/collection.json:ng-add --debug=false` from our example Angular project, we can see that the `ng add` schematic called the `playground` schematic.

With this knowledge you can now define small schematics that can be executed standalone or from another schematic that combines probably multiple standalone schematics and calls them with specific values.

## Conclusion

The presented util functions are great and easy helpers you can use to create your own Angular CLI schematic.
But as they aren't official until now, you should keep track of any changes by watching the [documentation issue (#15335)](https://github.com/angular/angular-cli/issues/15335) and [changes on the related code](https://github.com/angular/angular-cli/tree/master/packages/schematics/angular/utility).

**Thank you**

Special thanks goes to [Minko Gechev](https://twitter.com/mgechev) and [Tomas Trajan](https://twitter.com/tomastrajan) for revising this article.

<hr>