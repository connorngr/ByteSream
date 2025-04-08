// src/app/page.tsx
"use client"
import { useState, useCallback } from "react";
import { Article } from "@/types";
import ArticlesList from "@/app/components/articles/ArticlesList";
import Hero from "./components/common/Hero";
import Newsletter from "./components/common/Newsletter";

export default function Home() {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);

  // Function to pick random articles from the loaded articles
  const handleArticlesLoaded = useCallback((articles: Article[]) => {
    if (articles && articles.length > 0) {
      // Get 3 random articles from the first 6 articles (or fewer if there aren't 6)
      const availableArticles = [...articles];
      const selected: Article[] = [];

      // Select up to 3 random articles
      const numToSelect = Math.min(3, availableArticles.length);
      for (let i = 0; i < numToSelect; i++) {
        const randomIndex = Math.floor(Math.random() * availableArticles.length);
        selected.push(availableArticles[randomIndex]);
        availableArticles.splice(randomIndex, 1);
      }
      setFeaturedArticles(selected);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <main className="flex-grow">
        {featuredArticles.length > 0 ? (
          <div className="relative">
            <Hero
              articles={featuredArticles} // Pass the direction as a prop
            />
          </div>
        ) : (
          <div className="py-16 bg-neutral-50">
            <div className="container mx-auto px-6 md:px-12">
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500">Loading featured articles...</p>
              </div>
            </div>
          </div>
        )}

        <section className="container mx-auto py-12 px-6 md:px-12">
          <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
          <ArticlesList
            onArticlesLoaded={handleArticlesLoaded}
            excludeArticleIds={featuredArticles.map(article => article.id)}
          />
        </section>

        <Newsletter />
      </main>
    </div>
  );
}