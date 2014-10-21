var express = require('express');
var app = express(); // invokes the express applications

// express.static serves up the index.html file in client.
app.use(express.static('./client')); // look up app.use

app.listen(9000, function(){ // creates the server
	console.log('serve listening on 9000;');
})

module.exports = app;