var fs = require("fs");
var path = require("path");

function file(fileName, contentType, request, response)
{
    var filePath = path.join(process.cwd(), fileName);

    fs.exists(filePath, function(exists)
    {
        if (exists)
        {
            fs.readFile(filePath, function(error, content)
            {
                if (error)
                {
                    response.writeHead(500);
                    response.end();
                }
                else
                {
                    response.writeHead(200, {"Content-Type": contentType});
                    response.end(content, "utf-8");
                }
            });
        }
        else
        {
            response.writeHead(404);
            response.end();
        }
    });
}

exports.file = file;
