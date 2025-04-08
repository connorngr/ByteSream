"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchArticleById, updateArticle } from "@/app/api/articleApi";
import { Article } from "@/types";
import Loading from "@/app/components/common/Loading";
import { desc } from "framer-motion/client";

const EditArticlePage = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thumbnailUrl: "",
    description: "",
  });
  const router = useRouter();
  const { id } = useParams<{id: string}>();

  useEffect(() => {
    loadArticle();
  }, []);

  const loadArticle = async () => {
    try {
      setLoading(true);
      const data = await fetchArticleById(id);
      setArticle(data);
      setFormData({
        title: data.title,
        content: data.content,
        thumbnailUrl: data.thumbnailUrl || "",
        description: data.description || "",
      });
    } catch (err) {
      console.error("Failed to fetch article", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...article,
        ...formData,
      };
      await updateArticle(id, updatedData);
      router.push("/admin/articles");
    } catch (err) {
      console.error("Failed to update article", err);
      alert("Failed to update article. Please try again.");
    }
  };

  if (loading) return <Loading />;
  if (!article) return <div>Article not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Article</h1>
          <button
            onClick={() => router.push("/admin/articles")}
            className="text-primary hover:text-primary/80 font-medium text-sm"
          >
            ← Back to Articles
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700">
                Thumbnail URL
              </label>
              <input
                type="url"
                id="thumbnailUrl"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleInputChange}
                className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="https://example.com/image.jpg"
              />
              {formData.thumbnailUrl && (
                <div className="mt-2">
                  <img
                    src={formData.thumbnailUrl}
                    alt="Thumbnail preview"
                    className="h-32 w-32 object-cover rounded-md border border-gray-300"
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.description}
                onChange={handleInputChange}
                rows={8}
                className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-300">
            <button
              type="button"
              onClick={() => router.push("/admin/articles")}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditArticlePage;