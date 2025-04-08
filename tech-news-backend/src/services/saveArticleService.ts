import prisma from '../config/db';

export const saveArticle = async (userId: string, articleId: string) => {
    try {
        const savedArticle = await prisma.savedArticle.create({
            data: {
                userId,
                articleId,
            },
            include: {
                article: true,
            },
        });
        return savedArticle;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to save article: ${error.message}`);
        }
        throw new Error('Failed to save article due to an unknown error');
    }
};

export const unsaveArticle = async (userId: string, articleId: string) => {
    try {
        await prisma.savedArticle.delete({
            where: {
                userId_articleId: {
                    userId,
                    articleId,
                },
            },
        });
        return true;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to unsave article: ${error.message}`);
        }
        throw new Error('Failed to unsave article due to an unknown error');
    }
};

export const getSavedArticles = async (userId: string) => {
    try {
        const savedArticles = await prisma.savedArticle.findMany({
            where: {
                userId,
            },
            include: {
                article: true,
            },
            orderBy: {
                savedAt: 'desc',
            },
        });
        return savedArticles;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get saved articles: ${error.message}`);
        }
        throw new Error('Failed to get saved articles due to an unknown error');
    }
};