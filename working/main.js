var server = require("./scripts/server");
var router = require("./scripts/router");
var requestHandler = require("./scripts/requestHandler");
var fileHandler = require("./scripts/fileHandler")

var handle = {
    api: {},
    file: fileHandler.file
};

handle.api["/"] = requestHandler.home;
handle.api["/about"] = requestHandler.about;

server.start(router.route, handle);
