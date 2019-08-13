const express = require('express');
const router = express.Router();
const helper = require('../helpers');
const siteController = require('../controllers/site-controller');

router.get('/', siteController.getHomePage);

router.get('/check-user', helper.verifyToken, siteController.getIdentity);

module.exports = router;
