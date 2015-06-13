"use strict";

var http = require("http");
var url = require("url");
var fs = require("fs");

function readConfig()
{
    return JSON.parse(fs.readFileSync("config.json"));
}

var config = readConfig();

function start(route, handle)
{
    function onRequest(request, response)
    {
        var pathName = url.parse(request.url).pathname;
        route(handle, pathName, request, response);
    }

    http.createServer(onRequest).listen(config.port, config.host);
    console.log("Server started and listening on: " + config.host + ":" + config.port);
}

exports.start = start;
