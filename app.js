var express = require('express');
var path = require('path');
var repsLib = require('./lib/reps.js');

// Routes
var reps = require('./routes/reps');

// Misc
var app = express();
var PORT = 8000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

reps.init(app);

app.get('/', function(req, res, next) {
  var method;

  switch (req.query.type) {
    case 'zip':
      method = repsLib.allByZip;
      break;
    case 'name':
      method = repsLib.repsByName;
      break;
    case 'state':
      method = repsLib.repsByState;
      break;
    default:
      method = function(param, cb) {
        cb(null, []);
      };
      break;
  }

  if (method) {
    method(req.query.search, function(err, people) {
      if (err) { return next(err); }
      res.render('index', {
        reps: people,
        query: req.query,
      });
    });
  }

});

app.listen(PORT, function() {
  console.log('Server started on port ' + PORT);
});

module.exports = app;
