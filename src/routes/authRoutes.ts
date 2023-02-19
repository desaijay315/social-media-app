import { Router } from 'express';
import { signUp, login } from '../controllers/authControllers';

const router = Router();

// Sign up route
router.post('/signup', signUp);

// Log in route
router.post('/login', login);

export { router as authRoutes };
