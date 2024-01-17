import { Feed } from 'feed';
import * as fs from 'fs';
import { defineEventHandler } from 'h3';
import { marked } from 'marked';
import * as path from 'path';
import fm from 'front-matter';
import { PostAttributes } from 'src/app/types';
import { createHash } from 'crypto';

function generateReproducibleHash(input: string): string {
  const hash = createHash('md5'); // You can use other algorithms like 'sha256', 'sha1', etc.

  // Update the hash with the input data
  hash.update(input);

  // Generate a hexadecimal digest
  const digest = hash.digest('hex');

  // Format the digest as a GUID
  const formattedGuid = `${digest.substring(0, 8)}-${digest.substring(
    8,
    12,
  )}-${digest.substring(12, 16)}-${digest.substring(16, 20)}-${digest.substring(
    20,
  )}`;

  return formattedGuid;
}

export default defineEventHandler((event) => {
  const baseDir = './src/content/blog';
  const baseUrl = 'https://k9n.dev';
  function generateRssFeed(): string {
    const mainFeed = new Feed({
      title: 'k9n.dev Blog',
      id: `${baseUrl}`, // replace with your site URL
      link: `${baseUrl}/api/rss.xml`, // replace with your feed URL
      language: 'de',
      copyright: '2024 by Danny Koppenhagen',
    });

    const files = fs.readdirSync(baseDir);
    files.forEach((file) => {
      const filePath = path.join(baseDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const frontmatter = fm<PostAttributes>(fileContent);

      const content = marked(frontmatter.body) as string;

      const headerImage = frontmatter.attributes.thumbnail?.header;
      const cardImage = frontmatter.attributes.thumbnail?.header;
      let image =
        typeof headerImage === 'string'
          ? headerImage
          : typeof cardImage === 'string'
            ? cardImage
            : undefined;
      image =
        image && /^https?:\/\//i.test(image) ? image : `${baseUrl}/${image}`;
      // Add item to the main feed
      mainFeed.addItem({
        title: frontmatter.attributes.title,
        id: generateReproducibleHash(file), // replace with your item URL
        link: `${baseUrl}/blog/${file.replace(/\.md$/, '')}`, // replace with your item URL
        description: frontmatter.attributes.description,
        date: new Date(
          frontmatter.attributes.updated || frontmatter.attributes.created,
        ),
        image,
        content: content,
        author: [
          {
            name: frontmatter.attributes.author.name,
            email: frontmatter.attributes.author.mail,
            link: baseUrl,
          },
        ],
        published: new Date(frontmatter.attributes.created),
      });
    });

    return mainFeed.rss2();
  }

  // Output the combined RSS feed as a string
  const rssFeedString = generateRssFeed();

  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(rssFeedString);
});
