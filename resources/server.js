/* jshint esversion: 6 */

const http = require('http');
const fs = require('fs');
// const main = require('./main');
const url = require('url');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  if (res.statusCode == 200){
    var servURL = url.parse(`http://${req.url}`);
    console.log(servURL.pathname);
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>server</title>
        </head>
        <body>
          <h1>Serving HTML Text</h1>
          <p>${req.url}</p>
        </body>
      </html>
      `);
  }
});
server.listen(3000);
console.log("Server listening on port 3000");
