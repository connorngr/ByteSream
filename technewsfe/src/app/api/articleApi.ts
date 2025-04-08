import { getAuthHeader } from "../ultilities/helper";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const fetchArticles = async () => {
  const res = await fetch(`${API_BASE_URL}/articles`);
  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
};

export const fetchArticleById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/articles/${id}`);
  if (!res.ok) throw new Error("Failed to fetch article");
  return res.json();
};

export const scrapeNews = async () => {
  const res = await fetch(`${API_BASE_URL}/scrape`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getAuthHeader(),
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to scrape news");
  }

  return res.json();
};

export const updateArticle = async (id: string, data: any) => {
  const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAuthHeader()
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to update article");
  return res.json();
};

export const deleteArticle = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAuthHeader()
    }
  });
  if (!res.ok) throw new Error("Failed to delete article");
  return res.json();
};

export const saveArticle = async (articleId: string) => {
  const res = await fetch(`${API_BASE_URL}/saved-articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAuthHeader()
    },
    body: JSON.stringify({ articleId })
  });
  if (!res.ok) throw new Error("Failed to save article");
  return res.json();
};

export const unsaveArticle = async (articleId: string) => {
  const res = await fetch(`${API_BASE_URL}/saved-articles/${articleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAuthHeader()
    }
  });
  if (!res.ok) throw new Error("Failed to unsave article");
  return res.json();
};

export const getSavedArticles = async () => {
  const res = await fetch(`${API_BASE_URL}/saved-articles`, {
    headers: {
      'Authorization': getAuthHeader()
    }
  });
  if (!res.ok) throw new Error("Failed to fetch saved articles");
  return res.json();
};