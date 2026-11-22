// A tiny foreground static server for dist/, used by the browser tests (astro preview detaches when not in a terminal).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = new URL('../dist/', import.meta.url).pathname;
const port = Number(process.env.PORT ?? 4390);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.avif': 'image/avif', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain', '.pdf': 'application/pdf' };

createServer(async (req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  let file = join(root, path);
  try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); } catch {}
  try {
    let body = await readFile(file);
    const type = types[extname(file)] ?? 'application/octet-stream';
    const headers = { 'Content-Type': type };
    // Compress text the way Cloudflare does, so local measurements match production.
    if (/text|javascript|svg|xml/.test(type) && /gzip/.test(req.headers['accept-encoding'] ?? '')) { body = gzipSync(body); headers['Content-Encoding'] = 'gzip'; }
    if (path.startsWith('/_astro/')) headers['Cache-Control'] = 'public, max-age=31536000, immutable';
    res.writeHead(200, headers);
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': types['.html'] });
    res.end(await readFile(join(root, '404.html')).catch(() => 'Not found'));
  }
}).listen(port, () => console.log(`Serving dist/ on http://localhost:${port}`));
