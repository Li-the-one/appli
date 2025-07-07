# appli

This repository contains a basic server implementation for a moodboard application.

## Running the server

```
node src/server.js
```

This will start a simple HTTP server on port 3000. You can test it with `curl`:

- List moodboards: `curl http://localhost:3000/moodboards`
- Create one: `curl -X POST --data "My board" http://localhost:3000/moodboard`
- Delete one: `curl -X DELETE http://localhost:3000/moodboard/<id>`

The implementation is in-memory and intended only as a starting point.
