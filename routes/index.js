const express = require('express');
const router = express.Router();
const siteController = require('../controllers/site-controller');

router.get('/', siteController.getPage('index.html'));

router.get('/sign-in', siteController.getPage('sign-in.html'));

router.get('/sign-up', siteController.getPage('sign-up.html'));

module.exports = router;
