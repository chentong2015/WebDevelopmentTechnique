// Install with npm install "ws"
// npm init  ==> create package.json
// npm install ws
// start the server : node index.js

// Test real time :
// npm install -g nodemon
// nodemon index.js

var server = require('ws').Server;
var s = new server({ port: 5001});

// Server replay to the message come form the client 
s.on('connection', function(ws){
	// Receive the send the message to the server
   ws.on('message', function(message){
   		// show this in the console of server
   		console.log("Received the message: " + message);

   		message = JSON.parse(message);
   		// Get the name of the client : message.data
   		if(message.type == "name"){
   			ws.personName = message.data;
   			return;
   		}

   		// Send the message to all the others clients at line
   		s.clients.forEach(function e(client) {
   			if(client != ws) {  				
   				client.send(JSON.stringify({
   					name: ws.personName,
   					data: message.data
   				}));
   			}
   		});
   		//ws.send("From the server : " + message);

   		ws.on('close', function(){
   			console.log("A client stop the connection");
   		})	
   });

   // Show this every time one client connect the server
	console.log("one more client connected");

})
