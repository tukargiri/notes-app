"use strict";

var mongoInterface = require("./mongoInterface");
var url = require("url");

// TODO :- Make different object for success and error
var responseObj = {
	type: "error",
	message: ""
};
/*
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

function deleteDataCallback(response, data) {
	if (data) {
		responseObj.type = "success";
		responseObj.message = "Data deleted successfully";
		// response.write();
	} else {
		// responseObj.type = "error";
		responseObj.message = "cannot delete data";
		// response.write("Data error");
	}
	response.end(JSON.stringify(responseObj));
}

function updateDataCallback(response, data) {
	if (data) {
		responseObj.type = "success";
		responseObj.message = "Data updated successfully";
		// response.write();
	} else {
		// responseObj.type = "error";
		responseObj.message = "cannot update data";
		// response.write("Data error");
	}
	response.end(JSON.stringify(responseObj));
}*/

function modifyDataCallback(response, data) {
	if (data) {
		responseObj.type = "success";
		responseObj.message = "Data modified successfully";
	} else {
		responseObj.message = "cannot modify data";
	}
	response.end(JSON.stringify(responseObj));
}

var router = {
	processRequest: function (request, response) {
		var requestBody = "";
		var url_parts;
		var query;

		if (request.method === "GET" && request.url.indexOf("/fetchData") >= 0) {
			url_parts = url.parse(request.url, true);
			query = url_parts.query;
			/*console.log("url_parts = ", url_parts);
	        console.log("query = ", query);*/
			/*response.write("server got query = " + JSON.stringify(query));
	        response.end();*/
			// Search the mongo db on required parameters
			mongoInterface.find(query, modifyDataCallback.bind(null, response));

		} else if (request.method === "POST" && request.url.indexOf("/saveData") >= 0) {

			request.on('data', function (data) {
				requestBody += data;
			});
			request.on('end', function () {
				// console.log("requestBody = ", requestBody, typeof requestBody);
				// var formData = qs.parse(requestBody);
				var formData = JSON.parse(requestBody);
				// console.log("formData = ", formData);
				mongoInterface.insert(formData, modifyDataCallback.bind(null, response));
				// Save the form data in mongo db
			});
		} else if (request.method === "DELETE" && request.url.indexOf("/deleteData") >= 0) {
			// var requestBody = "";
			request.on('data', function (data) {
				requestBody += data;
			});
			request.on('end', function () {
				// console.log("requestBody = ", requestBody, typeof requestBody);
				// var formData = qs.parse(requestBody);
				var formData = JSON.parse(requestBody);
				// console.log("formData = ", formData);
				mongoInterface.delete(formData, modifyDataCallback.bind(null, response));
				// Save the form data in mongo db
			});
		} else if (request.method === "PUT" && request.url.indexOf("/updateData") >= 0) {
			// var requestBody = "";
			request.on('data', function (data) {
				requestBody += data;
			});
			request.on('end', function () {
				// console.log("requestBody = ", requestBody, typeof requestBody);
				// var formData = qs.parse(requestBody);
				var formData = JSON.parse(requestBody);
				// console.log("PUT, formData = ", formData);
				mongoInterface.update(formData, modifyDataCallback.bind(null, response));
				// Save the form data in mongo db
			});
		} else {
			response.writeHead(500, {
				'Content-Type': 'text/html'
			});
			responseObj.type = "error";
			responseObj.message = "Invalid request";
			response.end(JSON.stringify(responseObj));
		}
	}
};

module.exports = router;