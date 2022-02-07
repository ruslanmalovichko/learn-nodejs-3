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
  let collection = await newDB.createCollection("newCollection");
  let stats = await collection.stats();
  console.log(stats.storageSize);
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

