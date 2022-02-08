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
  let item = await collection.findOne({type: "supernova"})
  console.log("Before Save: ");
  console.log(item);
  item.info = "Some New Info";
  await collection.replaceOne({type: "supernova"}, item);
  let savedItem = await collection.findOne({_id:item._id});
  console.log("After Save: ");
  console.log(savedItem);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

