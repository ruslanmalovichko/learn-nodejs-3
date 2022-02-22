import express from 'express';

let app = express();

app.listen(80);

app.get('/image', function (req, res) {
  res.sendFile('arch.jpg', { maxAge: 24*60*60*1000, root: './views/'}, function(err) {
    if (err){
      console.log("Error");
    }
    else {
      console.log("Success");
    }
  });
});

