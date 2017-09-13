/* global __dirname */

var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');



var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* 
 var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
*/

app.set('view engine', 'ejs');

app.get('/', function(req, res){
res.render('index.ejs');
});

app.post('/profile', function(req, res){   
   var person = {name: req.param('name'),cargo: req.param('cargo')};
res.render('profile.ejs', {person: person});
});


app.listen(3000);

