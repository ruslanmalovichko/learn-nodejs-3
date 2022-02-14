import mongoose from 'mongoose';

import Words from './models/words.js';

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/words');
  let doc;
  doc = await Words.findOne().where('word', 'gratifaction');
  console.log("Before Update: ");
  console.log(doc.toString());
  let results = await doc.updateOne({$set:{word:'gratifactions',size:13, last:'s'},$push:{letters:'s'}});
  console.log("\n%d Documents updated", results.modifiedCount);
  doc = await Words.findOne({word:'gratifactions'});
  console.log("\nAfter Update: ");
  console.log(doc.toString());
  await mongoose.disconnect();
}

