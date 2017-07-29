/* jshint esversion: 6 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const date = require("./resources/date.js");

// require the mainjs

var server = http.createServer(function(req, res) {
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
    var reqUrl = req.url;
    res.writeHead(200, {"Content-Type" : "text/plain"});
    reqUrl = reqUrl.slice(1);
    var dateArray = date.getDate(reqUrl);
    res.end(`
      ${reqUrl}
      { unix: ${dateArray[0]}, date: ${dateArray[1]} };`);
  }
}).listen(3000);


// console.log("Server listening on port 3000");
console.log(date.getDate("1234567890"));
console.log(date.getDate("january%2020,2002"));
