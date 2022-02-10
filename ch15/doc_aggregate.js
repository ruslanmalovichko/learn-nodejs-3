async function aggregateItems(words){
  let results = await words.aggregate([
    {$match: {first:{$in:['a','e','i','o','u']}}},
    {$group: {_id:"$first",largest:{$max:"$size"},smallest:{$min:"$size"},total:{$sum:1}}},
    {$sort: {_id:1}}
  ]);
  let itemArr = await results.toArray();
  console.log("Largest and smallest word sizes for " + "words beginning with a vowel: ");
  console.log(itemArr);

  results = await words.aggregate([
    {$match: {size:4}},
    {$limit: 5},
    {$project: {_id:"$word", stats:1}}
  ]);
  itemArr = await results.toArray();
  console.log("Stats for 5 four letter words: ");
  console.log(itemArr);

  results = await words.aggregate([
    {$group: {_id:"$first", average:{$avg:"$size"}}},
    {$sort: {average:-1}},
    {$limit: 5}
  ])
  itemArr = await results.toArray();
  console.log("Letters with largest average word size: ");
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
    {type:'words',word: 'oruslan', size: 7, last: 'n', first: 'o', stats: {vowels: 3, consonants: 4}},
    {$set:{type:'words',word: 'oruslan', size: 7, last: 'n', first: 'o', stats: {vowels: 3, consonants: 4}}},
    {upsert:true}
  );

  results = await collection.updateMany(
    {type:'words',word: 'aruslan2u', size: 9, last: 'u', first: 'a', stats: {vowels: 4, consonants: 4}},
    {$set:{type:'words',word: 'aruslan2u', size: 9, last: 'u', first: 'a', stats: {vowels: 4, consonants: 4}}},
    {upsert:true}
  );

  results = await collection.updateMany(
    {type:'words',word: 'aruslan2', size: 8, last: 'u', first: 'a', stats: {vowels: 4, consonants: 4}},
    {$set:{type:'words',word: 'aruslan2', size: 8, last: 'u', first: 'a', stats: {vowels: 4, consonants: 4}}},
    {upsert:true}
  );

  results = await collection.updateMany(
    {type:'words',word:'have', size: 4, last: 'e', first: 'h', stats: {vowels: 2, consonants: 2}},
    {$set:{type:'words',word:'have', size: 4, last: 'e', first: 'h', stats: {vowels: 2, consonants: 2}}},
    {upsert:true}
  );

  results = await collection.updateMany(
    {type:'words',word:'that', size: 4, last: 't', first: 't', stats: {vowels: 1, consonants: 3}},
    {$set:{type:'words',word:'that', size: 4, last: 't', first: 't', stats: {vowels: 1, consonants: 3}}},
    {upsert:true}
  );

  await aggregateItems(collection);

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

