import mongoose from 'mongoose';
const { model, Schema } = mongoose;
const Mixed = Schema.Types.Mixed;
const options = { collection: 'word_stats', timestamps: true };

const wordSchema = new Schema({
  word: {type: String, index: true, required:true, unique: true},
  // word: {type: Number, index: true, required:true, unique: true},
  first: {type: String, index: true},
  last: String,
  size: Number,
  letters: [String],
  stats: {vowels:Number, consonants:Number},
  charsets: [Mixed]
},
  options
);

wordSchema.methods.startsWith = function(letter){
  return this.first === letter;
};

export default model('Words', wordSchema);

