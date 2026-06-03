/**
 * Local static server that mirrors the production deployment.
 * Serves the `dist/k9n-dev/browser/` directory with both locale builds (/de/, /en/),
 * the root redirect page, and 404 fallback — exactly like the production hosting.
 *
 * Usage: npx tsx scripts/serve-static.ts
 * Or via: npm run serve:preview
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve, extname } from 'node:path';

const ROOT_DIR = resolve(import.meta.dirname, '..');
const DIST_DIR = join(ROOT_DIR, 'dist', 'k9n-dev', 'browser');
const PORT = Number(process.env['PORT']) || 4200;

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json',
};

function getMimeType(filePath: string): string {
  return MIME_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
}

function tryServeFile(filePath: string): { content: Buffer; mime: string } | null {
  if (!existsSync(filePath)) return null;
  const stat = statSync(filePath);
  if (!stat.isFile()) return null;
  return { content: readFileSync(filePath), mime: getMimeType(filePath) };
}

if (!existsSync(DIST_DIR)) {
  console.error(`\n  ❌ Dist directory not found: ${DIST_DIR}`);
  console.error('  Run "npm run build:deploy" first to produce the production build.\n');
  process.exit(1);
}

const server = createServer((req, res) => {
  const url = new URL(req.url ?? '/', `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(url.pathname);

  // Remove trailing slash for file lookups (except root)
  if (pathname !== '/' && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  const filePath = join(DIST_DIR, pathname);

  // 1. Try exact file match
  const exact = tryServeFile(filePath);
  if (exact) {
    res.writeHead(200, { 'Content-Type': exact.mime });
    res.end(exact.content);
    return;
  }

  // 2. Try as directory → serve index.html inside it
  const indexPath = join(filePath, 'index.html');
  const index = tryServeFile(indexPath);
  if (index) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(index.content);
    return;
  }

  // 3. No locale prefix → 301 redirect to locale-prefixed URL.
  //    This handles backward-compatible legacy URLs (e.g., /blog/my-post → /de/blog/my-post).
  //    Uses a real HTTP 301 (permanent redirect) — proper for SEO.
  const localeMatch = pathname.match(/^\/(de|en)(\/|$)/);
  if (!localeMatch) {
    const locale = 'de'; // Default locale for server-side redirect (no JS detection possible)
    let target = `/${locale}${pathname}`;
    target = target.replace(/\/\/+/g, '/');
    // Preserve query string
    const qs = url.search || '';
    res.writeHead(301, { 'Location': target + qs });
    res.end();
    return;
  }

  // 4. SPA fallback: for locale-prefixed routes without a file,
  //    serve the locale's index.html (handles client-side routing)
  const locale = localeMatch[1];
  const localeIndex = join(DIST_DIR, locale, 'index.html');
  const fallback = tryServeFile(localeIndex);
  if (fallback) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(fallback.content);
    return;
  }

  // 4. Serve 404.html
  const notFound = tryServeFile(join(DIST_DIR, '404.html'));
  if (notFound) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(notFound.content);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`\n  🌐 Serving production build at:\n`);
  console.log(`     http://localhost:${PORT}/       (redirect → /de/ or /en/)`);
  console.log(`     http://localhost:${PORT}/de/    (German)`);
  console.log(`     http://localhost:${PORT}/en/    (English)\n`);
  console.log(`  Press Ctrl+C to stop.\n`);
});
