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
  console.log("Document Array: ");
  console.log(itemArr);

  items = collection.find();

  await items.forEach(function(item) {
    if (item) {
      console.log("Singular Document: ");
      console.log(item);
    }
  });

  let item = await collection.findOne({type:'planetary'});
  console.log("Found One: ");
  console.log(item);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

