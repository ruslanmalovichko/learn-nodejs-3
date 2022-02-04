// const { MongoClient } = require("mongodb");
import { MongoClient } from 'mongodb'

// Replace the following with values for your environment.
const username = encodeURIComponent("dbadmin");
const password = encodeURIComponent("test");
// const clusterUrl = "localhost:27017";
const clusterUrl = "localhost";
const authMechanism = "DEFAULT";
// Replace the following with your MongoDB deployment's connection string.
// const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;
const uri = `mongodb://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;
// Create a new MongoClient
const client = new MongoClient(uri);
// Function to connect to the server
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    const ping = await client.db("testDB").command({ ping: 1 });
    console.log(ping)
    console.log("Connected successfully to server");

    const db = client.db("testDB");
    const collection = db.collection('newCollection');
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

