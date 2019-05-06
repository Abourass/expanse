const  express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/home', {
    title: 'Expanse'
  });
});

router.get('/dash', function(req, res, next) {
  res.render('index/dash', {
    title: 'Expanse',
    dash: true
  })
});

router.get('/map', function(req, res, next) {
  res.render('index/mapCreator', {
    title: 'Map Creator | Expanse'
  });
});

module.exports = router;
