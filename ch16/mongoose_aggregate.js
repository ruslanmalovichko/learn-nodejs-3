import mongoose from 'mongoose';

import Words from './models/words.js';

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/words');
  let results;
  results = await Words.aggregate(
    [
      {$match: {first:{$in:['a','e','i','o','u']}}},
      {$group: {_id:"$first",largest:{$max:"$size"},smallest:{$min:"$size"},total:{$sum:1}}},
      {$sort: {_id:1}}
    ]
  );
  console.log("\nLargest and smallest word sizes for " + "words beginning with a vowel: ");
  console.log(results);

  results = await Words.aggregate(
    [
      {$match: {size:4}},
      {$limit: 5},
      {$project: {_id:"$word", stats:1}}
    ]
  );
  console.log("\nStats for 5 four letter words: ");
  console.log(results);

  results = await Words.aggregate(
    [
      {$group: {_id:"$first",average:{$avg:"$size"}}},
      {$sort: {average:-1}},
      {$limit: 5}
    ]
  );
  console.log("\nLetters with largest average word size: ");
  console.log(results);

  await mongoose.disconnect();
}

