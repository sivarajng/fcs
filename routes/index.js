exports.views = function(req, res){
  var filename = req.params.filename;
  if(!filename) return;  // might want to change this
  res.render("views/" + filename );
};

exports.index = function(req, res){
   res.render('dashboard', { user: req.user });
};

exports.login = function(req, res){
  res.render('login', { user: req.user });
};

