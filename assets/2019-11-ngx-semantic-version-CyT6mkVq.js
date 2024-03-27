const e=`---\r
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
  card: images/blog/ngx-semantic-version-header-small.jpg\r
---\r
\r
**In this article I will introduce the new tool \`ngx-semantic-version\`.\r
This new Angular Schematic allows you to set up all necessary tooling for consistent git commit messages and publishing new versions.\r
It will help you to keep your \`CHANGELOG.md\` file up to date and to release new tagged versions. All this is done by leveraging great existing tools like \`commitizen\`, \`commitlint\` and \`standard-version\`.**\r
\r
<hr>\r
\r
## TL;DR\r
\r
_ngx-semantic-version_ is an Angular Schematic that will add and configure _commitlint_, _commitizen_, _husky_ and _standard-version_ to enforce commit messages in the _conventional commit_ format and to automate your release and Changelog generation by respecting _semver_.\r
All you have to do for the setup is to execute this command in your Angular CLI project:\r
\r
\`\`\`bash\r
ng add ngx-semantic-version\r
\`\`\`\r
\r
## Introduction\r
\r
Surviving in the stressful day-to-day life of a developer is not easy.\r
One feature follows the other, bug fixes and breaking changes come in on a regular basis.\r
With all the hustle and bustle, there's literally no time to write proper commit messages.\r
\r
If we don't take this job serious, at the end of the day our git history will look like this:\r
\r
\`\`\`\r
* 65f597a (HEAD -> master) adjust readme\r
* f874d16 forgot to bump up version\r
* 3fa9f1e release\r
* d09e4ee now it's fixed!\r
* 70c7a9b this should really fix the build\r
* 5f91dab let the build work (hopefully)\r
* 44c45b7 adds some file\r
* 7ac82d3 lots of stuff\r
* 1e34db6 initial commit\r
\`\`\`\r
\r
When you see such a history you know almost nothing: neither what features have been integrated nor if there was a bugfix or a breaking change. There is almost no meaningful context.\r
\r
Wouldn't it be nice to have a cleaner git history that will follow a de facto standard which is commonly used?\r
\r
But more than this: having a clean and well-formatted git history can help us releasing new software versions respecting semantic versioning and generating a changelog that includes all the changes we made and references to the commits.\r
\r
No more struggle with forgotten version increasements in your \`package.json\`. No more manual changes in the \`CHANGELOG.md\` and missing references to necessary git commits. Wouldn't it be nice to automate the release process and generate the changelog and the package version by just checking and building it from a clean git history? And wouldn't it be nice to add all this stuff with one very simple single line command to your Angular project?\r
\r
**[_ngx-semantic-version_](https://www.npmjs.com/package/ngx-semantic-version) will give you all that.**\r
\r
## What does it do? <a name="what"></a>\r
\r
_ngx-semantic-version_ will add and configure the following packages for you.\r
We will take a look at each tool in this article.\r
\r
- **[commitlint](https://commitlint.js.org):** check commit messages to follow the conventional commit pattern\r
- **[husky](https://www.npmjs.com/package/husky):** hook into git events and run code at specific points (e.g. at commit or push)\r
- **[commitizen](https://www.npmjs.com/package/commitizen):** helper for writing conventional commit messages\r
- **[standard-version](https://www.npmjs.com/package/standard-version):** generate conventional changelogs from the git history\r
\r
### commitlint: Enforcing conventional commit messages <a name="commitlint"></a>\r
\r
[Commitlint](https://commitlint.js.org) will give you the ability to check your commit messages for a common pattern. A very prominent project following this pattern is the Angular repository itself. The [_conventional-commit_](https://www.conventionalcommits.org) pattern requires us to follow this simple syntax:\r
\r
\`\`\`\r
<type>[optional scope]: <description>\r
\r
[optional body]\r
\r
[optional footer]\r
\`\`\`\r
\r
Let's see what is the meaning of these parameters:\r
\r
- \`type\` can be one of the following codes:\r
  - \`build\`\r
  - \`ci\`\r
  - \`chore\`\r
  - \`docs\`\r
  - \`feat\`\r
  - \`fix\`\r
  - \`perf\`\r
  - \`refactor\`\r
  - \`revert\`\r
  - \`style\`\r
  - \`test\`\r
- \`scope\` is optional and can be used to reference a specific part of your application, e.g. \`fix(dashboard): add fallback for older browsers\`\r
- The \`description\` is mandatory and describes the commit in a very short form (also called \`subject\`)\r
- If necessary, a \`body\` and a \`footer\` with further information can be added which may contain:\r
  - The keyword \`BREAKING CHANGES\` followed by a description of the breaking changes\r
  - A reference to a GitHub issue (or any other references, such as JIRA ticket number)\r
\r
An example message could look like that:\r
\r
\`\`\`\r
refactor(footer): move footer widget into separate module\r
\r
BREAKING CHANGES\r
The footer widget needs to be imported from \`widgets/FootWidgetModule\` instead of \`common\` now.\r
\r
closes #45\r
\`\`\`\r
\r
Following this pattern allows us to extract valuable information from the git history later.\r
We can generate a well-formatted changelog file without any manual effort.\r
It can easily be determined what version part will be increased and much more.\r
\r
> You may think now: "Wow, that style looks complicated and hard to remember." But don't worry: you will get used to it soon! In a second you will see how creating these messages can be simplified using _commitizen_.\r
\r
If you want to try you _commitlint_ separately, you can even try it out using \`npx\`:\r
\r
![commitlint cli](images/blog/commitlint.svg)\r
\r
_ngx-semantic-version_ will add the configuration file \`commitlint.config.js\` which can be adjusted later by your personal needs.\r
\r
### husky: Hook into the git lifecycle <a name="husky"></a>\r
\r
[Husky](https://www.npmjs.com/package/husky) allows us to hook into the git lifecycle using Node.js.\r
We can use husky in combination with _commitlint_ to check a commit message right before actually commiting it.\r
This is what _ngx-semantic-version_ configures in our application.\r
It will add this part to your \`package.json\`:\r
\r
\`\`\`json\r
...\r
"husky": {\r
  "hooks": {\r
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"\r
  }\r
},\r
\`\`\`\r
\r
Husky uses the environment variable \`HUSKY_GIT_PARAMS\` containing the current git message you entered and it will pass this through _commitlint_ so it can be evaluated.\r
\r
Whenever you commit, _commitlint_ will now automatically check your message.\r
\r
### commitizen: Easily write conventional commit messages <a name="commitizen"></a>\r
\r
Defining a well-formed message text can be quite hard when you are not used to the _conventional-changelog_ style.\r
The tool _commitizen_ is there to help beginners and to prevent your own negligence.\r
It introduces a lots of restrictions for our commit messages so that it's easier for developers to follow the pattern.\r
[Commitizen](https://www.npmjs.com/package/commitizen) will help you to always define a commit message in the appropriate format using an interactive CLI:\r
\r
![commitizen cli](images/blog/commitizen.svg)\r
\r
When adding _ngx-semantic-version_ it will configure _commitizen_ to use the _conventional changelog_ style as well:\r
\r
\`\`\`json\r
// package.json\r
...\r
"config": {\r
  "commitizen": {\r
    "path": "./node_modules/cz-conventional-changelog"\r
  }\r
}\r
\`\`\`\r
\r
If you are using Visual Studio Code, you can also use the extension [Visual Studio Code Commitizen Support](https://marketplace.visualstudio.com/items?itemName=KnisterPeter.vscode-commitizen) which will let you type the commit message directly in the editor:\r
\r
![commitizen vscode plugin](images/blog/commitizen-vscode.gif)\r
\r
\r
\r
### standard-version: Generate changelogs from the git history <a name="standard-version"></a>\r
\r
[Standard-version](https://www.npmjs.com/package/standard-version) is the cherry on the cake and takes advantage of a well-formed git history.\r
It will extract the commit message information like \`fix\`, \`feature\` and \`BREAKING CHANGES\` and use this information to automatically create a \`CHANGELOG.md\` file.\r
The tool will also determine the next version number for the project, according to the [rules of semantic versioning](https://semver.org/).\r
\r
_ngx-semantic-version_ will configure a new script in your \`package.json\` that can be used for releasing a new version:\r
\r
\`\`\`json\r
...\r
"scripts": {\r
  "release": "standard-version",\r
},\r
\`\`\`\r
\r
Whenever you want to release a version, you should use _standard-version_ to keep your versioning clean and the \`CHANGELOG.md\` up-to-date.\r
Furthermore, it references both commits and closed issues in your \`CHANGELOG.md\`, so that it's easier to understand what is part of in the release.\r
The tool will also tag the version in the git repo so that all versions will be available as releases via GitHub, Gitlab or whatever you are using.\r
\r
## How to use _ngx-semantic-version_ <a name="how-to"></a>\r
\r
Are you excited, too? Then let's get started!\r
Configuring all mentioned tools manually can be quite tedious.\r
Here is where _ngx-semantic-version_ enters the game: It is an Angular schematic that will add and configure all the tools for you.\r
\r
All we need it to run the following command:\r
\r
\`\`\`bash\r
ng add ngx-semantic-version\r
\`\`\`\r
\r
After installation, your \`package.json\` file will be updated.\r
You will also find a new file \`commitlint.config.js\` which includes the basic rule set for conventional commits.\r
You can [adjust the configuration](https://commitlint.js.org/#/reference-rules) to satisfy your needs even more.\r
\r
Try it out and make some changes to your project!\r
Commitlint will now check the commit message and tell you if it is valid or not.\r
It prevents you from commiting with a "bad" message.\r
To make things easier, _commitizen_ will support you by building the message in the right format and it even explicitly asks you for issue references and breaking changes.\r
\r
If you typically use \`npm version\` to cut a new release, now you do this instead:\r
\r
\`\`\`bash\r
npm run release\r
\`\`\`\r
\r
You should also consider using one of the following commands:\r
\r
\`\`\`bash\r
npm run release -- --first-release  # create the initial release and create the \`CHANGELOG.md\`\r
npm run release -- --prerelease     # create a pre-release instead of a regular one\r
\`\`\`\r
\r
_standard-version_ will now do the following:\r
\r
1. "Bump" the version in \`package.json\`\r
2. Update the \`CHANGELOG.md\` file\r
3. Commit the \`package.json\` and \`CHANGELOG.md\` files\r
4. Tag a new release in the git history\r
\r
Check out the [official documentation of _standard-version_](https://www.npmjs.com/package/standard-version#release-as-a-pre-release) for further information.\r
\r
## Conclusion\r
\r
I hope that \`ngx-semantic-version\` will make your daily work easier!\r
If you have a problem, please feel free to open an [issue](https://github.com/d-koppenhagen/ngx-semantic-version/issues).\r
And if you have any improvements, I'm particularly happy about a [pull request](https://github.com/d-koppenhagen/ngx-semantic-version/pulls).\r
\r
**Happy coding, committing and releasing!**\r
\r
<hr>\r
\r
**Thank you**\r
\r
Special thanks go to [Ferdinand Malcher](https://twitter.com/fmalcher01) and [Johannes Hoppe](https://twitter.com/JohannesHoppe) for revising this article and discussing things.\r
`;export{e as default};
