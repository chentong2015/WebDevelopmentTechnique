title: 【Node.js】basicAuth中间件的使用
categories: Node.js
tags:
  - Node.js
date: 2016-06-12 20:59:07

---

## basicAuth ##
basicAuth中间件为网站添加身份认证功能，使用该中间件后，用户访问网站必须输入用户名和密码并通过验证后才能访问网站。

GitHub示例工程源码[点击源码链接](https://github.com/sodino/basicAuth)

安装`basic-auth`

````
npm install basic-auth --save 
````

---

## 实现 ##
接下来`require basic-auth`并创建中间件使之处理认证请求。

当用户输错用户名及密码时返回`401 Unauthorized`，应答中包含一个`WWW-Authenticate`头，浏览器据此显示用户名字/密码对话框，引导用户填写合适的Authorization头后再次发出请求。

````
var basicAuth = require('basic-auth');
  
  
var auth = function(req, resp, next) {
	function unauthorized(resp) {
		// 认证框要求输入用户名和密码的提示语
		resp.set('WWW-Authenticate', 'Basic realm=Input User&Password');
		return resp.sendStatus(401);
	}
  
	var user = basicAuth(req);
  
	if (!user || !user.name || !user.pass) {
		return unauthorized(resp);
	}
	  
	// 简单粗暴，用户名直接为User，密码直接为Password
	if (user.name === 'User' && user.pass === 'Password') {
		return next();
	} else {
		return unauthorized(resp);
	}
};

````

在上面的代码中，`basicAuth(req)`将从`req.headers.authorization`中解析出用户输入的用户名和密码，该字段的格式为`Basic [base64.encode.string]`，即以字符串`Basic `开头，后面跟着一串将用户名和密码经Base64算法编码的文本。将其用Base64解码可得输入的用户名和密码明文。  
![headers.authorization](http://ww1.sinaimg.cn/mw1024/e3dc9ceagw1f4sri230igj20fs09ttat.jpg)


然后需要设置用户认证的链接及对该链接下路径使用basicAuth中间件，代码如下：

````
app.use('/auth', auth);
app.get('/auth', function(req, resp) {
	resp.status(200).send('Authorization');
});
````

Express框架中使用应用程序实例对象的`use`方法来调用一个中间件，该方法的使用方式为  

````
app.use([path], function)
````

在`use`方法中，`path`参数为字符串，可选参数，用于指定何种路径使用该中间件，默认参数值为`/`;当然也可以使用`/*`来指代所有的路径。`function`为必填参数，指定需要调用的中间件函数。

在Express框架中，应用程序实例对象的`get()`、`post()`、`put()`、`delete()`、`all()`方法中，均可使用一个或多个中间件函数参数。如下所示：    

````
app.get(path, [callback...], callback)    //使用get方法
app.post(path, [callback...], callback)   //使用post方法
app.put(path, [callback...], callback)    //使用put方法
app.delete(path, [callback...], callback) //使用delete方法
app.all(path, [callback...], callback)    //使用all方法
````
在以上函数原型中，`[callback...]`可以使用零个或多个中间件函数。在使用多个中间件函数时，当前一个中间件函数中调用`next()`方法后，将调用下一个中间件函数，当最后一个中间件函数调用`next()`方法后，函数原型中最后一个`callback`回调函数才会被执行。

所以，上文中使用basicAuth中间件的实现可以修改为：   
````
app.get('/auth', auth, function(req, resp) {
	resp.status(200).send('Authorization');
});
````

最后，访问`http://localhost:1024/auth`链接将需要输入身份信息进行认证。

---

## 完整代码 ##  
以下为完整的代码`basicAuth.js`

````
var express = require('express');
var app = express();

var basicAuth = require('basic-auth');


var auth = function(req, resp, next) {
	function unauthorized(resp) {
		resp.set('WWW-Authenticate', 'Basic realm=Input User&Password');
		return resp.sendStatus(401);
	}

	var user = basicAuth(req);

	if (!user || !user.name || !user.pass) {
		return unauthorized(resp);
	}

	if (user.name === 'User' && user.pass === 'Password') {
		return next();
	} else {
		return unauthorized(resp);
	}
};

app.get('/auth', auth, function(req, resp) {
	resp.status(200).send('Authorization');
});

app.listen(1024);

console.log('connect to http://localhost:1024/auth');
````

---

## 效果截图 ##

登录框：  
![login](http://ww3.sinaimg.cn/mw690/e3dc9ceagw1f4sr3we13tj20e90g5mxl.jpg)

点击‘取消’后显示`Unauthorized`  
![unauthorized](http://ww4.sinaimg.cn/mw690/e3dc9ceagw1f4sr3x0jwfj20ac04h0sy.jpg)

输入正确的用户名和密码后：  
![Authorized](http://ww1.sinaimg.cn/mw690/e3dc9ceagw1f4sr3xbychj20b7042aab.jpg)

---





[About Sodino](http://sodino.com/about/)