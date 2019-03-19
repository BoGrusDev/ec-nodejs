/*
    readfile.js

    https://nodejs.org/dist/latest-v6.x/docs/api/fs.html
*/

var fs = require('fs');
 
fs.readFile('test.txt', 'utf8', function(err, contents) {
    console.log(contents);
});
 
console.log('efter calling readFile');