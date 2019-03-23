const express = require('express')
//const bodyParser = require('body-parser');
const app = express();
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended : true}));

const port = 3000;

var DbObject = require('./dbobject');
const db = new DbObject();

// npm install body-parser --save
// https://www.npmjs.com/package/mysql
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'segdeg',
    database : 'bappnet_2019'
});

connection.connect();

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/get', function (req, res) {
    connection.query('SELECT * FROM members', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(JSON.stringify(results));
        //res.send(results);
    });   
    
    //connection.end();
   
})

app.get('/db', function (req, res) {
    
    console.log("Call - Start");
    //var testRes = db.test();
    var result = db.getList(req, connection);
    console.log(result);
    res.send(JSON.stringify(result));
    //res.send(result);
    //connection.end();
});   
    

app.post('/', function (req, res) {
    res.send('Got a POST request')
  })

app.post('/api', function (req, res) {

    var body = "";
    req.on("data", function (data) {
        body += data;
    });
    req.on("end", function() {
        console.log(body);
        console.log(JSON.parse(body));
        var data = JSON.parse(body);
        console.log(data);
        //res.json({ message: 'goodbye'})
        res.send(data._action);
    });

    //console.log(req.body);
    //var json = req.body;
    //var data = JSON.parse(json);
    //console.log(data._group);
    //res.send("Done"); 
  })

/*
  https://expressjs.com/en/guide/routing.html


*/

app.listen(port, () => console.log(`MuSQL  app listening on port ${port}!`))