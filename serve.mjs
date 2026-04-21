import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const mime = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2',
};

createServer((req, res) => {
  const url = decodeURIComponent(req.url === '/' ? '/index.html' : req.url);
  const filePath = join(__dirname, url);
  if (!existsSync(filePath)) { res.writeHead(404); res.end('Not found'); return; }
  const ext = extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
  res.end(readFileSync(filePath));
}).listen(3000, () => console.log('http://localhost:3000'));
