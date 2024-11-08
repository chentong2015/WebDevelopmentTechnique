const express=require('express');
const bodyParser=require('body-parser');
// cookies最常用在‘记住密码’和‘自动登录’

var server=express();
server.listen(8080);
console.log("Site web : http://localhost:8080");

server.use(bodyParser.urlencoded( {extended: false, limit: 2*1024*1024} ));

server.use('/', function (req, res){
   //console.log(req); // POST请求的报文
   console.log(req.body);  // ==> body 提取的是form表格提交的数据 input内容
   console.log(req.body.user); //POST
   console.log(req.body.pass); //POST
   //req.query   GET
 　//req.body    POST
});