const express = require('express');
const router = express.Router();
const helper = require('../helpers');
const postController = require('../controllers/post-controller');

router.get('/', postController.getPosts);

router.get('/my', helper.verifyToken, postController.getMyPostsPage);

router.get('/my-posts', helper.verifyToken, postController.getMyPosts);

router.get('/create', helper.verifyToken, postController.getPostCreatePage);

router.post('/create', helper.verifyToken, postController.createPost);

router.get('/friends', helper.verifyToken, postController.getFriendsPostsPage);

router.get('/friends-posts', helper.verifyToken, postController.getFriendsPosts);

module.exports = router;
