const express = require('express');
const router = express.Router();
const helper = require('../../helpers');
const userController = require('../../controllers/user-controller');
const postController = require('../../controllers/post-controller');

// =========== AUTH ===========

router.post('/auth/sign-in', userController.signIn);

router.post('/auth/sign-up', userController.signUp);

router.get('/auth/check-user', helper.verifyToken, userController.getIdentity);

// =========== USER ===========

router.get('/users', helper.verifyToken, userController.getAllUsers);

router.post('/users/follow', helper.verifyToken, userController.toggleFollow);

router.post('/users/search', helper.verifyToken, userController.search);

// =========== POST ===========

router.get('/posts', postController.getPosts);

router.get('/posts/my', helper.verifyToken, postController.getMyPosts);

router.post('/posts/create', helper.verifyToken, postController.createPost);

router.get('/posts/friends', helper.verifyToken, postController.getFriendsPosts);

module.exports = router;