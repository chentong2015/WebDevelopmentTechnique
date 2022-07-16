var express = require('express');
var app = express();

// import basic auth 
var basicAuth = require('basic-auth');

var auth = function(req, resp, next) {
	function unauthorized(resp) {
		resp.set('WWW-Authenticate', 'Basic realm=Input User&Password');
		return resp.sendStatus(401);
	}
	// Auth the request
	var user = basicAuth(req);
	if (!user || !user.name || !user.pass) {
		return unauthorized(resp);
	}
	// Set the username and password
	if (user.name === 'tong' && user.pass === 'tong') {
		return next();
	} else {
		return unauthorized(resp);
	}
};

// function指定需要调用的中间件函数
app.get('/auth', auth, function(req, resp) {
	resp.status(200).send('Authorization');
});
app.listen(1024);

// 在Express框架中，应用程序实例对象的get()、post()、put()、delete()、all()方法中，均可使用一个或多个中间件函数参数
/*
app.get(path, [callback...], callback)    //使用get方法
app.post(path, [callback...], callback)   //使用post方法
app.put(path, [callback...], callback)    //使用put方法
app.delete(path, [callback...], callback) //使用delete方法
app.all(path, [callback...], callback)    //使用all方法
*/


console.log('connect to http://localhost:1024/auth');