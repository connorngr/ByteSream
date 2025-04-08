// src/app/components/articles/ArticlesList.tsx
"use client"
import { useEffect, useState } from "react";
import { Article } from "@/types";
import Loading from "../common/Loading";
import { fetchArticles, getSavedArticles } from "@/app/api/articleApi";
import ArticleCard from "./ArticleCard";
import { useAuth } from "@/app/contexts/AuthContext";

interface ArticlesListProps {
  onArticlesLoaded?: (articles: Article[]) => void;
  excludeArticleIds?: string[];
}

export default function ArticlesList({ onArticlesLoaded, excludeArticleIds = [] }: ArticlesListProps) {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [savedArticleIds, setSavedArticleIds] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesData, savedArticlesData] = await Promise.all([
          fetchArticles(),
          user?.role === "USER" ? getSavedArticles() : Promise.resolve([])
        ]);

        setArticles(articlesData);
        if (user?.role === "USER") {
          const savedArticles = await getSavedArticles();

          setSavedArticleIds(new Set(savedArticles.map(element => element.article.id)));
        }
        
        if (onArticlesLoaded && articlesData.length > 0) {
          onArticlesLoaded(articlesData);
        }
        console.log(savedArticleIds);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [onArticlesLoaded, user]);

  const handleSaveToggle = (articleId: string, isSaved: boolean) => {
    setSavedArticleIds(prev => {
      const newSet = new Set(prev);
      if (isSaved) {
        newSet.add(articleId);
      } else {
        newSet.delete(articleId);
      }
      return newSet;
    });
  };

  if (loading) return <Loading />;

  const displayedArticles = excludeArticleIds.length
    ? articles.filter(article => !excludeArticleIds.includes(article.id)) 
    : articles;

  return (
    <div className="grid gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
      {displayedArticles.map((article, index) => (
        <ArticleCard
          key={article.id}
          article={article}
          index={index}
          isSaved={savedArticleIds.has(article.id)}
          onSaveToggle={handleSaveToggle}
        />
      ))}
    </div>
  );
}