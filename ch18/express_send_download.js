import express from 'express';
import path from 'path';

let app = express();

app.listen(80);

app.get('/download', function (req, res) {
  res.sendFile(path.resolve() + '/views/word.docx', 'new.docx');
});

