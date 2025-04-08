import { FC } from "react";
import { Article } from "@/types";
import ArticlesTags from "@/app/components/articles/ArticlesTags";

interface ArticleHeaderProps {
  article: Article;
  onBack: () => void;
}

const ArticleHeader: FC<ArticleHeaderProps> = ({ article, onBack }) => {
  return (
    <>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span>Back to articles</span>
        </button>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>
      
      {/* Title & Image Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 leading-tight">{article.title}</h1>
        {article.thumbnailUrl && (
          <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={article.thumbnailUrl} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        )}
      </div>
      
      {/* Tags Section */}
      <ArticlesTags article={article}/>
    </>
  );
};

export default ArticleHeader;
