import { Request, Response } from 'express';
import { saveArticle, unsaveArticle, getSavedArticles } from '../services/saveArticleService';
import { getCurrentUser } from '../services/authService';

export const saveArticleController = async (req: Request, res: Response) => {
    try {
        const user = await getCurrentUser(req);
        const { articleId } = req.body;
        console.log(req.body);
        
        if (!articleId) {
            return res.status(400).json({ message: 'Article ID is required' });
        }

        const savedArticle = await saveArticle(user.id, articleId);
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to save article' });
    }
};

export const unsaveArticleController = async (req: Request, res: Response) => {
    try {
        const user = await getCurrentUser(req);
        const { articleId } = req.params;

        await unsaveArticle(user.id, articleId);
        res.status(200).json({ message: 'Article unsaved successfully' });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to unsave article' });
    }
};

export const getSavedArticlesController = async (req: Request, res: Response) => {
    try {
        const user = await getCurrentUser(req);
        const savedArticles = await getSavedArticles(user.id);
        res.status(200).json(savedArticles);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to get saved articles' });
    }
};