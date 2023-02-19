// routes.ts
import express from 'express';
import { login } from '../controllers/authController';
import { createComment, getCommentsForPost } from '../controllers/postController';
import { createMessage, getConversation, getMessages } from '../controllers/messageController';
import { createPost, getPostDetails, getPostsForUser } from './controllers/post.controller';
import { getUserProfile } from './controllers/user.controller';

const router = express.Router();

router.post('/api/auth/login', login);
router.post('/api/auth/signup', signup);

router.get('/api/users/:id', getUserProfile
