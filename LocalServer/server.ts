import http = require('http');
import fs = require('fs');

const port = process.env.port || 13472
let server = http.createServer(function (request, response) {
    if (request.headers.origin) {
        response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
    }

    console.log("Request for " + request.url);
    let urlWithoutQueryString = request.url.replace(/\?.*/gm, "");
    if (urlWithoutQueryString != request.url) {
        console.log("Request reduced to " + urlWithoutQueryString);
    }

    if (urlWithoutQueryString == "/") {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Server Running...\n');
        return;
    }

    let filePath = '../EmoteWallExtensions/js_generated' + urlWithoutQueryString;
    console.log("Checking for file " + filePath);

    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                response.writeHead(200, { 'Content-Type': 'text/plain' });
                response.end("Error... " + error.path);
            }
            else {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Error: ' + error.code + ' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': 'text/javascript' });
            response.end(content, 'utf-8');
        }
    });
})

server.listen(port);