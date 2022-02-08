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
  let items = collection.find({type:"diffuse"});
  let itemArr = await items.toArray();
  console.log("Before Upsert: ");
  console.log(itemArr);
  await collection.updateOne(
    {type:"diffuse"},
    {$set: {ngc:"NGC 3372", name:"Carina", type:"diffuse", location:"Carina"}},
    {upsert:true} // if document is not exist, so create one
  );

  items = collection.find({type:"diffuse"});
  itemArr = await items.toArray();
  console.log("After Upsert 1: ");
  console.log(itemArr);
  var itemID = itemArr[0]._id;
  await collection.updateOne(
    {_id:itemID},
    {$set: {ngc:"NGC 3372", name:"Carina", type:"Diffuse", location:"Carina"}},
    {upsert:true} // if document is not exist, so create one
  );

  let item = await collection.findOne({_id:itemID});
  console.log("After Upsert 2: ");
  console.log(item);

  // Return value
  await collection.updateOne(
    {_id:itemID},
    {$set: {ngc:"NGC 3372", name:"Carina", type:"diffuse", location:"Carina"}},
    {upsert:true} // if document is not exist, so create one
  );

  items = collection.find();
  itemArr = await items.toArray();
  console.log("All: ");
  console.log(itemArr);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

