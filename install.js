// In order to run this file, first install shell js
// Please refer readme for further instructions
var shell = require('shelljs');

shell.echo("Starting build process...");

// Code to download server dependencies
shell.echo("Downloading server dependencies");
shell.cd("server");
if (shell.exec("npm install").code !== 0) {
	shell.echo("Cannot download server dependencies :(");
	shell.exit(1);
} else {
	shell.echo("server dependencies downloaded successfully :)");
}
// Code to download client dependencies
shell.cd("../client");
shell.echo("Downloading client dependencies");
if (shell.exec("npm install").code !== 0) {
	shell.echo("Cannot download client dependencies :(");
	shell.exit(1);
} else {
	shell.echo("client dependencies downloaded successfully :)");
}

// Code to start node server
shell.echo("starting node server");
shell.cd("../server/");
shell.exec("node server.js", {
	async: true,
	silent: true
});

// Code to start UI static server
shell.echo("starting UI server");
shell.cd("../client/");
shell.exec("gulp server", {
	async: true
});