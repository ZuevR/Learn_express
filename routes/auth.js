const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.get('/sign-in', userController.getSignInPage);

router.post('/sign-in', userController.signIn);

router.get('/sign-up', userController.getSignUpPage);

router.post('/sign-up', userController.signUp);

router.get('/logout', userController.logout);

module.exports = router;