var request = require('superagent');

var createPath = function(group, type, param) {
  var path = ('http://whoismyrepresentative.com/getall_' + group + '.php?'  + type + '=' + param + '&output=json');
  return path;
};

exports.allByZip = function(zip, callback) {
  request
    .get(createPath('mems', 'zip', zip))
    .end(function(err, res) {
      if (err) return callback(err);
      callback(null, JSON.parse(res.text).results);
    });
};

exports.repsByName = function(name, callback) {
  request
    .get(createPath('reps_byname', 'name', name))
    .end(function(err, res) {
      if (err) return callback(err);
      callback(null, JSON.parse(res.text).results);
    });
};

exports.repsByState = function(state, callback) {
  request
    .get(createPath('reps_bystate', 'state', state))
    .end(function(err, res) {
      if (err) return callback(err);
      callback(null, JSON.parse(res.text).results);
    });
};

exports.sensByName = function(name, callback) {
  request
    .get(createPath('sens_byname', 'name', name))
    .end(function(err, res) {
      if (err) return callback(err);
      callback(null, JSON.parse(res.text).results);
    });
};

exports.sensByState = function(state, callback) {
  request
    .get(createPath('sens_bystate', 'state', state))
    .end(function(err, res) {
      if (err) return callback(err);
      callback(null, JSON.parse(res.text).results);
    });
};
