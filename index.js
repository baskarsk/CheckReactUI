var express = require("express");
var path = require("path")
var app = express();
var port = process.env.PORT||4000
var compression =require ('compression');

/* eslint-disable no-console */


app.use(compression());

app.use('/images', express.static(path.join( __dirname, './images')));

app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(port,function(err){
	console.log("Bodha App started",port)
});
