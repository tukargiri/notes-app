"use strict";
var auth = {
	validate: function (authToken) {
		// Write the code for checking the auth token
		// The token must be same returned by server during login

		// For curent use case, send authtoken in header of every request, value = "secretToken"
		var retValue;
		if (authToken && authToken === "secretToken") {
			retValue = true;
		} else {
			retValue = false;
		}
		return retValue;
	}
};

module.exports = auth;