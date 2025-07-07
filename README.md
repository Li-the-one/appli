# appli

This repository contains a basic server implementation for a moodboard application.

## Running the server

```
node src/server.js
```

This will start a simple HTTP server on port 3000. Visit `http://localhost:3000/`
to open the landing page or test the API with `curl` as below.

### Moodboards

- List: `curl http://localhost:3000/moodboards`
- Create: `curl -X POST -H 'Content-Type: application/json' \
  -d '{"name":"My board"}' http://localhost:3000/moodboard`
- Update: `curl -X PATCH -H 'Content-Type: application/json' \
  -d '{"name":"New name","folderId":"<folderId>"}' http://localhost:3000/moodboard/<id>`
- Delete: `curl -X DELETE http://localhost:3000/moodboard/<id>`

### Folders

- List: `curl http://localhost:3000/folders`
- Create: `curl -X POST -H 'Content-Type: application/json' \
  -d '{"name":"Ideas"}' http://localhost:3000/folder`
- Rename: `curl -X PUT -H 'Content-Type: application/json' \
  -d '{"name":"New"}' http://localhost:3000/folder/<id>`
- Delete: `curl -X DELETE http://localhost:3000/folder/<id>`

The implementation remains in-memory and intended only as a starting point.
