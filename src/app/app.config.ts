import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { provideFileRouter } from '@analogjs/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-asciidoc';
import 'prismjs/components/prism-diff';
import 'prismjs/plugins/diff-highlight/prism-diff-highlight';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideFileRouter(),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideContent(
      withMarkdownRenderer({
        loadMermaid: () => import('mermaid'),
      }),
    ),
  ],
};
