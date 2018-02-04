var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');


var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https://ethiochat.auth0.com/.well-known/jwks.json"
  }),
  audience: 'http://localhost:8000',
  issuer: "https://ethiochat.auth0.com/",
  algorithms: ['RS256']
});

router.get('/authorized', jwtCheck, function (req, res) {
  res.send('Secured Resource');
});


// router.post('/users/login', function(req,res){
//   const user={
//     id:1,
//     username:'test',
//     email:'tigist@gmail.com'
//   }
//   console.log(user);
//   jwt.sign(user, 'secretkey',function(err,token){
//     if(err) throw err;
//     res.json(token);
//   })
// })

/* GET users listing. */
router.get('/users/search/:name?', function(req, res, next) {
  // TODO checkUser(req)

  var query = {};
  if (req.params.name) {
    query= {name: {$regex: '^'+req.params.name}};
  }
  req.db
    .collection('user')
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

router.get('/users', function(req, res, next) {
  // TODO checkUser(req)
  var email = 'samson@gmail.com';
  req.db.collection('user').findOne({ email: email }, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});


router.post('/users', function(req, res, next) {
  var data = req.body;
  req.db.collection('user').insert(data, (err, isInserted) => {
    if (err) throw err;
    res.json(req.body);
  });
});

router.put('/users', function(req, res, next) {
  var data = req.body;
  var email = 'samson@gmail.com';
  req.db.collection('user').update({ email: email }, data, (err, isupdated) => {
    if (err) throw err;
    res.json(req.body);
  });
});

module.exports = router;
