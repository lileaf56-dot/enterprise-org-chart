const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 固定專用端口
const PORT = 9527;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let safePath = req.url.split('?')[0];
  if (safePath === '/' || safePath === '') safePath = '/index.html';

  const filePath = path.join(BASE_DIR, safePath);
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      res.end(content);
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  const url = `http://127.0.0.1:${PORT}`;
  console.log(`[*] 本地 HTTP 服務已在固定端口啟動: ${url}`);
  exec(`start ${url}`);
});
