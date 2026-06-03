import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MetaManager } from '../../services/meta/meta';
import { SITE_CONFIG } from '../../config/site.config';
import { JsonLdBook } from '../../models/json-ld.model';

@Component({
  selector: 'app-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  templateUrl: './book-page.html',
  styleUrl: './book-page.css',
})
export class BookPage {
  private readonly metaService = inject(MetaManager);

  constructor() {
    this.metaService.updateMeta({
      title: 'Angular: Das Praxisbuch',
      description: 'Von den Grundlagen bis zur professionellen Entwicklung mit Signals. Das deutschsprachige Angular-Buch von Danny Koppenhagen, Ferdinand Malcher und Johannes Hoppe.',
      url: `${SITE_CONFIG.baseUrl}/book`,
      type: 'book',
      image: { url: 'images/book-cover-v1m.png', width: 400, height: 500 },
      imageAlt: 'Buchcover: Angular – Das Praxisbuch',
      bookIsbn: '978-3-86490-599-1',
      bookReleaseDate: '2026-06-01',
      bookAuthors: [
        'https://k9n.dev',
        'https://fmalcher.de',
        'https://johanneshoppe.com',
      ],
      bookTags: ['Angular', 'TypeScript', 'Signals', 'Web Development', 'Frontend'],
    });

    const bookSchema: JsonLdBook = {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: 'Angular: Das Praxisbuch',
      description: 'Von den Grundlagen bis zur professionellen Entwicklung mit Signals.',
      isbn: '978-3-86490-599-1',
      author: [
        { '@type': 'Person', name: 'Danny Koppenhagen', url: 'https://k9n.dev' },
        { '@type': 'Person', name: 'Ferdinand Malcher', url: 'https://fmalcher.de' },
        { '@type': 'Person', name: 'Johannes Hoppe', url: 'https://johanneshoppe.com' },
      ],
      publisher: { '@type': 'Organization', name: 'dpunkt.verlag' },
      inLanguage: 'de',
      numberOfPages: 700,
      bookEdition: '1. Auflage',
      datePublished: '2026-06-01',
      image: `${SITE_CONFIG.baseUrl}/images/book-cover-v1m.png`,
      url: 'https://angular-buch.com',
    };
    this.metaService.injectJsonLd(bookSchema);
  }
}
