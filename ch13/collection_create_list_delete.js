import { MongoClient } from 'mongodb'
// Connection URL
const url = 'mongodb://dbadmin:test@localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'newDB';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');

  await client.db(dbName).dropDatabase();

  let newDB = client.db(dbName);

  let collectionNames = await newDB.collections();

  console.log("Initial collections: ");
  console.log(collectionNames);

  let collection = await newDB.createCollection("newCollection");

  collectionNames = await newDB.collections();

  console.log("Collections after creation: ");
  console.log(collectionNames);

  let results = await newDB.dropCollection("newCollection");

  collectionNames = await newDB.collections();

  console.log("Collections after deletion: ");
  console.log(collectionNames);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

