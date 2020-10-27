var express = require('express');
var router = express.Router();
const package = require('../../package.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { package });
});

module.exports = router;
