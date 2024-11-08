// import modules 
var http = require('http');
var nodemailer = require('nodemailer');

// Start http server
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
}).listen(8080);
console.log("listen to http://localhost:8080");

// Send a email 
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'user@gmail.com',
    pass: 'pwd'
  }
});

var mailOptions = {
  from: 'source@gmail.com',
  to: 'target@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});