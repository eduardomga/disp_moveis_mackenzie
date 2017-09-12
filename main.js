//Require

var express = require('express');
var bodyparser = require('body-parser');
var mysql = require('mysql');

//Configs
var app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//Database connection
var con = mysql.createConnection({
    host: "databasenode.c48ostqzozvb.us-east-1.rds.amazonaws.com",
    user: "eduardomga",
    password: "eduardomga5782",
    database: "employee"
});

//main page
app.get('/', function (req, res) {
    res.render('index.ejs');
});
app.listen(3000);


//employee page
app.post('/employee', function (req, res) {
    var employee = {name: req.param('name'), cargo: req.param('cargo')};

    /*con.connect(function (err) {
     if (err)
     throw err;
     console.log("Connected!");*/

    //insert

    var sql = "INSERT INTO employees (name, cargo) VALUES ('" + employee.name + "', '" + employee.cargo + "')";
    con.query(sql, function (err, result) {
        if (err)
            throw err;
        console.log("Employee inserted");

    });
    var insertedEmployee = {name: employee.name, cargo: employee.cargo};
    //select
    var sql = "SELECT * FROM employees";
    con.query(sql, function (err, result) {
        if (err)
            throw err;
        var selectResult = result;
        
        
        var count = selectResult.length;
        res.render('employee.ejs', {emp: insertedEmployee, select: selectResult, count: count});
    });


});
