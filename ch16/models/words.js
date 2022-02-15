import mongoose from 'mongoose';
const { model, Schema } = mongoose;
const Mixed = Schema.Types.Mixed;
const options = { collection: 'word_stats', timestamps: true };

const wordSchema = new Schema({
  word: {
    type: String,
    index: true,
    required:true,
    unique: true,
    validate: [
      {
        validator: function(value) {
          return value.length > 0;
        },
        msg: 'Word is Too Small'
      },
      {
        validator: function(value) {
          return value.length < 20;
        },
        msg: 'Word is Too Big'
      }
    ]
  },
  first: {type: String, index: true},
  last: String,
  size: Number,
  letters: [String],
  stats: {vowels:Number, consonants:Number},
  charsets: [Mixed]
},
  options
);

wordSchema.pre('init', async function() {
  console.log('a new word is about to be initialized from the db');
});

wordSchema.pre('validate', async function() {
  console.log('%s is about to be validated', this.word);
});

wordSchema.pre('save', async function() {
  console.log('%s is about to be saved', this.word);
  console.log('Setting size to %d', this.word.length);
  this.size = this.word.length;
});

wordSchema.pre('remove', async function() {
  console.log('%s is about to be removed', this.word);
});

wordSchema.post('init', async function(doc) {
  console.log('%s has been initialized from the db', doc.word);
});

wordSchema.post('validate', async function(doc) {
  console.log('%s has been validated', doc.word);
});

wordSchema.post('save', async function(doc) {
  console.log('%s has been saved', doc.word);
});

wordSchema.post('remove', async function(doc) {
  console.log('%s has been removed', doc.word);
});

wordSchema.methods.startsWith = function(letter){
  return this.first === letter;
};

// wordSchema.index({word:1});
// wordSchema.index({first:1});

console.log('Indexes: ');
console.log(wordSchema.indexes());

console.log('Required: ');
console.log(wordSchema.requiredPaths());

export default model('Words', wordSchema);

