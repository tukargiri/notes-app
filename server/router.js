"use strict";

var mongoInterface = require("./mongoInterface");
var url = require("url");

function modifyDataCallback(response, responseObj) {
	response.end(JSON.stringify(responseObj));
}

var router = {
	processRequest: function (request, response) {
		var requestBody = "",
			urlParts,
			formData,
			params,
			query;

		if (request.method === "GET" && request.url.indexOf("/fetchData") >= 0) {
			urlParts = url.parse(request.url, true);
			query = urlParts.query;
			mongoInterface.find(query, modifyDataCallback.bind(null, response));
		} else if (request.method === "POST" && request.url.indexOf("/saveData") >= 0) {
			request.on('data', function (data) {
				requestBody += data;
			});
			request.on('end', function () {
				formData = JSON.parse(requestBody);
				mongoInterface.insert(formData, modifyDataCallback.bind(null, response));
			});
		} else if (request.method === "DELETE" && request.url.indexOf("/deleteData") >= 0) {
			urlParts = url.parse(request.url, true);
			params = urlParts.path.split("/");
			mongoInterface.delete(params[2], modifyDataCallback.bind(null, response));
		} else if (request.method === "PUT" && request.url.indexOf("/updateData") >= 0) {
			request.on('data', function (data) {
				requestBody += data;
			});
			request.on('end', function () {
				formData = JSON.parse(requestBody);
				mongoInterface.update(formData, modifyDataCallback.bind(null, response));
			});
		} else {
			response.writeHead(500, {
				'Content-Type': 'text/html'
			});
			modifyDataCallback(null, null, {
				message: "Invalid request",
				type: "error",
				items: []
			});
		}
	}
};

module.exports = router;