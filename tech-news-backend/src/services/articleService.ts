import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllArticles = async () => {
    try {
        const articles = await prisma.article.findMany({
            orderBy: {
                publishedAt: 'desc'
            }
        });
        return articles;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch articles: ${error.message}`);
        }
        throw new Error('Failed to fetch articles due to an unknown error');
    }
};

export const getArticleById = async (id: string) => {
    try {
        const article = await prisma.article.findUnique({
            where: { id },
        });
        if (!article) {
            throw new Error(`Article with id ${id} not found`);
        }
        return article;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch article: ${error.message}`);
        }
        throw new Error('Failed to fetch article due to an unknown error');
    }
};

export const updateArticle = async (id: string, data: any) => {
    try {
        const article = await prisma.article.update({
            where: { id },
            data
        });
        return article;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to update article: ${error.message}`);
        }
        throw new Error('Failed to update article due to an unknown error');
    }
};

export const deleteArticle = async (id: string) => {
    try {
        await prisma.article.delete({
            where: { id }
        });
        return true;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to delete article: ${error.message}`);
        }
        throw new Error('Failed to delete article due to an unknown error');
    }
};