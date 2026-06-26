/**
 * AT Protocol (standard.site) sync script.
 *
 * Creates/updates site.standard.publication and site.standard.document records
 * on the user's PDS (Personal Data Server) for Bluesky/ATProto integration.
 *
 * Usage:
 *   npm run atproto:sync
 *
 * Environment variables (via .env.local):
 *   ATPROTO_HANDLE   - Bluesky handle (e.g., k9n.dev)
 *   ATPROTO_PASSWORD - App password (create at https://bsky.app/settings/app-passwords)
 *   ATPROTO_PDS      - PDS URL (default: https://bsky.social)
 *   DRY_RUN          - Set to "true" to only preview actions without writing (default: false)
 *
 * This script:
 * 1. Authenticates with the PDS
 * 2. Creates/updates the publication record (site.standard.publication)
 * 3. Creates/updates document records for each blog post (site.standard.document)
 * 4. Writes rkeys back into blog post frontmatter automatically
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { AUTHOR } from '../src/data/author';
import { BLOG_POSTS } from '../src/app/content/blog-posts.generated';

const ROOT_DIR = resolve(import.meta.dirname, '..');
const BLOG_CONTENT_DIR = join(ROOT_DIR, 'src', 'content', 'blog');

const PDS_URL = process.env['ATPROTO_PDS'] || 'https://bsky.social';
const HANDLE = process.env['ATPROTO_HANDLE'];
const PASSWORD = process.env['ATPROTO_PASSWORD'];
const DRY_RUN = process.env['DRY_RUN'] === 'true';
const RECREATE = process.argv.includes('--recreate');

interface SessionResponse {
  did: string;
  accessJwt: string;
  refreshJwt: string;
}

interface RecordResponse {
  uri: string;
  cid: string;
}

interface ListRecordsResponse {
  records: {
    uri: string;
    cid: string;
    value: Record<string, unknown>;
  }[];
  cursor?: string;
}

async function createSession(): Promise<SessionResponse> {
  const res = await fetch(`${PDS_URL}/xrpc/com.atproto.server.createSession`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: HANDLE, password: PASSWORD }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Authentication failed: ${res.status} ${error}`);
  }

  return res.json() as Promise<SessionResponse>;
}

async function putRecord(
  session: SessionResponse,
  collection: string,
  rkey: string,
  record: Record<string, unknown>,
): Promise<RecordResponse> {
  const res = await fetch(`${PDS_URL}/xrpc/com.atproto.repo.putRecord`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessJwt}`,
    },
    body: JSON.stringify({
      repo: session.did,
      collection,
      rkey,
      record,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`putRecord failed for ${collection}/${rkey}: ${res.status} ${error}`);
  }

  return res.json() as Promise<RecordResponse>;
}

async function deleteRecord(
  session: SessionResponse,
  collection: string,
  rkey: string,
): Promise<void> {
  const res = await fetch(`${PDS_URL}/xrpc/com.atproto.repo.deleteRecord`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessJwt}`,
    },
    body: JSON.stringify({
      repo: session.did,
      collection,
      rkey,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`deleteRecord failed for ${collection}/${rkey}: ${res.status} ${error}`);
  }
}

async function listRecords(
  session: SessionResponse,
  collection: string,
): Promise<ListRecordsResponse['records']> {
  const allRecords: ListRecordsResponse['records'] = [];
  let cursor: string | undefined;

  do {
    const params = new URLSearchParams({
      repo: session.did,
      collection,
      limit: '100',
    });
    if (cursor) params.set('cursor', cursor);

    const res = await fetch(`${PDS_URL}/xrpc/com.atproto.repo.listRecords?${params}`, {
      headers: { Authorization: `Bearer ${session.accessJwt}` },
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`listRecords failed: ${res.status} ${error}`);
    }

    const data = (await res.json()) as ListRecordsResponse;
    allRecords.push(...data.records);
    cursor = data.cursor;
  } while (cursor);

  return allRecords;
}

/**
 * Generates a TID (Timestamp Identifier) for use as an rkey.
 * TIDs are 13-character base32-sortable encoded 64-bit integers.
 * Format: 53 bits microsecond timestamp + 10 bits random clock ID.
 * Alphabet: 234567abcdefghijklmnopqrstuvwxyz
 */
