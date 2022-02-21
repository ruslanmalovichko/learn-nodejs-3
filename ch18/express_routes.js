import express from 'express';
import url from 'url';
let app = express();

app.listen(80);

app.get('/', function(req, res) { // gets / only
  res.send("Get Index");
});

app.get('/find', function(req, res) { // gets /find with parameters
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  let response = 'Finding Book: Author: ' + query.author + ' Title: ' + query.title;
  console.log('\nQuery URL: ' + req.originalUrl);
  console.log(response);
  res.send(response);
});

app.get(/^\/book\/(\w+)\:(\w+)?$/, function(req, res) { // gets /book/*:*
  let response = 'Get Book: Chapter: ' + req.params[0] + ' Page: ' + req.params[1];
  console.log('\nRegex URL: ' + req.originalUrl);
  console.log(response);
  res.send(response);
});

app.get('/user/:userid', function(req, res) { // gets /user/*
  let response = 'Get User: ' + req.params.userid;
  console.log('\nParam URL: ' + req.originalUrl);
  console.log(response);
  res.send(response);
});

app.param('userid', function(req, res, next, value) { // can not live without app.get. // gets /user/*
  console.log("\nRequest received with userid: " + value);
  next(); // without next it does not call app.get
});

// /find?author=Brad&title=Node
// /book/12:15
// /user/4983

