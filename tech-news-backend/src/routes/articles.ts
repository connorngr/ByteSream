import { Router } from 'express';
import { getArticleByIdController, getArticlesController } from '../controllers/articlesController';
import { checkUserRole } from '../middleware/authMiddleware';
import { updateArticleController, deleteArticleController } from '../controllers/articlesController';

const router = Router();

router.get('/articles', getArticlesController);
router.get('/articles/:id', getArticleByIdController);

router.put('/articles/:id', checkUserRole('ADMIN'), updateArticleController);
router.delete('/articles/:id', checkUserRole('ADMIN'), deleteArticleController);

export default router;