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

module.exports = jwtCheck;