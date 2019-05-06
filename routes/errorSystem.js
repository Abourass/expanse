const express = require('express');
const router = express.Router();

// GET home page
router.get('/404', function(req, res, next) {
  res.render('errorSystem/404', {
    title: 'Expanse'
  });
});

module.exports = router;
