export type PostAttributes = {
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
};

export type Author = {
  name: string;
  mail: string;
};

export type Thumbnail = {
  header: string;
  card: string;
};

export type PublishedAt = {
  name: string;
  url: string;
  logo: string;
  linkExternal?: boolean;
};

export type LinkedOptions = {
  devTo: string;
  medium: string;
};

export type RelatedOptions = {
  slug: string;
  title: string;
};