function generateTid(): string {
  const B32_CHARSET = '234567abcdefghijklmnopqrstuvwxyz';

  const timestampMicros = BigInt(Date.now()) * 1000n;
  const clockId = BigInt(Math.floor(Math.random() * 1024)); // 10 bits
  const tid64 = (timestampMicros << 10n) | clockId;

  // Encode as 13-character base32-sortable string
  let encoded = '';
  let value = tid64;
  for (let i = 0; i < 13; i++) {
    encoded = B32_CHARSET[Number(value & 31n)] + encoded;
    value >>= 5n;
  }

  return encoded;
}

async function syncPublication(session: SessionResponse): Promise<void> {
  const rkey = AUTHOR.atproto.publicationRkey;

  // --recreate: delete any existing publication records with wrong rkeys
  if (RECREATE) {
    const existingPubs = await listRecords(session, 'site.standard.publication');
    for (const record of existingPubs) {
      const existingRkey = record.uri.split('/').pop()!;
      if (existingRkey !== rkey) {
        if (DRY_RUN) {
          console.log(`[DRY RUN] Would delete old publication record: ${existingRkey}`);
        } else {
          await deleteRecord(session, 'site.standard.publication', existingRkey);
          console.log(`  ✗ Deleted old publication record: ${existingRkey}`);
        }
      }
    }
  }

  const record = {
    $type: 'site.standard.publication',
    url: AUTHOR.url,
    name: AUTHOR.siteName,
    description: AUTHOR.tagline.en,
    preferences: {
      showInDiscover: true,
    },
  };

  if (DRY_RUN) {
    console.log('\n[DRY RUN] Would create/update publication record:');
    console.log(`  rkey: ${rkey}`);
    console.log(`  record:`, JSON.stringify(record, null, 2));
    return;
  }

  const result = await putRecord(session, 'site.standard.publication', rkey, record);
  console.log(`✓ Publication record created/updated: ${result.uri}`);
}

async function syncDocuments(session: SessionResponse): Promise<number> {
  // Get existing document records
  const existingRecords = await listRecords(session, 'site.standard.document');
  const existingByPath = new Map<string, string>();

  for (const record of existingRecords) {
    const path = (record.value as Record<string, unknown>)['path'] as string | undefined;
    if (path) {
      const rkey = record.uri.split('/').pop()!;
      existingByPath.set(path, rkey);
    }
  }

  // --recreate: delete all existing document records first
  if (RECREATE && existingRecords.length > 0) {
    console.log(`Deleting ${existingRecords.length} existing document record(s)...`);
    for (const record of existingRecords) {
      const rkey = record.uri.split('/').pop()!;
      if (DRY_RUN) {
        console.log(`  [DRY RUN] Would delete record: ${rkey}`);
      } else {
        await deleteRecord(session, 'site.standard.document', rkey);
        console.log(`  ✗ Deleted: ${rkey}`);
      }
    }
    // Clear the map so all posts get new records
    existingByPath.clear();
  }

  const publicationUri = `at://${session.did}/site.standard.publication/${AUTHOR.atproto.publicationRkey}`;
  const frontmatterUpdates: { slug: string; rkey: string }[] = [];

  for (const post of BLOG_POSTS) {
    // Skip posts published externally (they have their own canonical URLs)
    if (post.publishedAt?.linkExternal) {
      continue;
    }

    const docPath = `/blog/${post.slug}`;
    let rkey: string;
    let isNew = false;

    if (!RECREATE && post.atprotoRkey) {
      // Post already has an rkey assigned — just update the record
      rkey = post.atprotoRkey;
    } else if (!RECREATE && existingByPath.has(docPath)) {
      // Record already exists on PDS but frontmatter is missing the rkey
      rkey = existingByPath.get(docPath)!;
      frontmatterUpdates.push({ slug: post.slug, rkey });
    } else {
      // New record needed (or --recreate forces fresh TIDs)
      rkey = generateTid();
      isNew = true;
      frontmatterUpdates.push({ slug: post.slug, rkey });
    }

    const record: Record<string, unknown> = {
      $type: 'site.standard.document',
      site: publicationUri,
      path: docPath,
      title: post.title,
      description: post.description,
      publishedAt: new Date(post.created).toISOString(),
      tags: post.keywords.slice(0, 10),
    };

    if (post.updated) {
      record['updatedAt'] = new Date(post.updated).toISOString();
    }

    if (DRY_RUN) {
      console.log(`\n[DRY RUN] ${isNew ? 'CREATE' : 'UPDATE'} document: ${post.slug}`);
      console.log(`  rkey: ${rkey}`);
      console.log(`  path: ${docPath}`);
    } else {
      await putRecord(session, 'site.standard.document', rkey, record);
      console.log(`✓ Document ${isNew ? 'created' : 'updated'}: ${post.slug} (rkey: ${rkey})`);
    }
  }

  // Write rkeys back into frontmatter files
  if (frontmatterUpdates.length > 0) {
    console.log(`\nWriting atprotoRkey to ${frontmatterUpdates.length} blog post(s)...`);
    for (const { slug, rkey } of frontmatterUpdates) {
      if (DRY_RUN) {
        console.log(`  [DRY RUN] Would write atprotoRkey: "${rkey}" → ${slug}`);
      } else {
        writeRkeyToFrontmatter(slug, rkey);
      }
    }
  } else {
    console.log('\nAll blog posts already have atprotoRkey in frontmatter.');
  }

  return frontmatterUpdates.length;
}

