import mongoose from 'mongoose';

import Words from './models/words.js';

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/words');
  let docs = await Words.find();
  console.log("Before update: ");
  for (var i in docs){
    console.log(docs[i].word + " : " + docs[i].size);
  }
  const filter = { word: { $regex: /grati.*/ } };
  await Words.updateMany(filter, {$set: {size: 0}});

  docs = await Words.find({word:/grat.*/});
  console.log("\nAfter update: ");
  for (var i in docs){
    console.log(docs[i].word + " : " + docs[i].size);
  }

  await mongoose.disconnect();
}

