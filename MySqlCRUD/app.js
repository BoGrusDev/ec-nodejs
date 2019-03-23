const express = require('express');
var bodyParser = require('body-parser')
const app = express();

// create application/json parser
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const mysql = require('mysql')
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'segdeg',
    database : 'rmd'
});

connection.connect();

app.use(bodyParser.json());

// Home default
app.get('/', (req, res) => {
    res.json({"message": "Home"});
});

app.get('/list', (req, res) => {
    connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
    
});

app.get('/get', (req, res) => {
    console.log(req.body);
    res.json({"message": "GET"});
});

app.post('/', urlencodedParser, function (req, res) {
   
    console.log(req.body.last_name);
    res.send(req.body);
  
    //res.send({"message": "POST"})
})

app.put('/', (req, res) => {
    /*
        {
        "last_name": "Jan",
        "first_name": "Janssson",
        "mobile": "072-222222",
        "email": "Jnnee@gmail.com",
        "age": 34,
        "gender": "m"
    }
    */
    res.json({"message": "PUT"});
});

app.delete('/', function (req, res) {
    res.json({"message": "DELETE"});
})


// listen on port 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

/*

req.params.tagId
tagId=test

*/