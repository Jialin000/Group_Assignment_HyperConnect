var express = require('express');
var router = express.Router();

/* render the page */
router.get('/', function(req, res, next) {
  res.render('../frontend/public/index');
});


router.get('/parkingBays', function(req, res, next) {
  res.render('../frontend/public/index');
});

router.get('/users/login', function(req, res, next) {
  res.render('../frontend/public/index');
});

router.get('/users/logout', function(req, res, next) {
  res.render('../frontend/public/index');
});

router.get('/users/signin', function(req, res, next) {
  res.render('../frontend/public/index');
});


module.exports = router;
