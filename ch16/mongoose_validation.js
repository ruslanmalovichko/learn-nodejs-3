import mongoose from 'mongoose';

import Words from './models/words.js';

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/words');
  var newWord = await new Words({
    word:'supercalifragilisticexpialidocious',
    first:'s',
    last:'s',
    size:'supercalifragilisticexpialidocious'.length,
  });
  await newWord.save();
  await mongoose.disconnect();
}

