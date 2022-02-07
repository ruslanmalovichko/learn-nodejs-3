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
  const db = client.db();

  await client.db(dbName).dropDatabase();

  var adminDB = db.admin();
  let listDatabases = await adminDB.listDatabases();
  console.log("Before Add Database List: ");
  console.log(listDatabases);

  var newDB = client.db(dbName);
  await newDB.createCollection("newCollection");
  console.log("New Database and Collection Created");

  listDatabases = await adminDB.listDatabases();
  console.log("After Add Database List: ");
  console.log(listDatabases);

  await client.db(dbName).dropDatabase();

  console.log("Database dropped.");

  listDatabases = await adminDB.listDatabases();
  var found = false;
  for (var i = 0; i < listDatabases.databases.length; i++) {
    if (listDatabases.databases[i].name == dbName) found = true;
  }
  if (!found){
    console.log("After Delete Database List: ");
    console.log(listDatabases);
  }

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

