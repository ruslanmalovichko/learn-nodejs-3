var crypto = require('crypto');
var crypMethod = 'aes192';
var secret = 'MySecret';
function encryptPassword(pwd){
  var cipher = crypto.createCipher(crypMethod, secret);
  var cryptedPwd = cipher.update(pwd,'utf8','hex');
  cryptedPwd += cipher.final('hex');
  return cryptedPwd;
} 
function decryptPassword(pwd){
  var decipher = crypto.createDecipher(crypMethod, secret);
  var decryptedPwd = decipher.update(pwd,'hex','utf8');
  decryptedPwd += decipher.final('utf8');
  return decryptedPwd;
} 
var encryptedPwd = encryptPassword("CalebRocks");
console.log("Encrypted Password");
console.log(encryptedPwd);
console.log("\nDecrytped Password");
console.log(decryptPassword(encryptedPwd));