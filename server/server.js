"use strict";

var http = require("http");
var router = require("./router");
var auth = require("./authenticationManager");
var server = http.createServer(connectionHandler);

var PORT = 8989;

function connectionHandler(request, response) {
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Headers", "*");
	response.setHeader("Content-Type", "application/json");
	// Add auth layer in between, check for valid auth token
	// If auth token is valid then on process the request
	// Else write the response as restricted access
	var headers = request.headers;
	// console.log("headers = ", headers);
	if (auth.validate(headers.authtoken)) {
		router.processRequest(request, response);
	} else {
		var responseObj = {
			message: "Invalid Access",
			type: "error",
			items: []
		};
		response.end(JSON.stringify(responseObj));
	}
}
server.listen(PORT);
console.log("Server is listening on port %s", PORT);