const express = require('express');
const router = express.Router();
const helper = require('../helpers');
const userController = require('../controllers/user-controller');

router.get('/', helper.verifyToken, userController.getUsersPage);

router.get('/followers', helper.verifyToken, userController.getAllUsers);

router.post('/follow', helper.verifyToken, userController.toggleFollow);

router.post('/search', helper.verifyToken, userController.search);

module.exports = router;
