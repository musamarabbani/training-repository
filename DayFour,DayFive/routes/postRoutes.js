const express = require('express');
const { check, param } = require('express-validator');

const router = express.Router();

const postController = require('../controllers/Posts');

router.post(
  '/create',
  [
    check('content').trim().not().isEmpty().withMessage('content is required'),
    check('userId').trim().not().isEmpty().withMessage('userId should not be empty'),
  ],
  postController.createPost
);
router.put('/update/:postId', [param('postId').trim().not().isEmpty().withMessage('postId is required in params')], postController.updatePostById);
router.delete('/delete/:postId', [param('postId').trim().not().isEmpty().withMessage('postId is required in params')], postController.deletePostById);
router.get('/post/:postId', [param('postId').trim().not().isEmpty().withMessage('postId is required in params')], postController.getPostById);
router.get('/allPosts', postController.getAllPosts);

module.exports = router;
