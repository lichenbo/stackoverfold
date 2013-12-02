// Module dependencies.
var express = require('express')

var app = express.createServer();

app.configure( function() {
});

app.get('/', function(req,res) {
	res.send('Hello, world');
});

app.listen(3000);
