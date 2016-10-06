var express = require('express');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');

var app = express();
app.use(cookieParser())
app.use(express.static('public'));

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
       first_name: req.query.first_name,
       last_name: req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.get('/', function (req, res) {  // req, res – request and response objects
	console.log("Got a GET request for homepage");
	console.log("Cookies: ", req.cookies);
	res.send('Hello GET'); 
})

app.post('/', function (req, res) {  // req, res – request and response objects
	console.log("Got a POST request for homepage");
	res.send('Hello POST'); 
})

//IO
var fs = require("fs");

// Asynchronous read
fs.readFile('input.txt', function (err, data) {
   if (err) {
      return console.error(err);
   }
   console.log("Asynchronous read: " + data.toString());
});

// Synchronous read
var data = fs.readFileSync('input.txt');
console.log("Synchronous read: " + data.toString());

console.log("Program Ended");

var server = app.listen(8081, function () {
	var host = server.address().address 
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port) 
})
