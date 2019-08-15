const express = require('express');
const router = express.Router();
const helper = require('../helpers');
const siteController = require('../controllers/site-controller');

router.get('/', helper.verifyToken, siteController.getPage('users.html'));

module.exports = router;
