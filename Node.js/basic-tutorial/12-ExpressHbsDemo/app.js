//index.js
var express=require('express');
var app=express();
// load hbs module from node_module
// Handlebars模板引擎的服务器端版本hbs模板引擎
var hbs = require('hbs');

// set the name of the module is "html"
app.set('view engine','html');
//start hbs module
app.engine('html',hbs.__express);

var routes=require('./routes')(app);

app.listen(8080);
console.log("web site : http://localhost:8080/");