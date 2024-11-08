// require 用来加载代码，而 exports 和 module.exports 则用来导出代码
/*
* install express : npm install express --save >>> create node_moudles 
*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
// body-parser是非常常用的一个express中间件，作用是对post请求的请求体进行解析
var bodyParser = require('body-parser');
// Handlebars模板引擎的服务器端版本hbs模板引擎
var hbs = require('express-handlebars');

var routes = require('./routes/index');
var app = express();

// view engine setup, start the hbs module
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
// 设置模版引擎使用的文件类型 后缀 ejs, html, hbs, jade /////
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 渲染内容用res.render()，将会根据views中的模板文件进行渲染
// development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { message: err.message,  error: {}});
});

// https://www.cnblogs.com/ooooevan/p/5897586.html
// exports和module.exports提供了外部访问的接口
// Module.exports才是真正的接口，exports只不过是它的一个辅助工具
// 最终返回给调用的是Module.exports而不是exports
module.exports = app;
