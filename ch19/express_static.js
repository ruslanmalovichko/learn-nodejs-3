import express from 'express';

let app = express();

// app.use('/', express.static('static'), {maxAge: 60*60*1000});
app.use('/', express.static('static'));
// app.use('/images', express.static( '../images'));
app.listen(80);

