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
        let explanation = `To test your extensions: \n\n`;
        explanation += `1) Load EmoteWallOverlay.html\n`;
        explanation += `2) Ensure your up-to-date JS file is in the js_generated directory (even if you've written it directly)\n`;
        explanation += `3) "Add External Plugin from URL" using http://localhost:${port}/yourExtensionName.js`;
        response.end('Server Running...\n\n' + explanation);
        return;
    }

    let filePath: string;
    if (urlWithoutQueryString.endsWith(".js") || urlWithoutQueryString.endsWith(".js.map")) {
        filePath = '../EmoteWallExtensions/js_generated' + urlWithoutQueryString;
    }
    else if (urlWithoutQueryString.endsWith(".ts")) {
        filePath = '../EmoteWallExtensions' + urlWithoutQueryString;
    }
    else {
        console.log("Extension not recognized");
        return;
    }

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