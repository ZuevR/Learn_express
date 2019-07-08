var express = require('express');
var router = express.Router();
var path = require('path');

const pathPublic = path.join(process.cwd() + '/public/index.html');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send('Hello');

  res.sendFile(pathPublic);
  // res.render('index', { title: 'Express' });
});

module.exports = router;
