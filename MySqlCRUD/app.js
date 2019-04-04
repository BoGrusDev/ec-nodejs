const express = require('express');
var bodyParser = require('body-parser')

const app = express();

//var urlencodedParser = bodyParser.urlencoded({ extended: false })
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})

app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json({
    type: ['application/json', 'text/plain']
  }));

const mysql = require('mysql')
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'segdeg',
    database : 'rnd2'
});

connection.connect();

const fs = require('fs')

//app.use(bodyParser.json());


app.get('/import', (req, res) => {

    fs.readFile("import.html", function (error, page) {
        res.set('Content-Type', 'text/html');
        res.send(page)
    });
});

app.get('/get', (req, res) => {
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

app.post('/update', urlencodedParser, function (req, res) {
    /*
        Updatera (U)
    {
        "_id" : "5",
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

app.put('/insert', (req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    /*
        CREATE (Insert)
    {
        "last_name": "Ek",
        "first_name": "Jan",
        "mobile": "072-1113332",
        "email": "jan@gmail.com",
        "age": 28,
        "gender": "m",
        "password" : "test123".
        "city" : "Stockholm",
        "title" : "Doktor"
    }
    */
    var sql = "INSERT INTO users (last_name, first_name, mobile, email, age, gender, password, city, title) VALUE(" ;
    sql += "'" + req.body.last_name + "','" + req.body.first_name + "','" + req.body.mobile + "','" + req.body.email + "','" + req.body.age + "','";
    sql += req.body.gender + "','" + req.body.password + "','" + req.body.city + "','" + req.body.title + "')";
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

app.delete('/delete', function (req, res) {

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

app.post('/login', urlencodedParser, function (req, res) {
    /*
        Login (U)
    {
        "user_name" : "bosse",
        "password" : "test"
    }
    */
    sql = `SELECT * FROM users WHERE user_name = "${req.body._user_name}" AND password = "${req.body._password}"`;
    connection.query(sql, function (error, results, fields) {
        var reply = {};
        if (error) {
            reply.code = "0"; 
            res.json(reply);
        } 
        else if (results.length == 0) {
            reply.code = "0";
            res.json(reply);
        }  
        else {
            res.json(results);
        }   
    });
})

app.post('/import', function (req, res) {
    console.log(req.body);

    var sql = "INSERT INTO users (last_name, first_name, mobile, email, gender, password, city, title) VALUE " ;
  
    for (let i=0; i < req.body.length; i++ ) {
        sql += "('" + req.body[i].last_name + "','" + req.body[i].first_name + "','" + req.body[i].Mobile + "','" + req.body[i].email + "','";
        sql += req.body[i].gender.charAt(0).toLowerCase() + "','" + req.body[i].ip_address + "','" + req.body[i].City + "','" + req.body[i].job_title + "'),";
    }
    sql = sql.substring(0, sql.length-1);
    console.log(sql);
   
    connection.query(sql, function (error, results, fields) {
        var reply = {};
        if (error) {
            console.log(error);
            reply.code = "0"; 
        } else { 
            var reply = {};
            reply.code = "1"; 
            reply.counter = req.body.length;
        }
        res.json(reply);
    });
   
});

// listen on port 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

/*
function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}

*/