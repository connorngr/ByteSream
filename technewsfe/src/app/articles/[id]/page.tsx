"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchArticleById } from "@/app/api/articleApi";
import Loading from "@/app/components/common/Loading";
import { Article } from "@/types";
import ArticleHeader from "./components/ArticleHeader";
import ArticleContent from "./components/ArticleContent";
import ArticleFooter from "./components/ArticleFooter";
import { generateArticleMetadata } from "@/app/ultilities/metadata";



export default function ArticlePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (params.id) {
      const getArticle = async (): Promise<void> => {
        try {
          // Simulate loading delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const articleData = await fetchArticleById(params.id);
          setArticle(articleData);
          document.title = `${articleData.title} | ByteStream`;
        } catch (err) {
          console.error("Error fetching article:", err);
        } finally {
          setLoading(false);
        }
      };

      getArticle();
    }
  }, [params.id]);

  if (loading) return <Loading />;
  if (!article) return <div>Article not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ArticleHeader 
        article={article} 
        onBack={() => router.back()} 
      />
      
      <ArticleContent article={article} />
      
      <ArticleFooter sourceUrl={article.sourceUrl} />
    </div>
  );
}