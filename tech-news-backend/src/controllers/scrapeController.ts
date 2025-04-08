import { Request, Response } from "express";
import { scrapeTechNews } from "../services/scraper";

export const scrapeNewsHandler = async (req: Request, res: Response) => {
    try {
        const result = await scrapeTechNews();
        res.json(result);
    }
    catch (error) {
        console.error("Error scraping news:", error);
        res.status(500).json({ message: "Error scraping news", error });
        return;
    }

};
