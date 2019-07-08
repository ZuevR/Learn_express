var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // console.log(req.body);
  // res.send('respond with a resource');
});
// const BASE_URL = 'http://localhost:3012';
// const productsPath = BASE_URL + '/users/products';

router.post('/', function (req, res, next) {
  console.log('=====', req.body);
  if(req.body.name === '123') {
    res.end();
    // res.redirect(productsPath)
  }
  next();
});

module.exports = router;
