import prisma from '../config/db';
import generateSummary from './summarizer';
import { firefox } from 'playwright';

const baseUrl = "https://www.theverge.com/";

export const scrapeTechNews = async () => {
    const browser = await firefox.launch({
        headless: false, // Set to true in production
    });
    const page = await browser.newPage();

    try {
        const articles = await scrapeArticles(page, baseUrl);
        await processArticles(page, articles);
        await saveArticlesToDatabase(articles);
        await browser.close();

        // Log success
        await prisma.scrapingLog.create({
            data: {
                sourceUrl: baseUrl,
                status: 'SUCCESS',
            },
        });

        return { success: true, articles };
    } catch (error: any) {
        console.error('Scraping error:', error);
        await browser.close();
        // Log error
        await prisma.scrapingLog.create({
            data: {
                sourceUrl: baseUrl,
                status: 'FAILED',
                errorMessage: error.message,
            },
        });

        throw new Error('Scraping failed');
    }
}

async function scrapeArticles(page: any, baseUrl: string) {
    await page.goto(baseUrl, { timeout: 100000 });
    return page.evaluate((url: String) => {
        return Array.from(document.querySelectorAll('a._1lkmsmo1'))
            .map(link => ({
                title: link.textContent?.trim() || '',
                url: url + link.getAttribute('href')! || '',
                summary: '',
                translation: '',
                tags: [] as string[],
                imageUrl: ''
            }))
            .filter((article, index, self) =>
                index === self.findIndex(a => a.title === article.title)
            )
            .slice(0, 10)
    }, baseUrl);
}

async function processArticles(page: any, articles: any[]) {
    for (const article of articles) {
        try {
            const startTime = Date.now();
            await processArticle(page, article);
            logProcessingTime(startTime, article.url);
        } catch (error) {
            console.error(`Error processing article ${article.url}:`, error);
        }
    }
}

async function processArticle(page: any, article: any) {
    await page.goto(article.url, { timeout: 100000 });
    const content = await extractContent(page);
    article.imageUrl = content.imageUrl;
    
    const aiResult = await generateSummary(content.text);
    Object.assign(article, aiResult);
    console.log(`Summary for ${article.url}:`, article.summary);
}

async function extractContent(page: any) {
    return page.evaluate(() => {
        const mainImage = document.querySelector('._1ymtmqpn img');
        return {
            text: document.body.innerText,
            imageUrl: mainImage?.getAttribute('src') || ''
        };
    });
}

async function saveArticlesToDatabase(articles: any[]) {
    for (const article of articles) {
        const existing = await prisma.article.findUnique({
            where: { sourceUrl: article.url }
        });

        if (!existing) {
            await prisma.article.create({
                data: {
                    title: article.title,
                    sourceUrl: article.url,
                    publishedAt: new Date().toISOString(),
                    description: article.description,
                    summary: article.summary,
                    translation: article.translation,
                    tags: article.tags,
                    thumbnailUrl: article.imageUrl
                }
            });
        }
    }
}

function logProcessingTime(startTime: number, url: string) {
    const endTime = Date.now();
    console.log(`Time taken to process article: ${(endTime - startTime) / 1000} seconds`);
};
