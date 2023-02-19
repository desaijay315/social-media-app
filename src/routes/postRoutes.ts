import express from 'express';
import { PostController } from '../controllers/PostController';
import { checkJwt } from '../middlewares/checkJwt';

const router = express.Router();

// Get all posts
router.get('/', [checkJwt], PostController.getAllPosts);

// Get post by id
router.get('/:id', [checkJwt], PostController.getPostById);

// Create new post
router.post('/', [checkJwt], PostController.createPost);

// Update post
router.patch('/:id', [checkJwt], PostController.updatePost);

// Delete post
router.delete('/:id', [checkJwt], PostController.deletePost);

// Get post comments
router.get('/:id/comments', [checkJwt], PostController.getPostComments);

// Add comment to post
router.post('/:id/comments', [checkJwt], PostController.addCommentToPost);

export { router as postRoutes };
