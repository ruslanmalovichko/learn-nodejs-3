import express from 'express';
import cookieParser from 'cookie-parser';

let app = express();

app.use(cookieParser()); // Create req.cookies object

app.get('/', function(req, res) {
  console.log(req.cookies);
  if (!req.cookies.hasVisited) {
    res.cookie('hasVisited', '1', { maxAge: 60*60*1000, httpOnly: true, path: '/' });
  }
  res.send("Sending Cookie");
});

app.listen(80);

