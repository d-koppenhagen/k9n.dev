export interface PostAttributes {
  title: string;
  slug?: string;
  draft?: boolean;
  description: string;
  published?: boolean;
  author: Author;
  created: string;
  updated?: string;
  publishedAt?: PublishedAt;
  keywords?: string[];
  language?: 'de' | 'en';
  thumbnail: Thumbnail;
  linked: LinkedOptions;
  series?: string;
  related?: RelatedOptions[];
}

export interface Author {
  name: string;
  mail: string;
}

export interface Thumbnail {
  header: string;
  card: string;
}

export interface PublishedAt {
  name: string;
  url: string;
  logo: string;
  linkExternal?: boolean;
}

export interface LinkedOptions {
  devTo: string;
  medium: string;
}

export interface RelatedOptions {
  slug: string;
  title: string;
}
