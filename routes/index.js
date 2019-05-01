var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/home', {
    title: 'Expanse'
  });
});

router.get('/map', function(req, res, next) {
  res.render('index/mapCreator', {
    title: 'Map Creator | Expanse'
  });
});

module.exports = router;
