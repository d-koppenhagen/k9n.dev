export interface JsonLdPerson {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  url: string;
  jobTitle: string;
  sameAs: string[];
}

export interface JsonLdArticle {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description: string;
  author: { '@type': 'Person'; name: string };
  datePublished: string;
  dateModified?: string;
  image?: string;
}

export interface JsonLdCollectionPage {
  '@context': 'https://schema.org';
  '@type': 'CollectionPage';
  name: string;
  description: string;
  url: string;
}

export interface JsonLdWebSite {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  potentialAction: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

export interface JsonLdBook {
  '@context': 'https://schema.org';
  '@type': 'Book';
  name: string;
  description: string;
  isbn: string;
  author: { '@type': 'Person'; name: string; url?: string }[];
  publisher: { '@type': 'Organization'; name: string };
  inLanguage: string;
  numberOfPages?: number;
  bookEdition?: string;
  datePublished: string;
  image?: string;
  url?: string;
}

export type JsonLdSchema = JsonLdPerson | JsonLdArticle | JsonLdCollectionPage | JsonLdWebSite | JsonLdBook;
