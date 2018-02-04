var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.db.collection('user').findOne({}, (err, result) => {
    console.log(result);
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
