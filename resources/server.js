const http = require('http');
const fs = require('fs');
const options = {

};

var server = http.createServer(function(req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>server</title>
      </head>
      <body>
        <h1>Serving HTML Text</h1>
        <p>${req.url}</p>
        <p>${req.method}</p>
      </body>
    </html>
    `);
});
server.listen(3000);
console.log("Server listening on port 3000");
