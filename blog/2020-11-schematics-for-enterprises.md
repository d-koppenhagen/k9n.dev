---
title: 'Schematics for enterprises'
description: 'In this article I will guide you through the process of developing schematics for enterprises and how you can combine the to adress new as well as existing projects and power them up'
published: false
author:
    name: 'Danny Koppenhagen'
    mail: mail@d-koppenhagen.de
created: 2020-01-01T00:00:00.000Z
updated: 2020-01-01T00:00:00.000Z
publishedAt:
    name: 'Publisher Name'
    url: 'https://example.com'
    logo: 'https://example.com/img/brand.svg'
linked:
    devTo: 'https://dev.to/foo'
    medium: 'https://medium.com/foo'
keywords:
    - Angular
language: en
thumbnail:
    header: assets/images/bg3.jpg
    card: assets/images/bg3.jpg
slugs:
    - ___UNPUBLISHED___khed3tyx_ZTQcClh9cXZEEV1MmWppZBciQxqdxU9g
---

# Schematics for enterprises

Bringing consistency into big companies with lot's of projects and development teams can be quite a mission.
Even if all your projects are based on an enterprise application framework like Angular and share very common established best practices, project setups can vary from project to project.
Enterprise applications (even if they are internal or external) will follow cooperate design rules and implement common things such as a single-sign-on (SSO).
They will all use common settings / configuration files and may use shared deployment pipeline configurations.
When setting up a new project, you will fastly come to the point where you copy your latest project setup with all that things as a good foundation for your new project.
In the result this will cause that newer projects will satisfy more and more all the needs compared to older ones and the older ones have to trace and adopt those changes manually.

## Reference implementations / architectures

To provide a good consistent foundation for many new projects, some companies will even invest and develop a reference architecture / project that can be forked for new projects.
This approach is quite good and will at least address new projects coming up and provide the latest most feature-complete project foundation.
As long as such a reference architecture is maintained and updated always it will save time, and money overall when looking not only at a single project.
Also, it will help to introduce company defaults and prevent others from re-inventing the wheel.
But there are some issues with this approach:

- There aren't any updates / migrations for projects forked from the reference architecture at a certain point of time.
  Developers have to take care of changes in the repository and may have to adopt the changes to their forked project.
  So in the end, your forked project is may outdated directly after you copied / forked it.
- Just new projects will benefit from this reference architecture.
  Existing projects can just checkout the sources and adopt the implementation.
- The reference architecture will may include stuff, you don't need for your very specific project (e.g. you don't need a SSO).
  So you have to clean up your project base before writing any new line of code.
- Breaking Changes in your company environment (such as a changed authentication endpoint URL) must be addressed manually in the reference architecture as well as in each application in your company.

As we can see: We still have to take care of a lot of things and adjust a lot of repositories to keep them always up-to-date.
So how can we improve the overall process and save money and time for our whole company?

The answer is: Invest your time in developing _Angular Schematics_ for your enterprise and provide good migrations script when things will change.

In the following article I will guide you through the process of developing schematics for enterprises and how you can combine the to adress new as well as existing projects.

## Imagination company: awesome-candy-enterprises

To make things less abstract, imagine you are working in company called _awesome-candy-enterprises_.
The company produces (you may guess it): candies.
The company has a lot's of brands for different kinds of candies with different colors, shapes and flavours.
But for all their brands they have separate websites following a unique coorperate design.

awesome-candy-enterprises has also it's own CSS/SCSS library that's published in an internal Artifactory
All branded websites are Angular Apps stored in repositories at Gitlab.

At the point of time where we decided to start working on Schematics for _awesome-candy-enterprises_, we already have 30 Angular projects.
10 of them still have to implement a Single-Sign-On for registered users.
But within the next month new brands will be created by _awesome-candy-enterprises_ and all of them will need a branded Angular App.

Okay, now we have a good imagination from our company and about the things we have to address with our schematics:

- setup new projects using the latest company defaults (like creating a reference architecture)
- power-up existing projects with projects defaults provided by _awesome-candy-enterprises_
- adding / generating parts of the reference architecture such as a SSO and integrate it in an existing project
- react on updates and provide migration for projects that already rely on _awesome-candy-enterprises_ schematics

### Plan the schematics structure

<!-- TODO: add graphic with dependencies -->

### Code generator schematics (usage with `ng g`)

#### Test your code

### Power-up an existing project (usage with `ng add`)

#### Test your code

### Create a new project (usage with `ng new`)

#### Test your code

### Provide migrations (usage with `ng update`)

#### Test your code


