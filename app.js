var express = require('express');
var path = require('path');

// Routes
var reps = require('./routes/reps');

// Misc
var app = express();
var PORT = 8000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function(req, res, next) {
  var method;

  if (req.query.type === 'zip') {
    console.log('Type is zip');
    method = reps.allByZip;
  }

  if (method) {
    method(req.query.search, function(err, people) {
      if (err) { return next(err); }
      res.render('index', {
        reps: people,
        query: req.query,
      });
    });
  } else {
    res.render('index', {
      reps: null,
      query: req.query,
    });
  }

});

app.listen(PORT, function() {
  console.log('Server started on port ' + PORT);
});

module.exports = app;
