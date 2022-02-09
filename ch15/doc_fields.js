async function limitFields(words){
  let items = await words.find({word:'the'}).project({charsets:0});
  let itemArr = await items.toArray();
  console.log("Excluding fields object: ");
  console.log(itemArr);

  items = await words.find({word:'the'}).project({word:1,size:1,stats:1});
  itemArr = await items.toArray();
  console.log("Including fields object: ");
  console.log(itemArr);
}

import { MongoClient } from 'mongodb'
// Connection URL
const url = 'mongodb://dbadmin:test@localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'words';

// Collection Name
const collectionName = 'word_stats';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');

  await client.db(dbName).dropDatabase();

  let newDB = client.db(dbName);
  let collection = newDB.collection(collectionName);

  let results = await collection.updateMany(
    {type:'words',word: 'ruslan'},
    {$set:{type:'words',word: 'ruslan'}},
    {upsert:true}
  );

  results = await collection.updateMany(
    {type:'words',word: 'aruslan'},
    {$set:{type:'words',word: 'aruslan'}},
    {upsert:true}
  );

  results = await collection.updateMany(
    {type:'words',word: 'aruslani'},
    {$set:{type:'words',word: 'aruslani'}},
    {upsert:true}
  );

  results = await collection.updateMany(
    {type:'words',word: 'bruslan'},
    {$set:{type:'words',word: 'bruslan'}},
    {upsert:true}
  );

  results = await collection.updateMany(
    {type:'words',word: 'ruslanruslan'},
    {$set:{type:'words',word: 'ruslanruslan'}},
    {upsert:true}
  );

  results = await collection.updateMany(
    {type:'words',word: 'ruslanruslanr'},
    {$set:{type:'words',word: 'ruslanruslanr'}},
    {upsert:true}
  );

  results = await collection.updateMany(
    {type:'words',word: '@ruslan'},
    {$set:{type:'words',word: '@ruslan'}},
    {upsert:true}
  );

  results = await collection.updateMany(
    {word:'the', first: 't', last: 'e', size: '3', letters: ["t", "h", "e"], stats: {vowels: 1, consonants: 2}, charsets: false},
    {$set:{word:'the', first: 't', last: 'e', size: '3', letters: ["t", "h", "e"], stats: {vowels: 1, consonants: 2}, charsets: false}},
    {upsert:true}
  );

  // await findItems(collection);
  await limitFields(collection);

  let items = collection.find();
  let itemArr = await items.toArray();
  console.log("Document Array: ");
  console.log(itemArr);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

