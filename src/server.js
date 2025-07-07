const http = require('http');
const { randomUUID } = require('crypto');

let moodboards = [];
let folders = [];

function parseJSON(req, callback) {
  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', () => {
    try {
      callback(JSON.parse(body || '{}'));
    } catch {
      callback({});
    }
  });
}

function sendJSON(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/moodboards') {
    sendJSON(res, 200, moodboards);
  } else if (req.method === 'POST' && req.url === '/moodboard') {
    parseJSON(req, data => {
      const id = randomUUID();
      const name = (data.name || '').trim() || 'Untitled';
      const folderId = data.folderId || null;
      const board = { id, name, folderId };
      moodboards.push(board);
      sendJSON(res, 201, board);
    });
  } else if (req.method === 'PATCH' && req.url.startsWith('/moodboard/')) {
    const id = req.url.split('/')[2];
    const board = moodboards.find(b => b.id === id);
    if (!board) return sendJSON(res, 404, { error: 'Not found' });
    parseJSON(req, data => {
      if (typeof data.name === 'string') {
        board.name = data.name.trim() || board.name;
      }
      if ('folderId' in data) {
        board.folderId = data.folderId || null;
      }
      sendJSON(res, 200, board);
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
  } else if (req.method === 'GET' && req.url === '/folders') {
    sendJSON(res, 200, folders);
  } else if (req.method === 'POST' && req.url === '/folder') {
    parseJSON(req, data => {
      const id = randomUUID();
      const name = (data.name || '').trim() || 'Untitled';
      const folder = { id, name };
      folders.push(folder);
      sendJSON(res, 201, folder);
    });
  } else if (req.method === 'PUT' && req.url.startsWith('/folder/')) {
    const id = req.url.split('/')[2];
    const folder = folders.find(f => f.id === id);
    if (!folder) return sendJSON(res, 404, { error: 'Not found' });
    parseJSON(req, data => {
      if (typeof data.name === 'string') {
        folder.name = data.name.trim() || folder.name;
      }
      sendJSON(res, 200, folder);
    });
  } else if (req.method === 'DELETE' && req.url.startsWith('/folder/')) {
    const id = req.url.split('/')[2];
    const idx = folders.findIndex(f => f.id === id);
    if (idx > -1) {
      folders.splice(idx, 1);
      moodboards.forEach(b => {
        if (b.folderId === id) b.folderId = null;
      });
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
