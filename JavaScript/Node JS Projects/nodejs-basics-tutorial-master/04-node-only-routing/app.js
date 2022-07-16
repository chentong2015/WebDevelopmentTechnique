// 使用url模块去访问到链接
var url = require('url');
// Module : read file
var fs = require('fs');

function renderHTML(path, response) {
    fs.readFile(path, null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}

//将handleRequest写在module的对外的接口里 调用
module.exports = {
  // 处理request的函数；调用自定义的函数renderHTML
  handleRequest: function(request, response) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      var path = url.parse(request.url).pathname;
      switch (path) {
          case '/':
              renderHTML('./index.html', response);
              break;
          case '/login':
              renderHTML('./login.html', response);
              break;
          default:
              response.writeHead(404);
              response.write('Route not defined'); // write this on the page web
              response.end(); 
      }
  }
  
};