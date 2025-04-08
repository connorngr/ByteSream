import express from "express";
import { scrapeNewsHandler } from "../controllers/scrapeController";
import { checkUserRole } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/scrape", checkUserRole("ADMIN"), scrapeNewsHandler);

export default router;
