import express from 'express';
import { UserController } from '../controllers/UserController';
import { checkJwt } from '../middlewares/checkJwt';

const router = express.Router();

// Get all users
router.get('/', [checkJwt], UserController.getAllUsers);

// Get user by id
router.get('/:id', [checkJwt], UserController.getUserById);

// Update user
router.patch('/:id', [checkJwt], UserController.updateUser);

// Delete user
router.delete('/:id', [checkJwt], UserController.deleteUser);

export { router as userRoutes };
