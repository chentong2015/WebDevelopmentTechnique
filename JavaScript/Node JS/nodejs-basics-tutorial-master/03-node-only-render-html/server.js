var http = require('http');
// fs（File System）模块，以实现文件及目录的读写操作。
var fs = require('fs');

// 使用html构建前端的界面
function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./index.html', null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}

http.createServer(onRequest).listen(8000);
console.log("Site web : http://localhost:8000/ ");