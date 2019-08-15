const express = require('express');
const router = express.Router();
const helper = require('../helpers');
const siteController = require('../controllers/site-controller');

router.get('/my', helper.verifyToken, siteController.getPage('my-posts.html'));

router.get('/create', helper.verifyToken, siteController.getPage('create-posts.html'));

router.get('/friends', helper.verifyToken, siteController.getPage('friends-posts.html'));

module.exports = router;
