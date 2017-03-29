const pg = require('pg')  
const conString = 'postgres://postgres:postgres@localhost/fcs' // make sure to match your own database's credentials
//const conString = 'postgres://pouochmwjyagce:a31f553c681047235ac5e3e826fe438a1b06b9d4a0f092c5e1301795cca8acb1@ec2-54-228-212-74.eu-west-1.compute.amazonaws.com:5432/d64irttd9v2ril' // make sure to match your own database's credentials



exports.query=function(){
  pg.connect(conString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query('SELECT * FROM fcs.users;', [], function (err, result) {
		console.log("insiede SQl");
      done()

      if (err) {
        // pass the error to the express error handler
        return err;
      }

	  console.log("______"+JSON.stringify(result.rows));
      return JSON.stringify(result.rows);
    })
  })
  }
  
  
  
var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
