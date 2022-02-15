import mongoose from 'mongoose';
import Words from './models/words.js';

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/words');
  let newWord = new Words({
    word:'newword',
    first:'t',
    last:'d',
    size:'newword'.length,
  });
  console.log("\nSaving: ");
  await newWord.save();
  console.log("\nFinding: ");
  await Words.findOne({word:'newword'});
  console.log("\nRemoving: ");
  await newWord.remove();

  await mongoose.disconnect();
}

