import mongoose from 'mongoose';

import Words from './models/words.js';

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/words');
  let docs;
  docs = await Words.find({word:/grat.*/});
  console.log("Before delete: ");
  for (let i in docs){
    console.log(docs[i].word);
  }
  const filter = { word: { $regex: /grati.*/ } };
  let results = await Words.deleteMany(filter);
  console.log("\n%d Documents Deleted.", results.deletedCount);
  docs = await Words.find({word:/grat.*/});
  console.log("\nAfter delete: ");
  for (let i in docs) {
    console.log(docs[i].word);
  }

  await mongoose.disconnect();
}

