const mysql = require('mysql')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'segdeg',
    database : 'rmd'
});

connection.connect();

connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    //console.log(results);
    console.log(fields);
  });
   
connection.end();



