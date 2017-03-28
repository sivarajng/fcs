var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');

const pg = require('pg')  
//const conString = 'postgres://postgres:postgres@localhost/fcs' // make sure to match your own database's credentials
const conString = 'postgres://pouochmwjyagce:a31f553c681047235ac5e3e826fe438a1b06b9d4a0f092c5e1301795cca8acb1@ec2-54-228-212-74.eu-west-1.compute.amazonaws.com:5432/d64irttd9v2ril' // make sure to match your own database's credentials




// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});




// Create a new Express application.
var app = express();



app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/app'));

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/app');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get('/',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res) {
	   res.render('index', { user: req.user });
  //  res.render('home', { user: req.user });
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });
  
  app.get('/query',
  function(req, res,next){
	  
	  pg.connect(conString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query('select version();', [], function (err, result) {
		
      done()

      if (err) {
        // pass the error to the express error handler
       return next(err)
      }

	  console.log("___||||||___"+JSON.stringify(result.rows));
      res.json( result.rows);
    })
  })
  
  

    
  });
  
  
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
  
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
