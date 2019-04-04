/*
    MongoDemo - Find

*/

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'users';
 
// Use connect method to connect to the server

//MongoClient.connect(url, function(err, client) {
MongoClient.connect(url,{ useNewUrlParser: true },function(err, client){
  assert.equal(null, err);
  //console.log("Connected successfully to server");
 
    const db = client.db(dbName);
    const collection = db.collection('users');
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log(docs)
        //callback(docs);
        client.close();
    });
});


  