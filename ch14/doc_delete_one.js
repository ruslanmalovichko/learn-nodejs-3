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

  let items = collection.find();
  let itemArr = await items.toArray();
  console.log("Before Delete: ");
  console.log(itemArr);

  let results = await collection.findOneAndDelete(
    {type:"planetary"},
    {
      sort: [['name', 1]],
    }
  );

  console.log("Deleted ");
  console.log(results);
  console.log(" documents.");

  items = collection.find();

  itemArr = await items.toArray();

  console.log("After Delete: ");
  console.log(itemArr);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

