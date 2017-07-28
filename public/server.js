/* jshint esversion: 6 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
// require the mainjs

var server = http.createServer(function(req, res) {
  console.log(`${req.method} request for ${req.url}`);
  if (req.url === "/") {
    fs.readFile("./index.html", "UTF-8", function(err, html) {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(html);

    });
  } else if (req.url.match(/.css$/)) {

    var cssPath = path.join(__dirname, req.url);
    var fileStream = fs.createReadStream(cssPath, "UTF-8");
    res.writeHead(200, {"Content-Type" : "text/css"});
    fileStream.pipe(res);


  } else {
    res.writeHead(200, {"Content-Type" : "text/plain"});
    var reqUrl = req.url;
    reqUrl = reqUrl.slice(1);
    console.log(reqUrl);
    res.end(`

      ${req.url}
      Hey, show the object as either null, or a
      { unix: 0123456789, date: January, 12, 2018 };

    `);
  }
}).listen(3000);

console.log("Server listening on port 3000");
