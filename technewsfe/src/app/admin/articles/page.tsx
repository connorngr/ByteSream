"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchArticles, deleteArticle, scrapeNews } from '@/app/api/articleApi';
import { Article } from '@/types';
import Loading from '@/app/components/common/Loading';
import ArticleTable from '../components/ArticleTable';

const AdminArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await fetchArticles();
      setArticles(data);
    } catch (err) {
      console.log('Failed to fetch articles', err);
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async () => {
    try {
      setScraping(true);
      await scrapeNews();
      await loadArticles();
    } catch (err) {
      setScraping(false);
      console.error('Failed to scrape articles', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;

    try {
      await deleteArticle(id);
      setArticles(articles.filter(article => article.id !== id));
    } catch (err) {
      console.log('Failed to delete article', err);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/articles/edit/${id}`);
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-2xl text-black font-bold mb-6">Articles Management</h1>
      <button
          onClick={handleScrape}
          disabled={scraping}
          className="px-4 py-2 mb-5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {scraping ? (
            <>
              <span className="inline-block animate-spin mr-2">↻</span>
              Scraping...
            </>
          ) : (
            'Scrape New Articles'
          )}
        </button>
      <ArticleTable articles={articles} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default AdminArticlesPage;