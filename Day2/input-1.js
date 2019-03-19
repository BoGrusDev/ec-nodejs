/*
    input-1.js
*/

process.argv.forEach((val, index) => {
    console.log(val)
    console.log(index)
})

var param = process.argv[2];
console.log(" First param:" +  param);

const arg = process.argv.slice(2);
console.log(" First again:" +  arg);

