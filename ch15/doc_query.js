async function displayWords(msg, cursor, pretty){
  let itemArr = await cursor.toArray();
  console.log("\n"+msg);
  var wordList = [];
  for(var i=0; i<itemArr.length; i++){
    wordList.push(itemArr[i].word);
  }
  console.log(JSON.stringify(wordList, null, pretty));
}

async function findItems(words){
  let cursor = words.find({
    word: {$regex: '^a|^b|^c'}
  });
  await displayWords("Words starting with a, b or c: ", cursor);

  cursor = words.find({
    word: {$regex: '^.{13,}'}
  });
  await displayWords("Words longer that 12 characters: ", cursor);

  cursor = words.find({
    $where: 'this.word.length % 2 === 0'
  });
  await displayWords("Words with even Lengths: ", cursor);

  cursor = words.find({
    word: {$regex: '^.{12}$'}
  });
  await displayWords("Words with 12 Distinct characters: ", cursor);

  cursor = words.find({
    word: {$regex: '^[aeiou].*[aeiou]$'}
  });
  await displayWords("Words that start and end with a vowel: ", cursor);

  // Currently no solution
  // await displayWords("Words containing 7 or more vowels: ", cursor);

  // Currently no solution
  // await displayWords("Words with all 5 vowels: ", cursor);

  cursor = words.find({
    word: {$regex: '[^a-zA-Z0-9]'}
  });
  await displayWords("Words with non-alphabet characters: ", cursor);

  // Currently no solution
  // await displayWords("Words with 2 non-alphabet characters: ", cursor);
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

  await findItems(collection);

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

