var fs = require("fs");
var path = require("path");

var type = {
    ".css": "text/css",
    ".html": "text/html",
    ".js": "text/javascript"
};

function serveFile(handle, pathName, contentType, request, response)
{
    if(handle.file)
    {
        handle.file(pathName, contentType, request, response)
    }
    else
    {
        serveFileNotFound(response, true);
    }
}

function serveAPI(handle, pathName, request, response)
{
    if(typeof handle.api[pathName] === "function")
    {
        handle.api[pathName](request, response);
    }
    else
    {
        serveFileNotFound(response, false);
    }
}

function serveFileNotFound(response, raw)
{
    if(!raw)
    {
        var filePath = path.join(process.cwd(), "/views/404.html");
        fs.readFile(filePath, function(error, content)
        {
            if(error)
            {
                response.writeHead(500);
                response.write(error);
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
    else
    {
       response.writeHead(404);
       response.end();
   }
}

function route(handle, pathName, request, response)
{
    var extname = path.extname(pathName).toLowerCase();

    if(extname === "")
    {
        serveAPI(handle, pathName, request, response)
    }
    else if(type[extname])
    {
        serveFile(handle, pathName, type[extname], request, response);
    }
    else
    {
        serveFileNotFound(response, true);
    }
}

exports.route = route;
