/*
    MongoDemo - Find

*/

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); 
// Connection URL
const url = 'mongodb://localhost:27017';
 
const args = process.argv.slice(2)
const action = args[0]
const dbName = 'users';

console.log(args)

switch(action) {
    case "find":
       
        MongoClient.connect(url,{ useNewUrlParser: true },function(err, client){
            assert.equal(null, err);
            const db = client.db(dbName);
            const collection = db.collection('users');
            collection.find({}).toArray(function(err, docs) {
                assert.equal(err, null);
                console.log(docs)
                client.close();
            });
        });
        break;
    case "login":

        MongoClient.connect(url,{ useNewUrlParser: true },function(err, client){
            assert.equal(null, err);
            var login = {};
            login.email = args[1]
            login.password = args[2]
             
            var loginJson = JSON.stringify(login)
            console.log(loginJson);
            const db = client.db(dbName);
            const collection = db.collection('users');
            var param = '{"email": "kalle@gmail.s", "password":"kalle"}';
            //collection.find({"email": "kalle@gmail.s", "password":"kalle"}).toArray(function(err, docs) {
            collection.find(login).toArray(function(err, docs) {
                assert.equal(err, null);
                console.log(docs)
                client.close();
            });
        });
        break;
    case "insert":
        MongoClient.connect(url,{ useNewUrlParser: true },function(err, client){
            assert.equal(null, err);
            const db = client.db(dbName);
            const collection = db.collection('users');
            collection.insertOne(
                {
                    first_name : "Niklas",
                    last_name : "Niklasson",
                    city : "Stocholm",
                    country : "Sweden"

                }, 
                (err, result) => {
                    assert.equal(err, null);
                 
                    client.close();
            });
        });
        break;
   
    default:
        console.log("No valid action");
}


  