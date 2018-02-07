// author Tigist Damesa ....04/02/2018

var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

//token validation/authorization
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https://ethiochat.auth0.com/.well-known/jwks.json"
  }),
  audience: 'cDJlPPaVj23AkRKFJJ8P3MYjG9ZVjKz4',
  issuer: "https://ethiochat.auth0.com/",
  algorithms: ['RS256']
});

console.log(jwtCheck.toString)
router.get('/authorized', jwtCheck, function (req, res) {
  res.send('Secured Resource');
})

router.get('/users/search/:name?', function(req, res, next) {
  // all users

  var query = {};
  if (req.params.name) {
    query= {name: {$regex: '^'+req.params.name}};
  }
  req.db
    .collection('user')
    .find(query).limit(20)
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
  req.db.collection('user').insert(data, (err, isInserted) => {
    if (err) throw err;
    res.json(req.body);
  });
});
 
router.put('/users', jwtCheck,function(req, res, next) {
  var data = req.body;
  var email =  req.user.email;
  req.db.collection('user').update({ email: email }, data, (err, isupdated) => {
    if (err) throw err;
    res.json(req.body);
  });
});

router.put('/join',(req, res, next) => {
   
  req.db.collection('user').update({username : req.body.username},
             {$addToSet : {group: req.body.group }}, { upsert: true}, (err, joinUser) =>{
                 if(err){
                     console.log('error');
                 }
               
                 res.json(joinUser);
              });
          });
         
         
     router.get('/groups/:username', function(req, res, next) {
            // get user group
            console.log(req.username);
           
            req.db.collection('user').find({ username : req.params.username }, (err, result) => {
              if (err) throw err;
              console.log('this is result set');
              console.log(result);
              res.json(result);
            });
          });

    
module.exports = router;
