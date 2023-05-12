const http = require('http');

// skapa dummy data...
const movies = [
  { id: 1, title: 'Avatar' },
  { id: 2, title: 'The Batman' },
  { id: 3, title: 'Aquaman' },
  { id: 4, title: 'Spiderman' },
];
// Skapa servern...
const server = http.createServer((req, res) => {
  const { method, url } = req;
  let body = [];

  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();

      let status = 404;
      const response = {
        success: false,
        data: null,
        error: null,
      };

      if (method === 'GET' && url === '/movies') {
        status = 200;
        response.success = true;
        response.data = movies;
      } else if (method === 'POST' && url === '/movies') {
        const { id, title } = JSON.parse(body);

        if (!id || !title) {
          (status = 400),
            (response.error = 'Du måste skicka med både id och titel!!!');
        } else {
          movies.push({ id, title });
          status = 201;
          response.success = true;
          response.data = movies;
        }
      }

      res.writeHead(status, {
        'Content-Type': 'application/json',
      });

      res.end(JSON.stringify(response));
    });
});

// Starta servern och ligg och lyssna på anrop på port 5010
server.listen(5010, () => {
  console.log(`Servern är igång`);
});
