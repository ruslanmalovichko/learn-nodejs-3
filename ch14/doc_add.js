async function addObject(collection, object){
  let result = await collection.insertOne(object);
  console.log("Inserted : ");
  console.log(result);
}

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

  await client.db(dbName).dropDatabase();

  let newDB = client.db(dbName);

  let collection = await newDB.createCollection(collectionName);

  await addObject(collection, {ngc:"NGC 7293", name:"Helix", type:"planetary",location:"Aquila"});
  await addObject(collection, {ngc:"NGC 6543", name:"Cat's Eye", type:"planetary",location:"Draco"});
  await addObject(collection, {ngc:"NGC 1952", name: "Crab", type:"supernova",location:"Taurus"});

  newDB = client.db(dbName);

  let documents = newDB.collection(collectionName).find();

  console.log(await documents.toArray());

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

