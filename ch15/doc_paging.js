async function displayWords(msg, cursor, pretty){
  let itemArr = await cursor.toArray();
  console.log("\n"+msg);

  let wordList = [];
  for (let i=0; i<itemArr.length; i++){
    wordList.push(itemArr[i].word);
  }
  console.log(JSON.stringify(wordList, null, pretty));
}

async function pagedResults(words, startIndex, pageSize){
  let cursor = words.find({
    word: {$regex: '^v'}
  }).limit(pageSize).skip(startIndex).sort({ word: 1 });

  let cursorCount = await cursor.count();
  if (cursorCount && cursorCount === pageSize){
    await displayWords("Page Starting at " + startIndex, cursor);
    await pagedResults(words, startIndex+pageSize, pageSize);
  }
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

  // await client.db(dbName).dropDatabase();

  let newDB = client.db(dbName);
  let collection = newDB.collection(collectionName);

  let results = await collection.updateMany(
    {type:'words',word: 'vruslan'},
    {$set:{type:'words',word: 'vruslan'}},
    {upsert:true}
  );

  results = await collection.updateMany(
    {type:'words',word: 'vruslan2'},
    {$set:{type:'words',word: 'vruslan2'}},
    {upsert:true}
  );

  results = await collection.updateMany(
    {type:'words',word: 'vruslan3'},
    {$set:{type:'words',word: 'vruslan3'}},
    {upsert:true}
  );

  // results = await collection.updateMany(
  //   {type:'words',word: 'bruslan'},
  //   {$set:{type:'words',word: 'bruslan'}},
  //   {upsert:true}
  // );

  // results = await collection.updateMany(
  //   {type:'words',word: 'ruslanruslan'},
  //   {$set:{type:'words',word: 'ruslanruslan'}},
  //   {upsert:true}
  // );

  // results = await collection.updateMany(
  //   {type:'words',word: 'ruslanruslanr'},
  //   {$set:{type:'words',word: 'ruslanruslanr'}},
  //   {upsert:true}
  // );

  // results = await collection.updateMany(
  //   {type:'words',word: '@ruslan'},
  //   {$set:{type:'words',word: '@ruslan'}},
  //   {upsert:true}
  // );

  // results = await collection.updateMany(
  //   {word:'the', first: 't', last: 'e', size: '3', letters: ["t", "h", "e"], stats: {vowels: 1, consonants: 2}, charsets: false},
  //   {$set:{word:'the', first: 't', last: 'e', size: '3', letters: ["t", "h", "e"], stats: {vowels: 1, consonants: 2}, charsets: false}},
  //   {upsert:true}
  // );

  // await findItems(collection);
  // await limitFields(collection);
  // await pagedResults(collection, 0, 10);
  await pagedResults(collection, 0, 1);

  // let items = collection.find();
  // let itemArr = await items.toArray();
  // console.log("Document Array: ");
  // console.log(itemArr);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

