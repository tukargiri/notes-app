// In order to run this file, first install shell js
// Please refer readme for further instructions
var shell = require('shelljs');

// Create service of mongo db
// http://stackoverflow.com/questions/2404742/how-to-install-mongodb-on-windows

var mongoBase = "C:\\Program Files\\MongoDB 2.6 Standard\\bin";
var mongoPath = "C:\\Users\\Vaibhav\\Desktop\\HTML5\\diary-app\\notes-app\\mongodb";

if (process.argv.length > 2) {
	if (process.argv[2] === "node") {
		// Code to start node server
		shell.cd("server");
		shell.exec("node server.js", {
			async: true
		});
	} else if (process.argv[2] === "ui") {
		// Code to start UI static server
		shell.cd("client");
		shell.echo("starting UI server");
		shell.exec("gulp server", {
			async: true
		});
	} else if (process.argv[2] === "mongo-server") {
		shell.cd(mongoBase);
		shell.echo(shell.pwd());
		shell.exec("mongod.exe --dbpath=" + mongoPath, {
			async: true
		});
	}
	/*else if (process.argv[2] === "mongo-client") {
		shell.cd(mongoBase);
		shell.echo(shell.pwd());
		var mongoC = shell.exec("mongo.exe");
		mongoC.stdout.on("data", function () {
			shell.echo(arguments)
		});
	}*/
} else {
	shell.echo("Invalid argument :- Please provide either 'ui' or 'node' as an argument to start respective server");
}