import express from 'express';
import basicAuth from 'basic-auth-connect';

let app = express();

let auth = basicAuth(function(user, pass) {
  return (user === 'user1' && pass === 'test');
});

app.get('/library', function(req, res) {
  res.send('Welcome to the library.');
});

app.get('/restricted', auth, function(req, res) {
  res.send('Welcome to the restricted section.');
});

app.listen(80);

