import { Request, Response } from 'express';
import { getArticleById, getAllArticles, deleteArticle, updateArticle } from '../services/articleService';

export const getArticleByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const article = await getArticleById(id);
        if (article) {
            res.json(article);
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving article', error });
    }
};

export const getArticlesController = async (req: Request, res: Response) => {
    try {
        const articles = await getAllArticles();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving articles', error });
    }
};

export const updateArticleController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const article = await updateArticle(id, req.body);
        res.json({
            article,
            message: 'Article updated successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating article', error });
    }
};

export const deleteArticleController = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`Deleting article with ID: ${id}`);
    try {
        await deleteArticle(id);
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting article', error });
    }
};