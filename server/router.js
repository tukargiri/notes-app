"use strict";

var mongoInterface = require("./mongoInterface");
var url = require("url");
var qs = require('querystring');

var _requestHandler = {
	handleGETRequest: function (request, response) {
		var urlParts, query;
		if (request.url.indexOf("/fetchData") >= 0) {
			urlParts = url.parse(request.url, true);
			query = urlParts.query;
			mongoInterface.find(query, this.dbResponseHandler.bind(null, response));
		}
	},
	handlePOSTRequest: function (request, response) {
		var oThis = this,
			requestBody = "",
			formData;
		if (request.url.indexOf("/saveData") >= 0) {
			request.on('data', function (data) {
				requestBody += data;
			});
			request.on('end', function () {
				formData = JSON.parse(requestBody);
				// formData = qs.parse(requestBody);
				// console.log("formData", formData);
				mongoInterface.insert(formData, oThis.dbResponseHandler.bind(null, response));
			});
		}
	},
	handleDELETERequest: function (request, response) {
		var urlParts, params;
		if (request.url.indexOf("/deleteData") >= 0) {
			urlParts = url.parse(request.url, true);
			params = urlParts.path.split("/");
			mongoInterface.delete(params[2], this.dbResponseHandler.bind(null, response));
		}
	},
	handlePUTRequest: function (request, response) {
		var oThis = this,
			requestBody = "",
			formData;
		if (request.url.indexOf("/updateData") >= 0) {
			request.on('data', function (data) {
				requestBody += data;
			});
			request.on('end', function () {
				formData = JSON.parse(requestBody);
				mongoInterface.update(formData, oThis.dbResponseHandler.bind(null, response));
			});
		}
	},
	dbResponseHandler: function (response, dbResponseObj) {
		response.end(JSON.stringify(dbResponseObj));
	}
};

var router = {
	processRequest: function (request, response) {
		if (request.method === "GET") {
			_requestHandler.handleGETRequest(request, response);
		} else if (request.method === "POST") {
			// console.log(request, response);
			_requestHandler.handlePOSTRequest(request, response);
		} else if (request.method === "DELETE") {
			_requestHandler.handleDELETERequest(request, response);
		} else if (request.method === "PUT") {
			_requestHandler.handlePUTRequest(request, response);
		}
		/*else if (request.method === "OPTIONS") {
			response.end(200);
		}*/
		else {
			_requestHandler.dbResponseHandler(response, {
				message: "Invalid request",
				type: "error",
				items: []
			});
		}
	}
};

module.exports = router;