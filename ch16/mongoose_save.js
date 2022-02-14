import mongoose from 'mongoose';

import Words from './models/words.js';

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/words');
  let doc;
  const book = new Words({
    word:'book',
    first:'b',
    last:'k',
    size:4,
    letters: ['b','o','o','k'],
    stats: {vowels:2, consonants:2}
  });
  console.log("Is Document New? " + book.isNew);
  doc = await book.save();
  console.log("\nSaved document: " + doc);

  doc = await Words.findOne().where('word', 'book');
  console.log(doc);
  console.log("Is Document New? " + doc.isNew);
  console.log("\nBefore Save: ");
  console.log(doc.toJSON());
  doc.set('word','Book');
  doc.set('first','B');
  doc.set('letters',['B', 'o', 'o', 'k']);
  console.log("\nModified Fields: ");
  console.log(doc.modifiedPaths());
  await doc.save();
  doc = await Words.findOne({word:'Book'});
  console.log("\nAfter Save: ");
  console.log(doc.toJSON());
  await mongoose.disconnect();
}

