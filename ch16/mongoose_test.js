import mongoose from 'mongoose';
const { model, Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
  // const conn = mongoose.createConnection('mongodb://localhost:27017/test');
  // await conn.dropCollection('kittens');

  await mongoose.connect('mongodb://localhost:27017/test');
  const kittySchema = new Schema({
    name: String
  });

  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  const Kitten = model('Kitten', kittySchema);

  let fluffy = await Kitten.find({ name: /^fluff/ });
  if (Object.keys(fluffy).length === 0) {
    const fluffy = new Kitten({ name: 'fluffy' });
    await fluffy.save();
    fluffy.speak(); // "Meow name is fluffy"
    console.log(fluffy.name);
  }

  let result = await Kitten.updateOne(
    { name: 'Silence' },
    { $set: { name: 'Silence'}},
    { upsert:true } // if document is not exist, so create one
  );
  console.log(result);

  const kittens = await Kitten.find();
  console.log(kittens);

  fluffy = await Kitten.find({ name: /^fluff/ });
  console.log(fluffy);
}

