import express from 'express';
import bodyParser from 'body-parser';

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Send result of form to req.body

app.get('/', function (req, res) {
  let response = '<form method="POST">' +
        'First: <input type="text" name="first"><br>' +
        'Last: <input type="text" name="last"><br>' +
        '<input type="submit" value="Submit"></form>';
  res.send(response);
});

app.post('/',function(req, res){
  console.log(req);
  let response = '<form method="POST">' +
        'First: <input type="text" name="first"><br>' +
        'Last: <input type="text" name="last"><br>' +
        '<input type="submit" value="Submit"></form>' +
        '<h1>Hello ' + req.body.first + '</h1>';
  res.type('html');
  res.end(response);
  console.log(req.body);
});

app.listen(80);

