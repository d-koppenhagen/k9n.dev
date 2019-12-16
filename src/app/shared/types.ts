export interface BlogEntryMeta {
  title: string;
  hidden: boolean;
  author: string;
  mail: string;
  published: Date | string; // Date on backend, ISO-formated string on client
  changed: Date | string; // Date on backend, ISO-formated string on client
  keywords: string[];
  language: string;
  thumbnail: string;
}

export interface BlogEntry {
  slug: string; // SEO-friendly path
  html_url: string; // preview url on github
  html: string;
  error?: string;
  meta: BlogEntryMeta;
}
