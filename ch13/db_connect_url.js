var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;
var client = new MongoClient();
client.connect('mongodb://dbadmin:test@localhost:27017/testDB', 
		       {poolSize: 5, reconnectInterval: 500 },
function(err, db) {
  if (err){
    console.log("Connection Failed Via Client Object.");
  } else {
    console.log("Connected Via Client Object . . .");
    db.logout(function(err, result) {
      if(!err){
        console.log("Logged out Via Client Object . . .");
      }
      db.close();
          console.log("Connection closed . . .");
    });
  }
});