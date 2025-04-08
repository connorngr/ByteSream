"use client"
import { useEffect, useState } from 'react';
import { Article } from '@/types';
import { getSavedArticles } from '@/app/api/articleApi';
import { FiBookmark } from 'react-icons/fi';
import Link from 'next/link';

export default function SavedArticlesPopup() {
  const [savedArticles, setSavedArticles] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const fetchSavedArticles = async () => {
    setIsLoading(true);
    try {
      const data = await getSavedArticles();
      setSavedArticles(data);
      console.log(data[0].article);
      
    } catch (error) {
      console.error('Error fetching saved articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
            setIsVisible(!isVisible);
            fetchSavedArticles();
        }}
        className="flex items-center gap-2 text-gray-600 hover:text-primary px-4 py-2"
      >
        <FiBookmark size={20} />
        <span>Saved</span>
      </button>

      {isVisible && (
        <div 
        onMouseLeave={() => setIsVisible(false)}
          className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 border border-gray-200 z-50">
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : savedArticles.length > 0 ? (
              savedArticles.map((element : any) => (
                <Link 
                    onClick={() => setIsVisible(false)}
                  key={element.article.id} 
                  href={`/articles/${element.article.id}`}
                  className="block px-4 py-2 hover:bg-gray-50"
                >
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                    {element.article.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {element.article.description}
                  </p>
                </Link>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No saved articles yet
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}