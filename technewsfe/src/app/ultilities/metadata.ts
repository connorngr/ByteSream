import { Article } from "@/types";
import { Metadata } from "next";

/**
 * Generates dynamic metadata for articles
 */
export function generateArticleMetadata(article: Article): Metadata {
  return {
    title: `${article.title} | ByteStream`,
    description: article.description || "Read this article on ByteStream",
    openGraph: {
      title: article.title,
      description: article.description || "",
      images: article.thumbnailUrl ? [{ url: article.thumbnailUrl }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description || "",
      images: article.thumbnailUrl ? [article.thumbnailUrl] : [],
    }
  };
}