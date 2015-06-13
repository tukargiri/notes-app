var fs = require("fs");
var path = require("path");

function home(request, response)
{
    var file = path.join(process.cwd(), "/views/home.html");

    fs.readFile(file, function(error, content)
    {
        if (error)
        {
            response.writeHead(500);
            response.end();
        }
        else
        {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(content);
            response.end();
        }
    });
}

function about(request, response)
{
    var file = path.join(process.cwd(), "/views/about.html");

    fs.readFile(file, function(error, content)
    {
        if (error)
        {
            response.writeHead(500);
            response.end();
        }
        else
        {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(content);
            response.end();
        }
    });

}

exports.home = home;
exports.about = about;
