var express = require('express');
var router = express.Router();


/* render the page */
router.get('/', function(req, res, next) {
  res.render('../frontend/public/index');
});

/*
router.get('/users/login', function(req, res, next) {
  res.render(<h1>hhhh</h1>);
});*/


module.exports = router;
