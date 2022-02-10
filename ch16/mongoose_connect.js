import mongoose from 'mongoose';
const conn = await mongoose.connect('mongodb://localhost/words');

let connection = conn.connection.collection('word_stats');
console.log(connection.name);

let listCollections = conn.connection.db.listCollections();
console.log(await listCollections.toArray());
conn.disconnect();
