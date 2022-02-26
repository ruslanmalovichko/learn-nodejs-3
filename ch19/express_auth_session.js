import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import crypto from 'crypto';

function hashPW(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser('MAGICString'));

let sess = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}

app.use(session(sess));

app.get('/restricted', function(req, res) {
  console.log('on restricted page');
  console.log(req.session.user);
  if (req.session.user) {
    res.send('<h2>'+ req.session.success + '</h2>' + '<p>You have entered the restricted section<p><br>' + ' <a href="/logout">logout</a>');
  }
  else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
});

app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
});

app.get('/login', function(req, res) {
  let response = '<form method="POST">' +
    'Username: <input type="text" name="username"><br>' +
    'Password: <input type="password" name="password"><br>' +
    '<input type="submit" value="Submit"></form>';
  if (req.session.user) {
    res.redirect('/restricted');
  }
  else if (req.session.error) {
    response +='<h2>' + req.session.error + '<h2>';
  }
  res.type('html');
  res.send(response);
});

app.post('/login', function(req, res) {
  //user should be a lookup of req.body.username in database
  let user = {name:req.body.username, password:hashPW("myPass")};
  console.log(user);
  console.log(user.password);
  console.log(hashPW(req.body.password.toString()));

  if (user.password === hashPW(req.body.password.toString())) {
    req.session.regenerate(function(err) {
      console.log('good login');
      req.session.user = user;
      req.session.success = 'Authenticated as ' + user.name;
      console.log(req.session);
      res.redirect('/restricted');
    });
  }
  else {
    req.session.regenerate(function(err) {
      console.log('on login page wrong password');
      req.session.error = 'Authentication failed.';
      res.redirect('/restricted');
    });

    // res.redirect('/login');
  }
});
app.listen(80);

