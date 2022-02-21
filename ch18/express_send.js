import express from 'express';
let app = express();

app.listen(80);

app.get('/', function (req, res) {
  let response = '<html><head><title>Simple Send</title></head>' +
                 '<body><h1>Hello from Express</h1></body></html>';
  res.status(200);
  res.set({
    'Content-Type': 'text/html',
    'Content-Length': response.length
  });
  res.send(response);
  console.log('Response Finished? ' + res.writableEnded);
  console.log('\nHeaders Sent: ');
  console.log(res._header);
});
app.get('/error', function (req, res) {
  res.status(400);
  res.send("This is a bad request.");
});

