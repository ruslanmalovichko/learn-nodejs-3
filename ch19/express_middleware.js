import express from 'express';

let app = express();

function queryRemover(req, res, next){
  console.log("\nBefore URL: ");
  console.log(req.url);
  req.url = req.url.split('?')[0];
  console.log("\nAfter URL: ");
  console.log(req.url);
  next();
};

app.use(queryRemover); // middleware, will be called before each request

app.get('/no/query', function(req, res) {
  console.log(req.url);
  res.send("test");
});

app.listen(80);

