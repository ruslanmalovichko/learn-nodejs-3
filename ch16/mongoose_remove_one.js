import mongoose from 'mongoose';

import Words from './models/words.js';

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/words');
  let doc;
  doc = await Words.find({ word: /^unhappy/ });
  if (Object.keys(doc).length === 0) {
    doc = new Words({ word: 'unhappy' });
    await doc.save();
  }

  doc = await Words.findOne().where('word', 'unhappy');
  console.log("Before Delete: ");
  console.log(doc);

  await doc.remove();
  doc = await Words.findOne({word:'unhappy'});
  console.log("\nAfter Delete: ");
  console.log(doc);

  await mongoose.disconnect();
}