// ─── Frontmatter update helpers ──────────────────────────────────────────────

/**
 * Finds the markdown file for a blog post slug and inserts/updates
 * `atprotoRkey` in its YAML frontmatter.
 */
function writeRkeyToFrontmatter(slug: string, rkey: string): void {
  const filePath = resolveMarkdownPath(slug);
  if (!filePath) {
    console.warn(`  ⚠ Could not find markdown file for slug: ${slug}`);
    return;
  }

  const content = readFileSync(filePath, 'utf-8');

  // Check if atprotoRkey already exists in frontmatter
  if (/^atprotoRkey:/m.test(content)) {
    // Replace existing value
    const updated = content.replace(
      /^atprotoRkey:.*$/m,
      `atprotoRkey: "${rkey}"`,
    );
    writeFileSync(filePath, updated, 'utf-8');
  } else {
    // Insert before the closing `---` of frontmatter
    const closingIndex = content.indexOf('\n---', 4); // skip opening ---
    if (closingIndex === -1) {
      console.warn(`  ⚠ Could not parse frontmatter in: ${filePath}`);
      return;
    }
    const updated =
      content.slice(0, closingIndex) +
      `\natprotoRkey: "${rkey}"` +
      content.slice(closingIndex);
    writeFileSync(filePath, updated, 'utf-8');
  }

  console.log(`  ✓ Wrote atprotoRkey → ${slug}`);
}

/**
 * Resolves the markdown file path for a given blog post slug.
 * Supports folder-based (slug/README.md) and flat (slug.md) structures.
 */
function resolveMarkdownPath(slug: string): string | null {
  // Folder-based: src/content/blog/<slug>/README.md
  const folderPath = join(BLOG_CONTENT_DIR, slug, 'README.md');
  if (existsSync(folderPath)) {
    return folderPath;
  }

  // Flat: src/content/blog/<slug>.md
  const flatPath = join(BLOG_CONTENT_DIR, `${slug}.md`);
  if (existsSync(flatPath)) {
    return flatPath;
  }

  return null;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  if (!HANDLE || !PASSWORD) {
    console.error('Error: ATPROTO_HANDLE and ATPROTO_PASSWORD environment variables are required.');
    console.error('');
    console.error('Set them in .env.local:');
    console.error('  ATPROTO_HANDLE=k9n.dev');
    console.error('  ATPROTO_PASSWORD=<app-password>');
    console.error('');
    console.error('Create an app password at: https://bsky.app/settings/app-passwords');
    process.exit(1);
  }

  console.log(`Syncing standard.site records to ${PDS_URL}...`);
  console.log(`Handle: ${HANDLE}`);
  if (DRY_RUN) console.log('Mode: DRY RUN (no changes will be made)');
  if (RECREATE) console.log('Mode: RECREATE (deleting all existing document records first)');
  console.log();

  const session = await createSession();
  console.log(`Authenticated as ${session.did}\n`);

  await syncPublication(session);
  const updatedCount = await syncDocuments(session);

  console.log('\n✓ Sync complete!');
  if (updatedCount > 0 && !DRY_RUN) {
    console.log('  Run `npm run build:content` to regenerate the content manifests.');
  }
}

main().catch((error: unknown) => {
  console.error('AT Protocol sync failed:', error);
  process.exit(1);
});
