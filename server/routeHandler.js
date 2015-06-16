"use strict";

var mongoInterface = require("./mongoInterface");
var url = require("url");

var responseObj = {
	type: "error",
	message: ""
};

function findDataCallback(response, data) {

	if (data) {
		responseObj.type = "success";
		responseObj.message = data;
		// response.write("server found data from mongo = " + JSON.stringify(data));
	} else {
		responseObj.message = "cannot find data";
	}
	response.end(JSON.stringify(responseObj));

}

function insertDataCallback(response, data) {
	response.setHeader('content-type', 'application/json');
	if (data) {
		responseObj.type = "success";
		responseObj.message = "Data saved successfully";
		// response.write();
	} else {
		// responseObj.type = "error";
		responseObj.message = "cannot insert data";
		// response.write("Data error");
	}
	response.end(JSON.stringify(responseObj));
}

var routeHandler = {
	processRequest: function (request, response) {
		if (request.method === "GET" && request.url.indexOf("/fetchData") >= 0) {
			var url_parts = url.parse(request.url, true);
			var query = url_parts.query;
			/*console.log("url_parts = ", url_parts);
	        console.log("query = ", query);*/
			/*response.write("server got query = " + JSON.stringify(query));
	        response.end();*/
			// Search the mongo db on required parameters
			mongoInterface.find(query, findDataCallback.bind(null, response));

		} else if (request.method === "POST" && request.url.indexOf("/saveData") >= 0) {
			var requestBody = "";
			request.on('data', function (data) {
				requestBody += data;
			});
			request.on('end', function () {
				// console.log("requestBody = ", requestBody, typeof requestBody);
				// var formData = qs.parse(requestBody);
				var formData = JSON.parse(requestBody);
				// console.log("formData = ", formData);
				mongoInterface.insert(formData, insertDataCallback.bind(null, response));
				// Save the form data in mongo db
			});
		} else {
			response.writeHead(500, {
				'Content-Type': 'text/html'
			});
			responseObj.message = "Invalid request";
			response.end(JSON.stringify(responseObj));
		}
	}
};

module.exports = routeHandler;