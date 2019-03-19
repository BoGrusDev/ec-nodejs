/*
    input-2.js

    npm install minimist
*/
const argv = require("minimist") (process.argv.slice(2))
console.log(argv);
console.log(argv['namn'])
