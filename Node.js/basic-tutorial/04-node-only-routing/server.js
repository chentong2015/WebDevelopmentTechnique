var http = require('http');
// use the app module 
var app = require('./app');

// call a fonction in the module app : 调用一个request的函数
http.createServer(app.handleRequest).listen(8000);
console.log("Site Web : http://localhost:8000")
