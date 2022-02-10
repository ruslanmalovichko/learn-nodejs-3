async function distinctValues(words){
  let values = await words.distinct('size');
  console.log("\nSizes of words: ");
  console.log(values);

  values = await words.distinct('first', {last:'u'});
  console.log("\nFirst letters of words ending in u: ");
  console.log(values);

  values = await words.distinct('stats.vowels');
  console.log("\nNumbers of vowels contain in words: ");
  console.log(values);
}

async function sortItems(words){
  let cursor = words.find({
    word: {$regex: 'w$'}
  })
  await displayWords("Words ending in w: ", cursor);

  cursor = words.find({
    word: {$regex: 'w$'}
  }).sort({ word: 1 });
  await displayWords("Words ending in w sorted ascending: ", cursor);

  cursor = words.find({
    word: {$regex: 'w$'}
  }).sort({ word: -1 });
  await displayWords("Words ending in w sorted, descending: ", cursor);

  cursor = words.find({
    word: {$regex: '^b'}
  }).sort({ size: -1, last: 1 });
  await displayWords("B words sorted by size then by last letter: ", cursor);

  cursor = words.find({
    word: {$regex: '^b'}
  }).sort({ last: 1, size: -1 });
  await displayWords("B words sorted by last letter then by size: ", cursor);
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
    {type:'words',word: 'ruslanu', size: 7, last: 'u', first: 'r', stats: {vowels: 3, consonants: 4}},
    {$set:{type:'words',word: 'ruslanu', size: 7, last: 'u', first: 'r', stats: {vowels: 3, consonants: 4}}},
    {upsert:true}
  );

  results = await collection.updateMany(
    {type:'words',word: 'aruslan2u', size: 9, last: 'u', first: 'a', stats: {vowels: 4, consonants: 4}},
    {$set:{type:'words',word: 'aruslan2u', size: 9, last: 'u', first: 'a', stats: {vowels: 4, consonants: 4}}},
    {upsert:true}
  );

  // results = await collection.updateMany(
  //   {type:'words',word: 'ruslan3w'},
  //   {$set:{type:'words',word: 'ruslan3w'}},
  //   {upsert:true}
  // );

  // results = await collection.updateMany(
  //   {type:'words',word: 'bruslana', last: 'a', size: 8},
  //   {$set:{type:'words',word: 'bruslana', last: 'a', size: 8}},
  //   {upsert:true}
  // );

  // results = await collection.updateMany(
  //   {type:'words',word: 'bruslannn', last: 'n', size: 9},
  //   {$set:{type:'words',word: 'bruslannn', last: 'n', size: 9}},
  //   {upsert:true}
  // );

  await distinctValues(collection);

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

