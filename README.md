# d-koppenhagen.de

![Scully Publish](https://github.com/d-koppenhagen/d-koppenhagen.de/workflows/Scully%20Publish/badge.svg)

This project contains the source code for my personal website [d-koppenhagen.de](https://d-koppenhagen.de).

## Development

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
To see the static site content for the blog posts, you have to render them first using [_Scully_](https://github.com/scullyio/scully):

```bash
npm run build -- --prod
npm run scully
npm start
```

The file `src/environments/environment.prod.ts` is ignored as it contains some specific API keys, etc. Please copy the files from `environment.ts` before:

```bash
cp src/environments/environment.ts src/environments/environment.prod.ts
```

Or you can use `npm run scully:all` to see the completely rendered page.
