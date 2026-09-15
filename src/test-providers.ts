import { Provider } from '@angular/core';
import { PRECONNECT_CHECK_BLOCKLIST } from '@angular/common';

/**
 * Angular providers applied to every test's TestBed via the
 * `@angular/build:unit-test` builder `providersFile` option.
 *
 * NgOptimizedImage emits NG02956 for priority images whose origin has no
 * `<link rel="preconnect">` in the document head. The real preconnects live in
 * `src/index.html`, which TestBed never loads, so the check always fails under
 * jsdom. Blocklisting the origins keeps the (valid) production preconnects
 * while silencing the false-positive warning in tests.
 */
const providers: Provider[] = [
  {
    provide: PRECONNECT_CHECK_BLOCKLIST,
    useValue: [
      'https://website-articles.angular-buch.com',
      'https://dbsystel.github.io',
      'https://techstories.dbsystel.de',
    ],
    multi: true,
  },
];

export default providers;
