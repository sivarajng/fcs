
const pg = require('pg');

exports.views = function (req, res) {
  var filename = req.params.filename;
  if (!filename) return;  // might want to change this
  res.render("views/" + filename);
};

exports.index = function (req, res) {
  res.render('index', { user: req.user });
};

exports.login = function (req, res) {
 res.render('login');
};

exports.loginerr = function (req, res) {
 res.render('loginerr');
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

exports.loginpost = function (req, res) {
  res.redirect('/');

};


exports.query = function (req, res) {
  res.render('query');
};

exports.querypost = function (req, res, next) {
  var sql = req.body.sql;
  pg.connect(pgConString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query(sql, [], function (err, result) {

      done()

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }

      console.log("___||||||___" + JSON.stringify(result.rows));
      res.json(result.rows);
    })


  })
};

exports.test = function (req, res) {
  res.render('test');
};