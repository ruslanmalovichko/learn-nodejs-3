var af = new Buffer.from("African Swallow?");
var eu = new Buffer.from("European Swallow?");
var question = new Buffer.from("Air Speed Velocity of an ");
console.log(Buffer.concat([question, af]).toString());
console.log(Buffer.concat([question, eu]).toString());
