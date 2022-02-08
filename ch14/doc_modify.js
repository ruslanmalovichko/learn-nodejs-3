import { MongoClient } from 'mongodb'
// Connection URL
const url = 'mongodb://dbadmin:test@localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'astro';

// Collection Name
const collectionName = 'nebulae';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');

  let newDB = client.db(dbName);

  let collection = newDB.collection(collectionName);

  let items = collection.find({type:"supernova"});
  // let items = collection.find({type:"Super Nova"});

  let itemArr = await items.toArray();
  console.log("Before Modify: ");
  console.log(itemArr);

  await collection.findOneAndUpdate(
    {type:"supernova"},
    // {type:"Super Nova"},
    {$set: {type:"Super Nova", "updated":true}},
    // {$set: {type:"supernova", "updated":true}},
    {
      sort: [['name', 1]],
    }
  );

  items = collection.find({type:"Super Nova"});
  // items = collection.find({type:"supernova"});

  itemArr = await items.toArray();

  console.log("After Modify: ");
  console.log(itemArr);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

