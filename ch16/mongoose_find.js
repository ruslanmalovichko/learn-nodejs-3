import mongoose from 'mongoose';

import Words from './models/words.js';

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/words');
  let count = await Words.find({word: {$regex: '(^a|^e|^i|^o|^u).*?(a$|e$|i$|o$|u$)'}}).count();
  console.log("\nThere are " + count + " words that start and end with a vowel");

  let docs = await Words.find({word: {$regex: '(^a|^e|^i|^o|^u).*?(a$|e$|i$|o$|u$)'}}).limit(5).sort({ size: -1 });
  console.log("\nLongest 5 words that start and end with a vowel: ");
  for (var i in docs){
    console.log(docs[i].word);
  }

  docs = await Words.find().mod('size',2,0).where('size').gt(6).limit(10).select({word:1, size:1});
  console.log("\nWords with even lengths and longer than 5 letters: ");
  for (var i in docs){
    console.log(JSON.stringify(docs[i]));
  }
}

