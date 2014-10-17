var express = require('express');
var app = express();

// express.static serves up the index.html file in client.
app.use(express.static('./client'));

app.listen(9000, function(){ // creates the server
	console.log('serve listening on 9000;');
})

module.exports = app;