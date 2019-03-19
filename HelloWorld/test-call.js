
const fetch = require('node-fetch');

var person = {};
person.first_name = "Jan";
person.last_name = "Testsson";
person.email = "jan@test.com";
person.mobile = "070999999";

fetch('http://127.0.0.1:3001/', {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(person)})

    .then(res => res.json())
    .then(json => console.log(json));
