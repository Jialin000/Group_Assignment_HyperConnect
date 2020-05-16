var express = require('express');
var router = express.Router();


/* render the page */
router.get('/', function(req, res, next) {
  res.render('../frontend/public/index');
});


module.exports = router;
