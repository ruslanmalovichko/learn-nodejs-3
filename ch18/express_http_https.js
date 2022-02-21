import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
let app = express();
let options = {
  host: '127.0.0.1',
  key: fs.readFileSync('ssl/server.key'),
  cert: fs.readFileSync('ssl/server.crt')
};
http.createServer(app).listen(80);
https.createServer(options, app).listen(443);
app.get('/', function(req, res){
  res.send('Hello from Express');
});

