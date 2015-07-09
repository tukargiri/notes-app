// In order to run this file, first install shell js
// Please refer readme for further instructions
var shell = require('shelljs');

if (process.argv.length > 2) {
	if (process.argv[2] === "ui") {
		// Code to start node server
		shell.cd("server");
		shell.exec("node server.js", {
			async: true
		});
	} else if (process.argv[2] === "node") {
		// Code to start UI static server
		shell.cd("client");
		shell.echo("starting UI server");
		shell.exec("gulp server", {
			async: true
		});
	}
} else {
	shell.echo("Invalid argument :- Please provide either 'ui' or 'node' as an argument to start respective server");
}