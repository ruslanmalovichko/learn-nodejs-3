import mongoose from 'mongoose';

import Words from './models/words.js';

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/words');
  const newWord1 = new Words({
    word:'gratifaction',
    first:'g',
    last:'n',
    size:12,
    letters: ['g','r','a','t','i','f','c','o','n'],
    stats: {vowels:5, consonants:7}
  });
  console.log("Is Document New? " + newWord1.isNew);
  let doc = await newWord1.save();
  console.log("\nSaved document: " + doc);

  let newWord2 = {
    word:'googled',
    first:'g',
    last:'d',
    size:7,
    letters: ['g','o','l','e','d'],
    stats: {vowels:3, consonants:4}
  };
  let newWord3 = {
    word:'selfie',
    first:'s',
    last:'e',
    size:6,
    letters: ['s','e','l','f','i'],
    stats: {vowels:3, consonants:3}
  };

  let docs = await Words.create([newWord2, newWord3]);
  // docs.forEach(function(item, i, arr) {
  docs.forEach(function(item) {
    console.log("\nCreated document: " + item);
  });
  await mongoose.disconnect();
}

