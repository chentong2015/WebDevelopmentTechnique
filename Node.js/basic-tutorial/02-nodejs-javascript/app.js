var http = require('http');
// import the two modules
/*
一个Node.js文件就是一个模块，这个文件可能是Javascript代码、JSON或者编译过的C/C++扩展。
重要的两个对象：
    require是从外部获取模块
    exports是把模块接口公开
*/
var module1 = require('./module1');
var module2 = require('./module2');

function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // Use the variable and fonction of module
    response.write(module1.myString);  // wirte on the page web
    module1.myFunction();  // call the fonction on Console 

    response.write(module2.myVariable);
    module2.myFunction();
    
    response.end();
}

http.createServer(onRequest).listen(8000);
console.log("site web : http://localhost:8000/ ");