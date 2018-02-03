var express = require('express');
var router = express.Router();
var mongoClient=require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  mongoClient.connect('mongodb://127.0.0.1:27017', (err, db) => {
    if (err) throw err;
    else{
    var dbo = db.db('ethiochatdb');
    dbo.collection('userinfo').findOne({},(err,result)=>{
      console.log(result);
    })
  
    console.log("connected...");}
})
  res.render('index', { title: 'Express' });
});

module.exports = router;
