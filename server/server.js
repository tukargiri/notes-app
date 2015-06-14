"use strict";

var http = require("http");
var PORT = 8989;
var url = require("url");
var mongoInterface = require("./mongoInterface");
console.log(mongoInterface);
// var path = require("path");
// var fs = require("fs");
// var qs = require('querystring');
var server = http.createServer(connectionHandler);

function connectionHandler(request, response) {
    /*console.log("inside connectionHandler request.url = ", request.url);
    console.log("inside connectionHandler request.pathname = ", request.pathname);*/

    response.setHeader("Access-Control-Allow-Origin", "*");

    if (request.method === "GET" && request.url.indexOf("/fetchData") >= 0) {
        var url_parts = url.parse(request.url, true);
        var query = url_parts.query;
        /*console.log("url_parts = ", url_parts);
        console.log("query = ", query);*/
        /*response.write("server got query = " + JSON.stringify(query));
        response.end();*/
        // Search the mongo db on required parameters
        mongoInterface.find(query, searchDataCallback.bind(null, response));

    } else if (request.method === "POST" && request.url.indexOf("/saveData") >= 0) {
        var requestBody = "";
        request.on('data', function (data) {
            requestBody += data;
        });
        request.on('end', function () {
            console.log("requestBody = ", requestBody, typeof requestBody);
            // var formData = qs.parse(requestBody);
            var formData = JSON.parse(requestBody);
            console.log("formData = ", formData);
            mongoInterface.insert(formData, saveDataCallback.bind(null, response));
            // Save the form data in mongo db
        });
    } else {
        response.writeHead(500, {
            'Content-Type': 'text/html'
        });
        response.write("Invalid request");
        response.end();
    }
}

function searchDataCallback(response, data) {
    response.write("server got query = " + JSON.stringify(data));
    response.end();
}

function saveDataCallback(response, data) {
    if (data) {
        response.write("Data saved successfully");
    } else {
        response.write("Data error");
    }
    response.end();
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