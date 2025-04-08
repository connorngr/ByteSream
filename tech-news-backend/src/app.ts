import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import scrapeRoutes from "./routes/scrapeRoutes";
import healthRoutes from "./routes/heath";
import articleRoutes from "./routes/articles";
import passport from "passport";
import authRoutes from "./routes/authRoutes";
import {checkUserRole} from "./middleware/authMiddleware";
import seedAdmin from "./utils/seed";
import saveArticleRoutes from "./routes/saveArticlesRoutes";


// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(passport.initialize());

// Seed the database with an admin user
seedAdmin().catch((e) => {
    console.error('Error seeding admin user:', e);
});

//Routes
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1", articleRoutes);
app.use("/api/v1", scrapeRoutes);
app.use('/api/v1', saveArticleRoutes);

//Protected routes
app.use('/api/v1', checkUserRole("USER"), healthRoutes);


export default app;
