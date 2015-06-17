"use strict";

var http = require("http");
var PORT = 8989;
var router = require("./router");
// var path = require("path");
// var fs = require("fs");
// var qs = require('querystring');
var server = http.createServer(connectionHandler);

function connectionHandler(request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    router.processRequest(request, response);
}

/*function connectionHandler(request, response) {
    var uri = url.parse(request.url).pathname,
        filename = path.join(process.cwd(), uri);

    fs.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                "Content-Type": "text/plain"
            });
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        filename += '../client/index.html';

        fs.readFile(filename, "binary", function (err, file) {
            if (err) {
                response.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                response.write(err + "\n");
                response.end();
                return;
            }

            response.writeHead(200);
            response.write(file, "binary");
            response.end();

            console.log("index.html is served!!!");
        });
    });
}*/
server.listen(PORT);
console.log("Server is listening on port %s", PORT);