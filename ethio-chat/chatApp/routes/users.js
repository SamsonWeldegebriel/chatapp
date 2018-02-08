// author Tigist Damesa ....04/02/2018

var express = require('express');
var router = express.Router();
var jwtCheck = require('../shared/common');

console.log(jwtCheck.toString);
router.get('/authorized', jwtCheck, function(req, res) {
  res.send('Secured Resource');
});

router.get('/users/search/:name?', function(req, res, next) {
  // all users

  var query = {};
  if (req.params.name) {
    query = { name: { $regex: '^' + req.params.name } };
  }
  req.db
    .collection('user')
    .find(query)
    .limit(20)
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

router.get('/users', jwtCheck, function(req, res, next) {
  // current user profile
  console.log(req.user.email);
  var email = req.user.email;
  req.db.collection('user').findOne({ email: email }, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post('/users', function(req, res, next) {
  var data = req.body;
  console.log(data);
  req.db.collection('user').insert(data, (err, isInserted) => {
    if (err) throw err;
    res.json(req.body);
  });
});

router.put('/users', jwtCheck, function(req, res, next) {
  var data = req.body;
  var email = req.user.email;
  req.db.collection('user').update({ email: email }, data, (err, isupdated) => {
    if (err) throw err;
    res.json(req.body);
  });
});

router.put('/join', jwtCheck, (req, res, next) => {
  console.log({ username: req.user.email });
  console.log({ $addToSet: { group: req.body.group } });
  req.db
    .collection('user')
    .update(
      { username: req.user.email },
      { $addToSet: { group: req.body.group } },
      { upsert: true },
      (err, joinUser) => {
        if (err) {
          console.log('error');
        }

        res.json(joinUser);
      }
    );
});

router.get('/user/groups', jwtCheck, function(req, res, next) {
  req.db
    .collection('user')
    .findOne({ username: req.user.email }, (err, result) => {
      if (err) throw err;
      console.log('this is result set');
      console.log(result.group);
      res.send(result.group);
    });
});

module.exports = router;
