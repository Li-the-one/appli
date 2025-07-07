const http = require('http');
const { randomUUID } = require('crypto');

let moodboards = [];

function sendJSON(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/moodboards') {
    sendJSON(res, 200, moodboards);
  } else if (req.method === 'POST' && req.url === '/moodboard') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      const id = randomUUID();
      const name = body.trim() || 'Untitled';
      const board = { id, name };
      moodboards.push(board);
      sendJSON(res, 201, board);
    });
  } else if (req.method === 'DELETE' && req.url.startsWith('/moodboard/')) {
    const id = req.url.split('/')[2];
    const idx = moodboards.findIndex(b => b.id === id);
    if (idx > -1) {
      moodboards.splice(idx, 1);
      sendJSON(res, 200, { deleted: id });
    } else {
      sendJSON(res, 404, { error: 'Not found' });
    }
  } else {
    sendJSON(res, 404, { error: 'Not found' });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
