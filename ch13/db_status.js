import { MongoClient } from 'mongodb'
// Connection URL
const url = 'mongodb://dbadmin:test@localhost:27017';
const client = new MongoClient(url);

// Database Name
// const dbName = 'newDB';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db();

  // await client.db(dbName).dropDatabase();

  let adminDB = db.admin();
  let serverStatus = await adminDB.serverStatus();
  console.log(serverStatus.connections);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

