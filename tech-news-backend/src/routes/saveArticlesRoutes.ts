import { Router } from 'express';
import { 
    saveArticleController, 
    unsaveArticleController, 
    getSavedArticlesController 
} from '../controllers/saveArticlesController';
import { checkUserRole } from '../middleware/authMiddleware';

const router = Router();

// All routes require USER role
router.post('/saved-articles', checkUserRole('USER'), saveArticleController);
router.delete('/saved-articles/:articleId', checkUserRole('USER'), unsaveArticleController);
router.get('/saved-articles', checkUserRole('USER'), getSavedArticlesController);

export default router;