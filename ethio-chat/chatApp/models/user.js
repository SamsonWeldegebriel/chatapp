var express = require('express');
var app = express();
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

app.use(jwtCheck);

app.use('/', require('../routes/users'));
app.listen(8000);