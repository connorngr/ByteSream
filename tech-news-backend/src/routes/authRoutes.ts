import { Router } from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticateJWT, getUserProfile);

export default router;