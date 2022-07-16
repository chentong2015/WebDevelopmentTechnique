-------------------------------------------------------------------------------------------
// Load HTTP module
var http = require("http");

// Create HTTP server and listen on port 8000 for requests
http.createServer(function(request, response) {

   // Set the response HTTP header with HTTP status and Content type
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body "Hello World"
   response.end('Hello World\n');
}).listen(8000);

// Print URL for accessing server
console.log('Server running at http://127.0.0.1:8000/');

-------------------------------------------------------------------------------------------

// How to use the Express --  https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
// Express - Node.js web application framework
// 
const express = require('express')
const app = express()

//Root page : response
app.get('/', (req, res) => res.send('Hello World!'))

//Listen to the port 3000
app.listen(3000, () => console.log('Example app listening on port 3000!'))


-------------------------------------------------------------------------------------------

// Install the Vcap_services -- https://www.npmjs.com/package/vcap_services
$ npm install vcap_services --save

var vcapServices = require('vcap_services');
var credentials = vcapServices.getCredentials('personality_insights');
console.log(credentials);

//If VCAP_SERVICES is:
{
  "personality_insights": [{
      "credentials": {
        "password": "<password>",
        "url": "<url>",
        "username": "<username>"
      },
      "label": "personality_insights",
      "name": "personality-insights-service",
      "plan": "standard"
  }]
}

//Output:
{
  "password": "<password>",
  "url": "<url>",
  "username": "<username>"
}

-------------------------------------------------------------------------------------------

// Node JS Module : Assert   -- https://nodejs.org/api/assert.html
// The assert module provides a simple set of assertion tests that can be used to test invariants.
const assert = require('assert');

// assert.ok(value[, message]) // test the value is truthy

assert.ok(true);
// OK
assert.ok(1);
// OK
assert.ok(false);
// throws "AssertionError: false == true"
assert.ok(0);
// throws "AssertionError: 0 == true"
assert.ok(false, 'it\'s false');
// throws "AssertionError: it's false"

-------------------------------------------------------------------------------------------


// Node JS Module : SuperTest -- https://www.npmjs.com/package/supertest
// SuperTest works with any test framework
const request = require('supertest');

const express = require('express');
const app = express();
 
// There is no need to keep track of ports.
app.get('/user', function(req, res) {
  res.status(200).json({ name: 'tobi' });
});
 
// SuperTest par request au serveur
request(app).get('/user').expect('Content-Type', /json/).expect('Content-Length', '15').expect(200).end(function(err, res) { if (err) throw err; });
  
// Test with mocha 
// Method .expect() assertions that fail will not throw - they will return the assertion as an error to the .end() callback. 
describe('GET /users', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) 
        	return done(err);
        done();
      });
  });
});
  
//  Use promises
describe('GET /users', function() {
  it('respond with json', function() {
    return request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
          assert(response.body.email, 'foo@bar.com')
      })
  });
});


-------------------------------------------------------------------------------------------
// toggle the style in the page web by using toggle()

<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
.mystyle {
    width: 100%;
    padding: 25px;
    background-color: coral;
    color: white;
    font-size: 25px;
    box-sizing: border-box;
}
</style>
</head>
<body>

<p>Click the "Try it" button to toggle between adding and removing the "mystyle" class name of the DIV element:</p>

<button onclick="myFunction()">Try it</button>

<div id="myDIV">
This is a DIV element.
</div>

<script>
function myFunction() {
   var element = document.getElementById("myDIV");
   element.classList.toggle("mystyle");
}
</script>

</body>
</html>


-------------------------------------------------------------------------------------------

Wiring The Events

In order to listen to key presses, you will wire an event listener to the keypress event. 
That event listen to all key presses and in its handler you will store the key pressed (but won’t store the Enter key press). 
Here is an example for doing that:

window.addEventListener('keypress', function (e) {
    if (e.keyCode !== 13) {
        chars.push(e.key);
    }
}, false );

