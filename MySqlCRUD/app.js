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

app.get('/', (req, res) => {
    /*
        READ (Get)
    http://localhost:3000?user_id=4
    */

    if ("user_id" in req.query) {

        console.log(req.query.user_id);
        var sql =`SELECT * FROM users WHERE user_id = ${req.query.user_id}`;
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    } 
    else {
        var reply = {};
        reply.code = "0"; 
        reply.message = "Missing userid!"
        res.json(reply);
    }
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
    /*
        Updatera (U)
    {
        #_id" : "5",
        "last_name": "Pettersson",
        "first_name": "Fred",
        "mobile": "072-1113332",
        "email": "fred@gmail.com",
        "age": 22,
        "gender": "m"
    }
    */

    var sql = "UPDATE users SET ";
    Object.entries(req.body).forEach(entry => {
        let key = entry[0];
        if (key.charAt(0) != "_" ) {
            let value = entry[1];
            sql +=  `${key} = "${value}",`;
        }
    });
    // Remove last var (comma)
    sql = sql.substring(0, sql.length-1);

    sql += ` WHERE user_id = ${req.body._user_id}`;
  
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
        var reply = {};
        if (error) {
            reply.code = "0"; 
        } else {
            reply.code = "1";
        }
        res.json(reply);
    });
});

app.put('/', (req, res) => {
    /*
        CREATE (Insert)
    {
        "last_name": "Pettersson",
        "first_name": "Fred",
        "mobile": "072-1113332",
        "email": "fred@gmail.com",
        "age": 22,
        "gender": "m"
    }
    */
    var sql = "INSERT INTO users (last_name, first_name, mobile, email, age, gender) VALUE(" ;
    sql += "'" + req.body.last_name + "','" + req.body.first_name + "','" + req.body.mobile + "','" + req.body.email + "','" + req.body.age + "','" + req.body.gender + "')";
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
        var reply = {};
        if (error) {
            reply.code = "0"; 
        } else {
            reply.code = "1";
            reply.id = results.insertId;
        }
        res.json(reply);
    });
})

app.delete('/', function (req, res) {

     /*
        Delete
    */   

    if ("user_id" in req.query) {

        console.log(req.query.user_id);
        var sql =`DELETE FROM users WHERE user_id = ${req.query.user_id}`;
        connection.query(sql, function (error, results, fields) {
            var reply = {};
            if (error) {
                reply.code = "0"; 
            } else {
                reply.code = "1";
                reply.id = results.insertId;
            }
            res.json(reply);
        });
    } 
    else {
        var reply = {};
        reply.code = "0"; 
        reply.message = "Missing userid!"
        res.json(reply);
    }
})


// listen on port 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

